const fetch = require("node-fetch");
const fs = require("fs");
const { getUrl, getFileName } = require("./helper");
const cheerio = require("cheerio");

const fileName = getFileName();
const stream = fs.createWriteStream(`./data/${fileName}.txt`);

const seenUrls = {};

const crawl = async (url, depth) => {
  if (seenUrls[url]) {
    return;
  }
  stream.write(`${url}\n`);
  seenUrls[url] = true;
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
  if (links.isEmpty) return;
  links
    .filter((link) => link.includes(host))
    .forEach((link) => {
      if (link.includes("http")) {
        try {
          if (depth > 0) {
            crawl(getUrl(link, host, protocol), depth - 1);
          } else return;
        } catch (e) {
          console.log(`Error occured while crawling ${link}`);
        }
      }
    });
};

const dfsDrive = async () => {
  console.log("Crawling...");
  await crawl("http://stevescooking.blogspot.com/", 3);
};

dfsDrive();
