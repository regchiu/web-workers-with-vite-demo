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
    <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers" target="_blank">
      <img src="${mozillaIcon}" class="logo black" alt="Mozilla icon" />
    </a>
    <h1>Web Workers With Vite Demo</h1>
    <ol>
      <li>
        <a href="/simple-web-worker/">Simple Web Worker</a>
      </li>
      <li>
        <a href="/simple-shared-worker/">Simple Shared Worker</a>
      </li>
      <li>
        <a href="/fibonacci-worker/">Fibonacci Worker</a>
      </li>
      <li>
        <a href="/offscreen-canvas-worker/">Offscreen Canvas Worker</a>
      </li>
    </ol>
    <p class="read-the-docs">
      Click on the Vite, TypeScript logos and Mozilla icon to learn more
    </p>
  </div>
`
