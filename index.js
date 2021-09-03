// Refereum.com gives tickets for watching stream from Twitch.tv
// random ticket owner gets 10'000RFR token for winning
// many tickets increase change of winning
// tickets removed when user won
// this dirty little robot can watch stream and refreshes itself when stream stops any way

// warning: when you want to stop, quit Chrome right way for first, then terminate, because may have session broke

const puppeteer = require("puppeteer");

(async () => {
    const browser = await puppeteer.launch({
        // when you wanna run this in only CLI, it means not GUI, comment a following line
        headless: false,
        // using Chrome, because Chromium can't play video stream, because license
        // that's need to be corrected for current env
        executablePath: '/snap/bin/chromium',
        // saving browser data for login session to Twitch.tv and Refereum.com
        // need to login Refereum.com by Twitch.tv once for first time
        userDataDir: './userData',
        // this args for accessing iFrame content fro embed Twitch player
        args: [
            '--disable-web-security',
            '--disable-features=IsolateOrigins,site-per-process'
        ]
    });

    const page = (await browser.pages())[0];

    let timer; // for saving setTimeout for canceling it
    let tickets = 0; // for checking tickets are increasing
    // must be greater than 1000 (1 minute)
    // when passes this timeout, it will be restarted
    const timeout = 150000;

    // handling new ticket numbers
    // Refereum.com makes request for every minute
    page.on('response', async (res) => {
        if (res.url() === 'https://refereum.com/Home/Tickets') {
            let t = await res.text();
            console.log(t);
            t = parseInt(t);
            clearTimeout(timer);
            if (!isNaN(t) && tickets < t) {
                tickets = t;
                timer = setTimeout(start, timeout);
            } else {
                start();
            }
        }
    });

    const start = async () => {
        timer = setTimeout(start, timeout);

        console.log('starting...');
        await page.goto("https://refereum.com");
        await page.waitForSelector("div#twitchPlayer iframe");
        const elementHandle = await page.$('div#twitchPlayer iframe');
        const frame = await elementHandle.contentFrame();
        await frame.evaluate(() => {
            // sometimes, mature content appears, then player stops for approves
            localStorage.setItem('mature', 'true');
            // sound is annoying
            localStorage.setItem("volume", "0");
        });

        // above lines just for set stream quality to 160p30
        await frame.waitForSelector('button[aria-label="Settings"]');
        await frame.click('button[aria-label="Settings"]');
        await frame.waitForSelector('button[data-a-target="player-settings-menu-item-quality"]');
        await frame.click('button[data-a-target="player-settings-menu-item-quality"]');
        const [button] = await frame.$x("//label[contains(., '160p')]")
        button.click();
    }

    start(); // first of all, we need to start manually, then it's automatically refreshes itself

    const takescreenshot = async () => {
        await page.screenshot({path: 'example.png'});
    };

    setInterval(takescreenshot, 5000);
})();
