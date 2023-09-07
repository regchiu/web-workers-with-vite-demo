import './style.css'
import typescriptLogo from '/typescript.svg'
import viteLogo from '/vite.svg'
import mozillaIcon from '/moz-social-bw-rgb.svg'

document.querySelector('#app')!.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers#dedicated_workers" target="_blank">
      <img src="${mozillaIcon}" class="logo black" alt="Mozilla icon" />
    </a>
    <div>
    <header>
      <h1>OffscreenCanvas and worker threads</h1>
      <p>
        <b>Note:</b> your browser must support
        <a href="https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas">
          <code>OffscreenCanvas</code>
        </a>
      </p>
      <p>This example has two canvases with incrementing counters.</p>

      <p>
        Canvas A is being drawn to on the main thread. Canvas B uses an
        <a href="https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas">
          <code>OffscreenCanvas</code>
        </a>
        so that we can draw to it in a worker thread. The purpose of this
        example is to show how a worker thread can keep the rest of our UI
        responsive.
      </p>

      <p>
        The button below each canvas creates <b>blocking work</b> on either the
        main thread (Canvas A) or a worker thread (Canvas B). When a thread is
        blocked, incrementing the related counter from that thread is also
        blocked.
      </p>
    </header>

    <main>
      <div class="canvases">
        <div>
          <span class="canvas-title">Canvas A</span>
          <canvas id="main" width="200" height="200"></canvas>
          <div>
            <button id="main-button">
              Block main thread
            </button>
          </div>
        </div>
        <div>
          <span class="canvas-title">Canvas B</span>
          <canvas id="worker" width="200" height="200"></canvas>

          <div>
            <button id="worker-button">
              Block worker thread
            </button>
          </div>
        </div>
      </div>
      <div id="canvas-description">
        <p>
          <b>When the main thread is blocked</b>, all UI elements are frozen.<br />
          The hover effect on buttons is also blocked:
        </p>
        <button>Example button</button>
        <p>
          <b>When the worker thread is blocked</b>, the main thread is free to
          do work such as the element hover effects and animations. Blocking the
          worker thread will still prevent Canvas B's counter from being
          updated, but the rest of the UI stays responsive while this is true.
        </p>
      </div>

      <footer>
        <p>
          This demo is based on an example by
          <a href="https://glitch.com/@PicchiKevin">Kevin Picchi</a>.
        </p>
      </footer>
    </main>
    <p class="read-the-docs">
      Click on the Vite, TypeScript logos and Mozilla icon to learn more
    </p>
  </div>
`

const canvasA = document.querySelector<HTMLCanvasElement>('#main')
const canvasB = document.querySelector<HTMLCanvasElement>('#worker')

const ctxA = canvasA!.getContext('2d')

const mainButton = document.querySelector<HTMLButtonElement>('#main-button')

 // Create a counter for Canvas A
 let counter = 0
 setInterval(() => {
   redrawCanvasA()
   counter++
 }, 100)

 // Redraw Canvas A counter
function redrawCanvasA() {
  ctxA!.clearRect(0, 0, canvasA!.width, canvasA!.height)
  ctxA!.font = '24px Verdana'
  ctxA!.textAlign = 'center'
  ctxA!.fillStyle = 'green'
  ctxA!.fillText(`${counter}`, canvasA!.width / 2, canvasA!.height / 2)
}

// This function creates heavy (blocking) work on a thread
function fibonacci(num: number): number {
  if (num <= 1) {
    return 1
  }
  return fibonacci(num - 1) + fibonacci(num - 2)
}

// Call our Fibonacci function on the main thread
mainButton!.onclick = function() {
  console.log('Block main thread', fibonacci(42))
}

if (window.Worker) {
  const myWorker = new Worker(new URL('./worker.ts', import.meta.url), {
    type: 'module'
  })

  // Use the OffscreenCanvas API and send to the worker thread
  const canvasWorker = canvasB!.transferControlToOffscreen()
  myWorker.postMessage({ canvas: canvasWorker }, [canvasWorker])

  const workerButton = document.querySelector<HTMLButtonElement>('#worker-button')
  // A 'slowDown' message we can catch in the worker to start heavy work
  workerButton!.onclick = function () {
    myWorker.postMessage('slowDown')
  }
} else {
  console.log('Your browser doesn\'t support web workers.')
}
