const fs = require('fs');
const defaultConfigFile = require('../.asdf.default.json');
const getUserHome = require('./process-util').getUserHome;

module.exports = {
  getSetting:  getSetting,
  replaceEmptySettingsWithDefaults: replaceEmptySettingsWithDefaults
}
function getSetting (settingName, cb) {
  getUserConfig(userConfig => {
    cb(
      replaceEmptySettingsWithDefaults(
        userConfig, defaultConfigFile)[settingName]);
  });
}

function replaceEmptySettingsWithDefaults (userConfig, defaultConfig) {
  let out = {};
  for (let key in defaultConfig) {
    if (!userConfig[key]) {
      out[key] = defaultConfig[key];
    } else if (typeof userConfig[key] === 'object') {
      out[key] = replaceEmptySettingsWithDefaults(userConfig[key], defaultConfig[key]);
    } else {
      out[key] = userConfig[key];
    }
  }
  return out;
}

function getUserConfig (cb) {
  const filePath = `${getUserHome()}/.asdf.json`
  fs.readFile(filePath, (err, data) => {
    if (err) console.log(err);
    else cb(JSON.parse(data));
  });
}
