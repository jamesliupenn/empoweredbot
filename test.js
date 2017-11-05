var resource = require('./resources');

function getresource(resourcetype) {
  return new Promise ((resolve,reject) => {
    if (resource(resourcetype)) {
      resolve(resource(resourcetype))
    }
  });
  
}

getresource("holiday")

.then((text) => {
  console.log(text)
})
.catch(() => {
  console.log("failure to retrieve")
})
