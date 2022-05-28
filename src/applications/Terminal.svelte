<script lang="ts">
  import { Application } from '../components';

  let userInput = '';
  let caretPosition = -1;

  let terminalOutput: HTMLElement;
  let typerInput: HTMLInputElement;

  const initTerminal = () => {
    typerInput.focus();
  };

  const handleUserInput = () => {
    const input = userInput.trim();
    if (!input) return;

    userInput = '';

    const tmpEl = document.createElement('div');
    tmpEl.innerText = input;
    const command = tmpEl.innerHTML;

    terminalOutput.innerHTML += `
      <div class="Terminal__input">
        <span class="indicator">&#10140;</span>
        <span class="directory">~</span>
        <span class="typer">${command}</span>
      </div>
      `;
  };

  const handleInputEvents = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowRight':
        -(caretPosition - userInput.length) <= userInput.length &&
          --caretPosition;
        break;
      case 'ArrowLeft':
        -(caretPosition - (userInput.length - 1)) !== 0 && ++caretPosition;
        break;
      case 'Enter':
        handleUserInput();
        break;
    }
  };
</script>

<Application
  name="Terminal"
  icon="/static/icons/terminal.svg"
  on:open={initTerminal}
>
  <div class="Terminal">
    <div class="Terminal__output" bind:this={terminalOutput}>
      <div>
        <span>
          Type 'help' to display a list of all integrated shell commands.
        </span>
      </div>
    </div>
    <div class="Terminal__input">
      <span class="indicator">&#10140;</span>
      <span class="directory">~</span>
      <span class="typer">
        {userInput}
        <b class="caret" style={`right: ${caretPosition}rem`}>&block;</b>
      </span>
      <input
        type="text"
        class="hidden-input"
        on:keydown={handleInputEvents}
        bind:value={userInput}
        bind:this={typerInput}
      />
    </div>
  </div>
</Application>

<style>
  @keyframes blink {
    50% {
      opacity: 0;
    }
  }

  .Terminal {
    margin: 0.5rem 1rem;
    font-size: 1.6rem;
    font-family: 'JetBrains Mono', Consolas, Lucida Console, monospace;
  }

  .Terminal__output {
    overflow-y: hidden;
  }

  :global(.Terminal__input) {
    display: flex;
    gap: 1rem;
  }

  :global(.Terminal__input .indicator) {
    color: #b1e1a6;
  }

  :global(.Terminal__input .directory) {
    color: #92d2e8;
  }

  .typer {
    position: relative;
  }

  .caret {
    position: absolute;
    top: 0.25rem;
    font-size: 1.2rem;
    animation: blink 1s step-start 0s infinite;
  }
  .hidden-input {
    position: absolute;
    left: 0;
    bottom: 0;
    display: block;
    width: 100%;
    height: calc(100% - 3rem);
    outline: none;
    border: none;
    background: none;
    opacity: 0;
  }
</style>
