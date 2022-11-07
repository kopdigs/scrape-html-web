# scrape-html-web

Extract content from a static HTML website.

**Note:**
_two dependencies are included in order to work:_
* [axios](https://www.npmjs.com/package/cheerio) - retrieve the web page
* [cheerio](https://www.npmjs.com/package/axios) - manage content scraping based you have formatted selectors

## Installation

```
npm install scrape-html-web
```

## Usage

```javascript
import { scrapeHtmlWeb } from "scrape-html-web";

//example
const options = {
  url: "https://nodejs.org/en/blog/",
  mainSelector: ".blog-index",
  childrenSelector: [
    { key: "date", selector: "time", type: "text" },
    // by default, the first option that is taken into consideration is att
    { key: "version", selector: "a", type: "text" },
    { key: "link", selector: "a", attr: "href" },
  ],
};

(async () => {
  const data = await scrapeHtmlWeb(options);
  console.log(data);
})();
```

## Response
```javascript

//Example response

[
  {
    date: '04 Nov',
    version: 'Node v18.12.1 (LTS)',
    link: '/en/blog/release/v18.12.1/'
  },
  {
    date: '04 Nov',
    version: 'Node v19.0.1 (Current)',
    link: '/en/blog/release/v19.0.1/'
  },
  ...
  {
    date: '11 Jan',
    version: 'Node v17.3.1 (Current)',
    link: '/en/blog/release/v17.3.1/'
  },
  {
    date: '11 Jan',
    version: 'Node v12.22.9 (LTS)',
    link: '/en/blog/release/v12.22.9/'
  }
]

```

## options

* [url](#url) - urls to scraper site web, _required_
* [mainSelector](#mainselector) - indicates the main selector where to start scraping, _required_
* [childrenSelector](#childrenselector) - is an array made up of parameters to define the object we expect to receive, _required_

#### url
```javascript
const options = {
  url: "https://nodejs.org/en/blog/" //url from which you want to extrapolate the data,
  ...
};
```

#### mainSelector
```javascript
const options = {
   ...
   mainSelector: ".blog-index" //the parent selector where you want to start from,
   ...
};

//Extract **HTML**:

//example HTML
<ul class="blog-index">
    <li>
      <time datetime="2022-11-04T22:34:29+0000">04 Nov</time>
      <a href="/en/blog/release/v18.12.1/">Node v18.12.1 (LTS)</a>
    </li>
    <li>
      <time datetime="2022-11-04T18:05:19+0000">04 Nov</time>
      <a href="/en/blog/release/v19.0.1/">Node v19.0.1 (Current)</a>
    </li>
</ul>
```

#### childrenSelector
```javascript
const options = {
  ...
  childrenSelector: [
    { key: "date", selector: "time", type: "text" },
    { key: "version", selector: "a", type: "text" },
    { key: "link", selector: "a", attr: "href" },
  ],
};
```

- **key:** is the name of the key
- **selector:** is the name of the selector that is searched for in the HTML that is contained by the parent
- **attr:** _only for specific items_ [img, a] indicates what kind of attribute you want to get
  > Some of the more common attributes are − [ className, tagName, id, href, title, rel, src, style ]
- **type:** indicates the type of value to be obtained
  > possible values: [ **text** , **html** ]
