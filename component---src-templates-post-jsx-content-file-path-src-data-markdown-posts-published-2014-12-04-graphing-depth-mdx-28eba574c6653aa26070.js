"use strict";(self.webpackChunkrileyjshaw_com=self.webpackChunkrileyjshaw_com||[]).push([[987],{6232:function(e,t,n){n.r(t),n.d(t,{Head:function(){return s},default:function(){return u}});var a=n(1151),l=n(7294),r=n(7462);function i(e){const t=Object.assign({p:"p",em:"em",a:"a",blockquote:"blockquote",h2:"h2",span:"span",sup:"sup",ol:"ol",li:"li",pre:"pre",code:"code",ul:"ul",img:"img",h3:"h3",section:"section"},(0,a.a)(),e.components);return l.createElement(l.Fragment,null,l.createElement(t.p,null,"There’s something magical about a procedure that just works. Even if you don’t understand ",l.createElement(t.em,null,"why")," it works, having a set of steps that will always get you to the same destination feels nice. In life there are few patterns that consistently produce the same outcome. But in math? Hoo boy…"),"\n",l.createElement(t.p,null,"This post takes us through two ",l.createElement(t.em,null,"very")," simple procedures that converge to a numerical endpoint. We’re going to graph the amount of time it takes to reach this endpoint, which actually ends up being quite pretty."),"\n",l.createElement(t.p,null,"Careful; such routines can be somewhat of a rabbit hole. As ",l.createElement(t.a,{href:"http://xkcd.com/710/"},"xkcd"),"’s Randall Munroe puts it,"),"\n",l.createElement(t.blockquote,null,"\n",l.createElement(t.p,null,"The Collatz Conjecture states that if you pick a number, and if it’s even divide it by two and if it’s odd multiply it by three and add one, and if you repeat this procedure long enough, eventually your friends will stop calling to see if you want to hang out."),"\n"),"\n",l.createElement(t.h2,{id:"6174",style:{position:"relative"}},l.createElement(t.a,{href:"#6174","aria-label":"6174 permalink",className:"anchor before"},l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"6174,"),"\n",l.createElement(t.p,null,"or Kaprekar’s Constant, is the endpoint of one such procedure. If we run any",l.createElement(t.sup,null,l.createElement(t.a,{href:"#user-content-fn-1",id:"user-content-fnref-1","data-footnote-ref":!0,"aria-describedby":"footnote-label"},"1"))," four-digit number through the following steps:"),"\n",l.createElement(t.ol,null,"\n",l.createElement(t.li,null,"arrange the digits in descending and then in ascending order to get two four-digit numbers, adding leading zeros if necessary"),"\n",l.createElement(t.li,null,"subtract the smaller number from the bigger number"),"\n",l.createElement(t.li,null,"repeat"),"\n"),"\n",l.createElement(t.p,null,"We’ll reach 6174 in at most 7 iterations."),"\n",l.createElement(t.p,null,"Let’s go through a quick example using 1989",l.createElement(t.sup,null,l.createElement(t.a,{href:"#user-content-fn-2",id:"user-content-fnref-2","data-footnote-ref":!0,"aria-describedby":"footnote-label"},"2")),", which breaks into 9981 and 1899:"),"\n",l.createElement(t.ol,null,"\n",l.createElement(t.li,null,"9981 - 1899 = 8082"),"\n",l.createElement(t.li,null,"8820 - 0288 = 8532"),"\n",l.createElement(t.li,null,"8532 - 2358 = 6174 (yay!)"),"\n"),"\n",l.createElement(t.p,null,"Let’s call the number of iterations it takes an input to reach 6174 its ",l.createElement(t.em,null,"depth"),".",l.createElement(t.sup,null,l.createElement(t.a,{href:"#user-content-fn-3",id:"user-content-fnref-3","data-footnote-ref":!0,"aria-describedby":"footnote-label"},"3"))," Here’s a quick program to return the Kaprekar depth of a 4-digit number:"),"\n",l.createElement(t.pre,null,l.createElement(t.code,{className:"language-javascript"},"function kaprekar(num) {\n\tfunction step(cur, depth) {\n\t\t// return the depth if our current number is 6174 (or 0 for repdigits)\n\t\tif (cur === 6174 || !cur) return depth;\n\n\t\t// otherwise, split the current number into an array\n\t\t// of digits and sort it in ascending order\n\t\tvar lo = String(cur).split('').sort();\n\n\t\t// make a new array of the numbers in descending order\n\t\tvar hi = lo.slice().reverse();\n\n\t\t// turn the arrays back into integers\n\t\tlo = +lo.join('');\n\t\thi = +hi.join('');\n\n\t\t// recursively call the function on the difference, adding 1 to depth\n\t\treturn step(hi - lo, depth + 1);\n\t}\n\n\t// initialize the first step with a depth of 0\n\treturn step(num, 0);\n}\n")),"\n",l.createElement(t.p,null,"Running ",l.createElement("code",{className:"language-javascript"},"kaprekar(1989)")," returns ",l.createElement("code",{className:"language-javascript"},"3"),". Success!"),"\n",l.createElement(t.h2,{id:"more-digits",style:{position:"relative"}},l.createElement(t.a,{href:"#more-digits","aria-label":"more digits permalink",className:"anchor before"},l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"More digits"),"\n",l.createElement(t.p,null,"If we’re dealing with one digit we can set the fixed point at 0. Cool. What about two digits?"),"\n",l.createElement(t.ul,null,"\n",l.createElement(t.li,null,"63 - 36 = 27"),"\n",l.createElement(t.li,null,"72 - 27 = 45"),"\n",l.createElement(t.li,null,"54 - 45 = 09"),"\n",l.createElement(t.li,null,"90 - 09 = 81"),"\n",l.createElement(t.li,null,"81 - 18 = 63"),"\n",l.createElement(t.li,null,"63 - 36 = uh oh…"),"\n"),"\n",l.createElement(t.p,null,"It looks like we’ve found our way into a loop. Going off our original definition, the Kaprekar depth at 63 would be infinity."),"\n",l.createElement(t.p,null,"Since Kaprekar’s routine is deterministic, as soon as we run into a number we’ve already seen we’re stuck in the same loop of numbers. We don’t get any new information at this point, so let’s redefine depth to mean ",l.createElement(t.em,null,"the amount of steps it takes until a number we’ve seen before reemerges"),". This still works for fixed-point convergence, since 6174 “reemerges” on the next step."),"\n",l.createElement(t.p,null,"Using this new definition, the depth of 63 is 5. Let’s update our code:"),"\n",l.createElement(t.pre,null,l.createElement(t.code,{className:"language-javascript"},"function kaprekar(num) {\n\tfunction step(cur, prev, depth) {\n\t\t// return the depth - 1 if we’ve come across this number before\n\t\tif (prev[cur]) return depth - 1;\n\t\t// otherwise, log that we’ve now seen the current number\n\t\telse prev[cur] = true;\n\n\t\t// find the ascending and descending parts as we did before\n\t\t// …\n\n\t\t// and take it one level deeper\n\t\treturn step(hi - lo, prev, depth + 1);\n\t}\n\n\t// initialization for the first step\n\treturn step(num, {}, 0);\n}\n")),"\n",l.createElement(t.p,null,"Great! This function should work with fixed point and fixed series (loop) stopping conditions. Running ",l.createElement("code",{className:"language-javascript"},"kaprekar(63)")," now returns ",l.createElement("code",{className:"language-javascript"},"5"),"; before, it would’ve tried to crash your browser."),"\n",l.createElement(t.h2,{id:"the-fun-part",style:{position:"relative"}},l.createElement(t.a,{href:"#the-fun-part","aria-label":"the fun part permalink",className:"anchor before"},l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"The fun part"),"\n",l.createElement(t.p,null,"Now that we have a function to determine the Kaprekar depth",l.createElement(t.sup,null,l.createElement(t.a,{href:"#user-content-fn-4",id:"user-content-fnref-4","data-footnote-ref":!0,"aria-describedby":"footnote-label"},"4"))," of an arbitrary number; let’s visualize it! We’ll first need to write a drawing function that starts at 0 and moves left-to-right, top-to-bottom until it reaches the bottom-right corner. The code looks like this:"),"\n",l.createElement(t.pre,null,l.createElement(t.code,{className:"language-javascript"},"function draw(rows, cols, fn) {\n\tfor (var y = 0; y < rows; y++) {\n\t\tfor (var x = 0; x < cols; x++) {\n\t\t\tdrawPixel(fn(x + y * cols), x, y);\n\t\t}\n\t}\n}\n")),"\n",l.createElement(t.p,null,"Calling this function with the arguments,"),"\n",l.createElement(t.pre,null,l.createElement(t.code,{className:"language-javascript"},"draw(kaprekar, 1000, 1000);\n")),"\n",l.createElement(t.p,null,"results in a plot of total cycle depth for the Kaprekar Routine for the range [0, 1M). Each pixel represents an integer, with 0 in the top left corner and 999999 in the bottom right. Dark pixels represent a high depth at that number; the max depth for this range is shockingly low at 19."),"\n",l.createElement(r.Z,{caption:l.createElement(l.Fragment,null,"Kaprekar Routine Depths: [0, 1M). ",l.createElement(t.a,{href:"http://codepen.io/rileyjshaw/pen/hipBu",rel:"noopener noreferrer",target:"_blank"},"View code"))},l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span\n      class="gatsby-resp-image-wrapper"\n      style="position: relative; display: block; margin-left: auto; margin-right: auto; max-width: 675px; "\n    >\n      <a\n    class="gatsby-resp-image-link"\n    href="/static/04fd888649cc5bd023243415c089ba23/00d43/kaprekar.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n    <span\n    class="gatsby-resp-image-background-image"\n    style="padding-bottom: 100%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB0UlEQVR42m1UWXbDIAzkROZ+jYOxwUmv0cTZmrZXpBbSIMXtB08I42E0Wpz/vBb/vJVqv+/FPy7Ff93Y4hyL/C+sO9ufB++f12qdv5yKP38Uf1sY5HYu/r7ur2c+o++0yIdd5P5yUrvwPdcNqXTjXKqdDqXbT2yHzOdRLC06x0rH0uX39Zz8I39fz1wXEv9kLX20lsCH/LonULofhUzkx11lRAe7kW3z4wowKUg/sQ8QsoiuRpQEEKEh5AogwNEwIzB7F0yThFuZEmA/GWaZmdG+MhKf9vhOd/EoNAbbFdQ1raBL2PzYjwxmNQ6qWbOSLM6yZQj/LTIYAEhj8hFqS1JSaVhDm+VZLyLMII9R6DVR4ldZRhPuaveJspxeDxEiwABkwXuT/TirHAMBGroquAmLHtiZ0MknOSAN3UGpVUBUvhUYr9pEIMRggMKmq0JlOGu40dRZ2DDoRceQVV/yLcP13DUdpBc1XFNOtmOiAQhJu2REYbf+PWj67WAIwm4wNQgNbZuK7xq7VvnCtHUAtDXt2awdDlkYYqKgBonpuNEV4e3/adMhabIqQ5TCYMZVNOMLusX8ks0/d6W0nI6l2YylrGMp2jmYWjY1u1mLPqTyC+sGdfWP0AbIAAAAAElFTkSuQmCC\'); background-size: cover; display: block;"\n  ></span>\n  <img\n        class="gatsby-resp-image-image"\n        alt="Total cycle depth for the Kaprekar Routine in the range [0, 1M)"\n        title=""\n        src="/static/04fd888649cc5bd023243415c089ba23/23296/kaprekar.png"\n        srcset="/static/04fd888649cc5bd023243415c089ba23/d23e3/kaprekar.png 169w,\n/static/04fd888649cc5bd023243415c089ba23/2b41d/kaprekar.png 338w,\n/static/04fd888649cc5bd023243415c089ba23/23296/kaprekar.png 675w,\n/static/04fd888649cc5bd023243415c089ba23/00d43/kaprekar.png 1000w"\n        sizes="(max-width: 675px) 100vw, 675px"\n        style="width:100%;height:100%;margin:0;vertical-align:middle;position:absolute;top:0;left:0;"\n        loading="lazy"\n        decoding="async"\n      />\n  </a>\n    </span>'}})),"\n",l.createElement(t.p,null,"The ",l.createElement(t.a,{href:"http://codepen.io/rileyjshaw/pen/hipBu"},l.createElement(t.em,null,"View code")," link")," above uses the same code as our example with a bit of color logic tacked on, and a drawing loop that only computes 1% at a time to make sure your browser doesn’t freeze."),"\n",l.createElement(t.p,null,"Since numbers with fewer digits reach their stopping condition sooner, a light band is observable at the top of the image. Since any two numbers composed of the same digits run through the same steps, a few axes of symmetry can be observed."),"\n",l.createElement(t.h2,{id:"enter-ulam",style:{position:"relative"}},l.createElement(t.a,{href:"#enter-ulam","aria-label":"enter ulam permalink",className:"anchor before"},l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Enter Ulam"),"\n",l.createElement(t.p,null,"Mathmetician Stanislaw Ulam made an interesting discovery while doodling during the presentation of a “long and very boring paper”. He started by writing the natural numbers in a rectangular spiral with 1 in the center:"),"\n",l.createElement(r.Z,{caption:"Ulam Spiral: [1, 50)"},l.createElement(t.img,{src:"/816d22eb35a3e8759b49cf4fa3c637ad/ulam-howto-1.svg",alt:"Ulam Spiral"})),"\n",l.createElement(t.p,null,"In our Kaprekar graph we decided that the drawing function should move from top-left to bottom-right. Let’s see if we can make a drawing function that starts in the center and moves outwards in an Ulam spiral",l.createElement(t.sup,null,l.createElement(t.a,{href:"#user-content-fn-5",id:"user-content-fnref-5","data-footnote-ref":!0,"aria-describedby":"footnote-label"},"5")),":"),"\n",l.createElement(t.pre,null,l.createElement(t.code,{className:"language-javascript"},"function drawUlam(maxVal, fn) {\n\tvar directions = [\n\t\t{x: 1, y: 0}, // 0: right\n\t\t{x: 0, y: -1}, // 1: up\n\t\t{x: -1, y: 0}, // 2: left\n\t\t{x: 0, y: 1}, // 3: down\n\t];\n\tvar center = Math.ceil(Math.sqrt(maxVal) / 2); // center point of the grid\n\tvar run = 1; // current spiral arm length\n\tvar redirect = 3; // next number that the spiral changes direction at\n\tvar direction = 0; // current direction\n\tvar position = {\n\t\tx: center - 1, // offset x by -1; we move right before drawing\n\t\ty: center,\n\t};\n\n\tfor (var i = 1; i < maxVal; i++) {\n\t\tif (i === redirect) {\n\t\t\tdirection = (direction + 1) % 4;\n\t\t\t// run increases when switching left or right\n\t\t\tif (direction % 2 === 0) run++;\n\t\t\tredirect += run;\n\t\t}\n\t\tposition.x += directions[direction].x;\n\t\tposition.y += directions[direction].y;\n\t\tdrawPixel(fn(i), position.x, position.y);\n\t}\n}\n")),"\n",l.createElement(t.p,null,"By replacing the drawing function in our Kaprekar depth example with ",l.createElement("code",{className:"language-javascript"},"drawUlam()")," we get the following graph for the range [0, 998k):"),"\n",l.createElement(r.Z,{caption:l.createElement(l.Fragment,null,"Ulam Spiral of Kaprekar Routine depths: [0, 998k). ",l.createElement(t.a,{href:"http://codepen.io/rileyjshaw/pen/gixuE",rel:"noopener noreferrer",target:"_blank"},"View code"))},l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span\n      class="gatsby-resp-image-wrapper"\n      style="position: relative; display: block; margin-left: auto; margin-right: auto; max-width: 675px; "\n    >\n      <a\n    class="gatsby-resp-image-link"\n    href="/static/8ec66740ba96fa736339a1fd1b24b9c2/20c85/kaprekar-ulam.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n    <span\n    class="gatsby-resp-image-background-image"\n    style="padding-bottom: 100%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAACCklEQVR42o1US1IcMQydEyF3H4l2TyVwhZmkiqywPSxgkmuEwAY4VTazgEq1kWTJlmdmkYXK/ZGf3nuSvYIp/gUf/7k5vYNPH/iMET5gCvL8v5F4zwrWuwOCZefjwut6l3mdY8ZEfKdn/OaTfLdBuXeyUk7MK0Q+AP5EpgsyyyViCwKm/wTuzbOsYAqAAirDCjabRJ8K0HSmWI1AhAzg+k4ApfKRLH0Hw8QJWC2qDC98PJBvyGABK8mnngUyJF+dlVvzgwArYGGx8AZuhhj+9R5jj/GQ3RWuVw8lUBEwuNrQrEDJEZvCnV2ahMgg4/ZPHr895YHW7ZO8P2d3/Su7KZhmhCp/hWYWycZDBkQm40aAEMTGCeCkTdyR5NQATUViOAjD8eYF443BBizgrn8edTzIPmYYGFAHm0eGRoQkb37ngQFf8/jjTRiiBciwAhJT39jKHKrkUACF4bh97OWS/O/PGYhh52GbBu6yjEo3NvDlPg+bR5ZI0qt8lXx523LNTHKXbVPKKaHYmXHZm7HZ89ho83pQBLwgD4tvrcvFgjpj7sj8OuDaDJ2MuQKm5qEvJwJ0o7kM6k3k08kR1eMokikpLOcOf6kcT8x39jzLUS0M+egVhm1TP2MlUvdd78tWQK+vqQd05xiq+XKJVolruVjFCmCGl+EgXix684L87Do4x+aXTAGYhmjuJ/Q+WN48lQiuAAAAAElFTkSuQmCC\'); background-size: cover; display: block;"\n  ></span>\n  <img\n        class="gatsby-resp-image-image"\n        alt="Total cycle depth for the Kaprekar Routine in the range [0, 998k) drawn in an Ulam Spiral"\n        title=""\n        src="/static/8ec66740ba96fa736339a1fd1b24b9c2/23296/kaprekar-ulam.png"\n        srcset="/static/8ec66740ba96fa736339a1fd1b24b9c2/d23e3/kaprekar-ulam.png 169w,\n/static/8ec66740ba96fa736339a1fd1b24b9c2/2b41d/kaprekar-ulam.png 338w,\n/static/8ec66740ba96fa736339a1fd1b24b9c2/23296/kaprekar-ulam.png 675w,\n/static/8ec66740ba96fa736339a1fd1b24b9c2/20c85/kaprekar-ulam.png 999w"\n        sizes="(max-width: 675px) 100vw, 675px"\n        style="width:100%;height:100%;margin:0;vertical-align:middle;position:absolute;top:0;left:0;"\n        loading="lazy"\n        decoding="async"\n      />\n  </a>\n    </span>'}})),"\n",l.createElement(t.p,null,"The light band has been transformed into a series of darkening squares, with clear distinctions at each digit boundary."),"\n",l.createElement(t.h2,{id:"the-collatz-conjecture",style:{position:"relative"}},l.createElement(t.a,{href:"#the-collatz-conjecture","aria-label":"the collatz conjecture permalink",className:"anchor before"},l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"The Collatz Conjecture"),"\n",l.createElement(t.h3,{id:"let-it-hail",style:{position:"relative"}},l.createElement(t.a,{href:"#let-it-hail","aria-label":"let it hail permalink",className:"anchor before"},l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Let it hail"),"\n",l.createElement(t.p,null,"The second procedure that we’re looking at is called the Collatz Conjecture",l.createElement(t.sup,null,l.createElement(t.a,{href:"#user-content-fn-6",id:"user-content-fnref-6","data-footnote-ref":!0,"aria-describedby":"footnote-label"},"6")),". It’s widely recognized and as-yet unproven, which is also true of Kaprekar’s Routine. We start with any integer, then:"),"\n",l.createElement(t.ol,null,"\n",l.createElement(t.li,null,"if the number is odd, divide it by two"),"\n",l.createElement(t.li,null,"if the number is even, multiply it by three and add one"),"\n",l.createElement(t.li,null,"repeat"),"\n"),"\n",l.createElement(t.p,null,"The Collatz Conjecture states that no matter what number we start with, it will always eventually reach 1. This has been verified for numbers up to at least 5.764×10",l.createElement("sup",null,"18")," at the time of writing."),"\n",l.createElement(t.p,null,"To graph this, we can define depth to mean the number of iterations until 1 is reached. Here’s a quick first pass at a ",l.createElement("code",{className:"language-javascript"},"collatz()")," function:"),"\n",l.createElement(t.pre,null,l.createElement(t.code,{className:"language-javascript"},"// naive implementation\nfunction collatz(num) {\n\tvar depth = 0;\n\n\twhile (num !== 1) {\n\t\tnum =\n\t\t\tnum % 2\n\t\t\t\t? num * 3 + 1 // num is odd\n\t\t\t\t: num / 2; // num is even\n\n\t\tdepth++;\n\t}\n\n\treturn depth;\n}\n")),"\n",l.createElement(t.p,null,"The above function ",l.createElement(t.em,null,"works"),", but it’s not very efficient; running the numbers from 1 to 1M using this function would waste a ",l.createElement(t.em,null,"lot")," of time on repeated cycles. Let’s imagine running the number 5 through our procedure:"),"\n",l.createElement(t.ol,null,"\n",l.createElement(t.li,null,"  ",l.createElement("code",null,"5  ↦ ×3+1")),"\n",l.createElement(t.li,null,"  ",l.createElement("code",null,"16 ↦ ÷2")),"\n",l.createElement(t.li,null,"  ",l.createElement("code",null,"8  ↦ ÷2")),"\n",l.createElement(t.li,null,"  ",l.createElement("code",null,"4  ↦ ÷2")),"\n",l.createElement(t.li,null,"  ",l.createElement("code",null,"2  ↦ ÷2")),"\n",l.createElement(t.li,null,"  ",l.createElement("code",null,"1")),"\n"),"\n",l.createElement(t.p,null,"Soon after, we would have to calculate the depth of 10:"),"\n",l.createElement(t.ol,null,"\n",l.createElement(t.li,null,"  ",l.createElement("code",null,"10 ↦ ÷2")),"\n",l.createElement(t.li,null,"  ",l.createElement("code",null,"5  ↦ ×3+1 // repeated")),"\n",l.createElement(t.li,null,"  ",l.createElement("code",null,"16 ↦ ÷2   // repeated")),"\n",l.createElement(t.li,null,"  ",l.createElement("code",null,"8  ↦ ÷2   // repeated")),"\n",l.createElement(t.li,null,"  …"),"\n"),"\n",l.createElement(t.p,null,"Like Kaprekar’s Routine, this procedure is deterministic. That means that ",l.createElement(t.em,null,"whenever")," we see the number 5, we’ve got 5 more steps until we see the number 1. By ",l.createElement(t.a,{href:"http://en.wikipedia.org/wiki/Memoization"},"memoizing")," the ",l.createElement("code",{className:"language-javascript"},"collatz()")," function, we avoid running these repetitive cycles."),"\n",l.createElement(t.pre,null,l.createElement(t.code,{className:"language-javascript"},"// slightly better memoized implementation\nvar collatz = (function () {\n\tvar memo = {\n\t\t1: 0,\n\t};\n\n\treturn function (cur) {\n\t\tvar l,\n\t\t\t_len,\n\t\t\tmemoized,\n\t\t\tpast = [];\n\n\t\twhile (typeof memo[cur] === 'undefined') {\n\t\t\tpast.push(cur);\n\t\t\tcur = cur % 2 ? cur * 3 + 1 : cur / 2;\n\t\t}\n\n\t\tmemoized = memo[cur];\n\n\t\t// throw past values into memo\n\t\tfor (l = _len = past.length; l--; )\n\t\t\tmemo[past[l]] = _len - l + memoized;\n\n\t\treturn past.length + memoized;\n\t};\n})();\n")),"\n",l.createElement(t.p,null,"Replacing the ",l.createElement("code",{className:"language-javascript"},"kaprekar()")," function in our first example with ",l.createElement("code",{className:"language-javascript"},"collatz()")," yields the following graph:"),"\n",l.createElement(r.Z,{caption:l.createElement(l.Fragment,null,"Collatz Conjecture depths: (0, 1M]. ",l.createElement(t.a,{href:"http://codepen.io/rileyjshaw/pen/hayod",rel:"noopener noreferrer",target:"_blank"},"View code"))},l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span\n      class="gatsby-resp-image-wrapper"\n      style="position: relative; display: block; margin-left: auto; margin-right: auto; max-width: 675px; "\n    >\n      <a\n    class="gatsby-resp-image-link"\n    href="/static/b7a919b9a958d5444cdd408262b6b61b/00d43/collatz.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n    <span\n    class="gatsby-resp-image-background-image"\n    style="padding-bottom: 100%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAABUklEQVR42n1S23aEIAzMp6lP2N8Vgmvd9Zxt+11WMIExxT6MCblMJiD9fHT7d8J44gvwBvs2OQvtpefY76/D2Q48D7zAbmIRW6npJdaXcwKtx0ehwU/jrxe/K+fTdjtykDYku0Bz8h/ujCMWQSuWCXOjYDbFqxILFkOAOc3T7OphcVfih2nKta5uZPMpR1qUAtGdTWoTFqNM61jqcq2QZYW4rk5MPruqKkpshlw0g5WHHjY5VpU81hiuHGHYLGqDxEkdhiS7vypQTWxAc9QiuKgVhMYAbhBnwjhW2aFBHG5ySKr9FOHSuUHCYBN8YwBuUxTO8NsoiXfDYYfiTwe8GYC/TiEMBmyUteKh8YCsrxwaa02ijg2RF/DNEIomEKDRKo3mPJXr6MvV0H/rhEtz9X3ZovoqgCYT8PCSSDoZ9Xd3Do8ySONQ7g/JfOOlQ/aHC/kvXUSE13k7TEwAAAAASUVORK5CYII=\'); background-size: cover; display: block;"\n  ></span>\n  <img\n        class="gatsby-resp-image-image"\n        alt="Total cycle depth for the Collatz Conjecture in the range (0, 1M]"\n        title=""\n        src="/static/b7a919b9a958d5444cdd408262b6b61b/23296/collatz.png"\n        srcset="/static/b7a919b9a958d5444cdd408262b6b61b/d23e3/collatz.png 169w,\n/static/b7a919b9a958d5444cdd408262b6b61b/2b41d/collatz.png 338w,\n/static/b7a919b9a958d5444cdd408262b6b61b/23296/collatz.png 675w,\n/static/b7a919b9a958d5444cdd408262b6b61b/00d43/collatz.png 1000w"\n        sizes="(max-width: 675px) 100vw, 675px"\n        style="width:100%;height:100%;margin:0;vertical-align:middle;position:absolute;top:0;left:0;"\n        loading="lazy"\n        decoding="async"\n      />\n  </a>\n    </span>'}})),"\n",l.createElement(t.p,null,"The banding that’s observed is interesting; it looks almost like cloth grain. This tells us that sequential numbers are more likely to have similar depths."),"\n",l.createElement(t.p,null,"Using the ",l.createElement("code",{className:"language-javascript"},"ulam()")," drawing function, we get:"),"\n",l.createElement(r.Z,{caption:l.createElement(l.Fragment,null,"Ulam Spiral of Collatz Conjecture depths: (0, 998k]. ",l.createElement(t.a,{href:"http://codepen.io/rileyjshaw/pen/fihEm",rel:"noopener noreferrer",target:"_blank"},"View code"))},l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span\n      class="gatsby-resp-image-wrapper"\n      style="position: relative; display: block; margin-left: auto; margin-right: auto; max-width: 675px; "\n    >\n      <a\n    class="gatsby-resp-image-link"\n    href="/static/c0c13c2d79ee3c05b99e2ed56cf06514/20c85/collatz-ulam.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n    <span\n    class="gatsby-resp-image-background-image"\n    style="padding-bottom: 100%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAACSUlEQVR42l1UzXqbMBD0a6StDfi9a8A2SZpDey0GYTBO0jqn9l16oQd1Z38kpYf5JC3saPZPq77K/3Rl/vdU5ktX5QudeSXb4urs3Rn/9FWmyAPMry2LZQWn8z73XVV4V+d+IHTl1js6Yw8bvrtkP4RzwXv2JXRl4Vd9DXY4Z37cZ+SQMRF+5JXsA9lclQc7k1WCXu3YtzsQVkaYM9lZibAfD1mwyV4UnlWpKceFPakVQs6ThgtHVWlkTG7fDtE+7i0iEQCO75+3nnPogjpxuBw3fuI189NRVjhP+s2Ab0MSfoscSuUKyRHdZkRzs/HP9xt/JczkfG3WtF+zHbBLJ00FRJ12RlgX3iV5w09Xcnp5WMtKRK8PEc90xqUgurDKjP3bHYXcldnSaVEGTTYIoQqEP798YtyeBEIIdZtQKKu8VplyqG1jFQXZrApB8uvrB//7251/oz1ss6YEsNzDj0N2WmU0pVV11JB/PBrhHRPenj6yQi5Kowo1XPh2VhRrVAv7wkXY+NdHCflGgLo3JZwbSckU+lS64ARCzOhQ29jJRySaCcn5JYEVRaocK2ykMYdEaCOEMKRl1twyjEZxL3mbj7FtLCr4cch4KVhdpRU+SvPOSmK9Js2chfOo/WoPyKgTw7Nso4M82s3j/wiTEmEKXfJAsEL0UV8K6ZCMoeXTLmB12tDTIZ3lqJQJ0/dO1Op8Jrb4NsbLXGIPCttSFPL4JG+cIE6QSy5Jn7hhH9/OrtIcGgmq1FfxARXblu2Ygj65zL1bixDNP+no51LFaCexAAAAAElFTkSuQmCC\'); background-size: cover; display: block;"\n  ></span>\n  <img\n        class="gatsby-resp-image-image"\n        alt="Total cycle depth for the Collatz Conjecture in the range (0, 998k] drawn in an Ulam Spiral"\n        title=""\n        src="/static/c0c13c2d79ee3c05b99e2ed56cf06514/23296/collatz-ulam.png"\n        srcset="/static/c0c13c2d79ee3c05b99e2ed56cf06514/d23e3/collatz-ulam.png 169w,\n/static/c0c13c2d79ee3c05b99e2ed56cf06514/2b41d/collatz-ulam.png 338w,\n/static/c0c13c2d79ee3c05b99e2ed56cf06514/23296/collatz-ulam.png 675w,\n/static/c0c13c2d79ee3c05b99e2ed56cf06514/20c85/collatz-ulam.png 999w"\n        sizes="(max-width: 675px) 100vw, 675px"\n        style="width:100%;height:100%;margin:0;vertical-align:middle;position:absolute;top:0;left:0;"\n        loading="lazy"\n        decoding="async"\n      />\n  </a>\n    </span>'}})),"\n",l.createElement(t.p,null,"Pretty."),"\n",l.createElement(t.h2,{id:"conclusion",style:{position:"relative"}},l.createElement(t.a,{href:"#conclusion","aria-label":"conclusion permalink",className:"anchor before"},l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Conclusion"),"\n",l.createElement(t.p,null,"We set out to make some nice looking graphs; we now have four of them",l.createElement(t.sup,null,l.createElement(t.a,{href:"#user-content-fn-7",id:"user-content-fnref-7","data-footnote-ref":!0,"aria-describedby":"footnote-label"},"7")),". But why stop there? As we’ve seen, a great advantage to keeping the depth function separate from the drawing function is that we can easily swap in new functions",l.createElement(t.sup,null,l.createElement(t.a,{href:"#user-content-fn-8",id:"user-content-fnref-8","data-footnote-ref":!0,"aria-describedby":"footnote-label"},"8")),". A great place to find inspiration for new functions is ",l.createElement(t.a,{href:"https://oeis.org/https://oeis.org/"},"The On-Line Encyclopedia of Integer Sequences"),"."),"\n",l.createElement(t.p,null,"Have fun!"),"\n",l.createElement(t.section,{"data-footnotes":!0,className:"footnotes"},l.createElement(t.h2,{className:"sr-only",id:"footnote-label"},"Footnotes"),"\n",l.createElement(t.ol,null,"\n",l.createElement(t.li,{id:"user-content-fn-1"},"\n",l.createElement(t.p,null,"Except for repdigits like 3333, which reach their fixed point of 0 after one step. ",l.createElement(t.a,{href:"#user-content-fnref-1","data-footnote-backref":!0,className:"data-footnote-backref","aria-label":"Back to content"},"↩")),"\n"),"\n",l.createElement(t.li,{id:"user-content-fn-2"},"\n",l.createElement(t.p,null,l.createElement(t.a,{href:"http://youtu.be/M8G8aqlegYI"},"The number. Another summer.")," ",l.createElement(t.a,{href:"#user-content-fnref-2","data-footnote-backref":!0,className:"data-footnote-backref","aria-label":"Back to content"},"↩")),"\n"),"\n",l.createElement(t.li,{id:"user-content-fn-3"},"\n",l.createElement(t.p,null,"i.e. with input ",l.createElement(t.em,null,"n")," and depth ",l.createElement(t.em,null,"t")," we’re looking for ",l.createElement(t.em,null,"t")," where ƒ",l.createElement("sub",null,l.createElement(t.em,null,"n")),"(",l.createElement(t.em,null,"t"),") = ƒ",l.createElement("sub",null,l.createElement(t.em,null,"n")),"(",l.createElement(t.em,null,"t")," - 1). More generally, ƒ",l.createElement("sub",null,l.createElement(t.em,null,"n")),"(",l.createElement(t.em,null,"t"),") = ƒ",l.createElement("sub",null,l.createElement(t.em,null,"n")),"(",l.createElement(t.em,null,"t")," - ",l.createElement(t.em,null,"L"),"), where ",l.createElement(t.em,null,"L")," = fixed-loop size. But we’ll get to that part soon. ",l.createElement(t.a,{href:"#user-content-fnref-3","data-footnote-backref":!0,className:"data-footnote-backref","aria-label":"Back to content"},"↩")),"\n"),"\n",l.createElement(t.li,{id:"user-content-fn-4"},"\n",l.createElement(t.p,null,"A neologism, as far as I can tell. “Stopping time” is likely more appropriate. ",l.createElement(t.a,{href:"#user-content-fnref-4","data-footnote-backref":!0,className:"data-footnote-backref","aria-label":"Back to content"},"↩")),"\n"),"\n",l.createElement(t.li,{id:"user-content-fn-5"},"\n",l.createElement(t.p,null,"The Ulam Spiral story doesn’t end with a different drawing function. The presentation that he was sitting in on must have been really boring, because Ulam started circling prime numbers on his spiral:"),"\n",l.createElement(r.Z,{caption:"Ulam Spiral with prime numbers shown: [1, 50)"},l.createElement(t.img,{src:"/fd714e7880c2c3298614cd6e39e8d168/ulam-howto-2.svg",alt:"Ulam Spiral with prime numbers shown"})),"\n",l.createElement(t.p,null,"He noticed that the primes tended to line up along certain diagonal lines more than others. This isn’t evident in the small grid above, but we can repurpose our old code to generate a larger grid. If we replace the ",l.createElement("code",{className:"language-javascript"},"kaprekar()")," function with a function that only returns a color if the number is prime, we can visualize Ulam’s diagonal primes:"),"\n",l.createElement(r.Z,{caption:l.createElement(l.Fragment,null,"Ulam Spiral with prime numbers shown: [0, 988k). ",l.createElement(t.a,{href:"http://codepen.io/rileyjshaw/pen/gaHhn",rel:"noopener noreferrer",target:"_blank"},"View code"))},l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span\n      class="gatsby-resp-image-wrapper"\n      style="position: relative; display: block; margin-left: auto; margin-right: auto; max-width: 675px; "\n    >\n      <a\n    class="gatsby-resp-image-link"\n    href="/static/5f2f0eb6cdda884eb7971c6f14171d13/20c85/ulam.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n    <span\n    class="gatsby-resp-image-background-image"\n    style="padding-bottom: 100%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAABCklEQVR42p1USxbCIAzsfeg1CMHnQrj/NdzUhaYKJYkJ9bmYVyjpMJNPlwDlTngQtgC37fMkxMLW9D6xvY6JI27ZFyuU55pqA635HvqegNV4L78ZhPzDxNbeWbRjll3uEZhUQDIu4IgWIRiE/8Ak5CrQUY3sDJUbQQiT2/GHi0QOvXzlrogqmRtmhLGwKmtbXU0nymUQoqM0WpZ1HokoXOsbpsJe7Vbx0TZGDkOz3AnDhcDVwXebScu6ELkqFFshDKXSMr8xF5kvDWt6zD4EplD33Kypk7YMRkHQyC064yhyOJtfmMzyqWXPulNRi1RaTpOnpw5YH4I3KeBYPjsTo+f8MHnwEaP3bPRe5tO/iBoF9JAAAAAASUVORK5CYII=\'); background-size: cover; display: block;"\n  ></span>\n  <img\n        class="gatsby-resp-image-image"\n        alt="Prime numbers in the range [0, 1M) drawn in an Ulam Spiral"\n        title=""\n        src="/static/5f2f0eb6cdda884eb7971c6f14171d13/23296/ulam.png"\n        srcset="/static/5f2f0eb6cdda884eb7971c6f14171d13/d23e3/ulam.png 169w,\n/static/5f2f0eb6cdda884eb7971c6f14171d13/2b41d/ulam.png 338w,\n/static/5f2f0eb6cdda884eb7971c6f14171d13/23296/ulam.png 675w,\n/static/5f2f0eb6cdda884eb7971c6f14171d13/20c85/ulam.png 999w"\n        sizes="(max-width: 675px) 100vw, 675px"\n        style="width:100%;height:100%;margin:0;vertical-align:middle;position:absolute;top:0;left:0;"\n        loading="lazy"\n        decoding="async"\n      />\n  </a>\n    </span>'}})),"\n",l.createElement(t.a,{href:"#user-content-fnref-5","data-footnote-backref":!0,className:"data-footnote-backref","aria-label":"Back to content"},"↩"),"\n"),"\n",l.createElement(t.li,{id:"user-content-fn-6"},"\n",l.createElement(t.p,null,"The Collatz Conjecture has many names. You might know it as: the 3n + 1 conjecture, the Ulam conjecture, Kakutani’s problem, the Thwaites conjecture, Hasse’s algorithm, the Syracuse problem, the hailstone sequence, hailstone numbers, or wondrous numbers. ",l.createElement(t.a,{href:"#user-content-fnref-6","data-footnote-backref":!0,className:"data-footnote-backref","aria-label":"Back to content"},"↩")),"\n"),"\n",l.createElement(t.li,{id:"user-content-fn-7"},"\n",l.createElement(t.p,null,"Five if you count the footnotes! ",l.createElement(t.a,{href:"#user-content-fnref-7","data-footnote-backref":!0,className:"data-footnote-backref","aria-label":"Back to content"},"↩")),"\n"),"\n",l.createElement(t.li,{id:"user-content-fn-8"},"\n",l.createElement(t.p,null,"This is known as ",l.createElement(t.a,{href:"http://en.wikipedia.org/wiki/Function_composition_(computer_science)"},"function composition"),". ",l.createElement(t.a,{href:"#user-content-fnref-8","data-footnote-backref":!0,className:"data-footnote-backref","aria-label":"Back to content"},"↩")),"\n"),"\n"),"\n"))}var o=function(e){void 0===e&&(e={});const{wrapper:t}=Object.assign({},(0,a.a)(),e.components);return t?l.createElement(t,e,l.createElement(i,e)):i(e)},c=n(9389);function s(e){let{data:t,...n}=e;return l.createElement(c.Z,Object.assign({},n,{title:t.mdx.fields.title}))}function m(e){let{data:t,children:n}=e;const{mdx:a}=t,{fields:r}=a;return l.createElement("main",null,l.createElement("div",{className:"page-content"},l.createElement("article",{className:"blog-post-content prose prose-lg",role:"article"},l.createElement("header",null,l.createElement("h1",null,r.title),l.createElement("div",{className:"subheading"},l.createElement("time",null,"Posted ",r.date))),l.createElement("div",{className:"blog-post-markdown"},n))))}function u(e){return l.createElement(m,e,l.createElement(o,e))}},7462:function(e,t,n){var a=n(7294);t.Z=e=>{let{caption:t,children:n,width:l}=e;return a.createElement("figure",{className:"blog-figure"},l?a.createElement("div",{width:l},n):n,a.createElement("figcaption",null,t))}}}]);
//# sourceMappingURL=component---src-templates-post-jsx-content-file-path-src-data-markdown-posts-published-2014-12-04-graphing-depth-mdx-28eba574c6653aa26070.js.map