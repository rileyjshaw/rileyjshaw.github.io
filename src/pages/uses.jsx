import React from 'react';

import {ExternalLink} from '../components/AutoLink';
import BigQuote from '../components/BigQuote';
import GoUp from '../components/GoUp';
import SEO from '../components/SEO';
import {Repair, Star} from '../icons';

import './uses.css';

export function Head(props) {
	return <SEO {...props} title="Inventory" />;
}

function UsesPage() {
	return (
		<main>
			<div className="page-content">
				<div className="prose prose-lg uses-lists">
					<p>
						Here are a few things that I use and enjoy. Most of the
						physical items were bought second-hand, or salvaged
						from landfill and repaired. I’ve starred my favourite
						things, and added a repair icon beside items that are
						repairable (including Open Source software).
					</p>

					<h2>Tools</h2>
					<ul>
						<li>
							<div className="uses-item">
								<div className="uses-text">
									Precision screwdriver:&nbsp;
									<ExternalLink to="https://www.ifixit.com/products/pro-tech-toolkit-refurbished">
										iFixit Pro Tech Toolkit
									</ExternalLink>
								</div>
								<div className="uses-icons">
									<Repair />
									<Star />
								</div>
							</div>
						</li>
						<li>
							<div className="uses-item">
								<div className="uses-text">
									Screwdriver:&nbsp;
									<ExternalLink to="https://www.wihatools.com/products/11-in-one-multi-bit-screwdriver">
										Wiha Multi-Driver
									</ExternalLink>
								</div>
								<div className="uses-icons">
									<Repair />
								</div>
							</div>
						</li>
						<li>
							<div className="uses-item">
								<div className="uses-text">
									Soldering Iron: ShineNow 72W
								</div>
								<div className="uses-icons">
									<Repair />
								</div>
							</div>
						</li>
					</ul>

					<h2>Programming</h2>
					<ul>
						<li>
							<div className="uses-item">
								<div className="uses-text">
									Editor:&nbsp;
									<ExternalLink to="https://code.visualstudio.com/">
										Visual Studio Code
									</ExternalLink>
								</div>
								<div className="uses-icons">
									<Repair />
								</div>
							</div>
						</li>
						<li>
							<div className="uses-item">
								<div className="uses-text">
									Editor font:&nbsp;
									<ExternalLink to="https://connary.com/cartograph.html">
										Cartograph
									</ExternalLink>
								</div>
								<div className="uses-icons">
									<Star />
								</div>
							</div>
						</li>
						<li>
							<div className="uses-item">
								<div className="uses-text">
									Editor theme:&nbsp;
									<ExternalLink to="https://www.nordtheme.com/">
										Nord
									</ExternalLink>
								</div>
							</div>
						</li>
						<li>
							<div className="uses-item">
								<div className="uses-text">
									<ExternalLink to="https://github.com/rileyjshaw/.supermac">
										My dotfiles
									</ExternalLink>
								</div>
								<div className="uses-icons">
									<Repair />
								</div>
							</div>
						</li>
						<li>
							<div className="uses-item">
								<div className="uses-text">
									VPN:&nbsp;
									<ExternalLink to="https://ref.nordvpn.com/DtgPeHbofRs">
										Nord
									</ExternalLink>
								</div>
							</div>
						</li>
					</ul>

					<h2>Software</h2>
					<ul>
						<li>
							<div className="uses-item">
								<div className="uses-text">
									<ExternalLink to="https://notion.so/">
										Notion
									</ExternalLink>
								</div>
								<div className="uses-icons">
									<Star />
								</div>
							</div>
						</li>
						<li>
							<div className="uses-item">
								<div className="uses-text">
									<ExternalLink to="https://www.mozilla.org/en-CA/firefox/new/">
										Firefox
									</ExternalLink>
								</div>
								<div className="uses-icons">
									<Repair />
								</div>
							</div>
						</li>
						<li>
							<div className="uses-item">
								<div className="uses-text">
									<ExternalLink to="https://go.setapp.com/invite/qndviwhf">
										Setapp
									</ExternalLink>
								</div>
							</div>
						</li>
						<li>
							<div className="uses-item">
								<div className="uses-text">
									<ExternalLink to="https://syncthing.net/">
										Syncthing
									</ExternalLink>
								</div>
								<div className="uses-icons">
									<Repair />
								</div>
							</div>
						</li>
						<li>
							<div className="uses-item">
								<div className="uses-text">
									<ExternalLink to="https://calibre-ebook.com/">
										Calibre
									</ExternalLink>
								</div>
								<div className="uses-icons">
									<Repair />
								</div>
							</div>
						</li>
					</ul>

					<h2>Office</h2>
					<ul>
						<li>
							<div className="uses-item">
								<div className="uses-text">
									Keyboard:&nbsp;
									<ExternalLink to="https://configure.zsa.io/moonlander/layouts/30wmY/latest">
										ZSA Moonlander
									</ExternalLink>
								</div>
								<div className="uses-icons">
									<Repair />
								</div>
							</div>
						</li>
						{/* Typewriter */}
					</ul>

					<h2>Books</h2>
					<ul>
						<li>
							<div className="uses-item">
								<div className="uses-text">
									<ExternalLink to="https://tsd.naomiklein.org/shock-doctrine.html">
										The Shock Doctrine: The Rise of
										Disaster Capitalism
									</ExternalLink>
								</div>
								<div className="uses-icons">
									<Star />
								</div>
							</div>
						</li>
						<li>
							<div className="uses-item">
								<div className="uses-text">
									<ExternalLink to="https://bookshop.org/p/books/doppelganger-a-trip-into-the-mirror-world-naomi-klein/20025222">
										Doppelganger: A Trip into the Mirror
										World
									</ExternalLink>
								</div>
							</div>
						</li>
						<li>
							<div className="uses-item">
								<div className="uses-text">
									<ExternalLink to="https://www.versobooks.com/en-ca/products/640-new-dark-age">
										New Dark Age: Technology and the End of
										the Future
									</ExternalLink>
								</div>
							</div>
						</li>
						<li>
							<div className="uses-item">
								<div className="uses-text">
									<ExternalLink to="http://monsters.hackeducation.com/">
										The Monsters of Education Technology
									</ExternalLink>
								</div>
							</div>
						</li>
						<li>
							<div className="uses-item">
								<div className="uses-text">
									<ExternalLink to="https://opencircuitsbook.com/">
										Open Circuits: The Inner Beauty of
										Electronic Components
									</ExternalLink>
								</div>
								<div className="uses-icons">
									<Star />
								</div>
							</div>
						</li>
						<li>
							<div className="uses-item">
								<div className="uses-text">
									<ExternalLink to="https://bjooks.com/products/push-turn-move-the-book">
										Push Turn Move: Interface Design in
										Electronic Music
									</ExternalLink>
								</div>
							</div>
						</li>
					</ul>

					<h2>Music</h2>
					<ul>
						<li>
							<div className="uses-item">
								<div className="uses-text">
									<ExternalLink to="https://youtu.be/ytyOffQuA5o">
										Stargazer
									</ExternalLink>
								</div>
								<div className="uses-icons">
									<Repair />
									<Star />
								</div>
							</div>
						</li>
						<li>
							<div className="uses-item">
								<div className="uses-text">
									<ExternalLink to="https://alternatemode.com/collections/drumkat-dk10-parts">
										DrumKAT Turbo
									</ExternalLink>
								</div>
								<div className="uses-icons">
									<Repair />
									<Star />
								</div>
							</div>
						</li>
						<li>
							<div className="uses-item">
								<div className="uses-text">
									<ExternalLink to="https://www.beepstreet.com/ios/drambo">
										Drambo
									</ExternalLink>
								</div>
								<div className="uses-icons">
									<Star />
								</div>
							</div>
						</li>
						<li>
							<div className="uses-item">
								<div className="uses-text">PO-33 K.O!</div>
								<div className="uses-icons">
									<Repair />
								</div>
							</div>
						</li>
						{/* Ride symbol */}
					</ul>

					<h2>Photography</h2>
					<ul>
						<li>
							<div className="uses-item">
								<div className="uses-text">
									<ExternalLink to="https://en.wikipedia.org/wiki/Olympus_OM-1">
										Olympus OM-1 (1973)
									</ExternalLink>
								</div>
								<div className="uses-icons">
									<Repair />
									<Star />
								</div>
							</div>
						</li>
					</ul>

					<h2>Games</h2>
					<ul>
						<li>
							<div className="uses-item">
								<div className="uses-text">
									<ExternalLink to="https://us.shop.battle.net/en-us/product/starcraft">
										Starcraft: Brood War
									</ExternalLink>
								</div>
								<div className="uses-icons">
									<Star />
								</div>
							</div>
						</li>
						<li>
							<div className="uses-item">
								<div className="uses-text">
									Shadow of the Colossus
								</div>
							</div>
						</li>
						<li>
							<div className="uses-item">
								<div className="uses-text">Flower</div>
							</div>
						</li>
						<li>
							<div className="uses-item">
								<div className="uses-text">Wipeout: HD</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<BigQuote quoteId="ETHOS" />
			<GoUp />
		</main>
	);
}

export default UsesPage;
