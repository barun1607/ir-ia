const getProperUrl = (url, host, protocol) => {
  if (url.includes("http:") || url.includes("https:")) return url;
  else if (url.startsWith("/")) return `${protocol}//${host}${url}`;
  else return `${protocol}//${host}/${url}`;
};

module.exports = {
  getUrl: getProperUrl,
};
