onmessage = function (event) {
  const userNum = Number(event.data)
  const fibonacci = (num: number) => {
    let a = 1
    let b = 0
    let temp
  
    while (num >= 0) {
      temp = a
      a = a + b
      b = temp
      num--
    }
  
    return b
  }
  const workerResult = 'Result: ' + fibonacci(userNum)
  postMessage(workerResult)
}


