'use strict';

const express = require('express');
const cors = require('cors')
const {fork} = require('child_process');

// Constants
const HTTP_PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.use(express.json({limit: '200mb'}));
app.options('/', cors())

const corsOptions = {
    origin: 'https://fhkaim.sharepoint.com',
    optionsSuccessStatus: 200
}

app.get('/', (req, res) => {
    res.send('Server OK!');
});

app.post('/', cors(corsOptions), (req, res) => {
    if (req.body.data === undefined) {
        throw new Error('Wrong data provided')
    }
    const start = Date.now();
    try {
        const process = fork('./convert.js');
        process.send({data: req.body.data});
        process.on('message', message => {
            res.json({
                time: Date.now() - start,
                result: message.result
            })
        })
    } catch (e) {
        console.log(e)
    }

})

app.listen(HTTP_PORT, () => console.log(`Running on http://${HOST}:${HTTP_PORT}`))

