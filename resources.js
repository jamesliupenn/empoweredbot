var request = require('request');
var toggle;

module.exports = function(resource) {

  switch (resource) {
    case "holiday":
      toggle = 0;
      break;
    case "benefits":
      toggle = 1;
      break;
    case "jobs":
      toggle = 2;
      break;
    case "finances":
      toggle = 3;
      break;
    case "humanresources":
      toggle = 4;
      break;
  }

  return new Promise ((resolve,reject) => {
    request('http://empowerbotapi.azurewebsites.net/resources', (err, res, body) => {
      body=JSON.parse(body);
      resolve(body[toggle]);
    })
  })

  .then((text) => {
    return text
  })
}
