const scrapeHtmlWeb = require("../lib/scraper");

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
