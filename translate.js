// Require the module and instantiate instance
var TJO = require('translate-json-object')();
const fs = require('fs');
 
// Choose the service to use google/yandex,
// if you provide both yandex will be used as the default
TJO.init({
  googleApiKey: ''
});

var args = process.argv.slice(2);

if(args.length < 1) {
  console.log("Enter the language code you want translation for");
  return;
}

var languageCode = args[0];

fs.readFile('source.json', 'utf8' , (err, sourceData) => {
  if (err) {
    console.error(err)
    return
  }
  sourceData = JSON.parse(sourceData);
  TJO.translate(sourceData, languageCode)
    .then(function(data) {
      fs.writeFile('output.json', JSON.stringify(data, null, 4), err => {
        if (err) {
          console.error(err)
          return
        }
        //file written successfully
      })
    }).catch(function(err) {
      console.log('error ', err)
    });
})

