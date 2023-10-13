self.onmessage = (message) => {
  console.log(message.data.question)
  self.postMessage({
    answer: 1111
  })
}