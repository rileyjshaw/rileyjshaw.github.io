"use strict";(self.webpackChunkrileyjshaw_com=self.webpackChunkrileyjshaw_com||[]).push([[788],{9567:function(e,n,a){a.r(n),a.d(n,{Head:function(){return u},default:function(){return m}});var t=a(3366),s=a(1151),o=a(7294);function l(e){var n=Object.assign({h2:"h2",a:"a",div:"div",p:"p",em:"em",code:"code",ol:"ol",li:"li",h3:"h3",ul:"ul"},(0,s.ah)(),e.components);return o.createElement(o.Fragment,null,o.createElement(n.h2,{id:"an-entirely-skippable-preface",style:{position:"relative"}},o.createElement(n.a,{href:"#an-entirely-skippable-preface","aria-label":"an entirely skippable preface permalink",className:"anchor before"},o.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"An entirely skippable preface"),"\n",o.createElement(n.p,null,o.createElement(n.em,null,"(Seriously, we don’t start building it until the ",o.createElement(n.a,{href:"#building-html-from-a-directory-of-assets"},"third section"),".)")),"\n",o.createElement(n.p,null,"While going through some of my dustier folders on a ",o.createElement(n.a,{href:"../the-pool-on-the-roof-must-have-a-leak/"},"flight to Hawaii")," I came across ",o.createElement("a",{href:"http://natureofcode.com/book/",rel:"noopener noreferrer",target:"_blank"},"The Nature of Code"),". It’s a lovely book with plenty of inspiration for simple demos; perfect plane material."),"\n",o.createElement(n.p,null,"After working through a few chapters, I moved my particle system and canvas logic into their own ",o.createElement(n.code,null,"util.js")," file. Until then i’d been creating a new HTML file for each demo, manually adding the title, script includes, and next/previous links. This meant that I had to edit each file to include ",o.createElement(n.code,null,"util.js"),". It was a frustrating amount of overhead considering each demo only took a few minutes to write."),"\n",o.createElement(n.h2,{id:"didnt-someone-solve-this-problem-30-years-ago",style:{position:"relative"}},o.createElement(n.a,{href:"#didnt-someone-solve-this-problem-30-years-ago","aria-label":"didnt someone solve this problem 30 years ago permalink",className:"anchor before"},o.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"didn’t someone solve this problem 30 years ago?"),"\n",o.createElement(n.p,null,"Yes they did, snarky title, but most templating engines I’ve used make you hook up dependencies ",o.createElement("a",{href:"http://en.wikipedia.org/wiki/Imperative_programming",rel:"noopener noreferrer",target:"_blank"},"imperatively"),". This works great for files like ",o.createElement(n.code,null,"util.js"),", because you know it should be included on every page. But I wanted a static HTML page generated automatically for each ",o.createElement(n.code,null,"demo.js")," I churned out; if I had to write a corresponding ",o.createElement(n.code,null,"demo.jade")," file each time, i’d be back to where I started. To solve this problem ",o.createElement("a",{href:"http://en.wikipedia.org/wiki/Declarative_programming",rel:"noopener noreferrer",target:"_blank"},"properly"),", I needed to step a bit beyond what templating could offer."),"\n",o.createElement(n.p,null,"Being on a plane, I wasn’t able to check out ",o.createElement("a",{href:"http://www.metalsmith.io/",rel:"noopener noreferrer",target:"_blank"},"Metalsmith")," or any of the other non-bloggy static site generators[^1]. I was already using ",o.createElement("a",{href:"http://gulpjs.com/",rel:"noopener noreferrer",target:"_blank"},"Gulp")," to lint my code, so I added a ",o.createElement(n.code,null,"build")," task and got to work."),"\n",o.createElement(n.h2,{id:"building-html-from-a-directory-of-assets",style:{position:"relative"}},o.createElement(n.a,{href:"#building-html-from-a-directory-of-assets","aria-label":"building html from a directory of assets permalink",className:"anchor before"},o.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Building HTML from a directory of assets"),"\n",o.createElement(n.p,null,"We have two requirements for our site generator:"),"\n",o.createElement(n.ol,null,"\n",o.createElement(n.li,null,"Read a list of demo scripts from our ",o.createElement(n.code,null,"demos")," directory, and"),"\n",o.createElement(n.li,null,"Generate a unique HTML page for each demo. The page must include the proper assets, and next/previous links to other demos."),"\n"),"\n",o.createElement(n.p,null,"While reading this, keep in mind that ",o.createElement(n.em,null,"you can do this for any type of file"),". The same method can be used to monitor a Dropbox folder full of photos, or an archive of .csv files."),"\n",o.createElement(n.p,null,"Gulp is a task runner that lets you automate some of the more mundane parts of your workflow. If you’ve never used it, you might want to go through a ",o.createElement("a",{href:"http://markgoodyear.com/2014/01/getting-started-with-gulp/",rel:"noopener noreferrer",target:"_blank"},"quick tutorial")," before continuing."),"\n",o.createElement(n.h3,{id:"step-1-standardize-your-filenames",style:{position:"relative"}},o.createElement(n.a,{href:"#step-1-standardize-your-filenames","aria-label":"step 1 standardize your filenames permalink",className:"anchor before"},o.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Step 1: Standardize your filenames"),"\n",o.createElement(n.p,null,"For the sake of simplicity, we’ll base our output’s structure on the demos’ filenames[^2]. I opted for ",o.createElement(n.code,null,"chapterNum.demoNum_demoName"),"[^3], but anything that can be sorted is fine."),"\n",o.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<span\n      class="gatsby-resp-image-wrapper"\n      style="position: relative; display: block; margin-left: auto; margin-right: auto; max-width: 675px; "\n    >\n      <a\n    class="gatsby-resp-image-link"\n    href="/static/97710d1ce7b7687c5cfdb882a97b1047/7a3d6/standardized-filenames.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n    <span\n    class="gatsby-resp-image-background-image"\n    style="padding-bottom: 15.384615384615385%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAADCAYAAACTWi8uAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAyUlEQVQI1yWOu1LCQABFU/jAB2hBlIS4jjoWWGPEpCBssruQDLuBFMxYUDj8/y8cJ2txmnvnzrmBMJp3q/jYGSa6Q7gTUXMkND+E6kDcHBHtiSf7+99VjlGmuc0Ud7lhlGuuFxUXqeQylQRx6XhcWRK1Z1pZolXNfa4YpAUPRU0sG5+FyzXDhWTwJRlmmqlyCN0SlVtuvivO5oUnSJTjZdPxVndEpeWqt31Kb01Uy/N6jzA7/6jPz+eFf9VvZvbA66bzTOSW8bLmD5j+Yg6ZMXDtAAAAAElFTkSuQmCC\'); background-size: cover; display: block;"\n  ></span>\n  <img\n        class="gatsby-resp-image-image"\n        alt="Standardized filenames"\n        title="Standardized filenames"\n        src="/static/97710d1ce7b7687c5cfdb882a97b1047/23296/standardized-filenames.png"\n        srcset="/static/97710d1ce7b7687c5cfdb882a97b1047/d23e3/standardized-filenames.png 169w,\n/static/97710d1ce7b7687c5cfdb882a97b1047/2b41d/standardized-filenames.png 338w,\n/static/97710d1ce7b7687c5cfdb882a97b1047/23296/standardized-filenames.png 675w,\n/static/97710d1ce7b7687c5cfdb882a97b1047/7a3d6/standardized-filenames.png 990w"\n        sizes="(max-width: 675px) 100vw, 675px"\n        style="width:100%;height:100%;margin:0;vertical-align:middle;position:absolute;top:0;left:0;"\n        loading="lazy"\n        decoding="async"\n      />\n  </a>\n    </span>'}}),"\n",o.createElement(n.h3,{id:"step-2-read-the-files-into-gulp",style:{position:"relative"}},o.createElement(n.a,{href:"#step-2-read-the-files-into-gulp","aria-label":"step 2 read the files into gulp permalink",className:"anchor before"},o.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Step 2: Read the files into Gulp"),"\n",o.createElement(n.p,null,"To get a list of demos into Gulp, I used a module called ",o.createElement("a",{href:"https://www.npmjs.com/package/glob",rel:"noopener noreferrer",target:"_blank"},"glob"),"[^4]."),"\n",o.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="javascript"><pre class="language-javascript"><code class="language-javascript"><span class="token keyword">var</span> glob <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'glob\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">var</span> gulp <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'gulp\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">var</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'path\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\ngulp<span class="token punctuation">.</span><span class="token function">task</span><span class="token punctuation">(</span><span class="token string">\'build\'</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> <span class="token function">glob</span><span class="token punctuation">(</span><span class="token string">\'../path/to/demos/\'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span> files</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token comment">// …</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre></div>'}}),"\n",o.createElement(n.p,null,"We now have a list of filenames in ",o.createElement(n.code,null,"files"),". That’s all we need, thanks to our trusty ",o.createElement(n.a,{href:"#step-1-standardize-your-filenames"},"semantic filenames"),"."),"\n",o.createElement(n.h3,{id:"step-3-sort-and-sanitize-the-files",style:{position:"relative"}},o.createElement(n.a,{href:"#step-3-sort-and-sanitize-the-files","aria-label":"step 3 sort and sanitize the files permalink",className:"anchor before"},o.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Step 3: Sort and sanitize the files"),"\n",o.createElement(n.p,null,"Within our callback for ",o.createElement(n.code,null,"glob"),", we can rename and rearrange our files based on whatever rules we want. I chose to sort the files in reverse order, so the newest demos would be shown first. After sorting the files, I stripped off their numbers, leaving me with a sorted fileName array."),"\n",o.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="javascript"><pre class="language-javascript"><code class="language-javascript"><span class="token comment">// …</span>\n<span class="token comment">// (within glob’s callback argument)</span>\n\n<span class="token comment">// get the basename from our files</span>\nfiles <span class="token operator">=</span> files<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">name</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n\t<span class="token keyword">return</span> path<span class="token punctuation">.</span><span class="token function">basename</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> <span class="token string">\'.js\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token comment">// sort the files in reverse order</span>\nfiles<span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n\t<span class="token keyword">return</span> <span class="token function">parseFloat</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span> <span class="token operator">&lt;</span> <span class="token function">parseFloat</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token comment">// remove the numbers once we’re in sorted order</span>\nfiles <span class="token operator">=</span> files<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">name</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n\t<span class="token keyword">return</span> name<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span>name<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span><span class="token string">\'_\'</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre></div>'}}),"\n",o.createElement(n.p,null,"Our last step in ",o.createElement(n.code,null,"glob"),"’s callback is to send each file to a ",o.createElement(n.code,null,"buildHTML()")," function. This is where the magic happens."),"\n",o.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="javascript"><pre class="language-javascript"><code class="language-javascript">files<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">demoName<span class="token punctuation">,</span> i</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n\t<span class="token comment">// files[i + 1] and [i - 1] will only be truthy if they exist</span>\n\t<span class="token keyword">return</span> <span class="token function">buildHTML</span><span class="token punctuation">(</span>demoName<span class="token punctuation">,</span> i<span class="token punctuation">,</span> files<span class="token punctuation">[</span>i <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span> files<span class="token punctuation">[</span>i <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre></div>'}}),"\n",o.createElement(n.p,null,"In addition to sending a demo’s name and index to ",o.createElement(n.code,null,"buildHTML()"),", I also sent its next/previous neighbors. This allows for simple linking between pages."),"\n",o.createElement(n.h3,{id:"step-4-make-a-template",style:{position:"relative"}},o.createElement(n.a,{href:"#step-4-make-a-template","aria-label":"step 4 make a template permalink",className:"anchor before"},o.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Step 4: Make a template"),"\n",o.createElement(n.p,null,"Now that we have all the metadata we need, we can start using templates. Here are the simple ",o.createElement("a",{href:"http://jade-lang.com/",rel:"noopener noreferrer",target:"_blank"},"jade"),"[^5] files I used:"),"\n",o.createElement(n.p,null,o.createElement(n.code,null,"default.jade"),":"),"\n",o.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="markup"><pre class="language-markup"><code class="language-markup">doctype html\nhtml(lang="en")\n  head\n    block title\n    link(href="styles.css" rel="stylesheet" type="text/css")\n    //- favicon, etc.\n  block body</code></pre></div>'}}),"\n",o.createElement(n.p,null,o.createElement(n.code,null,"demo.jade"),":"),"\n",o.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="markup"><pre class="language-markup"><code class="language-markup">extends ./default.jade\n\nblock title\n  title "Demo #{i}: #{demoName.charAt(0).toUpperCase() + demoName.slice(1)} | Nature of Code"\n\nblock body\n  body.demo\n    if prev!==null\n      a.prev(href="#{prev}.html") Prev\n    if next!==null\n      a.next(href="#{next}.html") Next\n    script(src="util.js")\n    script(src="demos/#{demoName}.js")</code></pre></div>'}}),"\n",o.createElement(n.p,null,"With variables passed in from Gulp, we can automatically set the title, pull in the correct script, and set our next/previous links."),"\n",o.createElement(n.h3,{id:"step-5-build-your-files",style:{position:"relative"}},o.createElement(n.a,{href:"#step-5-build-your-files","aria-label":"step 5 build your files permalink",className:"anchor before"},o.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Step 5: Build your files"),"\n",o.createElement(n.p,null,"Finally, we send our data from Gulp into the ",o.createElement(n.code,null,"demo.jade")," template:"),"\n",o.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="javascript"><pre class="language-javascript"><code class="language-javascript"><span class="token keyword">var</span> jade <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'gulp-jade\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">var</span> rename <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'gulp-rename\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">function</span> <span class="token function">buildHTML</span><span class="token punctuation">(</span><span class="token parameter">demoName<span class="token punctuation">,</span> i<span class="token punctuation">,</span> next<span class="token punctuation">,</span> prev</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n\tgulp<span class="token punctuation">.</span><span class="token function">src</span><span class="token punctuation">(</span><span class="token string">\'../path/to/demo.jade\'</span><span class="token punctuation">)</span>\n\t\t<span class="token punctuation">.</span><span class="token function">pipe</span><span class="token punctuation">(</span>\n\t\t\t<span class="token function">jade</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n\t\t\t\t<span class="token literal-property property">locals</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n\t\t\t\t\t<span class="token literal-property property">demoName</span><span class="token operator">:</span> demoName<span class="token punctuation">,</span>\n\t\t\t\t\t<span class="token literal-property property">i</span><span class="token operator">:</span> i<span class="token punctuation">,</span>\n\t\t\t\t\t<span class="token literal-property property">next</span><span class="token operator">:</span> next <span class="token operator">?</span> i <span class="token operator">+</span> <span class="token number">1</span> <span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>\n\t\t\t\t\t<span class="token literal-property property">prev</span><span class="token operator">:</span> prev <span class="token operator">?</span> i <span class="token operator">-</span> <span class="token number">1</span> <span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>\n\t\t\t\t<span class="token punctuation">}</span><span class="token punctuation">,</span>\n\t\t\t<span class="token punctuation">}</span><span class="token punctuation">)</span>\n\t\t<span class="token punctuation">)</span>\n\t\t<span class="token punctuation">.</span><span class="token function">pipe</span><span class="token punctuation">(</span>gulp <span class="token operator">-</span> <span class="token function">rename</span><span class="token punctuation">(</span>i <span class="token operator">+</span> <span class="token string">\'.html\'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n\t\t<span class="token punctuation">.</span><span class="token function">pipe</span><span class="token punctuation">(</span>gulp<span class="token punctuation">.</span><span class="token function">dest</span><span class="token punctuation">(</span><span class="token string">\'../path/to/dist/\'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span></code></pre></div>'}}),"\n",o.createElement(n.p,null,"I decided to name pages ",o.createElement(n.code,null,"1.html"),", ",o.createElement(n.code,null,"2.html"),", etc. so that they’d be easy to jump to using the navigation bar. More expressive names could easily be swapped in."),"\n",o.createElement(n.h2,{id:"next-steps",style:{position:"relative"}},o.createElement(n.a,{href:"#next-steps","aria-label":"next steps permalink",className:"anchor before"},o.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Next steps"),"\n",o.createElement(n.p,null,"There are still some goodies that we can throw into our task runner[^6], but I’ll leave the rest as an exercise for the reader. A working project with all the bells and whistles can be found at my ",o.createElement("a",{href:"https://github.com/rileyjshaw/nature-of-code",rel:"noopener noreferrer",target:"_blank"},"Nature of Code repo"),". Its generated site is live ",o.createElement("a",{href:"http://rileyjshaw.com/nature-of-code/",rel:"noopener noreferrer",target:"_blank"},"here"),"."),"\n",o.createElement(n.h2,{id:"references",style:{position:"relative"}},o.createElement(n.a,{href:"#references","aria-label":"references permalink",className:"anchor before"},o.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"References"),"\n",o.createElement(n.ul,null,"\n",o.createElement(n.li,null,"\n",o.createElement("a",{href:"https://github.com/rileyjshaw/nature-of-code/",rel:"noopener noreferrer",target:"_blank"},"GitHub repository"),"\n"),"\n",o.createElement(n.li,null,"\n",o.createElement("a",{href:"http://rileyjshaw.com/nature-of-code/",rel:"noopener noreferrer",target:"_blank"},"Live demo"),"\n"),"\n"),"\n",o.createElement(n.h2,{id:"footnotes",style:{position:"relative"}},o.createElement(n.a,{href:"#footnotes","aria-label":"footnotes permalink",className:"anchor before"},o.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Footnotes"),"\n",o.createElement(n.p,null,"[^1]: If you’re looking to make something more complicated than simple linked pages, ",o.createElement("a",{href:"https://www.staticgen.com/",rel:"noopener noreferrer",target:"_blank"},"go here"),".\n[^2]: Doing this felt yucky initially, but I came to really like having a strict naming convention. Opening the demos directory and having your app’s structure immediately apparent is very handy.\n[^3]: One of my biggest concerns with this: once i’d written demos ",o.createElement(n.code,null,"1.5"),", ",o.createElement(n.code,null,"1.6"),", and ",o.createElement(n.code,null,"1.7"),", how could I add anything between ",o.createElement(n.code,null,"1.5")," and ",o.createElement(n.code,null,"1.6")," without renaming a whole cascade of files? This turned out to not be a concern. Since we’re just using the numbers for sorting in Gulp, ",o.createElement(n.code,null,"1.51")," is perfectly valid for an input. We can name the output ",o.createElement(n.code,null,"1.6")," and shift the rest accordingly.\n[^4]: There are about as many ways to get a list of filenames in Node as there are Node modules. Glob is a simple option, but anything will do.\n[^5]: Likewise, there is no magical reason to use jade over anything else so feel free to use your preferred templating language. I chose jade mainly because it was already installed on my computer and I had no internet connection.\n[^6]: Most importantly, ",o.createElement("a",{href:"https://github.com/rileyjshaw/nature-of-code/blob/0d70ea473eca2267d5c8413c3a7f2bd8e79b806b/gulpfile.js#L87",rel:"noopener noreferrer",target:"_blank"},"transferring static assets into the ",o.createElement(n.code,null,"dist")," folder")," and ",o.createElement("a",{href:"https://github.com/rileyjshaw/nature-of-code/blob/0d70ea473eca2267d5c8413c3a7f2bd8e79b806b/gulpfile.js#L98",rel:"noopener noreferrer",target:"_blank"},"watching files for changes"),"."))}var r=function(e){void 0===e&&(e={});var n=Object.assign({},(0,s.ah)(),e.components).wrapper;return n?o.createElement(n,e,o.createElement(l,e)):l(e)},p=a(9357),c=a(1883),i=["data"];function u(e){var n=e.data,a=(0,t.Z)(e,i);return o.createElement(p.Z,Object.assign({},a,{title:n.mdx.fields.title}))}function d(e){var n=e.data,a=e.children,t=n.mdx.fields;return o.createElement(o.Fragment,null,o.createElement("header",{className:"top-nav",role:"banner"},o.createElement("nav",{role:"navigation"},o.createElement("h1",null,o.createElement(c.Link,{to:"/"},"Riley Shaw"))," "," / ",o.createElement(c.Link,{to:"/blog"},"Blog")," / ",t.title)),o.createElement("main",null,o.createElement("article",{className:"blog-post-content",role:"article"},o.createElement("header",null,o.createElement("h1",null,t.title),o.createElement("div",{className:"subheading"},o.createElement("time",null,"Posted ",t.date))),o.createElement("div",{className:"blog-post-markdown"},a))))}function m(e){return o.createElement(d,e,o.createElement(r,e))}},9357:function(e,n,a){var t=a(1883),s=a(7294);n.Z=function(e){var n=e.description,a=void 0===n?"":n,o=e.title,l=e.children,r=(0,t.useStaticQuery)("3605882644").site,p=(o||r.siteMetadata.title)+" · "+r.siteMetadata.titlePostfix,c=(o?o+" · ":"")+r.siteMetadata.title,i=a||r.siteMetadata.description;return s.createElement(s.Fragment,null,s.createElement("title",null,p),s.createElement("meta",{name:"description",content:i}),s.createElement("meta",{name:"og:title",content:c}),s.createElement("meta",{name:"og:description",content:i}),s.createElement("meta",{name:"og:type",content:"website"}),s.createElement("meta",{name:"twitter:title",content:c}),s.createElement("meta",{name:"twitter:description",content:i}),s.createElement("meta",{name:"twitter:card",content:"summary"}),s.createElement("meta",{name:"twitter:creator",content:r.siteMetadata.author}),l)}}}]);
//# sourceMappingURL=component---src-templates-post-js-content-file-path-users-lamp-code-rileyjshaw-src-data-markdown-posts-published-2015-03-05-how-to-generate-a-static-site-from-a-folder-of-assets-using-gulp-md-bc09b2883b9a53f33148.js.map