---
layout: post
title: 'Riddle: chicken prices'
tags:
    - math
    - riddle
tldr: 'I wrote a comment on Hacker News that people liked.'
---

Someone posted a riddle to [Hacker News](https://news.ycombinator.com/item?id=8486278) a few days ago:

> Three farmers were selling chickens at the local market. One farmer had 10 chickens to sell, another had 16 chickens to sell, and the last had 26 chickens to sell. In order not to compete with each other, they agreed to all sell their chickens at the same price. But by lunchtime, they decided that sales were not going so well, and they all decided to lower their prices to the same lower price point. By the end of the day, they had sold all their chickens. It turned out that they all collected the same amount of money, \$35, from the day's chicken sales. What was the price of the chickens before lunchtime and after lunchtime?

I'd been [nerd sniped](http://xkcd.com/356/), and judging by the number of potential solutions on the thread I wasn't the only one. At the time, most answers were using code to brute-force the answer.

```python
[(a, b, x, y, z) for a in xrange(1, 500) for b in xrange(1, a) for x in xrange(1, 11) for y in xrange(1, x) for z in xrange(1, y) if 3500 == a*x + b*(10 - x) == a*y + b*(16 - y) == a*z + b*(26 - z)]
```

I decided to solve it mathematically. My post became the top-rated answer so I'm sharing it here. It's a fun little problem, and if you're intrigued I urge you to try it yourself before letting me ruin it for you.

Here's what I came up with:

> `Farmer 1 has 10 chickens`<br/> > `Farmer 2 has 16 chickens`<br/> > `Farmer 3 has 26 chickens`

> `Price before lunch: x`<br/> > `Price after lunch: y`

> `Number of chickens sold before lunch by farmers 1, 2, 3: a, b, c`

> `Total earned by each farmer: $35`

We're told that,

> `x > y`

and can logically deduce that,

> `a > b > c`

because otherwise, the farmers with less chickens would have no chance of making the same amount as the other farmer.[^1]
From this information, we know that:

> `ax + (10 - a)y = bx + (16 - b)y = cx + (26 - c)y = 35`

Let's isolate the first and second farmers here:

> `ax + (10 - a)y = bx + (16 - b)y`<br/> > `ax - ay + 10y + bx - by + 16y = 0`<br/> > `(a - b)(x - y) = 6y`

We can do the same between farmers 1 and 3:

> `(a - c)(x - y) = 16y`

These two formulas yield,

> `(a - b) = (3 / 8)(a - c)`

Since `a > b > c`,

> `(a - b) > 0`<br/> > `(a - c) > 0`

Since farmer 1 only has 10 chickens,

> `a ≤ 10`

Since you can't sell negative chickens,

> `b ≥ 0`<br/> > `c ≥ 0`

And since the problem isn't very interesting if the farmers are allowed to sell half-chickens, a, b, and c (and the difference between them) are integers.

Given all of this, `0 ≤ (a - b)`, `(a - c) ≤ 10`. The only numbers that satisfy this and,

> `(a - b) = (3 / 8)(a - c)`

are,

> `(a - b) = 3`<br/> > `(a - c) = 8`

Since `c ≥ 0` and `a ≤ 10`, we have three triplets to consider:

> `a = 10: {10, 7, 1}`<br/> > `a = 9: {9, 6, 1}`<br/> > `a = 8: {8, 5, 0}`

We can find the relationship between `x` and `y` from an earlier equation:

> `(a - b)(x - y) = 6y`<br/> > `3(x - y) = 6y`<br/> > `3x = 9y`<br/> > `x = 3y`

So the farmers reduced their price to a third of the original price during the afternoon. What a deal!

We've got a few equations that look like,

> `ax + (10 - a)y = 35`

Which we can now simplify to,

> `2ay + 10y = 35`

By plugging `[10, 9, 8]` into the above formula, the only value that gives us a proper dollar amount for `y` is `a = 9`. So...

> `y = $1.25`<br/> > `x = $3.75`

As commenter [alsocasey](https://news.ycombinator.com/item?id=8487758) noted:

> The only odd thing about this answer is that farmer 1 apparently decided to lower prices after selling 9 of his 10 chickens in the morning...

## Footnotes

[^1]: This is assuming that they didn't decide to "sell" their chickens for \$0 in the afternoon, which is probably a safe bet.
