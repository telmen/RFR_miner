# Refereum Miner

## Requirements

- NodeJS
- Chromium

## Preparation

Run the following commands:

```sh
npm install
node index.js
```

then log in using your credentials. Once you logged in, your session will live in `./userData` folder.

## Run

> Run the following command again and let it mine and forget:

```sh
node index.js
```

## Run headless

When you pass `headless: true` in `puppeteer.launch` function in the code, Puppeteer launches headless browser and runs code on it. It means that it doesn't need GUI, runs only on command-line interface. It can run in server without GUI and eats less resources of your pressious.

## Check
=====

When you run headlessly, how to check what's going on. In `example.png`, it takes screenshot every 5 seconds.

Good luck and get rich :smirk:
