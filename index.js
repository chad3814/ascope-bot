import path from 'path';
import { fileURLToPath } from 'url';

import bodyJson from 'body/json.js';
import express from 'express';

const app_id = 'A03F361J7HS';
const client_id = '13914448644.3513205619604';
const bot_token = process.env['BOT_TOKEN'];
const dirname = path.dirname(fileURLToPath(import.meta.url));

const sendToSlack = (channel, text, extra) => {
    const json = JSON.stringify({channel, text, ...extra});
}

const app = express();
app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});
app.use(express.static(dirname));
app.post('/facepalm', (req, res) => {
    const channel_id = body.channel_id;
    const blocks = [
      {
        type: 'image',
        image_url:
          'https://ascope.chadshost.xyz/images/chris-facepalm.png',
        alt_text: 'facepalm',
      },
    ];

    res.set('Content-Type', 'application/json');
    res.write(JSON.stringify({
        response_type: 'in_channel',
        text: 'facepalm',
        blocks,
    }));
});

const port = parseInt(process.argv[2], 10) || 80;
app.listen(port);
