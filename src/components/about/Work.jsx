import React from 'react';

import AutoLink from '../AutoLink';

function Job({at, role, children, isCurrent}) {
	return (
		<li className={isCurrent ? 'current' : ''}>
			<h3>
				{at}
				{role && (
					<>
						{' '}
						<span className="job-title">{role}</span>
					</>
				)}
			</h3>
			{children}
		</li>
	);
}

export function CLC() {
	return (
		<Job at="Canada Learning Code">
			<p>
				I spent years as a volunteer mentor and instructor with{' '}
				<AutoLink to="https://www.canadalearningcode.ca/">
					Canada Learning Code
				</AutoLink>
				. I mostly worked within these branches:
			</p>
			<ul>
				<li>
					<AutoLink to="https://www.canadalearningcode.ca/experiences/?program=girls_learning_code">
						Girls Learning Code
					</AutoLink>
				</li>
				<li>
					<AutoLink to="https://www.canadalearningcode.ca/experiences/?program=ladies_learning_code">
						Ladies Learning Code
					</AutoLink>
				</li>
				<li>
					<AutoLink to="https://www.canadalearningcode.ca/experiences/?program=teachers_learning_code">
						Teachers Learning Code
					</AutoLink>
				</li>
			</ul>
			<p>
				Curriculum content ranged from teaching girls how to make video
				games to helping teachers learn more about digital privacy.
			</p>
		</Job>
	);
}

export function D30U30() {
	return (
		<Job at="Developer 30 Under 30">
			<p>
				I won this award in early 2017.{' '}
				<AutoLink to="/blog/D30U30">I wrote about it here.</AutoLink>
			</p>
		</Job>
	);
}

export function KhanAcademy() {
	return (
		<Job at="Khan Academy">
			<p>
				I spent three years on the Engineering team at{' '}
				<AutoLink to="https://khanacademy.org">Khan Academy</AutoLink>.
				Here are some highlights:
			</p>

			<ul>
				<li>
					I rewrote the video page and player, reducing load time by
					over 100%.
				</li>
				<li>I created and led KA’s first optimization team.</li>
				<li>
					I{' '}
					<AutoLink to="https://youtu.be/RxKZOhS72Cw">
						built this interface
					</AutoLink>{' '}
					as the sole developer on LearnStorm 2017{' '}
					<AutoLink to="https://youtu.be/gIvD4OYCbbA">🎉</AutoLink>.
				</li>
				<li>I led our formal mentorship program.</li>
				<li>
					Over 3 years, I deleted more lines of code than I added.
				</li>
			</ul>
			<p>
				For most of my time at Khan Academy I worked remotely from
				Toronto, Canada. I’m honored to have worked with such brilliant
				and passionate folks.
			</p>
		</Job>
	);
}

export function Listn() {
	<Job at="Listn">
		<p>
			I co-created{' '}
			<AutoLink to="https://listn.co/">a popular mobile app</AutoLink>{' '}
			during university. We sold it to
			<AutoLink to="https://www.beatport.com/">Beatport</AutoLink>.
		</p>
	</Job>;
}

export function MischiefMakers() {
	return (
		<Job at="Mischief Makers" isCurrent={true}>
			<p>
				I volunteer at{' '}
				<AutoLink to="https://mischiefmakers.ca/">
					Mischief Makers
				</AutoLink>
				, a creative space for kids in Toronto.
			</p>
		</Job>
	);
}

export function Misery() {
	return (
		<Job at="Misery & Co." role="Founder" isCurrent={true}>
			<p>
				<AutoLink to="https://misery.co">Misery & Co.</AutoLink> is a
				development studio specializing in novel mixed-media projects.
				I founded the studio in 2018.
			</p>
		</Job>
	);
}

// TODO: Link this: https://www.politico.eu/article/apple-whistleblower-calls-for-privacy-probes-into-big-tech-voice-assistants-siri/
// And this: https://youtu.be/sGQy0r_icWc
export function Mozilla() {
	return (
		<Job at="Mozilla" role="Staff Software Engineer">
			<p>
				I worked at{' '}
				<AutoLink to="https://www.mozilla.org">Mozilla</AutoLink> on
				the Open Innovation team, supporting{' '}
				<AutoLink to="https://commonvoice.mozilla.org">
					Common Voice
				</AutoLink>
				. Common Voice is a landmark consent-driven dataset for human
				speech of all types, spanning over 60 languages. Common Voice
				is an open, inclusive, and privacy-conscious standard for a
				technology that is rapidly becoming ubiquitous. Here are some
				highlights of my time there:
			</p>
			<ul>
				<li>
					I joined as the team’s sole engineer, one month before a
					major partnership project was due. The project was
					estimated for three months but we somehow released on time.
				</li>
				<li>
					I then helped oversee and implement a major infrastructure
					migration for one of the largest open source voice
					datasets.
				</li>
				<li>
					I enabled recording on mobile browsers, opening the
					contribution process to many more people.
				</li>
				<li>ISSIP Excellence In Service Innovation Award.</li>
				<li>Fast Company Innovation By Design Award Finalist.</li>
			</ul>
		</Job>
	);
}

