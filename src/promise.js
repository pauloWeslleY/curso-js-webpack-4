let p = new Promise(function (resolve, reject) {
   let test = true;

   if (test) {
      resolve('Its going to be fine!');
   } else {
      reject("Something's wrong");
   }
});

p.then(returns => {
   console.log(returns);
}).catch(returns => {
   console.log(returns);
})