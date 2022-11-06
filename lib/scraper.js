const axios = require("axios");
const cheerio = require("cheerio");

async function getScraping(options) {
  let result = [];

  const { url, mainSelector, childrenSelector } = options || {};

  await axios(url).then((response) => {
    const html_data = response.data;
    const $ = cheerio.load(html_data);

    const selectedElem = mainSelector;

    $(selectedElem).each((parentIndex, parentElem) => {
      $(parentElem)
        .children()
        .each((childId, childElem) => {
          let obj = {};

          $(childrenSelector).each((index, el) => {
            const { key, selector, attr, type } = el;

            const value = $(childElem).find(selector);

            if (attr && attr !== "") {
              obj = { ...obj, [key]: value.attr(attr) };
            } else if (type === "text") {
              obj = { ...obj, [key]: value.text().trim() };
            } else if (type === "html") {
              obj = { ...obj, [key]: value.prop("outerHTML") };
            }
          });

          result.push(obj);
        });
    });
  });
  return result;
}

const scrapeHtmlWeb = async function (options) {
  try {
    return await getScraping(options);
  } catch (err) {
    return { error: err };
  }
};

scrapeHtmlWeb();

module.exports = scrapeHtmlWeb;
