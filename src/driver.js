const { dfsCrawler } = require("./dfs-crawler");

let filename;

dfsCrawler("http://stevescooking.blogspot.com/", 2)
  .then((res) => {
    filename = res;
  })
  .then(() => {
    console.log(filename);
  });
