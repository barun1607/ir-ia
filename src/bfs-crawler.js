const fetch = require("node-fetch");
const fs = require("fs");
const { getUrl, getFileName } = require("./helper");
const cheerio = require("cheerio");

const fileName = getFileName();
const stream = fs.createWriteStream(`./data/bfs/${fileName}.txt`);

const seenUrls = {};

const crawl = async (url, depth) => {};
