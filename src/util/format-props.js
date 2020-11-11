const formatters = {
	post: function formatPost(data) {
		// Move all `fields` properties to the top level and sort tags.
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
				tags: [...(frontmatter.tags ?? [])].sort(),
			},
			type: 'post',
			link: slug,
			tags: ['instructional'],
		};
	},
};

export default function formatProps(props) {
	const formatter = formatters[props.type];
	return formatter ? formatter(props) : props;
}
