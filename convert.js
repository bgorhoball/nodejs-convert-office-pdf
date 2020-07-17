const libre = require('libreoffice-convert');

process.on('message', message => {
    const buff = Buffer.from(message.data, 'base64')
    libre.convert(buff, '.pdf', undefined, (err, data) => {
        if (err) {
            process.send({err})
            console.log(`${err}`);
        }
        const result = data.toString('base64')
        process.send({result})
    })
})