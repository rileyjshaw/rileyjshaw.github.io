"use strict";(self.webpackChunkrileyjshaw_com=self.webpackChunkrileyjshaw_com||[]).push([[354],{826:function(e,t,n){var r=n(4160),a=n(7294),l=n(7252),o=n(8800),c=n(9577);t.Z=function(e){let{quoteId:t}=e;const{allCombinedQuotesJson:{nodes:n}}=(0,r.useStaticQuery)("279051069"),{current:i}=(0,a.useRef)((0,o.TV)(n)),{current:s}=(0,a.useRef)(Math.max(0,i.findIndex((e=>{let{uid:n}=e;return n===t})))),{0:m,1:u}=(0,a.useState)(0),h=i[(s+m)%n.length];return a.createElement("div",{className:"big-quote",id:"big-quote"},a.createElement(c.Z,{quote:h}),a.createElement("div",{className:"big-quote-controls"},a.createElement("div",{className:"big-quote-control-container refresh"},a.createElement("a",{href:"#big-quote","aria-label":"Load new quote",onClick:()=>u((e=>e+1))},a.createElement(l.wA,null))),m>2&&a.createElement("div",{className:"big-quote-control-container browse"},a.createElement(r.Link,{to:"/quotes","aria-label":"Browse all quotes"},a.createElement(l.aV,null)))))}},8913:function(e,t,n){var r=n(7294),a=n(6907),l=n(8395);const o=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];const r=t.filter(Boolean);return r.length?1===r.length?r[0]:e=>{r.forEach((t=>{"function"==typeof t?t(e):t.current=e}))}:null};t.Z=r.forwardRef(((e,t)=>{let{children:n,ms:c=300,size:i=[1,1],classPrefix:s="cycle-text",className:m="",OuterElement:u="div",...h}=e;const[d,p]=i,E=d*p,{0:f,1:g}=(0,r.useState)(0),[w,b]=(0,a.Sj)();return(0,a.Yz)((()=>g(f+1)),b?c:null),1===E?r.createElement(u,Object.assign({ref:o(t,w),className:`${m} ${s}-item`},h),n[f%n.length]):r.createElement(l.Z,Object.assign({size:i,classPrefix:s,className:m,ref:o(t,w),OuterElement:u},h),Array.from({length:E},((e,t)=>n[Math.floor(f/Math.pow(n.length,t))%n.length])).join(""))}))},2140:function(e,t,n){var r=n(7294),a=n(8913);t.Z=()=>r.createElement("div",{className:"go-up"},r.createElement(a.Z,{ms:150,OuterElement:"span",onClick:()=>{window.scrollTo(0,0);document.getElementById("page-header").focus({preventScroll:!0})}},"➫➯➱➬–"))},9577:function(e,t,n){var r=n(7294),a=n(4513);t.Z=function(e){let{quote:t}=e;const{content:n,cite:l}=t;let{source:o,author:c}=t;o?(o=r.createElement(r.Fragment,null,"“",r.createElement("cite",null,o),"”"),l&&(o=r.createElement(a.ZP,{to:l},o)),c&&(o=r.createElement(r.Fragment,null,"– ",c,", ",o))):c&&(l&&(c=r.createElement(a.ZP,{to:l},c)),o=r.createElement(r.Fragment,null,"– ",c));const i=n.split("\n");return r.createElement("blockquote",{cite:l,className:"site-quote"},i.map(((e,t)=>r.createElement("p",{key:t},e))),o&&r.createElement("footer",null,o))}},8395:function(e,t,n){var r=n(7294);t.Z=r.forwardRef(((e,t)=>{let{children:n,size:[a,l],classPrefix:o="text-grid",className:c="",OuterElement:i="div",...s}=e;return r.createElement(i,Object.assign({className:`${c} ${o}-grid`,style:{display:"grid",gridTemplate:`repeat(${l}, 1fr) / repeat(${a}, 1fr)`}},s,{ref:t}),n.split("").map(((e,t)=>r.createElement("span",{className:`${o}-item`,key:`${n}-${t}`},e))))}))},7823:function(e,t,n){var r=n(7294),a=n(4513);const l=["toymaker","toolmaker","noisemaker","code gardener","code breaker","patcher","circuitbender","mender","mentee","mentor","plant eater","fixer","remixer","drummer"];t.Z=function(){return r.createElement("p",null,"I am a programmer, interface designer, and ",l[2],". Rooted in repair and craft, I strive to create transparent, remixable digital tools for a sustainable and accessible future. I do my best work on projects that combine high-performance engineering with ambitious design. I’m currently building climate software at"," ",r.createElement(a.ZP,{to:"https://watershed.com/"},"Watershed"),". I also run a studio called"," ",r.createElement(a.ZP,{to:"https://misery.co"},"Misery & Co."))}},6169:function(e,t,n){n.r(t),n.d(t,{Head:function(){return P},default:function(){return I}});var r=n(7294),a=n(4513),l=n(826),o=n(2140),c=n(9389),i=n(7823);var s=function(){return r.createElement(r.Fragment,null,r.createElement("p",null,"Throughout my career, I have developed software tools for education and live collaboration, with my work gaining recognition on platforms like NPR, CBC, HuffPost, and Canadian Business. Beyond software, I also enjoy the tangible creativity of hardware design."),r.createElement("p",null,"A commitment to mentorship and community has been a guiding force for me. I am a proud graduate of the"," ",r.createElement(a.ZP,{to:"https://www.recurse.com/scout/click?t=4bdcd56dfdb6c80c7832262c0bb8007b"},"Recurse Center")," ","and the"," ",r.createElement(a.ZP,{to:"http://sfpc.io/"},"School for Poetic Computation"),". I have a Bachelor of Science in Electrical Engineering, with a focus on human-computer interaction. I have the dubious honor of being recognized as one of Canada’s 30 Under 30 developers."),r.createElement("p",null,"If you care to follow along, please"," ",r.createElement(a.ZP,{to:"/subscribe"},"subscribe to my website"),"."))};function m(e){let{at:t,role:n,children:a,isCurrent:l}=e;return r.createElement("li",{className:l?"current":""},r.createElement("h3",null,t,n&&r.createElement(r.Fragment,null," ",r.createElement("span",{className:"job-title"},n))),a)}function u(){return r.createElement(m,{at:"Canada Learning Code"},r.createElement("p",null,"I spent years as a volunteer mentor and instructor with"," ",r.createElement(a.ZP,{to:"https://www.canadalearningcode.ca/"},"Canada Learning Code"),". I mostly worked within these branches:"),r.createElement("ul",null,r.createElement("li",null,r.createElement(a.ZP,{to:"https://www.canadalearningcode.ca/experiences/?program=girls_learning_code"},"Girls Learning Code")),r.createElement("li",null,r.createElement(a.ZP,{to:"https://www.canadalearningcode.ca/experiences/?program=ladies_learning_code"},"Ladies Learning Code")),r.createElement("li",null,r.createElement(a.ZP,{to:"https://www.canadalearningcode.ca/experiences/?program=teachers_learning_code"},"Teachers Learning Code"))),r.createElement("p",null,"Curriculum content ranged from teaching girls how to make video games to helping teachers learn more about digital privacy."))}function h(){return r.createElement(m,{at:"Developer 30 Under 30"},r.createElement("p",null,"I won this award in early 2017."," ",r.createElement(a.ZP,{to:"/blog/D30U30"},"I wrote about it here.")))}function d(){return r.createElement(m,{at:"Khan Academy"},r.createElement("p",null,"I spent three years on the Engineering team at"," ",r.createElement(a.ZP,{to:"https://khanacademy.org"},"Khan Academy"),". Here are some highlights:"),r.createElement("ul",null,r.createElement("li",null,"I rewrote the video page and player, reducing load time by over 100%."),r.createElement("li",null,"I created and led KA’s first optimization team."),r.createElement("li",null,"I"," ",r.createElement(a.ZP,{to:"https://youtu.be/RxKZOhS72Cw"},"built this interface")," ","as the sole developer on LearnStorm 2017"," ",r.createElement(a.ZP,{to:"https://youtu.be/gIvD4OYCbbA"},"🎉"),"."),r.createElement("li",null,"I led our formal mentorship program."),r.createElement("li",null,"Over 3 years, I deleted more lines of code than I added.")),r.createElement("p",null,"For most of my time at Khan Academy I worked remotely from Toronto, Canada. I’m honored to have worked with such brilliant and passionate folks."))}function p(){a.ZP,a.ZP}function E(){return r.createElement(m,{at:"Mischief Makers",isCurrent:!0},r.createElement("p",null,"I volunteer at"," ",r.createElement(a.ZP,{to:"https://mischiefmakers.ca/"},"Mischief Makers"),", a creative space for kids in Toronto."))}function f(){return r.createElement(m,{at:"Misery & Co.",role:"Founder",isCurrent:!0},r.createElement("p",null,r.createElement(a.ZP,{to:"https://misery.co"},"Misery & Co.")," is a development studio specializing in novel mixed-media projects. I founded the studio in 2018."))}function g(){return r.createElement(m,{at:"Mozilla",role:"Staff Software Engineer"},r.createElement("p",null,"I worked at"," ",r.createElement(a.ZP,{to:"https://www.mozilla.org"},"Mozilla")," on the Open Innovation team, supporting"," ",r.createElement(a.ZP,{to:"https://commonvoice.mozilla.org"},"Common Voice"),". Common Voice is a landmark consent-driven dataset for human speech of all types, spanning over 60 languages. Common Voice is an open, inclusive, and privacy-conscious standard for a technology that is rapidly becoming ubiquitous. Here are some highlights of my time there:"),r.createElement("ul",null,r.createElement("li",null,"I joined as the team’s sole engineer, one month before a major partnership project was due. The project was estimated for three months but we somehow released on time."),r.createElement("li",null,"I then helped oversee and implement a major infrastructure migration for one of the largest open source voice datasets."),r.createElement("li",null,"I enabled recording on mobile browsers, opening the contribution process to many more people."),r.createElement("li",null,"ISSIP Excellence In Service Innovation Award."),r.createElement("li",null,"Fast Company Innovation By Design Award Finalist.")))}function w(){return r.createElement(m,{at:"Recurse Center",isCurrent:!0},r.createElement("p",null,"I attended"," ",r.createElement(a.ZP,{to:"https://www.recurse.com/scout/click?t=4bdcd56dfdb6c80c7832262c0bb8007b"},"RC")," ","in early 2014. While there, I worked on:"),r.createElement("ul",null,r.createElement("li",null,r.createElement(a.ZP,{to:"https://rileyjshaw.com/blog/hue-angle-transitions"},"A better way to transition colors")," ","(adopted by"," ",r.createElement(a.ZP,{to:"https://www.framer.com/"},"Framer"),")"),r.createElement("li",null,r.createElement(a.ZP,{to:"https://rileyjshaw.com/terra"},"A biological simulations and cellular automata library")),r.createElement("li",null,r.createElement(a.ZP,{to:"http://ushld.rileyjshaw.com"},"Fun")," ",r.createElement(a.ZP,{to:"https://github.com/rileyjshaw/own-this-website"},"goofy")," ",r.createElement(a.ZP,{to:"https://github.com/rileyjshaw/boxes"},"web")," ",r.createElement(a.ZP,{to:"https://github.com/rileyjshaw/filesupply"},"apps")),r.createElement("li",null,r.createElement(a.ZP,{to:"https://github.com/neerajwahi/pairjam"},"A real-time collaborative coding environment")),r.createElement("li",null,r.createElement(a.ZP,{to:"https://github.com/adventure-db/adventure"},"A tiny graph database engine written in C")),r.createElement("li",null,r.createElement(a.ZP,{to:"https://github.com/ben-eath/the-surf-ace"},"A Ludum Dare entry that used phone gyroscopes as controllers")),r.createElement("li",null,r.createElement(a.ZP,{to:"https://v2.rileyjshaw.com/"},"A personal website")),r.createElement("li",null,"Learning a bit of Haskell (of course)."),r.createElement("li",null,"Making friends.")),r.createElement("p",null,"My favorite projects were the spontaneous collaborations that happened each day, most of which aren’t listed here. I had a wonderful time."),r.createElement("p",null,"In 2021 I helped build RC’s virtual space,"," ",r.createElement(a.ZP,{to:"https://www.rctogether.com/"},"RC Together"),". I am also part of the interviewer team for Recurse Center."," ",r.createElement(a.ZP,{to:"https://www.recurse.com/scout/click?t=4bdcd56dfdb6c80c7832262c0bb8007b"},"Care to apply?")))}function b(){return r.createElement(m,{at:"Repair Matters"},r.createElement("p",null,"I used to volunteer with"," ",r.createElement(a.ZP,{to:"https://repairmatters.ca"},"Repair Matters"),", a Vancouver-based initiative that empowers people to take part in repair and fix their stuff. I was"," ",r.createElement(a.ZP,{to:"/blog/repair-matters-on-cbc-radio"},"interviewed by the CBC")," ","for the work we did together."))}function y(){return r.createElement(m,{at:"School for Poetic Computation"},r.createElement("p",null,"I attended the"," ",r.createElement(a.ZP,{to:"https://sfpc.io"},"School for Poetic Computation")," ","in early 2018, where I"," ",r.createElement(a.ZP,{to:"https://sfpc.rileyjshaw.com/"},"kept a blog"),". My goal was to focus on:"),r.createElement("ul",null,r.createElement("li",null,"Education and the reinforcement of class structures."),r.createElement("li",null,"Deletion, permanence, and consistency."),r.createElement("li",null,"Repurposing corporate tools."),r.createElement("li",null,"Making friends."),r.createElement("li",null,r.createElement(a.ZP,{to:"https://sfpc.rileyjshaw.com/post/172372422682/making-nothing"},"Making nothing"),".")),r.createElement("p",null,r.createElement(a.ZP,{to:"https://sfpc.rileyjshaw.com/post/182905537092/final-showcase-project-depression"},"My final project")," ","was about depression, which was a surprise for me. Here’s a link to"," ",r.createElement(a.ZP,{to:"https://sfpc.rileyjshaw.com/post/171435065582/my-school-for-poetic-computation-application"},"my application for the program"),". I learned a lot about art and about myself. I’m grateful for the experience."))}function v(){return r.createElement(m,{at:"Signal Desktop"},r.createElement("p",null,"Duing the"," ",r.createElement(a.ZP,{to:"/blog/the-pool-on-the-roof-must-have-a-leak"},"Winter Break of Code"),", I pitched in on"," ",r.createElement(a.ZP,{to:"https://signal.org/"},"Signal’s desktop app"),". Spending the morning on an important OSS project and the afternoon in the ocean was pretty close to perfect."))}function Z(){return r.createElement(m,{at:"Watershed",role:"Software Engineer",isCurrent:!0},r.createElement("p",null,"I’m currently developing reporting tools to help companies understand and reduce their carbon emissions."," ",r.createElement(a.ZP,{to:"https://watershed.com/"},"Watershed’s")," ","mission is to accelerate the climate economy, and our 2030 goal is to work with our customers to reduce or remove 500 megatonnes of CO2 equivalent—approximately 1% of annual global emissions."))}function P(e){return r.createElement(c.Z,Object.assign({},e,{title:"About"}))}var I=function(){return r.createElement("main",null,r.createElement("div",{className:"page-content"},r.createElement("div",{className:"prose prose-lg"},r.createElement(i.Z,null),r.createElement(s,null),r.createElement("h2",null,"Where I’ve been"),r.createElement("ul",{className:"timeline"},r.createElement(Z,null),r.createElement(f,null),r.createElement(E,null),r.createElement(g,null),r.createElement(b,null),r.createElement(y,null),r.createElement(d,null),r.createElement(u,null),r.createElement(h,null),r.createElement(v,null),r.createElement(w,null),r.createElement(p,null)),r.createElement("hr",null),r.createElement("p",null,"For a full history of my employment, please see my"," ",r.createElement(a.ZP,{to:"https://www.linkedin.com/in/rileyjshaw/"},"LinkedIn"),"."),r.createElement("h2",null,"About this website"),r.createElement("p",null,"This website aggregates content that I’ve littered across the Internet; think of it like a digital landfill. I wrote a"," ",r.createElement(a.ZP,{to:"https://rileyjshaw.commit--blog.com/rileyjshaw/rileyjshaw-new/2488bcd5e5610f692773e7815fabdb247ece55f5"},"small utility to scrape the web")," ","which runs daily. I structured my website this way to regain ownership of the collection and presentaton of my data."),r.createElement("p",null,"If you like the idea of website-as-API, I have"," ",r.createElement(a.ZP,{to:"/subscribe"},"specific feeds")," ","that you can subscribe to."),r.createElement("p",null,"To respect your privacy, this site does not, and will never, track usage data. Most website owners do not share this proclivity. To reclaim some privacy, check out"," ",r.createElement(a.ZP,{to:"https://www.eff.org/privacybadger"},"Privacy Badger")," ","and"," ",r.createElement(a.ZP,{to:"https://deletionday.com/"},"Deletion Day"),". This site is free software under the"," ",r.createElement(a.ZP,{to:"https://github.com/rileyjshaw/rileyjshaw.github.io/blob/dev/COPYING"},"GNU GPLv3 license")," ","and follows the"," ",r.createElement(a.ZP,{to:"https://www.contributor-covenant.org/"},"Contributor Covenant"),"."))),r.createElement(l.Z,{quoteId:"DANCES_GAMES_AND_FEASTS"}),r.createElement(o.Z,null))}},8800:function(e,t,n){function r(e){const t=[...e];for(let n=t.length-1;n>0;--n){let e=Math.floor(Math.random()*(n+1));[t[n],t[e]]=[t[e],t[n]]}return t}function a(e){return[...e].sort(((e,t)=>t.date.localeCompare(e.date)))}n.d(t,{TV:function(){return r},df:function(){return a}}),t.ZP=[{title:"date",sortFn:a},{title:"name",sortFn:function(e){return[...e].sort(((e,t)=>e.title.localeCompare(t.title)))}},{title:"coolness",sortFn:function(e){return[...e].sort(((e,t)=>{let{coolness:n=-1}=e,{coolness:r=-1}=t;return r-n}))}}]}}]);
//# sourceMappingURL=component---src-pages-about-jsx-d16119dd14bf612f8cb9.js.map