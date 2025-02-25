import e from "express";
import path from "path";
const app = e();

const port = 8069;

const ROOT_DIR = process.cwd();

app.use(e.static(path.join(ROOT_DIR, '/static'))); // express directly sends static resources from this path

const sendHTMLFile = (fileName, res) => {
    res.sendFile(path.join(ROOT_DIR, fileName), err => {
        if (err) {
            res.status(500).send('Error sending file');
        }
    });
};

app.get('/', (req, res) => sendHTMLFile('index.html', res));
app.get('/contact-me', (req, res) => sendHTMLFile('contact-me.html', res));
app.get('/about', (req, res) => sendHTMLFile('about.html', res));

// using 
app.use((req, res) => {
    res.status(404).sendFile(path.resolve(ROOT_DIR, "404.html"), err => {
        if (err) {
            res.status(400).send('File not found!');
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://127.0.0.1:${port}`);
})