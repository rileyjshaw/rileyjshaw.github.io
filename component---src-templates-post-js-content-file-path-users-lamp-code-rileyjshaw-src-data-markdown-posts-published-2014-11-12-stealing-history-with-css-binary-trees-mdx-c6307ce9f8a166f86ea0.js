"use strict";(self.webpackChunkrileyjshaw_com=self.webpackChunkrileyjshaw_com||[]).push([[230],{7919:function(e,t,a){a.r(t),a.d(t,{Head:function(){return g},default:function(){return u}});var n=a(3366),i=a(1151),r=a(7294),s=a(3744),l=a(7008);function c(e){var t=Object.assign({p:"p",a:"a",h2:"h2",div:"div",em:"em",ul:"ul",li:"li"},(0,i.ah)(),e.components);return r.createElement(r.Fragment,null,r.createElement(s.Z,{type:"update",date:"2015-01-21"},r.createElement(t.p,null,"Since writing this post, Chrome and Firefox have changed their\nalpha-blending functions. Demos likely won’t work anymore. This is good\nnews!")),"\n",r.createElement(t.p,null,"History-sniffing attacks let front-end code peek at other sites you’ve visited. They can be used to target ads, steal information, or discern your identity. Creepy."),"\n",r.createElement(t.p,null,"Historically, one of the most popular history-sniffing techniques was to style ",r.createElement("code",{className:"language-css"},":visited")," links using CSS and check their color with JavaScript. Major browsers started implementing ",r.createElement(t.a,{href:"https://hacks.mozilla.org/2010/03/privacy-related-changes-coming-to-css-vistited/"},"privacy changes")," to address this attack in 2010.[^1] As a result, JavaScript’s ",r.createElement("code",{className:"language-javascript"},"getComputedStyle")," now returns unvisited styles for visited sites."),"\n",r.createElement(t.p,null,"Even with these limitations there are a number of ways to scrape a user’s history. The remainder of this article describes a combination of tricks used to do so. The outcome is a proof-of-concept ",r.createElement(t.a,{href:"/visited-vectors/reaction/"},"history-sniffing game"),"."),"\n",r.createElement(t.h2,{id:"trick-1-clicking-colors",style:{position:"relative"}},r.createElement(t.a,{href:"#trick-1-clicking-colors","aria-label":"trick 1 clicking colors permalink",className:"anchor before"},r.createElement(t.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Trick #1: Clicking colors"),"\n",r.createElement(t.p,null,"Though ",r.createElement("code",{className:"language-javascript"},"getComputedStyle")," is a dead-end, sniffers can trick ",r.createElement(t.em,null,"users")," into telling a script which links they’ve visited. ",r.createElement(t.a,{href:"http://tinsnail.neocities.org/"},"This demo")," is the clearest implementation that I’ve seen; the site shows a grid of styled links and asks you to click the red ones."),"\n",r.createElement(t.p,null,"I saw the demo above while working on an unrelated game. The game asked players to hit the spacebar when a box turned red."),"\n",r.createElement(t.div,{dangerouslySetInnerHTML:{__html:'<span\n      class="gatsby-resp-image-wrapper"\n      style="position: relative; display: block; margin-left: auto; margin-right: auto; max-width: 241px; "\n    >\n      <a\n    class="gatsby-resp-image-link"\n    href="/static/b5970e182bf26a4d74b659409d1f1283/2f862/reaction1.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n    <span\n    class="gatsby-resp-image-background-image"\n    style="padding-bottom: 254.43786982248523%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAzCAIAAAAYQr/UAAAACXBIWXMAAAsTAAALEwEAmpwYAAADXklEQVRIx+1Wy07jSBT1n7BD4gP4AlbsYclvsENsEBISq8CCDhLSNAuElAUSzYhhZhqFNEo7wXbHFoljpx9JiKsSP4gr2PGrfHsSMyiku2dgMqPZcFalsk/dc++t0j0MABDbLrCFIAwlsYTa2DANQuyrYtHt9wHg1jKJ3ZMkCeE2DMHzvOO6AMAAQL/fxwjRiPIcpyGEMHIc56pYwO0OAJh6x7Z7cqVcVVQA8Lz+xUU2OYhJDovjeGwBD4s/9yl9tDMg+76/srIiimI+n9/Z2QGAg4MD3/fPz89PTk4wxmtra6qq5vN5jHEqlapUKvl8fmtrCyHEEEJmZmYODw93d3cXFhZ0XZ+dnWVZdmNjI5VKeZ63urqKENre3mZZdn5+PpPJ7O3tTU1NCYLAhGHYbDYtyzIMQ1EUQki9Xtd1vdfrKYoCAJZlRVFkmialVJZl13Vt29Y0zXEcZiwNSqNutwsAjuPElDqOQ2w7iuitZRHSGy3BfcEopcN6UABo1Ou5XC4Igre///b5S12pVl//9Fo3LPb9+7ZuJrTk5ziOxyMHQaAoSr/vWZZ1d3fned7tQDbVWq3boaJ4pAvj5GdhnPygf7TzcXyf2t+QJ4r8PDKdAJNFFgShVqspz4SqqqIoMpeXl77vd7td8mTYtu26bqVSYSRJSi7Z09UmPWu1WkypVPpn5JubmxfyC/mF/K+TJ3rPLMsm891/MjzPo5TWarUBWVVVWZarz4GqqjzPM/EEYL4dIk/P/H8cNz+SNDolv/VB/818HnhCQjqdTtJSXdfrjeaYJ/gOOY7jMAwBQJblXO6dZVrNRuOO2LJSA4Aoisb4P5QdBMHADfzltX1kHxFC5XI5DMNsNksI6Xa7GGMAYFnWcRxJkqrV6qj+e3KiNp1+NTc3p2na9PS0KIrr6+vLy8vX19dLS0uEkMXFxc3NzUT/I3LyqjiOS6fTnU4nl8sBwPHx8dHRkWma+/v7lmVlMpmzs1+Hke9zYR4c2cN53y1s8jWKojCMoijyfX8YOY4Fnnvz5mfXdQXuSpTKGGmFIhcEwdnp6Uf1U2Ilfzk7NUyT44qNxg3CGlsoBkEwkP1RVbMXOUqjZqOOcMcwjHJFjiktffjw+dOXpPK8wDuOW5VlhNu4jUsl8Q9D8xWwOVjE8nQNJQAAAABJRU5ErkJggg==\'); background-size: cover; display: block;"\n  ></span>\n  <img\n        class="gatsby-resp-image-image"\n        alt="Interface for a simple reaction game"\n        title="Interface for a simple reaction game"\n        src="/static/b5970e182bf26a4d74b659409d1f1283/2f862/reaction1.png"\n        srcset="/static/b5970e182bf26a4d74b659409d1f1283/d23e3/reaction1.png 169w,\n/static/b5970e182bf26a4d74b659409d1f1283/2f862/reaction1.png 241w"\n        sizes="(max-width: 241px) 100vw, 241px"\n        style="width:100%;height:100%;margin:0;vertical-align:middle;position:absolute;top:0;left:0;"\n        loading="lazy"\n        decoding="async"\n      />\n  </a>\n    </span>'}}),"\n",r.createElement(t.p,null,r.createElement(t.em,null,"“Hey”"),", I thought to myself, ",r.createElement(t.em,null,"“this game could be so much more sneaky!”")),"\n",r.createElement(t.p,null,"I swapped the box out for a stack of links and styled ",r.createElement("code",{className:"language-css"},":visited")," to ",r.createElement("code",{className:"language-css"},"background-color:red"),". It was totally evil and awesome and ready to go!"),"\n",r.createElement(t.div,{dangerouslySetInnerHTML:{__html:'<span\n      class="gatsby-resp-image-wrapper"\n      style="position: relative; display: block; margin-left: auto; margin-right: auto; max-width: 241px; "\n    >\n      <a\n    class="gatsby-resp-image-link"\n    href="/static/06e27a316663bc24564927d635022c84/2f862/reaction2.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n    <span\n    class="gatsby-resp-image-background-image"\n    style="padding-bottom: 177.5147928994083%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAkCAIAAAAGkY33AAAACXBIWXMAAAsTAAALEwEAmpwYAAACRElEQVRIx91Tu27TUBj+PEbtI1Seu2XgARAZEBuILU+QF2DJmDkSE1KExNyKiA6IJU0aIUgqRU1KRCU3FDtyboWkDrk4Vn05N6jdRA2qwE1h6a9PR9bv813Obx+UNzc7GxuaLDdDQ5PlliwfyjK0SEQADBChwf3VAKCurwuASBILDSpJQpL6kgRtbW015zPgjpAZQH2w+TOZd2h4Zz7fFMo54H8AtoBtoAQowD7wGngLvAfKy6JL5CDVM+AB8Bx4CNwDngBPgUfAfeDxlaP9Tg70qsAB8AJ4BbwE3gGngA7UgdoK0+bhp70Y9WLOi7Gzu/qH3Yzc9O8z869oSHB/NSQJR5EIAUzACo0Z4PgfH8fF4snu7kk+f1Mc5/MQtygwSvlKYJTezvm/kDnn/8D5Dyq4duvgbNDrdG3bMafT015X1ZrXqiyRGWOEECHE0dHn/VLJNK1etzsdj771B0IISiljLGxs7tffzxxI1uv1XC7num4mkxkMBrquK4rCOc9ms+PxuOjX1fyX5CBtOp2OxWK6rkej0WazmUwmE4mEoijxeHw2m8Xj8VQqFeRfIgdiqqoWCoXJZKJpmhCi6pfjOEHz4KBaqVQWMS/JhBDLsjjn1PcPtGzb5pwzxjzPE0K4rsvnrxzHCZJekA3DqNZqxPP29oqBp2WaO292hj9G5dJHvdXu978f1j8559bW1rZlndeq1Xa7c0n2PG9qTgXnjcaX0Wh00XFd9atq20671TIMgxAyNU1KSaPRIJQOjaFt27/IPwHgEAOW3PQsegAAAABJRU5ErkJggg==\'); background-size: cover; display: block;"\n  ></span>\n  <img\n        class="gatsby-resp-image-image"\n        alt="Score displaying with red background"\n        title="Score displaying with red background"\n        src="/static/06e27a316663bc24564927d635022c84/2f862/reaction2.png"\n        srcset="/static/06e27a316663bc24564927d635022c84/d23e3/reaction2.png 169w,\n/static/06e27a316663bc24564927d635022c84/2f862/reaction2.png 241w"\n        sizes="(max-width: 241px) 100vw, 241px"\n        style="width:100%;height:100%;margin:0;vertical-align:middle;position:absolute;top:0;left:0;"\n        loading="lazy"\n        decoding="async"\n      />\n  </a>\n    </span>'}}),"\n",r.createElement(t.p,null,"…almost."),"\n",r.createElement(t.div,{dangerouslySetInnerHTML:{__html:'<span\n      class="gatsby-resp-image-wrapper"\n      style="position: relative; display: block; margin-left: auto; margin-right: auto; max-width: 241px; "\n    >\n      <a\n    class="gatsby-resp-image-link"\n    href="/static/cc4d5fe240197dbd3c878ecdc8ceb629/2f862/reaction3.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n    <span\n    class="gatsby-resp-image-background-image"\n    style="padding-bottom: 177.5147928994083%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAkCAIAAAAGkY33AAAACXBIWXMAAAsTAAALEwEAmpwYAAACR0lEQVRIx92VzYraUBTH80YufABREHcK7vIEvoCbWboW3LgQcW9ROgtxIziD2CiIiQ0Vom2TmPjVqrF+JGHycZN723pnRKczog7dzH95c3/nf87hnBui0WiMRiNBEMSzJQiCLMudTocQBAEh5LouOlsQQoSQoigEz/MIIQCAe7Ycx0EIzWaz650Xi8U7gXE/HMfZ9wYA4DzpXGe407nOmK/X6/mdKIriOK7ZbBYKhVKpVKvVKIo6DHoE46zi8bjf70+lUsFg0Ov1RiKRaDQaCoV8Pl84HN6X9hzG8Wiabrfb6XQ6l8tls9lyuTydTgeDAcuyDMNc3O1/K38V3rd63+d92/d33tuEXQaLong93O12AQCqqupnS9M00zQlSSJ6vd63q9Tr9Qj0BhF4MK+Q67pvc/4v8GsvwWXOJ6IQL16dL+aT0dgwTHW7nU7GvCC+GOUIdl0XAIAQ6na/NClKVfXJeLxdr37M5nhbnw0icTrh05UTh88Sy7KVSsWyrEwmM5/PJUniOA5CWCwW1+v1/U6H+T/CONtkMhkIBCRJ8ng8oije3NzEYjGO40iS1DSNJMlEIoHzP4JxMJ7nq9XqZrPBe0rvZJomPmy36VardbiCBLbVdR1C6Oz8cSzDMPAM2raNELIsCz59Mk0TZ0rg3zTNMMC27+7usaeuqrcfb5e/Vg3qkyQPZ7OfHfaz+aDn8x90/YGh6eFw9Ajbtr1VtwjCfv/rarX6e2JZ/HfeMMyhLCuKAgDYqqrjgH6/DxxnqSwNw/gD/wakbPY8LdTEDQAAAABJRU5ErkJggg==\'); background-size: cover; display: block;"\n  ></span>\n  <img\n        class="gatsby-resp-image-image"\n        alt="Score displaying with white background"\n        title="Score displaying with white background"\n        src="/static/cc4d5fe240197dbd3c878ecdc8ceb629/2f862/reaction3.png"\n        srcset="/static/cc4d5fe240197dbd3c878ecdc8ceb629/d23e3/reaction3.png 169w,\n/static/cc4d5fe240197dbd3c878ecdc8ceb629/2f862/reaction3.png 241w"\n        sizes="(max-width: 241px) 100vw, 241px"\n        style="width:100%;height:100%;margin:0;vertical-align:middle;position:absolute;top:0;left:0;"\n        loading="lazy"\n        decoding="async"\n      />\n  </a>\n    </span>'}}),"\n",r.createElement(t.p,null,"Since I didn’t know when the square was red I was ",r.createElement(t.em,null,"always")," displaying a score, even on misfires. I’d broken the game."),"\n",r.createElement(t.h2,{id:"trick-2-like-a-polar-bear-in-a-snowstorm",style:{position:"relative"}},r.createElement(t.a,{href:"#trick-2-like-a-polar-bear-in-a-snowstorm","aria-label":"trick 2 like a polar bear in a snowstorm permalink",className:"anchor before"},r.createElement(t.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Trick #2: Like a polar bear in a snowstorm"),"\n",r.createElement(t.p,null,"Another popular history-sniffing trick is to hide non-",r.createElement("code",{className:"language-css"},":visited")," links by making them appear the same color as the background. ",r.createElement(t.a,{href:"http://www.ieee-security.org/TC/SP2011/PAPERS/2011/paper010.pdf"},"This paper")," shows some clever examples, as does ",r.createElement(t.a,{href:"http://lcamtuf.blogspot.ca/2013/05/some-harmless-old-fashioned-fun-with-css.html"},"this game"),". By simply flipping this technique we can hide score text over the white non-",r.createElement("code",{className:"language-css"},":visited")," links. For extra fanciness, we add a red text layer to indicate failure."),"\n",r.createElement(l.Z,{caption:"White and red text are appropriately hidden on their respective backgrounds"},r.createElement(t.div,{dangerouslySetInnerHTML:{__html:'<span\n      class="gatsby-resp-image-wrapper"\n      style="position: relative; display: block; margin-left: auto; margin-right: auto; max-width: 675px; "\n    >\n      <a\n    class="gatsby-resp-image-link"\n    href="/static/e1da90272d4c56c4b3d5704a9f1e1eed/72aae/reaction4.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n    <span\n    class="gatsby-resp-image-background-image"\n    style="padding-bottom: 24.85207100591716%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAFCAIAAADKYVtkAAAACXBIWXMAAAsTAAALEwEAmpwYAAABAElEQVQY002P3UoCQQBGv2UGxjH/LiK8EioIRHqJyCvxcXTxEfx5mXoWIQW78UKtFGZjZneH3eYL7SY4t4fDgahUOkI8S9mOIl2vf+33JM1iYQCnlK0oC5jJJJBllh2TxG029vXFvm9sngNCtIDHKLoClNafux1JN5uVAKUMUhJwcVxe5NR7JgmXSyaGJAA89HpPw+F9t1utVnfbrSftdFoAYTD46fcJZKPRkXTGpFlGMvwRApQQ10q1a7WWlHWtP/6Xm83QaJzL43FBFlmWOss0pbV0jmWJhpR3wG0UdYAbrQ8XOZnPLeClzKX0wHccn5+9N4eDX63z1Vu+Xuen0y9hEK1kckFA7gAAAABJRU5ErkJggg==\'); background-size: cover; display: block;"\n  ></span>\n  <img\n        class="gatsby-resp-image-image"\n        alt="Text blending in with same-colored backgrounds"\n        title="Text blending in with same-colored backgrounds"\n        src="/static/e1da90272d4c56c4b3d5704a9f1e1eed/23296/reaction4.png"\n        srcset="/static/e1da90272d4c56c4b3d5704a9f1e1eed/d23e3/reaction4.png 169w,\n/static/e1da90272d4c56c4b3d5704a9f1e1eed/2b41d/reaction4.png 338w,\n/static/e1da90272d4c56c4b3d5704a9f1e1eed/23296/reaction4.png 675w,\n/static/e1da90272d4c56c4b3d5704a9f1e1eed/72aae/reaction4.png 964w"\n        sizes="(max-width: 675px) 100vw, 675px"\n        style="width:100%;height:100%;margin:0;vertical-align:middle;position:absolute;top:0;left:0;"\n        loading="lazy"\n        decoding="async"\n      />\n  </a>\n    </span>'}})),"\n",r.createElement(t.p,null,"With just the first two tricks we have a ",r.createElement(t.a,{href:"/visited-vectors/reaction/linear.html"},"functioning game"),". Probing one link at a time covers ~60 links per minute and provides solid user insight. Tricks #3 and #4 improve our search algorithm,[^2] increasing read-speed by ~10x."),"\n",r.createElement(t.h2,{id:"trick-3-css-decoders",style:{position:"relative"}},r.createElement(t.a,{href:"#trick-3-css-decoders","aria-label":"trick 3 css decoders permalink",className:"anchor before"},r.createElement(t.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Trick #3: CSS decoders"),"\n",r.createElement(t.p,null,r.createElement(t.a,{href:"http://lcamtuf.coredump.cx/css_calc/"},"This paper")," builds an n-input OR gate in CSS using alpha-blending rounding errors. I’ve embedded my own cross-browser version below; click Result to see it in action:"),"\n",r.createElement("p",{className:"codepen","data-height":"265","data-theme-id":"5323","data-default-tab":"css,result","data-user":"rileyjshaw","data-slug-hash":"CjiKf","data-pen-title":"n-input OR gate in CSS",style:{height:265,boxSizing:"border-box",display:"flex",alignItems:"center",justifyContent:"center",border:"2px solid",margin:"1em 0",padding:"1em"}},r.createElement("span",null,r.createElement(t.p,null,"See the Pen ",r.createElement("a",{href:"https://codepen.io/rileyjshaw/pen/CjiKf"},"n-input OR gate in CSS"),"\nby Riley Shaw (",r.createElement("a",{href:"https://codepen.io/rileyjshaw"},"@rileyjshaw"),")\non ",r.createElement("a",{href:"https://codepen.io"},"CodePen"),"."))),"\n",r.createElement("script",{async:!0,src:"https://static.codepen.io/assets/embed/ei.js"}),"\n",r.createElement(t.p,null,"An OR gate is on if any of its inputs are on. We can use this to probe n links[^3] at once by stacking them together. Now if a user sees red and hits the spacebar we know that one of the links in the group has been visited."),"\n",r.createElement(t.h2,{id:"trick-4-slow-recursion",style:{position:"relative"}},r.createElement(t.a,{href:"#trick-4-slow-recursion","aria-label":"trick 4 slow recursion permalink",className:"anchor before"},r.createElement(t.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Trick #4: Slow recursion"),"\n",r.createElement(t.p,null,"This trick figures out ",r.createElement(t.em,null,"which")," of a group’s links have been visited. We can divide each group into a binary tree for searching but can’t rely on simple conditional search algorithms[^4] since we’re rate-limited by the user’s reaction time.[^5] This means that we must maintain state in our own stack."),"\n",r.createElement(t.p,null,"If you’re curious about specifics, ",r.createElement(t.a,{href:"https://github.com/rileyjshaw/visited-vectors/"},"the whole project is on GitHub"),". Since the code’s cluttered with game logic I’ve written a ",r.createElement(t.a,{href:"https://gist.github.com/rileyjshaw/02c5a8135dd3b1368918"},"stripped-down version of Trick #4"),"."),"\n",r.createElement(t.h2,{id:"trick-5-automation",style:{position:"relative"}},r.createElement(t.a,{href:"#trick-5-automation","aria-label":"trick 5 automation permalink",className:"anchor before"},r.createElement(t.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Trick #5: Automation"),"\n",r.createElement(t.p,null,"Despite the gains achieved in Tricks #3 and #4, relying on user input will never be as fast as the old ",r.createElement("code",{className:"language-javascript"},"getComputedStyle")," method.[^6] Since we can no-longer automate color tests, is it possible to avoid looking at color altogether?[^7] Testing 16 links requires alpha-blending 4,096 elements at each step.[^8] This is a non-trivial operation; can we infer what the browser is drawing by testing render and redraw times?"),"\n",r.createElement(t.p,null,"This is a ",r.createElement(t.a,{href:"http://carlos.bueno.org/2011/10/timing.html"},"timing attack")," and I’m not the first to apply it to this context. ",r.createElement(t.a,{href:"http://www.contextis.com/documents/2/Browser_Timing_Attacks.pdf"},"Pixel Perfect Timing Attacks with HTML5")," is a ",r.createElement(t.em,null,"fantastic")," white paper by Context Information Security on the subject. They were able to successfully implement timing attacks using CSS’s ",r.createElement("code",{className:"language-css"},"text-shadow")," property and SVG filters.[^9] So, there’s the answer. Now go read that paper."),"\n",r.createElement(t.h2,{id:"conclusion",style:{position:"relative"}},r.createElement(t.a,{href:"#conclusion","aria-label":"conclusion permalink",className:"anchor before"},r.createElement(t.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Conclusion"),"\n",r.createElement(t.p,null,"I won’t be taking over the world with this project[^10] but it demonstrates some interesting vectors. More security patches will be released, more creative hacks will arise; all it takes is a toehold and some creativity. Powerful new features make room for novel vulnerabilities. And so it goes."),"\n",r.createElement(t.p,null,"Regarding browsing history, reaction games probably aren’t your ",r.createElement(t.a,{href:"http://en.wikipedia.org/wiki/Global_surveillance_disclosures_(2013%E2%80%93present)"},"biggest concern")," anyway. I’ll just ",r.createElement(t.a,{href:"https://www.eff.org/"},"leave")," ",r.createElement(t.a,{href:"https://www.torproject.org/"},"these")," ",r.createElement(t.a,{href:"https://tails.boum.org/"},"here"),"."),"\n",r.createElement(t.p,null,"And if you made it this far, just ",r.createElement(t.a,{href:"/visited-vectors/reaction/"},"play the damn game already"),"!"),"\n",r.createElement(t.h2,{id:"references",style:{position:"relative"}},r.createElement(t.a,{href:"#references","aria-label":"references permalink",className:"anchor before"},r.createElement(t.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"References"),"\n",r.createElement(t.ul,null,"\n",r.createElement(t.li,null,r.createElement(t.a,{href:"https://hacks.mozilla.org/2010/03/privacy-related-changes-coming-to-css-vistited/"},"Mozilla: privacy-related changes coming to CSS :visited")),"\n",r.createElement(t.li,null,r.createElement(t.a,{href:"http://tinsnail.neocities.org/"},"Who Am I")),"\n",r.createElement(t.li,null,r.createElement(t.a,{href:"http://www.ieee-security.org/TC/SP2011/PAPERS/2011/paper010.pdf"},"I still know what you visited last summer")),"\n",r.createElement(t.li,null,r.createElement(t.a,{href:"http://lcamtuf.blogspot.ca/2013/05/some-harmless-old-fashioned-fun-with-css.html"},"Defend your spaceship!")),"\n",r.createElement(t.li,null,r.createElement(t.a,{href:"http://saizai.livejournal.com/960791.html"},"getComputedStyle benchmark")),"\n",r.createElement(t.li,null,r.createElement(t.a,{href:"http://www.contextis.com/documents/2/Browser_Timing_Attacks.pdf"},"Pixel perfect timing attacks with HTML5")),"\n",r.createElement(t.li,null,r.createElement(t.a,{href:"http://seclists.org/fulldisclosure/2011/Dec/65"},"Fast and somewhat reliable cache timing")),"\n",r.createElement(t.li,null,r.createElement(t.a,{href:"http://arstechnica.com/security/2012/12/online-marketer-tapped-browser-flaw-to-see-if-visitors-were-pregnant/"},"History-sniffing in the news (2012)")),"\n"),"\n",r.createElement(t.h2,{id:"footnotes",style:{position:"relative"}},r.createElement(t.a,{href:"#footnotes","aria-label":"footnotes permalink",className:"anchor before"},r.createElement(t.div,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}})),"Footnotes"),"\n",r.createElement(t.p,null,"[^1]: A noble effort, but it’s difficult to plug all the ",r.createElement(t.a,{href:"http://arstechnica.com/security/2014/06/theyre-ba-ack-browser-sniffing-ghosts-return-to-haunt-chrome-ie-firefox/"},"holes"),".\n[^2]: True under the assumption that the dataset is sparsely populated with ",r.createElement("code",{className:"language-css"},":visited")," links. If there is a high percentage of ",r.createElement("code",{className:"language-css"},":visited")," links in the set you’re actually better off with the linear algorithm. Good news: counting on a sparse dataset is a very safe bet.\n[^3]: I settled on n = 16 unique links per stack. Adding more links gives a performance hit, as it’s not easy for the browser to composite that many layers (each unique link requires 256 elements). 16 seems to be a sweet-spot.\n[^4]: We can win the same O(logn) complexity with a small optimization: if spacebar is hit on level n and then ",r.createElement(t.em,null,"not")," on the left branch of level n + 1, we can immediately skip to level n + 2 since we know that our result is on the right side. This works because we only need to check for existence.\n[^5]: Average human reaction time is just over 250ms, so we can safely budget 1s per frame-change.\n[^6]:\n",r.createElement("code",{className:"language-javascript"},"getComputedStyle")," could process ",r.createElement(t.a,{href:"http://saizai.livejournal.com/960791.html"},"200k-3.4M URLs/min"),". Our test is lucky to get 800 URLs/min."),"\n",r.createElement(t.p,null,"[^7]: Some history-sniffing attacks focus on entirely different vectors; a common example is to ",r.createElement(t.a,{href:"http://seclists.org/fulldisclosure/2011/Dec/65"},"request external resources and time the response"),", probabilistically determining whether the result was cached. All current approaches that I’ve found (including the ones discussed above) are timing attacks.\n[^8]: I created a quick demo ",r.createElement(t.a,{href:"https://gist.github.com/rileyjshaw/abc13bd2d456669c7d5c"},"here")," to inspect painting times in DevTools.\n[^9]: The coolest part of this paper is the second half; they implement OCR for cross-origin iframes using SVG filters. If you enjoyed my article at all (I assume you did since you made it this far) I ",r.createElement(t.em,null,"highly")," recommend giving ",r.createElement(t.a,{href:"http://www.contextis.com/documents/2/Browser_Timing_Attacks.pdf"},"Pixel perfect timing attacks with HTML5")," a read. It’s at least 2 orders of magnitude cooler than my article.\n[^10]: …but just wait until you see the next one."))}var o=function(e){void 0===e&&(e={});var t=Object.assign({},(0,i.ah)(),e.components).wrapper;return t?r.createElement(t,e,r.createElement(c,e)):c(e)},d=a(9357),m=a(1883),h=["data"];function g(e){var t=e.data,a=(0,n.Z)(e,h);return r.createElement(d.Z,Object.assign({},a,{title:t.mdx.fields.title}))}function p(e){var t=e.data,a=e.children,n=t.mdx.fields;return r.createElement(r.Fragment,null,r.createElement("header",{className:"top-nav",role:"banner"},r.createElement("nav",{role:"navigation"},r.createElement("h1",null,r.createElement(m.Link,{to:"/"},"Riley Shaw"))," "," / ",r.createElement(m.Link,{to:"/blog"},"Blog")," / ",n.title)),r.createElement("main",null,r.createElement("article",{className:"blog-post-content",role:"article"},r.createElement("header",null,r.createElement("h1",null,n.title),r.createElement("div",{className:"subheading"},r.createElement("time",null,"Posted ",n.date))),r.createElement("div",{className:"blog-post-markdown"},a))))}function u(e){return r.createElement(p,e,r.createElement(o,e))}},3744:function(e,t,a){a.d(t,{B:function(){return r}});var n=a(7294),i={edit:{title:"Edit"},note:{title:"Note"},update:{title:"Update"}};t.Z=function(e){var t=e.children,a=e.date,r=e.type,s=void 0===r?"update":r;return n.createElement("div",{className:"blog-banner blog-banner-"+s},n.createElement("div",{className:"blog-banner-title"},i[s].title+(a?" "+a:"")+":"),n.createElement("div",{className:"blog-banner-content"},t))};var r=function(e){var t=e.children;return n.createElement("div",{className:"blog-banner-group"},t)}},7008:function(e,t,a){var n=a(7294);t.Z=function(e){var t=e.caption,a=e.children,i=e.width;return n.createElement("figure",{className:"blog-figure"},i?n.createElement("div",{width:i},a):a,n.createElement("figcaption",null,t))}},9357:function(e,t,a){var n=a(1883),i=a(7294);t.Z=function(e){var t=e.description,a=void 0===t?"":t,r=e.title,s=e.children,l=(0,n.useStaticQuery)("3605882644").site,c=(r||l.siteMetadata.title)+" · "+l.siteMetadata.titlePostfix,o=(r?r+" · ":"")+l.siteMetadata.title,d=a||l.siteMetadata.description;return i.createElement(i.Fragment,null,i.createElement("title",null,c),i.createElement("meta",{name:"description",content:d}),i.createElement("meta",{name:"og:title",content:o}),i.createElement("meta",{name:"og:description",content:d}),i.createElement("meta",{name:"og:type",content:"website"}),i.createElement("meta",{name:"twitter:title",content:o}),i.createElement("meta",{name:"twitter:description",content:d}),i.createElement("meta",{name:"twitter:card",content:"summary"}),i.createElement("meta",{name:"twitter:creator",content:l.siteMetadata.author}),s)}}}]);
//# sourceMappingURL=component---src-templates-post-js-content-file-path-users-lamp-code-rileyjshaw-src-data-markdown-posts-published-2014-11-12-stealing-history-with-css-binary-trees-mdx-c6307ce9f8a166f86ea0.js.map