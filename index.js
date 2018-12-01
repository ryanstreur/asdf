#!/usr/bin/env node

const program = require('commander');
const fs = require('fs');
const moment = require('moment');
const request = require('request');
const htmlMetadata = require('html-metadata');

const log = require('./cmds/log.command');

program
  .version('0.0.0')
  .command('log <word> [otherWords...]')
  .alias('l')
  .option('-b --body [body]', 'Body text for entry')
  .action(log);

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

function getLogString(heading, body) {
  const timestamp = moment().format('YYYY-MM-DD ddd kk:mm');
  return `* ${heading}\n  <${timestamp}>\n  ${body}\n`;
}
