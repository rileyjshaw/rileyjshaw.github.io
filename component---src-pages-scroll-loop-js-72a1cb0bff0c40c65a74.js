(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{"6t7z":function(e,t,n){},C9fy:function(e,t,n){var r=Date.prototype,o=r.toString,i=r.getTime;new Date(NaN)+""!="Invalid Date"&&n("IYdN")(r,"toString",(function(){var e=i.call(this);return e==e?o.call(this):"Invalid Date"}))},EZQl:function(e,t,n){"use strict";n.r(t);n("YbXK"),n("cFtU");var r=n("q1tI"),o=n.n(r),i=n("ob4f"),a=(n("6t7z"),function(e){var t=e.page;return o.a.createElement("div",{className:"fullscreen plus"},o.a.createElement("p",null,"Page ",t))}),c=function(e){var t=e.children,n=e.onChange;return o.a.createElement(i.a,{threshold:.3,className:"fullscreen",onChange:function(e,t){t.isIntersecting&&t.boundingClientRect.y>0&&e&&n(e)}},t)},s=function(e){var t=e.page,n=e.onChange,i=Object(r.useState)(0),s=i[0],u=i[1],l=Object(r.useRef)(null);return Object(r.useLayoutEffect)((function(){u(l.current.clientHeight)})),o.a.createElement("div",{ref:l},o.a.createElement(a,{page:t}),o.a.createElement(c,{onChange:function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return n.apply(void 0,[s].concat(t))}},o.a.createElement("p",null,'"Quote ',t,'"')))};t.default=function(){var e=Object(r.useState)(1),t=e[0],n=e[1],i=Object(r.useState)([]),a=i[0];a[0],a[1],i[1];function c(e,t){n(t?function(e){return e+1}:function(e){return e-1})}return o.a.createElement("div",{className:"scroll-container"},Array.from({length:1e3},(function(e,n){return t+1>n&&o.a.createElement(s,{page:n+1+" / "+t,onChange:c,key:n})})))}},R48M:function(e,t,n){var r=n("P8UN");r(r.S+r.F*!n("QPJK"),"Object",{defineProperty:n("rjfK").f})},ob4f:function(e,t,n){"use strict";n.d(t,"a",(function(){return g})),n.d(t,"b",(function(){return b}));n("wZFJ"),n("JHok"),n("MIFh"),n("q8oJ"),n("C9fy"),n("YbXK"),n("xJgp"),n("sc67"),n("rzGZ"),n("Dq+y"),n("8npG"),n("Ggvi"),n("pS08"),n("E5k/"),n("R48M");var r=n("q1tI");var o=function(e,t){if(!e)throw new Error("Invariant failed")};function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(){return(a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function c(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}var s=new Map,u=new Map,l=new Map,h=0;function f(e,t,n){void 0===n&&(n={}),n.threshold||(n.threshold=0);var r=n,i=r.root,a=r.rootMargin,c=r.threshold;if(s.has(e)&&o(!1),e){var f=function(e){return e?l.has(e)?l.get(e):(h+=1,l.set(e,h.toString()),l.get(e)+"_"):""}(i)+(a?c.toString()+"_"+a:c.toString()),d=u.get(f);d||(d=new IntersectionObserver(p,n),f&&u.set(f,d));var g={callback:t,element:e,inView:!1,observerId:f,observer:d,thresholds:d.thresholds||(Array.isArray(c)?c:[c])};return s.set(e,g),d.observe(e),g}}function d(e){if(e){var t=s.get(e);if(t){var n=t.observerId,r=t.observer,o=r.root;r.unobserve(e);var i=!1,a=!1;n&&s.forEach((function(t,r){r!==e&&(t.observerId===n&&(i=!0,a=!0),t.observer.root===o&&(a=!0))})),!a&&o&&l.delete(o),r&&!i&&r.disconnect(),s.delete(e)}}}function p(e){e.forEach((function(e){var t=e.isIntersecting,n=e.intersectionRatio,r=e.target,o=s.get(r);if(o&&n>=0){var i=o.thresholds.some((function(e){return o.inView?n>e:n>=e}));void 0!==t&&(i=i&&t),o.inView=i,o.callback(i,e)}}))}var g=function(e){var t,n;function s(){for(var t,n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return i(c(t=e.call.apply(e,[this].concat(r))||this),"state",{inView:!1,entry:void 0}),i(c(t),"node",null),i(c(t),"handleNode",(function(e){t.node&&(d(t.node),e||t.props.triggerOnce||t.setState({inView:!1,entry:void 0})),t.node=e||null,t.observeNode()})),i(c(t),"handleChange",(function(e,n){(e!==t.state.inView||e)&&t.setState({inView:e,entry:n}),t.props.onChange&&t.props.onChange(e,n)})),t}n=e,(t=s).prototype=Object.create(n.prototype),t.prototype.constructor=t,t.__proto__=n;var u=s.prototype;return u.componentDidMount=function(){this.node||o(!1)},u.componentDidUpdate=function(e,t){e.rootMargin===this.props.rootMargin&&e.root===this.props.root&&e.threshold===this.props.threshold||(d(this.node),this.observeNode()),t.inView!==this.state.inView&&this.state.inView&&this.props.triggerOnce&&(d(this.node),this.node=null)},u.componentWillUnmount=function(){this.node&&(d(this.node),this.node=null)},u.observeNode=function(){if(this.node){var e=this.props,t=e.threshold,n=e.root,r=e.rootMargin;f(this.node,this.handleChange,{threshold:t,root:n,rootMargin:r})}},u.render=function(){var e=this.state,t=e.inView,n=e.entry;if(!function(e){return"function"!=typeof e.children}(this.props))return this.props.children({inView:t,entry:n,ref:this.handleNode});var o=this.props,i=o.children,c=o.as,s=o.tag,u=(o.triggerOnce,o.threshold,o.root,o.rootMargin,o.onChange,function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(o,["children","as","tag","triggerOnce","threshold","root","rootMargin","onChange"]));return Object(r.createElement)(c||s||"div",a({ref:this.handleNode},u),i)},s}(r.Component);i(g,"displayName","InView"),i(g,"defaultProps",{threshold:0,triggerOnce:!1});var v={inView:!1,entry:void 0};function b(e){void 0===e&&(e={});var t=Object(r.useRef)(),n=Object(r.useState)(v),o=n[0],i=n[1],a=Object(r.useCallback)((function(n){t.current&&d(t.current),n&&f(n,(function(t,r){i({inView:t,entry:r}),t&&e.triggerOnce&&d(n)}),e),t.current=n}),[e.threshold,e.root,e.rootMargin,e.triggerOnce]);return Object(r.useEffect)((function(){t.current||o===v||e.triggerOnce||i(v)})),[a,o.inView,o.entry]}}}]);
//# sourceMappingURL=component---src-pages-scroll-loop-js-72a1cb0bff0c40c65a74.js.map