(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{"A2+M":function(e,t,r){var n=r("X8hv");e.exports={MDXRenderer:n}},Bnag:function(e,t){e.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")},e.exports.default=e.exports,e.exports.__esModule=!0},EDuE:function(e,t,r){},EbDI:function(e,t){e.exports=function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)},e.exports.default=e.exports,e.exports.__esModule=!0},Ijbi:function(e,t,r){var n=r("WkPL");e.exports=function(e){if(Array.isArray(e))return n(e)},e.exports.default=e.exports,e.exports.__esModule=!0},RIqP:function(e,t,r){var n=r("Ijbi"),o=r("EbDI"),a=r("ZhPi"),l=r("Bnag");e.exports=function(e){return n(e)||o(e)||a(e)||l()},e.exports.default=e.exports,e.exports.__esModule=!0},RXBc:function(e,t,r){"use strict";r.r(t);var n=r("eVwc"),o=r("wGsi"),a=r("zeYD"),l=r("ZA8C"),c=r("S/o2"),s=r("DP1F"),u=r("bFmU"),i=r("7oJu"),p=r("WQGv"),f=r("A3bQ"),d=r("vrFN"),m=r("SWwi"),b=r("PjkB"),x=(r("EDuE"),r("Wbzz")),y=r("A2+M"),E=r("q1tI"),v=r.n(E),O=[{Doodle:s.a},...Object(b.b)([{Doodle:u.a,styles:{height:"max-content"}},{Doodle:i.a},{Doodle:p.a}])],j=function(e){var t=e.featuredProjects,r=void 0===t?[]:t,s=Object(x.useStaticQuery)("129162748").aboutIntro.childMdx.body,u=Object(E.useState)(0),i=u[0],p=u[1],m=O[i],b=m.Doodle,j=m.styles;return v.a.createElement(v.a.Fragment,null,v.a.createElement(d.a,null),v.a.createElement("main",{className:"main-content"},v.a.createElement("div",{className:"frontpage-grid"},v.a.createElement("div",{className:"frontpage-doodle",style:j},v.a.createElement(a.a,null,v.a.createElement(v.a.Fragment,null,v.a.createElement(b,null),v.a.createElement("button",{className:"new-doodle",onClick:function(){return p((function(e){return(e+1)%O.length}))}},v.a.createElement(n.a,null))))),v.a.createElement("div",{className:"about-stub"},v.a.createElement(y.MDXRenderer,{className:"about-md-wrapper"},s)," ",v.a.createElement(x.Link,{to:"/about",className:"about-link"},"More"," ",v.a.createElement(c.a,{className:"about-arrow",OuterElement:"span",ms:100},"➫➯➱➬–"))),v.a.createElement("div",{className:"main-projects-title"},v.a.createElement("h2",null,"Recent additions"),v.a.createElement(x.Link,{className:"lab-link",to:"/lab"},"(explore all)")),v.a.createElement("div",null,v.a.createElement(l.a,{nodes:r}),v.a.createElement("p",{className:"explore-more"},"Sort through hundreds of projects and posts in"," ",v.a.createElement(x.Link,{className:"lab-link",to:"/lab"},"the lab"),"."))),v.a.createElement(o.a,{quoteId:"SPUTTERED_AND_STOPPED"}),v.a.createElement(f.a,null)))};t.default=function(e){var t=Object(b.c)(Object(m.a)()).filter((function(e){var t;return(null!==(t=e.coolness)&&void 0!==t?t:100)>40})).slice(0,8);return v.a.createElement(j,Object.assign({},e,{featuredProjects:t}))}},X8hv:function(e,t,r){var n=r("sXyB"),o=r("RIqP"),a=r("lSNA"),l=r("8OQS");function c(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?c(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):c(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var u=r("q1tI"),i=r("7ljp").mdx,p=r("BfwJ").useMDXScope;e.exports=function(e){var t=e.scope,r=e.children,a=l(e,["scope","children"]),c=p(t),f=u.useMemo((function(){if(!r)return null;var e=s({React:u,mdx:i},c),t=Object.keys(e),a=t.map((function(t){return e[t]}));return n(Function,["_fn"].concat(o(t),[""+r])).apply(void 0,[{}].concat(o(a)))}),[r,t]);return u.createElement(f,s({},a))}},b48C:function(e,t){e.exports=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}},e.exports.default=e.exports,e.exports.__esModule=!0},lSNA:function(e,t){e.exports=function(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e},e.exports.default=e.exports,e.exports.__esModule=!0},sXyB:function(e,t,r){var n=r("SksO"),o=r("b48C");function a(t,r,l){return o()?(e.exports=a=Reflect.construct,e.exports.default=e.exports,e.exports.__esModule=!0):(e.exports=a=function(e,t,r){var o=[null];o.push.apply(o,t);var a=new(Function.bind.apply(e,o));return r&&n(a,r.prototype),a},e.exports.default=e.exports,e.exports.__esModule=!0),a.apply(null,arguments)}e.exports=a,e.exports.default=e.exports,e.exports.__esModule=!0}}]);
//# sourceMappingURL=component---src-pages-index-js-18c198683734aa107540.js.map