(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{Hnid:function(e,t,n){},QFMt:function(e,t,n){"use strict";n.r(t);var a=n("wGsi"),r=n("A3bQ"),l=n("SWwi"),c=n("FQNO"),o=n("XWfr"),s=n("cVmz"),u=n("PjkB"),i=n("ZA8C"),d=n("S/o2"),m=n("DP1F"),f=n("bFmU"),b=(n("xp8V"),n("1N+T")),E=n("q1tI"),p=n.n(E),g=[[p.a.forwardRef((function(e,t){return p.a.createElement(m.a,Object.assign({El:"li",ref:t},e))})),.8],[p.a.forwardRef((function(e,t){return p.a.createElement(f.a,Object.assign({El:"li",ref:t},e))})),1],[p.a.forwardRef((function(e,t){return p.a.createElement("li",{className:"doodle wavytext",ref:t},"rileyjshaw".split("").map((function(e,t,n){var a=n.length;return p.a.createElement("span",{key:t,style:{animationDelay:.2*(t-a)+"s"}},e)})))})),.2],[p.a.forwardRef((function(e,t){return p.a.createElement(b.a,Object.assign({size:[3,3],classPrefix:"doingreat",className:"content-node doodle",OuterElement:"li"},e,{ref:t}),"DOINGREAT")})),.1],[p.a.forwardRef((function(e,t){return p.a.createElement(d.a,Object.assign({classPrefix:"wavebump",className:"content-node doodle",ms:50,OuterElement:"li"},e,{ref:t}),"▁▂▃▅▆▇▇▆▅▃▂▁")})),.3],[p.a.forwardRef((function(e,t){return p.a.createElement(d.a,Object.assign({classPrefix:"droplet",className:"content-node doodle",ms:150,OuterElement:"li"},e,{ref:t}),"⊙⊚⦾⊛")})),.2],[p.a.forwardRef((function(e,t){return p.a.createElement(d.a,Object.assign({classPrefix:"circles",className:"content-node doodle",ms:100,size:[2,2],OuterElement:"li"},e,{ref:t}),"◯⦿◉◎")})),.2],[p.a.forwardRef((function(e,t){return p.a.createElement("li",Object.assign({className:"content-node snowman doodle"},e,{ref:t}),"☃")})),.3,function(){var e=(new Date).getMonth();return e<4||11===e}],[p.a.forwardRef((function(e,t){return p.a.createElement(d.a,Object.assign({classPrefix:"wavebump",className:"content-node tall doodle",ms:400,OuterElement:"li"},e,{ref:t}),"Secret message!")})),.05,function(){var e=new Date;return 11===e.getMonth()&&25===e.getDate()}]].map((function(e){var t=e[0],n=e[1],a=e[2];return[t,a?function(){return a()||Math.random()<n}:function(){return Math.random()<n}]})),h=(n("Hnid"),n("Wbzz")),v=p.a.memo((function(e){var t=Object(E.useMemo)((function(){var t=Array.from(new Set(e.nodes.map((function(e){return e.type})))).sort((function(e,t){return e.localeCompare(t)}));return[t,""+t.join("")+u.a.length]}),[e.nodes]),n=t[0],a=t[1],r=Object(E.useState)(!1),l=r[0],i=r[1],d=Object(s.g)(!1,c.d.labAscending,{version:a}),m=d[0],f=d[1],b=Object(s.g)(0,c.d.labSortIdx,{version:a}),g=b[0],h=b[1],v=Object(s.g)((function(){return Array.from(n).fill(!0)}),c.d.labTypeStates,{version:a}),y=v[0],j=v[1],w=y.reduce((function(e,t){return e+t}))||y.length,N=Object(E.useMemo)((function(){var t=u.a[g].sortFn,a=n.filter((function(e,t){return y[t]})),r=(a.length?e.nodes.filter((function(e){return a.includes(e.type)})):e.nodes).reduce((function(e,t){return e["doodle"===t.type?0:1].push(t),e}),[[],[]]),l=r[0],c=t(r[1]),o=m?c.reverse():c;return l.filter((function(e){return e.shouldRender()})).forEach((function(e){o.splice(Math.floor(Math.random()*o.length),0,e)})),o}),[m,g,y,e.nodes]);return p.a.createElement("div",{className:"project-explorer"},p.a.createElement("button",{className:"project-explorer-hide-filters",onClick:function(){return i((function(e){return!e}))}},l?"Hide filters ▲":"Show filters ▼"),p.a.createElement("div",{className:"filters"},l&&p.a.createElement("div",{className:"controls"},p.a.createElement("p",{className:"legend"},"Show:"),p.a.createElement("div",{className:"inputs"},n.map((function(e,t){return p.a.createElement(E.Fragment,{key:e},p.a.createElement("input",{type:"checkbox",name:"labs-types-"+e,id:"labs-types-"+e,value:e,checked:y[t],onChange:function(e){var n=e.target.checked;j((function(e){var a=[...e];return a[t]=n,a}))}}),p.a.createElement("label",{htmlFor:"labs-types-"+e},o.a[e].readableType,"s"))}))),p.a.createElement("button",{className:"labs-clear labs-clear-types",onClick:function(){return j(new Array(n.length).fill(!1))}},"✖"),p.a.createElement("p",{className:"legend"},"Sort by:"),p.a.createElement("div",{className:"inputs"},u.a.map((function(e,t){var n=e.title;return p.a.createElement(E.Fragment,{key:n},p.a.createElement("input",{type:"radio",name:"labs-sort-"+n,id:"labs-sort-"+n,value:n,checked:g===t,onChange:function(){return h(t)}}),p.a.createElement("label",{htmlFor:"labs-sort-"+n},n.toUpperCase().slice(0,1)+n.slice(1)))}))),p.a.createElement("p",{className:"legend"},"Order:"),p.a.createElement("div",{className:"inputs"},p.a.createElement("input",{type:"checkbox",name:"labs-order",id:"labs-order",value:"ascending",checked:m,onChange:function(e){return f(e.target.checked)}}),p.a.createElement("label",{htmlFor:"labs-order"},"Reverse")))),p.a.createElement("p",{className:"result-details"},"Found ",p.a.createElement("strong",null,N.length)," entries from"," ",p.a.createElement("strong",null,w)," source",1===w?"":"s",":"),p.a.createElement(O,{nodes:N,setIsFullyLoaded:e.setIsFullyLoaded}))})),O=p.a.memo((function(e){var t,n=e.nodes,a=e.setIsFullyLoaded,r=Object(E.useState)(20),l=r[0],c=r[1],o=Object(s.b)(),u=o[0],d=o[1],m=o[2];return Object(E.useEffect)((function(){var e,t;(d||(null!==(e=null==m||null===(t=m.boundingClientRect)||void 0===t?void 0:t.bottom)&&void 0!==e?e:1)<=0)&&l<n.length&&c((function(e){return e+20}))}),[d,null==m||null===(t=m.boundingClientRect)||void 0===t?void 0:t.bottom]),Object(E.useEffect)((function(){c(20)}),[n]),Object(E.useEffect)((function(){a&&a(l>=n.length)}),[n.length,l]),p.a.createElement(i.a,{masonry:!0,nodes:n.slice(0,l),ref:u})})),y=p.a.memo((function(e){var t=Object(h.useStaticQuery)("1390350656").allTagsJson.nodes,n=Object(l.a)(),a=Object(E.useMemo)((function(){return n.concat(g.map((function(e,t){return{uid:"DOODLE_"+t,type:"doodle",Doodle:e[0],shouldRender:e[1]}})))}),[n]);return p.a.createElement(v,Object.assign({nodes:a,tags:t},e))})),j=n("vrFN");t.default=function(){var e=Object(E.useState)(!1),t=e[0],n=e[1];return p.a.createElement(p.a.Fragment,null,p.a.createElement(j.a,{title:"Lab"}),p.a.createElement(y,{setIsFullyLoaded:n}),t&&p.a.createElement(p.a.Fragment,null,p.a.createElement(a.a,{quoteId:"VOLTAIRE_BORING"}),p.a.createElement(r.a,null)))}},xp8V:function(e,t,n){}}]);
//# sourceMappingURL=component---src-pages-lab-js-40473ab37a71ee8ea2f2.js.map