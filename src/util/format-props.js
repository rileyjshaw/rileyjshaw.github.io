/*
 TODO(riley): Move these into GraphQL eventually to save bytes / processing on
              the client: https://www.gatsbyjs.org/docs/schema-customization
*/

const formatters = {
	dweet: function formatDweet(data) {
		const {posted, id__normalized, ...rest} = data;
		return {
			...rest,
			date: posted.slice(0, 10),
			title: `No. ${id__normalized}`,
			id: `dweet-${id__normalized}`,
			tags: ['online', 'golf'],
		};
	},
	arenaChannel: function formatArenaChannel(data) {
		const {created_at, id__normalized, slug, ...rest} = data;
		return {
			...rest,
			link: `https://are.na/riley-shaw/${slug}`,
			id: `arena-${id__normalized}`,
			date: created_at.slice(0, 10),
			tags: ['online'],
		};
	},
	project: function formatProject({href, ...data}) {
		return {...data, link: href};
	},
	post: function formatPost(data) {
		// Move all `fields` properties to the top level.
		const {
			fields: {slug, ...fields},
			frontmatter,
			...rest
		} = data.node;
		return {
			...fields,
			...rest,
			frontmatter: {
				...frontmatter,
				tags: [...frontmatter.tags].sort(),
			},
			type: 'post',
			link: slug,
			id: `post`,
			tags: ['instructional'],
		};
	},
	commit: function formatCommit(data) {
		return data;
	},
};

export default function formatProps(props) {
	const formatter = formatters[props.type];
	return formatter ? formatter(props) : props;
}
