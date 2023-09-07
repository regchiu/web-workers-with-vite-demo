///@ts-ignore
(onconnect as unknown as SharedWorkerGlobalScope["onconnect"]) = function (event) {
  const port: MessagePort = event.ports[0]

  port.onmessage = function (e) {
    const result = e.data[0] * e.data[1]
    if (isNaN(result)) {
      port.postMessage('Please write two numbers')
    } else {
      const workerResult = 'Result: ' + result
      console.log('Worker: Posting message back to main script')
      port.postMessage(workerResult)
    }
  }
}
