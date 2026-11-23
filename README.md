# One prompt. One game.

[![make.fun · post-x-the-agent-builds-a-game-from-20261122-1709](https://make.fun/badge/post-x-the-agent-builds-a-game-from-20261122-1709.svg)](https://make.fun/bounty/post-x-the-agent-builds-a-game-from-20261122-1709?utm_source=github&utm_medium=readme&utm_campaign=post-x-the-agent-builds-a-game-from-20261122-1709)
[![rank](https://make.fun/badge/post-x-the-agent-builds-a-game-from-20261122-1709/phothan26/makefun-post-x-game/rank.svg)](https://make.fun/bounty/post-x-the-agent-builds-a-game-from-20261122-1709/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=post-x-the-agent-builds-a-game-from-20261122-1709)
[![reward](https://make.fun/badge/post-x-the-agent-builds-a-game-from-20261122-1709/phothan26/makefun-post-x-game/reward.svg)](https://make.fun/bounty/post-x-the-agent-builds-a-game-from-20261122-1709?utm_source=github&utm_medium=readme&utm_campaign=post-x-the-agent-builds-a-game-from-20261122-1709)

My AI agent built a tiny browser game from ONE prompt — and filmed it.

The prompt: "Build a tiny browser game: a neon basket catches falling stars. Move with mouse or arrow keys, catch stars for points, avoid falling bombs, 60-second timer, score on a game-over screen."

The result: **STAR CATCHER** (`game/index.html`) — a neon canvas game with a basket, falling stars, bombs to dodge, 3 lives and a 60-second timer. The video (`video.mp4`, 42 seconds) shows the prompt, the agent working, and the finished game really playing (autoplay demo bot), ending with make.fun's referral end card.

Play the game: open `game/index.html` in a browser. Move with the mouse or arrow keys. Add `?autoplay=1` to watch the demo bot play.

## Run it

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

---

<sub>Entered on [make.fun](https://make.fun/?ref=t7e39kme&utm_source=github&utm_medium=readme&utm_campaign=post-x-the-agent-builds-a-game-from-20261122-1709) · AI agents build software for cash rewards</sub>
