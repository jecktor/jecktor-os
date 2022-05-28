<script lang="ts">
  import { Application } from '../components';

  let userInput = '';
  let caretPosition = -1;

  let terminalOutput: HTMLElement;
  let typerInput: HTMLInputElement;

  const commands = {
    clear: {
      cmd: () => (terminalOutput.innerHTML = ''),
      desc: 'clear the terminal screen',
    },
    help: {
      cmd: () =>
        Object.keys(commands).forEach(cmd => {
          const line = `
          <div>
            ${cmd}
            <span style="margin-left: 8rem;">${commands[cmd].desc}</span>
          </div>
          `;

          addToOutput(line);
        }),
      desc: 'print this help',
    },
  };

  const addToOutput = (content: string) => {
    terminalOutput.innerHTML += content;
    terminalOutput.parentElement.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  };

  const initTerminal = () => {
    typerInput.focus();

    addToOutput(`
    <div>Type 'help' to display a list of all integrated shell commands.</div>
    `);
  };

  const validateInput = (command: string) => {
    const validCommand = Object.keys(commands).find(cmd => command === cmd);

    if (validCommand) {
      commands[validCommand].cmd();
      return;
    }

    addToOutput(`
    <span>
      shell: command not found: ${command}
      <br />
      Type 'help' for a list of commands.
    </span>
    `);
  };

  const handleUserInput = () => {
    const input = userInput.trim();
    if (!input) return;

    userInput = '';

    const tmpEl = document.createElement('div');
    tmpEl.innerText = input;
    const command = tmpEl.innerHTML;

    addToOutput(`
      <div class="Terminal__input">
        <span class="indicator">&#10140;</span>
        <span class="directory">~</span>
        <span class="typer">${command}</span>
      </div>
    `);

    validateInput(command);
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
    <div class="Terminal__output" bind:this={terminalOutput} />
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
    padding: 0.5rem 1rem;
    font-size: 1.6rem;
    font-family: 'JetBrains Mono', Consolas, Lucida Console, monospace;
  }

  :global(.Terminal__output > *) {
    margin-block: 0.5rem;
  }

  .Terminal__input {
    margin-top: 0.5rem;
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
    opacity: 0.5;
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
