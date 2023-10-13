function getString() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('hello world webpack!')
    }, 2000);
  })
}
async function hello() {
  // console.log('hello webpack!')
  let string = await getString()
  console.log(string)
}
export default hello