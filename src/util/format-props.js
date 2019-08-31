const formatters = {
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
			uid: `POST_${slug
				.slice(6)
				.toUpperCase()
				.replace(/-/g, '_')}`,
			tags: ['instructional'],
		};
	},
};

export default function formatProps(props) {
	const formatter = formatters[props.type];
	return formatter ? formatter(props) : props;
}
