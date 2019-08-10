import React from 'react';
import {Link, StaticQuery, graphql} from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

const labsList = () => (
	<StaticQuery
		query={graphql`
			query ProjectsQuery {
				allAtomEntry {
					nodes {
						title
						date(formatString: "YYYY-MM-DD")
						link
					}
				}
				allMarkdownRemark {
					edges {
						node {
							excerpt
							frontmatter {
								layout
								tldr
								topTitle
							}
							fields {
								slug
								title
								date
							}
						}
					}
				}
				allProjectsJson {
					nodes {
						title
						description
					}
				}
				dweets0 {
					results {
						id__normalized
						link
					}
				}
				dweets1 {
					results {
						id__normalized
						link
					}
				}
			}
		`}
		render={({
			allAtomEntry: {nodes: commits},
			allProjectsJson: {nodes: projects},
			allMarkdownRemark: {edges: posts},
			dweets0: {results: d0},
			dweets1: {results: d1},
		}) => (
			<ul>
				<li key="0">
					The firehose currently has{' '}
					<strong>
						{posts.length +
							d0.length +
							d1.length +
							projects.length +
							commits.length}
					</strong>{' '}
					entries from <strong>4</strong> sources.
				</li>
				<li>
					<ul>
						<li>Potential other sources:</li>
						<li>Instagram</li>
						<li>Github</li>
						<li>Codepen</li>
						<li>Glitch</li>
						<li>Hackster</li>
						<li>Galleries</li>
						<li>SFPC tumblr</li>
						<li>Creative code tumblr</li>
						<li>Are.na</li>
						<li>Increase project node types</li>
					</ul>
				</li>
				{posts.map(
					(
						{
							node: {
								excerpt,
								frontmatter: {layout, tldr, toptitle},
								fields: {slug, title, date},
							},
						},
						i
					) => (
						<li key={`post${i}`}>
							<a href={slug}>
								<h2>{title}</h2>
							</a>
							<p>{tldr}</p>
							<p>Written on {date}</p>
							<p>{excerpt}</p>
						</li>
					)
				)}
				{[...d0, ...d1].map(({id__normalized, link}, i) => (
					<li key={`dweet${i}`}>
						<a href={link}>Dweet {id__normalized}</a>
					</li>
				))}
				{commits.map(({title, date, link}, i) => (
					<li key={`commit${i}`}>
						<a href={link}>
							<h1>
								{title} ({date})
							</h1>
						</a>
					</li>
				))}
				{projects
					.filter(({todo}) => !todo)
					.map(({title, description}, i) => (
						<li key={`project${i}`}>
							<h2>{title}</h2>
							{description &&
								description.map((paragraph, i) => (
									<p
										key={i}
										dangerouslySetInnerHTML={{
											__html: paragraph,
										}}
									/>
								))}
						</li>
					))}
			</ul>
		)}
	/>
);

const SecondPage = () => (
	<Layout>
		<SEO title="Page two" />
		<h1>The firehose!</h1>
		{labsList()}
		<Link to="/">Go back to the homepage</Link>
	</Layout>
);

export default SecondPage;
