import {createFilePath} from 'gatsby-source-filesystem';
import path, {dirname} from 'path';
import {fileURLToPath} from 'url';

import {idify} from './project-scraper/scraper-utils.js';
import {
	GALLERIES_PATH_REGEX,
	POSTS_PATH_REGEX,
} from './src/util/all-projects-query.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));

const createBrowserRedirectVariants = ({
	createRedirect,
	fromPath,
	...options
}) => {
	// Gatsby browser redirects match exact pathnames, so register both forms.
	const redirectPaths = new Set([
		fromPath,
		fromPath.endsWith('/') ? fromPath.slice(0, -1) || '/' : `${fromPath}/`,
	]);

	for (const redirectPath of redirectPaths) {
		createRedirect({
			...options,
			fromPath: redirectPath,
			redirectInBrowser: true,
		});
	}
};

export const createPages = async ({actions, graphql, reporter}) => {
	const {createPage, createRedirect} = actions;

	// Create some redirects.
	createBrowserRedirectVariants({
		createRedirect,
		fromPath: '/contact',
		toPath: '/subscribe',
		isPermanent: true,
	});

	createBrowserRedirectVariants({
		createRedirect,
		fromPath: '/shaderpad',
		toPath: 'https://misery.co/shaderpad',
		isPermanent: true,
	});

	const blogListTemplate = path.resolve('./src/templates/BlogList.jsx');
	const blogPostTemplate = path.resolve('./src/templates/Post.jsx');
	const galleryTemplate = path.resolve('./src/templates/Gallery.jsx');

	// Both queries here must stay in sync with the page query in
	// src/templates/BlogList.jsx (same filters and sorts), since the
	// pagination below slices into the same lists with skip/limit.
	const result = await graphql(`
		{
			internalPosts: allMdx(
				filter: {
					internal: {
						contentFilePath: {regex: "${POSTS_PATH_REGEX}"}
					}
				}
				sort: {fields: {date: DESC}}
				limit: 1000
			) {
				nodes {
					id
					fields {
						uid
						slug
						date(formatString: "YYYY-MM-DD")
					}
					internal {
						contentFilePath
					}
				}
			}
			externalPosts: allCombinedProjectsJson(
				filter: {type: {in: ["tumblr"]}}
				sort: [{date: DESC}, {title: ASC}]
				limit: 1000
			) {
				nodes {
					uid
					date
				}
			}
			galleries: allMdx(
				filter: {
					internal: {
						contentFilePath: {regex: "${GALLERIES_PATH_REGEX}"}
					}
				}
				sort: {fields: {date: DESC}}
				limit: 1000
			) {
				nodes {
					id
					fields {
						slug
					}
					internal {
						contentFilePath
					}
				}
			}
		}
	`);

	// Handle errors.
	if (result.errors) {
		reporter.panicOnBuild(
			`Error while running GraphQL query.`,
			result.errors,
		);
		return;
	}

	// Merge both post sources into one date-sorted list. This is the
	// canonical post order: each page's slice of it is passed to the
	// template as `pageUids`, and the stable sort below preserves each
	// source's GraphQL order so the skip/limit windows line up with it.
	const internalPosts = result.data.internalPosts.nodes;
	const externalPosts = result.data.externalPosts.nodes;
	const allPosts = internalPosts
		.map(p => ({
			type: 'internal',
			date: p.fields.date,
			uid: p.fields.uid,
		}))
		.concat(
			externalPosts.map(p => ({
				type: 'external',
				date: p.date,
				uid: p.uid,
			})),
		)
		.sort((a, b) => new Date(b.date) - new Date(a.date));
	const postsPerPage = 3;
	const numPages = Math.ceil(allPosts.length / postsPerPage);

	// Create paginated blog listings in the pattern /blog, /blog/1, etc.
	let internalSkip = 0;
	let externalSkip = 0;
	for (let page = 0; page < numPages; ++page) {
		const pagePosts = allPosts.slice(
			page * postsPerPage,
			(page + 1) * postsPerPage,
		);
		const internalLimit = pagePosts.filter(
			p => p.type === 'internal',
		).length;
		const externalLimit = postsPerPage - internalLimit;
		createPage({
			path: `/blog${page ? `/${page + 1}` : ''}/`,
			component: blogListTemplate,
			context: {
				internalLimit,
				internalSkip,
				externalLimit,
				externalSkip,
				numPages,
				currentPage: page + 1,
				pageUids: pagePosts.map(p => p.uid),
			},
		});
		internalSkip += internalLimit;
		externalSkip += externalLimit;
	}

	// Create a post page for each internal post.
	internalPosts.forEach(post => {
		createPage({
			path: post.fields.slug,
			component: `${blogPostTemplate}?__contentFilePath=${post.internal.contentFilePath}`,
			context: {
				id: post.id,
			},
		});
	});

	// Create a post page for each gallery.
	const galleries = result.data.galleries.nodes;
	galleries.forEach((gallery, i) => {
		createPage({
			path: gallery.fields.slug,
			component: `${galleryTemplate}?__contentFilePath=${gallery.internal.contentFilePath}`,
			context: {
				id: gallery.id,
				prevId: galleries[i - 1]?.id,
				nextId: galleries[i + 1]?.id,
			},
		});
	});
};

