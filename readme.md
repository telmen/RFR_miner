Requirements
============

- node.js
- chrome

Preperation
===========

In this dir:

    npm install
    node index.js

Then need to login. Once you logged in, your session is in `./userData` folder.

Run
===

Give a following command again and let it mine and forget:

    node index.js

Run headless
------------

When you give `headless: true` in `puppeteer.launc` function in code, puppeteer launches headless browser and runs code on it. It means it isn't needed GUI anymore, only in CLI. It can run in server without GUI and eats less resources of your pressious.

Check
=====

When you runs this hedlessly, how to check what's going on. In `exmaple.png`, it takes screenshot every 5 secons.

Good luck and get rich :smirk: