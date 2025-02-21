import { createServer } from 'node:http';
import { URL } from 'node:url';
import fs from 'node:fs';

const port = 8069;

function getToReturn(path, res, contentType = 'text/html') {
    fs.readFile(path, (err, data) => {
        if (err) {
            res.writeHead(500);
            return res.end('uhm, error?');
        }
        res.writeHead(200, { 'Content-type' : contentType });
        res.write(data);
        res.end();
    })
}

const server = createServer((req, res) => {
    const pathname = req.url.split('?')[0];

    console.log(pathname);
    if (pathname.endsWith('.css')) {
        return getToReturn(`.${pathname}`, res, 'text/css');
    } else if (pathname.endsWith('.ico')) {
        return getToReturn(`.${pathname}`, res, 'image/x-icon');
    }

    switch (pathname) {
        case '/':
            getToReturn(`./index.html`, res);
            break;

        case '/about':
        case '/contact-me':
            getToReturn(`.${pathname}.html`, res);
            break;

        default:
            res.statusCode = 404;
            getToReturn(`./404.html`, res);
            break;
    }
});

server.listen(port, () => {
    console.log(`Server running at http://127.0.0.1:${port}`);
})