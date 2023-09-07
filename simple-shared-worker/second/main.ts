import '../style.css'
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
  <div class="controls" tabindex="0">
    <form>
      <div>
        <label for="number">Square number: </label>
        <input type="text" id="number" value="0" />
      </div>
    </form>
    <p class="result">Result: 0</p>
  </div>
  <p class="read-the-docs">
    Click on the Vite, TypeScript logos and Mozilla icon to learn more
  </p>
</div>
`

const squareNumber = document.querySelector<HTMLInputElement>('#number')

const result = document.querySelector<HTMLParagraphElement>('.result')

const form = document.querySelector<HTMLFormElement>('form')

form!.onsubmit = function (event) {
  event.preventDefault()
}

if (window.SharedWorker) {
  const myWorker = new SharedWorker(new URL('../worker.ts', import.meta.url), {
    type: 'module'
  })

  squareNumber!.onchange = function () {
    myWorker.port.postMessage([squareNumber!.value, squareNumber!.value])
    console.log('Message posted to worker')
  }

  myWorker.port.onmessage = function (event) {
    result!.textContent = event.data
    console.log('Message received from worker')
  }
}
