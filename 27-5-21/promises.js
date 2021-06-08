myPromise = new Promise(function (resolve, reject) {
  x = 10;
  y = 10;
  if (x === y) resolve();
  else reject();
});

myPromise
  .then(function () {
    console.log("Success");
  })
  .catch(function () {
    console.log("Failure");
  });
