const https = require('https');
const http = require('http');
const { JSDOM } = require('jsdom');

// creating HTTP server
const server = http.createServer((req, res) => {
    if (req.url === '/latest-stories' && req.method === 'GET') {
        https.get('https://time.com', (response) => {
            let data = '';

            response.on('data', (chunk) => {
                data += chunk;
            });

            response.on('end', () => {
                try {
                    const dom = new JSDOM(data);
                    const document = dom.window.document;

                    const listItems = document.querySelectorAll('.latest-stories__item');
                    const stories = Array.from(listItems).map((item) => {
                        const title = item.querySelector('h3')?.textContent?.trim();
                        const link = item.querySelector('a')?.getAttribute('href');
                        return title && link
                            ? {
                                  title,
                                  link: `https://time.com${link}`,
                              }
                            : null;
                    }).filter(Boolean); //removing null entries

                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(stories));
                } catch (error) {
                    console.error('Error parsing HTML:', error);
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Failed to process data' }));
                }
            });
        }).on('error', (err) => {
            console.error('Error fetching data:', err);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Failed to fetch data from source' }));
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Route not found' }));
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/latest-stories`);
});
