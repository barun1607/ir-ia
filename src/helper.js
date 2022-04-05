const crypto = require("crypto");

const getProperUrl = (url, host, protocol) => {
  if (url.includes("http:") || url.includes("https:")) return url;
  else if (url.startsWith("/")) return `${protocol}//${host}${url}`;
  else return `${protocol}//${host}/${url}`;
};

const getFileName = () => {
  const currentDate = new Date();
  hash = crypto.createHash("sha1").update(currentDate.toString()).digest("hex");
  return hash;
};

module.exports = {
  getUrl: getProperUrl,
  getFileName,
};
