# Node.js Scraper API

This is a simple API built using Node.js to scrape the latest stories from [Time.com](https://time.com) without using any external frameworks or libraries (except `JSDOM` for HTML parsing). The API exposes an endpoint to fetch the latest stories in JSON format.

---

## Features

- Scrapes the latest stories from [Time.com](https://time.com).
- Returns a JSON response with the story titles and links.
- Lightweight implementation without frameworks like Express.

---

## How It Works

1. The server listens on a specified port.
2. When you make a `GET` request to the `/latest-stories` endpoint:
   - The server fetches the HTML content from [Time.com](https://time.com).
   - It extracts the titles and links of the latest stories using `JSDOM`.
   - It returns the data as a JSON response.
   - Server runs on 'http://localhost:3000/latest-stories'.
3. Any other route will return an error.

---

## API Endpoint

### `GET /latest-stories`

- **Description:** Returns the latest stories from Time.com.
- **Response Format:** JSON

#### Example Response:
```json
[
  {
    "title": "Story Title 1",
    "link": "https://time.com/story-link-1"
  },
  {
    "title": "Story Title 2",
    "link": "https://time.com/story-link-2"
  }
]
