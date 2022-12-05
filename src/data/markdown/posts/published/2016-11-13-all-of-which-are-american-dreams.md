---
layout: post
title: All of which are American dreams
tags: ['build', 'web', 'tools']
---

Title lifted from <a href="https://youtu.be/4smim2MNvF8" rel="noopener noreferrer" target="_blank">“Know Your Enemy”</a>.

The results of the US presidential election last Tuesday shocked me. I checked Twitter to find that my entire feed felt the same. Again. Oops, I created a comfortable echo-chamber for myself.

Social news algorithms have been under intense scrutiny over the past week. I wanted to see what other people’s social media bubbles looked like, so I wrote a little shell script[^1].

I’m not interested in building empathy for racists. I _am_ interested in improving my own awareness. This tool displaces me from the narrative I chose and delivers me from opinions I agree with. It’s helped me realize just how powerful a curated social feed can be as a tool of persuasion. Also, wow. People who follow Glenn Beck seem to follow a _lot_ of porn. Who knew?

If you want to peer into someone else’s Twitter feed, the following might help[^2]:

```bash
#!/bin/bash

# Create a private Twitter list out of someone else’s feed so you can read it.
# The name “ditter” is like “ditto” plus “Twitter” ha ha get it?
#
# Requires Python, GNU coreutils, and https://github.com/sferik/t
#
# Installation:
#
#     $ chmod 777 ditter.sh && mv ditter.sh /usr/local/bin/ditter
#
# Usage:
#
#     $ ditter <username> [<list_name>]

THEIR_USERNAME=${1}
MY_USERNAME="$(t whoami | grep '^Screen name' | grep -o '[^@]*$')"
LIST_NAME=${2:-"$THEIR_USERNAME-feed"}

t list create --private "$LIST_NAME"

# I aliased GNU split to “gsplit” on my Mac. You may need to change this.
t followings "$THEIR_USERNAME" \
  | gsplit -l 100 --filter="xargs t list add \"$LIST_NAME\""

python -mwebbrowser "https://twitter.com/$MY_USERNAME/lists/$LIST_NAME"
```

It’s not pretty, but it works for me[^3]. Here are some usage examples:

```bash
# View the feed of a random person who follows the “FOX Files”.
# Warning: You’re about to view a complete stranger’s feed. NSFW.
t followers foxfilesfnc | gshuf | head -1 | xargs ditter

# View the feed of the last person to use the Make America Great Again hashtag.
t search all "#maga" -cn 1 | tail -1 | cut -d, -f3 | xargs ditter
```

I’m in the habit of quietly throwing projects like this onto my [lab](/lab) page, but enough people have expressed frustration in the past week to make this share-worthy. Hope it helps!

## Footnotes

[^1]: Twitter used to actually offer this as part of their official client. They removed the functionality in 2013.
[^2]: MacOS comes loaded with BSD utils, so I grabbed the GNU equivalents with <code className="language-javascript">brew install coreutils</code>. That’s what <code className="language-bash">gsplit</code> and <code className="language-bash">gshuf</code> are.
[^3]: Restrictions apply:

    -   Twitter has [a longstanding issue](https://twittercommunity.com/t/nondeterminstic-behavior-for-lists-members-create-all/53640/22) where bulk lists created through the API might be missing members. It’s nothing a little <code className="language-bash">while</code> loop can’t fix, and even an incomplete list can be enough.
    -   <code className="language-bash">t</code> has <a href="https://github.com/sferik/t/issues/263" rel="noopener noreferrer" target="_blank">its own longstanding issue</a>: it runs up against rate limits if you use it to fetch a large list of followers. This one probably requires a patch or PR.
