const fs = require('fs');
const config = require('../utils/config');
const getUserHome = require('../utils/process-util').getUserHome;
const moment = require('moment');

module.exports.log = function log (word, otherWords, cmd) {
  config.getSetting('log', config => {
    const heading = word + ' ' + otherWords.join(' ');
    const stringToAppend = getLogString(heading, cmd.body);
    const filePath = config.filePath[0] === '~' ? getUserHome() + config.filePath.slice(1) : config.filePath;
    fs.appendFile(filePath, stringToAppend, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log('logged msg: ', stringToAppend, '\n to file: ', config.filePath);
      }
    });
  });
}

function getLogString(heading, body) {
  const timestamp = moment().format('YYYY-MM-DD ddd kk:mm');
  const outString = `* ${heading}\n  <${timestamp}>\n`;
  return body ? outString + '  ' + body + '\n' : outString;
}