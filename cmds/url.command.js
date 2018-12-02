const fs = require('fs');
const htmlMetadata = require('html-metadata');
const getUserHome = require('../utils/process-util').getUserHome;

const config = require('../utils/config');

module.exports = {
  url: url
}

const urlDestMarkdown = 'C:/Users/ryan.streur/Dropbox/bloggo/content/post/2018/articles-week-of-11-26.md';
function url(url) {
  config.getSetting('url', config => {
    htmlMetadata(url).then(metadata => {
      const title = metadata.general.title;
      const lineToAppend = `* [${title}](${url})\n`;
      const filePath = config.filePath[0] === '~' ? getUserHome() + config.filePath.slice(1) : config.filePath;
      fs.appendFile(filePath, lineToAppend, e => console.log(e));
      console.log(`Appended ${lineToAppend} to file ${urlDestMarkdown}`);
    });
  });
}