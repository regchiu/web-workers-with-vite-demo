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
      <form class="controls" tabindex="0">
        <div>
          <label for="number">
            Enter a number that is an index position in the fibonacci sequence to
            see what number is in that position (e.g. enter 5 and you'll get a
            result of 8 — fibonacci index position 5 is 8).
          </label>
          <input type="number" id="number" />
        </div>
        <br />
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
      <p class="result">Result: 1</p>
    </div>
    <p class="read-the-docs">
      Click on the Vite, TypeScript logos and Mozilla icon to learn more
    </p>
  </div>
`

const form = document.querySelector<HTMLFormElement>('form')
const input = document.querySelector<HTMLInputElement>('input[type="number"]')
const result = document.querySelector<HTMLParagraphElement>('.result')

if (window.Worker) {
  const myWorker = new Worker(new URL('./worker.ts', import.meta.url), {
    type: 'module'
  })

  myWorker.onmessage = function (event) {
    result!.textContent = event.data
    console.log("Got: " + event.data + "\n")
  }

  myWorker.onerror = function (error) {
    console.log(`Worker error: ${error.message} \n`)
    throw error
  }


  form!.onsubmit = function (event) {
    event.preventDefault()
    myWorker.postMessage(input!.value)
    input!.value = ''
  }
} else {
  console.log('Your browser doesn\'t support web workers.')
}
