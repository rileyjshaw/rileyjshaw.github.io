"use strict";(self.webpackChunkrileyjshaw_com=self.webpackChunkrileyjshaw_com||[]).push([[575],{7477:function(e,n,t){t.r(n),t.d(n,{Head:function(){return m},default:function(){return s}});var l=t(1151),a=t(7294);function r(e){const n=Object.assign({p:"p",blockquote:"blockquote",a:"a",pre:"pre",code:"code",sup:"sup",section:"section",h2:"h2",ol:"ol",li:"li"},(0,l.a)(),e.components);return a.createElement(a.Fragment,null,a.createElement(n.p,null,"Someone posted a riddle a few days ago:"),"\n",a.createElement(n.blockquote,null,"\n",a.createElement(n.p,null,"Three farmers were selling chickens at the local market. One farmer had 10 chickens to sell, another had 16 chickens to sell, and the last had 26 chickens to sell. In order not to compete with each other, they agreed to all sell their chickens at the same price. But by lunchtime, they decided that sales were not going so well, and they all decided to lower their prices to the same lower price point. By the end of the day, they had sold all their chickens. It turned out that they all collected the same amount of money, $35, from the day’s chicken sales. What was the price of the chickens before lunchtime and after lunchtime?"),"\n"),"\n",a.createElement(n.p,null,"I’d been ",a.createElement(n.a,{href:"http://xkcd.com/356/"},"nerd sniped"),", and judging by the number of potential solutions on the thread I wasn’t the only one. At the time, most answers were using code to brute-force the answer."),"\n",a.createElement(n.pre,null,a.createElement(n.code,{className:"language-python"},"[(a, b, x, y, z) for a in xrange(1, 500) for b in xrange(1, a) for x in xrange(1, 11) for y in xrange(1, x) for z in xrange(1, y) if 3500 == a*x + b*(10 - x) == a*y + b*(16 - y) == a*z + b*(26 - z)]\n")),"\n",a.createElement(n.p,null,"I decided to solve it mathematically. My post became the top-rated answer so I’m sharing it here. It’s a fun little problem, and if you’re intrigued I urge you to try it yourself before letting me ruin it for you."),"\n",a.createElement(n.p,null,"Here’s what I came up with:"),"\n",a.createElement(n.pre,null,a.createElement(n.code,null,"Farmer 1 has 10 chickens\nFarmer 2 has 16 chickens\nFarmer 3 has 26 chickens\n")),"\n",a.createElement(n.pre,null,a.createElement(n.code,null,"Price before lunch: x\nPrice after lunch: y\n")),"\n",a.createElement(n.pre,null,a.createElement(n.code,null,"Number of chickens sold before lunch by farmers 1, 2, 3: a, b, c\n")),"\n",a.createElement(n.pre,null,a.createElement(n.code,null,"Total earned by each farmer: $35\n")),"\n",a.createElement(n.p,null,"We’re told that,"),"\n",a.createElement(n.pre,null,a.createElement(n.code,null,"x > y\n")),"\n",a.createElement(n.p,null,"and can logically deduce that,"),"\n",a.createElement(n.pre,null,a.createElement(n.code,null,"a > b > c\n")),"\n",a.createElement(n.p,null,"because otherwise, the farmers with less chickens would have no chance of making the same amount as the other farmer.",a.createElement(n.sup,null,a.createElement(n.a,{href:"#user-content-fn-1",id:"user-content-fnref-1","data-footnote-ref":!0,"aria-describedby":"footnote-label"},"1")),"\nFrom this information, we know that:"),"\n",a.createElement(n.pre,null,a.createElement(n.code,null,"ax + (10 - a)y = bx + (16 - b)y = cx + (26 - c)y = 35\n")),"\n",a.createElement(n.p,null,"Let’s isolate the first and second farmers here:"),"\n",a.createElement(n.pre,null,a.createElement(n.code,null,"ax + (10 - a)y = bx + (16 - b)y\nax - ay + 10y + bx - by + 16y = 0\n(a - b)(x - y) = 6y\n")),"\n",a.createElement(n.p,null,"We can do the same between farmers 1 and 3:"),"\n",a.createElement(n.pre,null,a.createElement(n.code,null,"(a - c)(x - y) = 16y\n")),"\n",a.createElement(n.p,null,"These two formulas yield,"),"\n",a.createElement(n.pre,null,a.createElement(n.code,null,"(a - b) = (3 / 8)(a - c)\n")),"\n",a.createElement(n.p,null,"Since ",a.createElement(n.code,null,"a > b > c"),","),"\n",a.createElement(n.pre,null,a.createElement(n.code,null,"(a - b) > 0\n(a - c) > 0\n")),"\n",a.createElement(n.p,null,"Since farmer 1 only has 10 chickens,"),"\n",a.createElement(n.pre,null,a.createElement(n.code,null,"a ≤ 10\n")),"\n",a.createElement(n.p,null,"Since you can’t sell negative chickens,"),"\n",a.createElement(n.pre,null,a.createElement(n.code,null,"b ≥ 0\nc ≥ 0\n")),"\n",a.createElement(n.p,null,"And since the problem isn’t very interesting if the farmers are allowed to sell half-chickens, a, b, and c (and the difference between them) are integers."),"\n",a.createElement(n.p,null,"Given all of this, ",a.createElement(n.code,null,"0 ≤ (a - b)"),", ",a.createElement(n.code,null,"(a - c) ≤ 10"),". The only numbers that satisfy this and,"),"\n",a.createElement(n.pre,null,a.createElement(n.code,null,"(a - b) = (3 / 8)(a - c)\n")),"\n",a.createElement(n.p,null,"are,"),"\n",a.createElement(n.pre,null,a.createElement(n.code,null,"(a - b) = 3\n(a - c) = 8\n")),"\n",a.createElement(n.p,null,"Since ",a.createElement(n.code,null,"c ≥ 0")," and ",a.createElement(n.code,null,"a ≤ 10"),", we have three triplets to consider:"),"\n",a.createElement(n.pre,null,a.createElement(n.code,null,"a = 10: {10, 7, 1}\na = 9: {9, 6, 1}\na = 8: {8, 5, 0}\n")),"\n",a.createElement(n.p,null,"We can find the relationship between ",a.createElement(n.code,null,"x")," and ",a.createElement(n.code,null,"y")," from an earlier equation:"),"\n",a.createElement(n.pre,null,a.createElement(n.code,null,"(a - b)(x - y) = 6y\n3(x - y) = 6y\n3x = 9y\nx = 3y\n")),"\n",a.createElement(n.p,null,"So the farmers reduced their price to a third of the original price during the afternoon. What a deal!"),"\n",a.createElement(n.p,null,"We’ve got a few equations that look like,"),"\n",a.createElement(n.pre,null,a.createElement(n.code,null,"ax + (10 - a)y = 35\n")),"\n",a.createElement(n.p,null,"Which we can now simplify to,"),"\n",a.createElement(n.pre,null,a.createElement(n.code,null,"2ay + 10y = 35\n")),"\n",a.createElement(n.p,null,"By plugging ",a.createElement(n.code,null,"[10, 9, 8]")," into the above formula, the only value that gives us a proper dollar amount for ",a.createElement(n.code,null,"y")," is ",a.createElement(n.code,null,"a = 9"),". So…"),"\n",a.createElement(n.pre,null,a.createElement(n.code,null,"y = $1.25\nx = $3.75\n")),"\n",a.createElement(n.p,null,"As commenter ",a.createElement(n.a,{href:"https://news.ycombinator.com/item?id=8487758"},"alsocasey")," noted:"),"\n",a.createElement(n.blockquote,null,"\n",a.createElement(n.p,null,"The only odd thing about this answer is that farmer 1 apparently decided to lower prices after selling 9 of his 10 chickens in the morning…"),"\n"),"\n",a.createElement(n.section,{"data-footnotes":!0,className:"footnotes"},a.createElement(n.h2,{className:"sr-only",id:"footnote-label"},"Footnotes"),"\n",a.createElement(n.ol,null,"\n",a.createElement(n.li,{id:"user-content-fn-1"},"\n",a.createElement(n.p,null,"This is assuming that they didn’t decide to “sell” their chickens for $0 in the afternoon, which is probably a safe bet. ",a.createElement(n.a,{href:"#user-content-fnref-1","data-footnote-backref":!0,className:"data-footnote-backref","aria-label":"Back to content"},"↩")),"\n"),"\n"),"\n"))}var c=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,l.a)(),e.components);return n?a.createElement(n,e,a.createElement(r,e)):r(e)},o=t(9389);function m(e){let{data:n,...t}=e;return a.createElement(o.Z,Object.assign({},t,{title:n.mdx.fields.title}))}function i(e){let{data:n,children:t}=e;const{mdx:l}=n,{fields:r}=l;return a.createElement("main",null,a.createElement("div",{className:"page-content"},a.createElement("article",{className:"blog-post-content prose prose-lg",role:"article"},a.createElement("header",null,a.createElement("h1",null,r.title),a.createElement("div",{className:"subheading"},a.createElement("time",null,"Posted ",r.date))),a.createElement("div",{className:"blog-post-markdown"},t))))}function s(e){return a.createElement(i,e,a.createElement(c,e))}}}]);
//# sourceMappingURL=component---src-templates-post-jsx-content-file-path-src-data-markdown-posts-published-2014-10-28-chicken-prices-md-4dece3431bda672dff89.js.map