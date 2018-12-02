module.exports.getUserHome = getUserHome;

function getUserHome () {
  const windows = process.platform.includes('win32') || process.platform.includes('win64');
  const homeEnvVariable = windows ? 'USERPROFILE' : 'HOME';
  return process.env[homeEnvVariable];
}