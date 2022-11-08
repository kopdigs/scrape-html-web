import scrapeHtmlWeb from "../lib/scraper";

/*
  Example 1:
  - retrieve the list of Node versions from the official site
*/

const optionsFirstExample = {
  url: "https://nodejs.org/en/blog/",
  mainSelector: ".blog-index",
  childrenSelector: [
    { key: "date", selector: "time", type: "text" },
    { key: "version", selector: "a", type: "text" },
    { key: "link", selector: "a", attr: "href" },
  ],
};

(async () => {
  const data = await scrapeHtmlWeb(optionsFirstExample);
  console.log("example 1 :", data);
})();

/*
  Example 2:
  - second example that integrates the new replace parameter to be able to manipulate strings in selectors
*/

const optionsSecondExample = {
  url: "https://nodejs.org/en/blog/",
  mainSelector: ".blog-index",
  childrenSelector: [
    {
      key: "date",
      selector: "time",
      type: "text",
      replace: (text) => text + " 2022",
    },
    {
      key: "version",
      selector: "a",
      type: "html",
      replace: /[{()}]/g,
    },
    {
      key: "link",
      selector: "a",
      attr: "href",
    },
  ],
};

(async () => {
  const data = await scrapeHtmlWeb(optionsSecondExample);

  console.log("example 2 :", data);
})();
