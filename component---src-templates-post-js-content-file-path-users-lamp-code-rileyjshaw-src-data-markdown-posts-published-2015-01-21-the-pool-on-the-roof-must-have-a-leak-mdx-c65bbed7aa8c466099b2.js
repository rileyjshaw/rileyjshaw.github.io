"use strict";(self.webpackChunkrileyjshaw_com=self.webpackChunkrileyjshaw_com||[]).push([[882],{262:function(e,A,a){a.r(A),a.d(A,{Head:function(){return g},default:function(){return m}});var t=a(3366),n=a(1151),l=a(7294),i=a(3744);function s(e){var A=Object.assign({p:"p",a:"a",em:"em",div:"div",h2:"h2",blockquote:"blockquote"},(0,n.ah)(),e.components);return l.createElement(l.Fragment,null,l.createElement(i.Z,{type:"note"},l.createElement(A.p,null,"This post was originally published on the ",l.createElement(A.a,{href:"https://signal.org/blog/the-pool-on-the-roof-must-have-a-leak/"},"Signal blog"),".")),"\n",l.createElement(A.p,null,"Today we hiked the Kalalau Trail and swam beneath the cold spray of a waterfall."),"\n",l.createElement(A.p,null,"Today we discussed the finer points of the axolotl protocol used by TextSecure."),"\n",l.createElement(A.p,null,"Today we delighted in “shave ice”, a local delicacy that is definitely ",l.createElement(A.em,null,"not")," a snow cone."),"\n",l.createElement(A.p,null,"Today we wrote copy, polished features, closed bugs, and merged pull-requests."),"\n",l.createElement(A.p,null,"Measured by lines of code, today was short. Measured by steps taken, it was tall. Measured by ideas discussed, things learned, and sights seen, it was towering."),"\n",l.createElement(A.div,{dangerouslySetInnerHTML:{__html:'<span\n      class="gatsby-resp-image-wrapper"\n      style="position: relative; display: block; margin-left: auto; margin-right: auto; max-width: 675px; "\n    >\n      <a\n    class="gatsby-resp-image-link"\n    href="/static/e76cf22b0d9f68f6746e182ccea508bd/a2510/falls.jpg"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n    <span\n    class="gatsby-resp-image-background-image"\n    style="padding-bottom: 75.14792899408283%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAAPABQDASIAAhEBAxEB/8QAGAAAAgMAAAAAAAAAAAAAAAAAAAMCBAX/xAAWAQEBAQAAAAAAAAAAAAAAAAACAAH/2gAMAwEAAhADEAAAAVsXbjmEg7//xAAbEAACAgMBAAAAAAAAAAAAAAABAgADERIhMf/aAAgBAQABBQJSQ1/H2lftwOJ//8QAFBEBAAAAAAAAAAAAAAAAAAAAEP/aAAgBAwEBPwE//8QAFBEBAAAAAAAAAAAAAAAAAAAAEP/aAAgBAgEBPwE//8QAGRAAAwADAAAAAAAAAAAAAAAAABAxAREh/9oACAEBAAY/AsaJVScX/8QAGRAAAwEBAQAAAAAAAAAAAAAAAAERITFh/9oACAEBAAE/IfbGNG98aKQycIbMMQ//2gAMAwEAAgADAAAAEGff/8QAFBEBAAAAAAAAAAAAAAAAAAAAEP/aAAgBAwEBPxA//8QAFxEAAwEAAAAAAAAAAAAAAAAAAAEhUf/aAAgBAgEBPxBVEw//xAAaEAEBAQEBAQEAAAAAAAAAAAABEQAxQSGx/9oACAEBAAE/EGulBgVkHd5XuXIMxns4RN9Es2rIvv7q8hv/2Q==\'); background-size: cover; display: block;"\n  ></span>\n  <img\n        class="gatsby-resp-image-image"\n        alt="Hanakapi’ai Falls"\n        title="Hanakapi’ai Falls"\n        src="/static/e76cf22b0d9f68f6746e182ccea508bd/512c0/falls.jpg"\n        srcset="/static/e76cf22b0d9f68f6746e182ccea508bd/2334a/falls.jpg 169w,\n/static/e76cf22b0d9f68f6746e182ccea508bd/9c05e/falls.jpg 338w,\n/static/e76cf22b0d9f68f6746e182ccea508bd/512c0/falls.jpg 675w,\n/static/e76cf22b0d9f68f6746e182ccea508bd/a2510/falls.jpg 1000w"\n        sizes="(max-width: 675px) 100vw, 675px"\n        style="width:100%;height:100%;margin:0;vertical-align:middle;position:absolute;top:0;left:0;"\n        loading="lazy"\n        decoding="async"\n      />\n  </a>\n    </span>'}}),"\n",l.createElement(A.p,null,"For the past week and a half I’ve been trapped on an island among a team of brilliant hackers. A curious duality exists on the island. At sunrise, stand-up paddleboard yoga is followed naturally by a technical stand-up meeting. A group huddling around a laptop for hours may swiftly disband upon noticing big surf. This isn’t an idle vacation, nor is it daunting contract work. We’re nineteen people fervently working toward a noble goal in a stress-free mind amphitheater."),"\n",l.createElement(A.h2,{id:"trust-on-first-use",style:{position:"relative"}},l.createElement(A.a,{href:"#trust-on-first-use","aria-label":"trust on first use permalink",className:"anchor before"},l.createElement(A.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Trust on first use"),"\n",l.createElement(A.p,null,"Coming here was a leap of faith. Before leaving, friends and family were incredulous:"),"\n",l.createElement(A.blockquote,null,"\n",l.createElement(A.p,null,"So they’re going to fly you to Hawaii. And give you a surfboard. And teach you things. So that you can work on a project that you wanted to work on anyway?"),"\n"),"\n",l.createElement(A.p,null,"Though it sounded too good to be true, sparse details soon surfaced in our inboxes:"),"\n",l.createElement(A.blockquote,null,"\n",l.createElement(A.p,null,"This is your plane ticket. This is our house. This is who will pick you up."),"\n"),"\n",l.createElement(A.p,null,"We arrived in Hawaii with backpacks and a vague idea of what the next two weeks would hold. The uncertainty distilled a group of self-motivated people who ",l.createElement(A.em,null,"really")," wanted to pitch in. The lack of granular detail allowed us to fill in gaps and make the trip our own."),"\n",l.createElement(A.div,{dangerouslySetInnerHTML:{__html:'<span\n      class="gatsby-resp-image-wrapper"\n      style="position: relative; display: block; margin-left: auto; margin-right: auto; max-width: 675px; "\n    >\n      <a\n    class="gatsby-resp-image-link"\n    href="/static/e383a57eb32914e892a97d036001dd75/a2510/shave-ice.jpg"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n    <span\n    class="gatsby-resp-image-background-image"\n    style="padding-bottom: 75.14792899408283%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAAPABQDASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAwACBP/EABUBAQEAAAAAAAAAAAAAAAAAAAEC/9oADAMBAAIQAxAAAAE24DhW1S//xAAYEAEBAQEBAAAAAAAAAAAAAAACAQMAEf/aAAgBAQABBQIzFUYYvNAxU26GetZ3v//EABURAQEAAAAAAAAAAAAAAAAAABAR/9oACAEDAQE/AYf/xAAWEQEBAQAAAAAAAAAAAAAAAAAAERL/2gAIAQIBAT8BrT//xAAcEAADAAEFAAAAAAAAAAAAAAAAAREyAhIhMWH/2gAIAQEABj8Cj49N9GoOYj0dIyP/xAAbEAACAgMBAAAAAAAAAAAAAAAAARExIUFRYf/aAAgBAQABPyFvqKXhCIwffCB1pOCkXq0Pl92Bh1rh/9oADAMBAAIAAwAAABCQ/wD/xAAXEQEBAQEAAAAAAAAAAAAAAAABABFh/9oACAEDAQE/EFFnL//EABcRAAMBAAAAAAAAAAAAAAAAAAABEXH/2gAIAQIBAT8Qho0f/8QAHBABAQACAgMAAAAAAAAAAAAAAREAITFBUZHh/9oACAEBAAE/ELuOc4HOpdYjEKJerPGAGBFTeVaIaV0fH3gFkEc5g1NINrP/2Q==\'); background-size: cover; display: block;"\n  ></span>\n  <img\n        class="gatsby-resp-image-image"\n        alt="Kauai’s Best Shave Ice"\n        title="Kauai’s Best Shave Ice"\n        src="/static/e383a57eb32914e892a97d036001dd75/512c0/shave-ice.jpg"\n        srcset="/static/e383a57eb32914e892a97d036001dd75/2334a/shave-ice.jpg 169w,\n/static/e383a57eb32914e892a97d036001dd75/9c05e/shave-ice.jpg 338w,\n/static/e383a57eb32914e892a97d036001dd75/512c0/shave-ice.jpg 675w,\n/static/e383a57eb32914e892a97d036001dd75/a2510/shave-ice.jpg 1000w"\n        sizes="(max-width: 675px) 100vw, 675px"\n        style="width:100%;height:100%;margin:0;vertical-align:middle;position:absolute;top:0;left:0;"\n        loading="lazy"\n        decoding="async"\n      />\n  </a>\n    </span>'}}),"\n",l.createElement(A.h2,{id:"an-activist-an-anarchist-and-an-astrophysicist-walk-into-a-bar",style:{position:"relative"}},l.createElement(A.a,{href:"#an-activist-an-anarchist-and-an-astrophysicist-walk-into-a-bar","aria-label":"an activist an anarchist and an astrophysicist walk into a bar permalink",className:"anchor before"},l.createElement(A.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"An activist, an anarchist, and an astrophysicist walk into a bar…"),"\n",l.createElement(A.p,null,"One of the best parts of this trip has been the conversation. The group brings a wide range of perspectives, each passionate and thoughtful. While discussing the nebulous moral code of young countries over dinner, someone asked:"),"\n",l.createElement(A.blockquote,null,"\n",l.createElement(A.p,null,"Okay, but what does “free will” even mean?"),"\n"),"\n",l.createElement(A.p,null,"There was an outcry,"),"\n",l.createElement(A.blockquote,null,"\n",l.createElement(A.p,null,"“Woah, come on, don’t ask a question like that!”"),"\n"),"\n",l.createElement(A.p,null,"a pause, then:"),"\n",l.createElement(A.blockquote,null,"\n",l.createElement(A.p,null,"“we have to save ",l.createElement(A.em,null,"something")," to talk about tomorrow!”"),"\n"),"\n",l.createElement(A.p,null,"The most important part of an experience like this is having interesting people to share it with. On this trip, we’ve got ’em in spades."),"\n",l.createElement(A.h2,{id:"body-and-mind",style:{position:"relative"}},l.createElement(A.a,{href:"#body-and-mind","aria-label":"body and mind permalink",className:"anchor before"},l.createElement(A.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Body and mind"),"\n",l.createElement(A.p,null,"Since arriving I’ve restructured the browser extension’s event system and kayaked beside a family of sea-turtles. The day that I watched a rainstorm pass by while Lilia played ukulele was the same day that I allowed multiple conversation instances to open concurrently. If there was any uncertainty it’s long gone now, replaced by a fulfillment that stretches far beyond these two weeks."),"\n",l.createElement(A.div,{dangerouslySetInnerHTML:{__html:'<span\n      class="gatsby-resp-image-wrapper"\n      style="position: relative; display: block; margin-left: auto; margin-right: auto; max-width: 675px; "\n    >\n      <a\n    class="gatsby-resp-image-link"\n    href="/static/79de700a5af9f64f5b04c8178e9803e5/a2510/sunset.jpg"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n    <span\n    class="gatsby-resp-image-background-image"\n    style="padding-bottom: 75.14792899408283%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAAPABQDASIAAhEBAxEB/8QAGAAAAgMAAAAAAAAAAAAAAAAAAAUCBAb/xAAWAQEBAQAAAAAAAAAAAAAAAAACAQP/2gAMAwEAAhADEAAAAYNcjfzTMTCn/8QAGxAAAwACAwAAAAAAAAAAAAAAAAECBBIRExT/2gAIAQEAAQUCw9dLUofBN1J6nR3H/8QAFBEBAAAAAAAAAAAAAAAAAAAAEP/aAAgBAwEBPwE//8QAFhEAAwAAAAAAAAAAAAAAAAAAARAR/9oACAECAQE/AYV//8QAGxAAAQQDAAAAAAAAAAAAAAAAIQABEDERQWH/2gAIAQEABj8CO3xFoP1G4//EABoQAAIDAQEAAAAAAAAAAAAAAAABESExQYH/2gAIAQEAAT8hq3xIxoQ0sEDVDXo5odj/2gAMAwEAAgADAAAAEOvP/8QAFxEBAAMAAAAAAAAAAAAAAAAAAAERIf/aAAgBAwEBPxC4Y//EABYRAQEBAAAAAAAAAAAAAAAAAAEAEf/aAAgBAgEBPxBJ0sb/xAAdEAEAAwABBQAAAAAAAAAAAAABABExIUFRcdHx/9oACAEBAAE/EGbQpsavyOtl7T2NHUlE8MZRdnUyMp5n/9k=\'); background-size: cover; display: block;"\n  ></span>\n  <img\n        class="gatsby-resp-image-image"\n        alt="Sunset on Kalalau Trail"\n        title="Sunset on Kalalau Trail"\n        src="/static/79de700a5af9f64f5b04c8178e9803e5/512c0/sunset.jpg"\n        srcset="/static/79de700a5af9f64f5b04c8178e9803e5/2334a/sunset.jpg 169w,\n/static/79de700a5af9f64f5b04c8178e9803e5/9c05e/sunset.jpg 338w,\n/static/79de700a5af9f64f5b04c8178e9803e5/512c0/sunset.jpg 675w,\n/static/79de700a5af9f64f5b04c8178e9803e5/a2510/sunset.jpg 1000w"\n        sizes="(max-width: 675px) 100vw, 675px"\n        style="width:100%;height:100%;margin:0;vertical-align:middle;position:absolute;top:0;left:0;"\n        loading="lazy"\n        decoding="async"\n      />\n  </a>\n    </span>'}}))}var r=function(e){void 0===e&&(e={});var A=Object.assign({},(0,n.ah)(),e.components).wrapper;return A?l.createElement(A,e,l.createElement(s,e)):s(e)},o=a(9357),c=a(1883),d=["data"];function g(e){var A=e.data,a=(0,t.Z)(e,d);return l.createElement(o.Z,Object.assign({},a,{title:A.mdx.fields.title}))}function h(e){var A=e.data,a=e.children,t=A.mdx.fields;return l.createElement(l.Fragment,null,l.createElement("header",{className:"top-nav",role:"banner"},l.createElement("nav",{role:"navigation"},l.createElement("h1",null,l.createElement(c.Link,{to:"/"},"Riley Shaw"))," "," / ",l.createElement(c.Link,{to:"/blog"},"Blog")," / ",t.title)),l.createElement("main",null,l.createElement("article",{className:"blog-post-content",role:"article"},l.createElement("header",null,l.createElement("h1",null,t.title),l.createElement("div",{className:"subheading"},l.createElement("time",null,"Posted ",t.date))),l.createElement("div",{className:"blog-post-markdown"},a))))}function m(e){return l.createElement(h,e,l.createElement(r,e))}},3744:function(e,A,a){a.d(A,{B:function(){return l}});var t=a(7294),n={edit:{title:"Edit"},note:{title:"Note"},update:{title:"Update"}};A.Z=function(e){var A=e.children,a=e.date,l=e.type,i=void 0===l?"update":l;return t.createElement("div",{className:"blog-banner blog-banner-"+i},t.createElement("div",{className:"blog-banner-title"},n[i].title+(a?" "+a:"")+":"),t.createElement("div",{className:"blog-banner-content"},A))};var l=function(e){var A=e.children;return t.createElement("div",{className:"blog-banner-group"},A)}},9357:function(e,A,a){var t=a(1883),n=a(7294);A.Z=function(e){var A=e.description,a=void 0===A?"":A,l=e.title,i=e.children,s=(0,t.useStaticQuery)("3605882644").site,r=(l||s.siteMetadata.title)+" · "+s.siteMetadata.titlePostfix,o=(l?l+" · ":"")+s.siteMetadata.title,c=a||s.siteMetadata.description;return n.createElement(n.Fragment,null,n.createElement("title",null,r),n.createElement("meta",{name:"description",content:c}),n.createElement("meta",{name:"og:title",content:o}),n.createElement("meta",{name:"og:description",content:c}),n.createElement("meta",{name:"og:type",content:"website"}),n.createElement("meta",{name:"twitter:title",content:o}),n.createElement("meta",{name:"twitter:description",content:c}),n.createElement("meta",{name:"twitter:card",content:"summary"}),n.createElement("meta",{name:"twitter:creator",content:s.siteMetadata.author}),i)}}}]);
//# sourceMappingURL=component---src-templates-post-js-content-file-path-users-lamp-code-rileyjshaw-src-data-markdown-posts-published-2015-01-21-the-pool-on-the-roof-must-have-a-leak-mdx-c65bbed7aa8c466099b2.js.map