const fetch = require("node-fetch");
const fs = require("fs");
const { getUrl, getFileName } = require("./helper");
const cheerio = require("cheerio");

const fileName = getFileName();
const stream = fs.createWriteStream(`./data/${fileName}.txt`);

const seenUrls = {};

const getLinks = async (url) => {
  if (seenUrls[url]) {
    return [];
  }
  console.log(url);
  stream.write(`${url}\n`);
  seenUrls[url] = true;
  const parsedUrl = new URL(url);
  const host = parsedUrl.host;
  const protocol = parsedUrl.protocol;
  let response;
  try {
    response = await fetch(getUrl(url, host, protocol));
  } catch (e) {
    return [];
  }
  const html = await response.text();
  const linkExt = cheerio.load(html);
  const links = linkExt("a")
    .map((i, link) => {
      return link.attribs.href;
    })
    .get();

  return links.filter((link) => link.includes(host));
};

const crawl = async (url, depth) => {
  if (depth === 1) {
    console.log(url);
    stream.write(`${url}\n`);
    return;
  }
  let queue = [];
  queue.push(url);
  for (let i = 0; i < depth; i++) {
    for (let j = 0; j < queue.length; j++) {
      let uri = queue.shift();
      const urls = await getLinks(uri);
      queue.push(...urls);
    }
  }
};

const drive = async (urlInp, depth) => {
  console.log("Crawling...");
  stream.write(`DETAILS:-
Website: ${urlInp} 
Crawler type: BFS
Depth: ${depth}
Timestamp: ${new Date()}

LINKS GATHERED: 
`);
  await crawl(urlInp, depth);
  return fileName;
};

module.exports = {
  bfsCrawler: drive,
};
