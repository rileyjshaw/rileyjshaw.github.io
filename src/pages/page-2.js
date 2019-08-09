import React from 'react';
import {Link, StaticQuery, graphql} from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

const labsList = () => (
	<StaticQuery
		query={graphql`
			query ProjectsQuery {
				allProjectsJson {
					nodes {
						title
						description
					}
				}
				allDweetsJson {
					nodes {
						id
					}
				}
				allAtomEntry {
					nodes {
						title
						date(formatString: "YYYY-MM-DD")
						link
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
			allDweetsJson: {nodes: dweets},
			allProjectsJson: {nodes: projects},
			dweets0: {results: d0},
			dweets1: {results: d1},
		}) => (
			<ul>
				{[...d0, ...d1].map(({id__normalized, link}) => (
					<li>
						<a href={link}>Dweet {id__normalized}</a>
					</li>
				))}
				{commits.map(({title, date, link}) => (
					<li>
						<a href={link}>
							<h1>
								{title} ({date})
							</h1>
						</a>
					</li>
				))}
				{dweets.map(({id}) => (
					<li key={id}>
						<h2>Dweet {id}</h2>
					</li>
				))}
				{projects
					.filter(({todo}) => !todo)
					.map(({title, description}) => (
						<li key={title}>
							<h2>{title}</h2>
							{description &&
								description.map(paragraph => (
									<p
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
