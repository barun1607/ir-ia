const fetch = require("node-fetch");
const { performance } = require("perf_hooks");
const { getUrl } = require("./helper");
const cheerio = require("cheerio");

// const start = performance.now();

let seenUrls = {};

const crawl = async (url) => {
  if (seenUrls[url]) return;
  seenUrls[url] = true;
  // console.log(`Crawling: ${url}`);
  const parsedUrl = new URL(url);
  const host = parsedUrl.host;
  const protocol = parsedUrl.protocol;
  let response;
  try {
    response = await fetch(getUrl(url, host, protocol));
  } catch (e) {
    return;
  }
  const html = await response.text();
  const linkExt = cheerio.load(html);
  const links = linkExt("a")
    .map((i, link) => {
      return link.attribs.href;
    })
    .get();
  links
    .filter((link) => link.includes(host))
    .forEach((link) => {
      if (link.includes("http")) {
        try {
          crawl(getUrl(link, host, protocol));
        } catch (e) {
          console.log(`Error occured while crawling ${link}`);
        }
      }
    });
};

const dfsDrive = async () => {
  return await crawl("http://stevescooking.blogspot.com/");
};

dfsDrive().then((res) => console.log(Object.keys(seenUrls)));