export function RecurseCenter() {
	return (
		<Job at="Recurse Center" isCurrent={true}>
			<p>
				I attended{' '}
				<AutoLink to="https://www.recurse.com/scout/click?t=4bdcd56dfdb6c80c7832262c0bb8007b">
					RC
				</AutoLink>{' '}
				in early 2014. While there, I worked on:
			</p>

			<ul>
				<li>
					<AutoLink to="https://rileyjshaw.com/blog/hue-angle-transitions">
						A better way to transition colors
					</AutoLink>{' '}
					(adopted by{' '}
					<AutoLink to="https://www.framer.com/">Framer</AutoLink>)
				</li>
				<li>
					<AutoLink to="https://rileyjshaw.com/terra">
						A biological simulations and cellular automata library
					</AutoLink>
				</li>
				<li>
					<AutoLink to="http://ushld.rileyjshaw.com">Fun</AutoLink>{' '}
					<AutoLink to="https://github.com/rileyjshaw/own-this-website">
						goofy
					</AutoLink>{' '}
					<AutoLink to="https://github.com/rileyjshaw/boxes">
						web
					</AutoLink>{' '}
					<AutoLink to="https://github.com/rileyjshaw/filesupply">
						apps
					</AutoLink>
				</li>
				<li>
					<AutoLink to="https://github.com/neerajwahi/pairjam">
						A real-time collaborative coding environment
					</AutoLink>
				</li>
				<li>
					<AutoLink to="https://github.com/adventure-db/adventure">
						A tiny graph database engine written in C
					</AutoLink>
				</li>
				<li>
					<AutoLink to="https://github.com/ben-eath/the-surf-ace">
						A Ludum Dare entry that used phone gyroscopes as
						controllers
					</AutoLink>
				</li>
				<li>
					<AutoLink to="https://v2.rileyjshaw.com/">
						A personal website
					</AutoLink>
				</li>
				<li>Learning a bit of Haskell (of course).</li>
				<li>Making friends.</li>
			</ul>

			<p>
				My favorite projects were the spontaneous collaborations that
				happened each day, most of which aren’t listed here. I had a
				wonderful time.
			</p>
			<p>
				In 2021 I helped build RC’s virtual space,{' '}
				<AutoLink to="https://www.rctogether.com/">
					RC Together
				</AutoLink>
				. I am also part of the interviewer team for Recurse Center.{' '}
				<AutoLink to="https://www.recurse.com/scout/click?t=4bdcd56dfdb6c80c7832262c0bb8007b">
					Care to apply?
				</AutoLink>
			</p>
		</Job>
	);
}

export function RepairMatters() {
	return (
		<Job at="Repair Matters">
			<p>
				I used to volunteer with{' '}
				<AutoLink to="https://repairmatters.ca">
					Repair Matters
				</AutoLink>
				, a Vancouver-based initiative that empowers people to take
				part in repair and fix their stuff. I was{' '}
				<AutoLink to="/blog/repair-matters-on-cbc-radio">
					interviewed by the CBC
				</AutoLink>{' '}
				for the work we did together.
			</p>
		</Job>
	);
}

export function SFPC() {
	return (
		<Job at="School for Poetic Computation">
			<p>
				I attended the{' '}
				<AutoLink to="https://sfpc.io">
					School for Poetic Computation
				</AutoLink>{' '}
				in early 2018, where I{' '}
				<AutoLink to="https://sfpc.rileyjshaw.com/">
					kept a blog
				</AutoLink>
				. My goal was to focus on:
			</p>
			<ul>
				<li>Education and the reinforcement of class structures.</li>
				<li>Deletion, permanence, and consistency.</li>
				<li>Repurposing corporate tools.</li>
				<li>Making friends.</li>
				<li>
					<AutoLink to="https://sfpc.rileyjshaw.com/post/172372422682/making-nothing">
						Making nothing
					</AutoLink>
					.
				</li>
			</ul>
			<p>
				<AutoLink to="https://sfpc.rileyjshaw.com/post/182905537092/final-showcase-project-depression">
					My final project
				</AutoLink>{' '}
				was about depression, which was a surprise for me. Here’s a
				link to{' '}
				<AutoLink to="https://sfpc.rileyjshaw.com/post/171435065582/my-school-for-poetic-computation-application">
					my application for the program
				</AutoLink>
				. I learned a lot about art and about myself. I’m grateful for
				the experience.
			</p>
		</Job>
	);
}

export function Signal() {
	return (
		<Job at="Signal Desktop">
			<p>
				Duing the{' '}
				<AutoLink to="/blog/the-pool-on-the-roof-must-have-a-leak">
					Winter Break of Code
				</AutoLink>
				, I pitched in on{' '}
				<AutoLink to="https://signal.org/">
					Signal’s desktop app
				</AutoLink>
				. Spending the morning on an important OSS project and the
				afternoon in the ocean was pretty close to perfect.
			</p>
		</Job>
	);
}

export function StepUp() {
	return (
		<Job at="Step Up Tutoring" role="Platform Engineer" isCurrent={true}>
			<p>
				<AutoLink to="https://www.stepuptutoring.org/">
					Step Up Tutoring
				</AutoLink>{' '}
				is mobilizing a national network of tutors to provide free,
				one-on-one online tutoring and mentorship to 2nd–6th grade
				students from underserved communities.
			</p>
			<p>
				I work directly alongside the CTO to scale the platform to
				support the organization’s growing number of tutors and
				students.
			</p>
		</Job>
	);
}

export function Watershed() {
	return (
		<Job at="Watershed" role="Staff Software Engineer" isCurrent={false}>
			<p>
				<AutoLink to="https://watershed.com/">Watershed’s</AutoLink>{' '}
				mission is to accelerate the climate economy, with a 2030 goal
				to reduce or remove 500 megatonnes of CO2
				equivalent—approximately 1% of annual global emissions.
			</p>
			<p>
				I built reporting tools to help companies understand and reduce
				their carbon emissions. On the Finance team, I focused on
				scaling the product to support some of the world’s largest
				banks and investment funds.
			</p>
		</Job>
	);
}
