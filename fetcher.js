const request = require('request');
const writeToFile = require('fs');

/* EXTRA FEATURES TO IMPLEMENT:
- validate user input --> REGEX?
- ask for new file path
*/

const getUserInput = () => {
  const url = process.argv.slice(2)[0].toLowerCase();
  const localPath = process.argv.slice(2)[1];
  return { url, localPath };
};

const requestPage = () => {
  request(getUserInput().url, (error, response, body) => {
    if (error) {
      console.log(`ERROR: ${error.code}`);
      console.log('Try again...');
      process.exit(1);
    }
    if (response.statusCode !== 200) {
      console.log('ERROR:', `${response.statusCode} ${response.statusMessage}`);
      process.exit(1);
    }
    saveFile(body);
  });
};

const saveFile = (data) => {

  const filePath = getUserInput().localPath;

  writeToFile.writeFile(filePath, data, { flag: 'wx' }, (err) => {
    if (err) {
      console.log('ERROR SAVING FILE:', `${err.path} ${err.code.slice(1)}`);
      process.exit(1);
    }
    console.log(`Downloaded and saved ${data.length} bytes to ${filePath}.`);
  });
};

requestPage();