let canvasB: null | HTMLCanvasElement = null
let ctxB: null | CanvasRenderingContext2D = null

// Waiting to receive the OffScreenCanvas
onmessage = (event) => {
  if (event.data === 'slowDown') {
    console.log('Block worker thread', fibonacci(42))
  } else {
    canvasB = event.data.canvas
    ctxB = canvasB!.getContext('2d')
    startCounting()
  }
}

// Fibonacci function to add some delay to the thread
function fibonacci(num: number): number {
  if (num <= 1) {
    return 1
  }
  return fibonacci(num - 1) + fibonacci(num - 2)
}

// Start the counter for Canvas B
let counter = 0
function startCounting() {
  setInterval(() => {
    redrawCanvasB()
    counter++
  }, 100)
}

// Redraw Canvas B text
function redrawCanvasB() {
  ctxB!.clearRect(0, 0, canvasB!.width, canvasB!.height)
  ctxB!.font = '24px Verdana'
  ctxB!.textAlign = 'center'
  ctxB!.fillStyle = 'green'
  ctxB!.fillText(`${counter}`, canvasB!.width / 2, canvasB!.height / 2)
}
