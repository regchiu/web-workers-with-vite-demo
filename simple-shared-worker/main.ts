import './style.css'
import typescriptLogo from '/typescript.svg'
import viteLogo from '/vite.svg'
import mozillaIcon from '/moz-social-bw-rgb.svg'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
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
    <h1>Simple Web Worker</h1>
    <div>
      <form class="controls" tabindex="0">
        <div>
          <label for="number1">Multiply number 1: </label>
          <input type="text" id="number1" value="0" />
        </div>
        <div>
          <label for="number2">Multiply number 2: </label>
          <input type="text" id="number2" value="0" />
        </div>
      </form>
      <p class="result">Result: 0</p>
      <a href="/simple-shared-worker/second/" target="_blank">Go to second worker page</a>
    </div>
    <p class="read-the-docs">
      Click on the Vite, TypeScript logos and Mozilla icon to learn more
    </p>
  </div>
`

const form = document.querySelector<HTMLFormElement>('form')

form!.onsubmit = function (event) {
  event.preventDefault()
}

const first = document.querySelector<HTMLInputElement>('#number1')
const second = document.querySelector<HTMLInputElement>('#number2')

const result = document.querySelector<HTMLParagraphElement>('.result')

if (window.SharedWorker) {
  const myWorker = new SharedWorker(new URL('./worker.ts', import.meta.url), {
    type: 'module'
  })

  const inputs = [first, second]

  inputs.forEach(input => {
    input!.onchange = function() {
      myWorker.port.postMessage([first!.value, second!.value])
      console.log('Message posted to worker')
    }
  })

  myWorker.port.onmessage = function (e) {
    result!.textContent = e.data
    console.log('Message received from worker')
    console.log(e.lastEventId)
  }
}
