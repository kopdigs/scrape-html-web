# scrape-html-web

Website scraper

## Installation

```
npm install scrape-html-web
```

## Usage

```javascript
//example
const options = {
  url: "https://nodejs.org/en/blog/",
  mainSelector: ".blog-index",
  childrenSelector: [
    { key: "date", selector: "time", attr: "", type: "text" },
    { key: "version", selector: "a", attr: "", type: "text" },
  ],
};

(async () => {
  const data = await scrapeHtmlWeb(options);
  console.log(data);
})();
```

## options

- _url_ - urls to scraper site web, _required_
- _mainSelector_ - indicates the main selector where to start scraping, _required_
- _childrenSelector_ - is an array made up of parameters to define the object we expect to receive, _required_
  - key: is the name of the key
  - selector: is the name of the selector that is searched for in the HTML that is contained by the parent
  - attr: _only for specific items_ [img, a] indicates what kind of attribute you want to get
    > possible values:[href, src]
  - type: indicates the type of value to be obtained
    > possible values: [text, html]
