

export function log (word, otherWords, cmd) {
    const heading = word + ' ' + otherWords.join(' ');
    const body = cmd.body ? cmd.body : '';
    const stringToAppend = getLogString(heading, body);
    fs.appendFile(defaultConfig.log.filePath, stringToAppend, function (err, res) {
      if (err && err.code === 'ENOENT') {
        fs.writeFile('~/Dropbox/notes/log.org', stringToAppend, function (err) {
          console.log(err);
        });
        console.log('file created: ~/Dropbox/notes/log.org');
      } else if (err) {
        console.log(err);
      } else {
        console.log('logged msg: ', stringToAppend);
      }
    });
  }