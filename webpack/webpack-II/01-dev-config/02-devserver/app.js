// console.log("hello webpack")
fetch('/api/hello').then(repsonse => repsonse.text()).then(result => {
  console.log(result)
})