export const onCreateNode = ({node, getNode, actions}) => {
	const {createNodeField} = actions;

	if (node.internal.type === 'Mdx') {
		const isPost = node.internal.contentFilePath.includes(
			'/data/markdown/posts/',
		);
		const isGallery = node.internal.contentFilePath.includes(
			'/data/markdown/galleries/',
		);
		if (!isPost && !isGallery) return;

		let {title, slug} = node.frontmatter;
		const fileName = createFilePath({
			node,
			getNode,
			basePath: isPost ? 'posts' : 'galleries',
		});
		const [, date, fileNameSlug] = fileName.match(
			/^\/(?:published|drafts)\/([\d]{4}-[\d]{2}-[\d]{2})-{1}(.+)\/$/,
		);
		slug ??= fileNameSlug;
		createNodeField({
			node,
			name: 'slug',
			value: `/${isPost ? 'blog' : 'gallery'}/${encodeURI(slug)}`,
		});

		if (!title) {
			title =
				slug.slice(0, 1).toUpperCase() +
				slug.slice(1).replace(/-/g, ' ');
		}

		// Save the date and title for later use.
		createNodeField({node, name: 'title', value: title});
		createNodeField({node, name: 'date', value: date});

		const uid = idify(
			`${isPost ? 'POST' : 'GALLERY'}_${slug
				.toUpperCase()
				.replace(/-/g, '_')}`,
		);
		createNodeField({node, name: 'uid', value: uid});
	}
};

// Nearly every scraped field is optional, so without explicit types the
// schema would depend on inference from whatever the scraper last emitted:
// a scrape where no node sets e.g. `repo` or `more` would break every query
// that mentions the field. Declaring all queried fields keeps them stable.
// (`timestamp` and `lastTagged` are epoch milliseconds, which overflow Int.)
export const createSchemaCustomization = ({actions}) => {
	const {createTypes} = actions;
	const typeDefs = `
		type CombinedProjectsJson implements Node {
			uid: String
			type: String
			title: String
			date: String
			link: String
			description: String
			body: String
			more: Boolean
			repo: String
			tags: [String]
			coolness: Int
			length: Int
			contentType: String
			updatedAt: String
			timestamp: Float
			lastTagged: Float
			extraData: [Int]
			image: CombinedProjectsJsonImage
		}
		type CombinedProjectsJsonImage {
			height: Int
			width: Int
			url: String
		}
	`;

	createTypes(typeDefs);
};

export const createResolvers = ({createResolvers}) => {
	// `description` and `more` both derive from the same pruned excerpt, so
	// compute it once per node version and share the promise between them.
	// Keyed by contentDigest so edits invalidate the cache during develop.
	const excerptCache = new Map();
	const getExcerpt = (source, args, context, info) => {
		const key = source.internal.contentDigest;
		if (!excerptCache.has(key)) {
			const resolver = info.schema.getType('Mdx').getFields()
				.excerpt.resolve;
			excerptCache.set(
				key,
				resolver(
					source,
					{
						...args,
						pruneLength: 700,
						truncate: false,
					},
					context,
					info,
				),
			);
		}
		return excerptCache.get(key);
	};

	createResolvers({
		// Some scraped projects have no coolness rating. Everything the
		// scraper doesn’t rank is assumed to be cool, so queries can filter
		// on this field without dropping unrated nodes.
		CombinedProjectsJson: {
			coolness: {
				type: 'Int',
				resolve: source => source.coolness ?? 100,
			},
		},
		Mdx: {
			description: {
				type: 'String',
				resolve: getExcerpt,
			},
			more: {
				type: 'Boolean',
				resolve: async (source, args, context, info) => {
					const excerpt = await getExcerpt(
						source,
						args,
						context,
						info,
					);
					return excerpt.endsWith('…');
				},
			},
		},
	});
};

// Allows components to be imported from the absolute path "components/etc"
// instead of the relative "../../components/etc". This is necessary for MDX.
export const onCreateWebpackConfig = ({stage, loaders, actions}) => {
	const config = {
		resolve: {
			modules: [path.resolve(__dirname, 'src'), 'node_modules'],
			alias: {
				content: path.resolve(__dirname, 'content'),
			},
		},
		module: {
			rules: [
				{
					test: /\.glsl$/,
					type: 'asset/source',
				},
			],
		},
	};

	actions.setWebpackConfig(config);
};
