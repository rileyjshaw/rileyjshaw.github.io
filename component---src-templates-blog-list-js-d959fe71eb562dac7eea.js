(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{"32qT":function(e,t,a){},"68np":function(e,t,a){},eWDE:function(e,t,a){"use strict";a.r(t);var n=a("9Wcq"),l=(a("32qT"),a("vrFN")),r=(a("68np"),a("hBEi"),a("Wbzz")),i=a("q1tI"),o=a.n(i),c=function(e){return"/blog"+(1===e?"":"/"+e)};t.default=function(e){var t=e.data,a=e.pageContext,i=a.currentPage,s=a.numPages,m=[...t.allMdx.edges.map((function(e){return e.node})),...t.allCombinedProjectsJson.nodes].sort((function(e,t){return new Date(t.date||t.fields.date)-new Date(e.date||e.fields.date)})),u=1===i,d=i===s,p=!u&&c(i-1),E=!d&&c(i+1),g=Array.from({length:s},(function(e,t){return t+1})).splice(Math.min(Math.max(0,i-3),s-5),5).map((function(e){return o.a.createElement(r.Link,{key:e,to:c(e),className:e===i?"current-page":""},e)}));return o.a.createElement(o.a.Fragment,null,o.a.createElement(l.a,{title:"All posts"}),o.a.createElement("main",{className:"blog-list"},o.a.createElement("ul",{className:"blog-posts"},m.map((function(e){var t,a,l,r,i=e.uid||(null===(t=e.fields)||void 0===t?void 0:t.uid),c=e.title||(null===(a=e.fields)||void 0===a?void 0:a.title),s=e.link||(null===(l=e.fields)||void 0===l?void 0:l.slug),m=e.date||(null===(r=e.fields)||void 0===r?void 0:r.date),u=e.repo;return o.a.createElement("li",{className:"blog-post content-node",key:i},o.a.createElement("article",{className:"blog-post-content"},o.a.createElement("header",null,o.a.createElement("h1",null,o.a.createElement(n.c,{to:s},c)),o.a.createElement("div",{className:"subheading"},o.a.createElement("time",{dateTime:m},m.replace(/-/g,".")),u&&o.a.createElement(o.a.Fragment,null," ","• From repository"," ",o.a.createElement(n.a,{to:"https://github.com/"+u},u)))),o.a.createElement("section",{className:e.more?"excerpt":null,dangerouslySetInnerHTML:{__html:e.description}}),e.more&&o.a.createElement("p",{className:"continue-reading"},o.a.createElement(n.c,{to:s},"Continue reading"))))}))),o.a.createElement("div",{className:"page-navigation"},!u&&o.a.createElement(r.Link,{to:p,rel:"prev"},"⬅︎"),g,!d&&o.a.createElement(r.Link,{to:E,rel:"next"},"➡︎"))))}},hBEi:function(e,t,a){}}]);
//# sourceMappingURL=component---src-templates-blog-list-js-d959fe71eb562dac7eea.js.map