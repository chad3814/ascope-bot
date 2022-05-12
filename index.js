import { fileURLToPath } from 'url';
import path, { resolve } from 'path';
import { readFileSync } from 'fs';

import bodyAny from 'body/any.js';
import express from 'express';
import fetch from 'node-fetch';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const bot_token = readFileSync(path.join(dirname, 'slack_token.txt'), 'utf-8');

const bodyParser = (req) => {
    return new Promise((resolve, reject) => {
        return bodyAny(req, (err, body) => {
            if (err) {
                return reject(err);
            }
            return resolve(body);
        });
    });
};

const sendToSlack = async (channel, text, extra = {}) => {
    const body = JSON.stringify({
        channel,
        text,
        ...extra,
    });
    const resp = await fetch('https://slack.com/api/chat.postMessage', {
        headers:{
            'Authorization': `Bearer ${bot_token}`,
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body,
    });
    const json = await resp.json();
    console.log('sendToSlack', json);
};

const app = express();
app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});
app.use(express.static(dirname));

app.post('/facepalm', async (req, res) => {
    res.end();
    const body = await bodyParser(req);

    const blocks = [
      {
        type: 'image',
        image_url:
          'https://ascope.chadshost.xyz/images/chris-facepalm.png',
        alt_text: 'facepalm',
      },
    ];

    await sendToSlack(body.channel_id, 'facepalm', {
        blocks,
    });
});

app.get('/wotd', async (req, res) => {
    res.end('OK');
    await sendToSlack('C02FSTKLP98', 'https://www.merriam-webster.com/word-of-the-day', {
        username: 'Word of the Day',
        unfurl_links: true,
        icon_emoji: 'calendar',
    });
});

const port = parseInt(process.argv[2], 10) || 80;
app.listen(port);
