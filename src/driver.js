const { dfsCrawler } = require("./dfs-crawler");
const { bfsCrawler } = require("./bfs-crawler");

let filename;

dfsCrawler("http://stevescooking.blogspot.com/", 2)
  .then((res) => {
    filename = res;
  })
  .then(() => {
    console.log(filename);
  });

// bfsCrawler("http://stevescooking.blogspot.com/", 2)
//   .then((res) => {
//     filename = res;
//   })
//   .then(() => {
//     console.log(filename);
//   });
