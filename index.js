#!/usr/bin/env node

const program = require('commander');

const log = require('./cmds/log.command').log;
const url = require('./cmds/url.command').url;

program
  .version('0.0.0')

program.command('log <word> [otherWords...]')
  .alias('l')
  .option('-b --body [body]', 'Body text for entry')
  .action(log);

program.command('url <url>')
  .alias('u')
  .action(url);

program.parse(process.argv);
