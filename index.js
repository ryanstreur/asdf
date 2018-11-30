#!/usr/bin/env node

const program = require('commander');
const fs = require('fs');
const moment = require('moment');
const request = require('request');
const htmlMetadata = require('html-metadata');

program
  .version('0.0.0')
  .command('log <word> [otherWords...]')
  .alias('l')
  .action(function (word, otherWords) {
    const string = word + ' ' + otherWords.join(' ');
    fs.appendFile('C:/Users/ryan.streur/Dropbox/notes/log.org', getLogString(string), function (err, res) {
      if (err && err.code === 'ENOENT') {
        fs.writeFile('~/Dropbox/notes/log.org', string, function (err) {
          console.log(err);
        });
        console.log('file created: ~/Dropbox/notes/log.org');
      } else if (err) {
        console.log(err);
      } else {
        console.log('logged msg: ', string);
      }
    });
  });

const urlDestMarkdown = 'C:/Users/ryan.streur/Dropbox/bloggo/content/post/2018/articles-week-of-11-26.md';
program.command('url <url>')
  .alias('u')
  .action(url => {
    htmlMetadata(url).then(metadata => {
      const title = metadata.general.title;
      const lineToAppend = `* [${title}](${url})\n`;
      fs.appendFile(urlDestMarkdown, lineToAppend, e => console.log(e));
      console.log(`Appended ${lineToAppend} to file ${urlDestMarkdown}`);
    });
  });

program.parse(process.argv);

function getLogString(str) {
  const timestamp = moment().format('YYYY-MM-DD ddd kk:mm');
  return `* ${str}\n  <${timestamp}>\n`;
}