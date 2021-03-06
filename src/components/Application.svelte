<script lang="ts">
  import { windowCount, focusedWindowId } from '../stores';
  import { sleep } from '../utils';

  import { Window } from '.';

  export let name: string;
  export let icon = '/static/icons/default.svg';

  let open = false;
  let animFinished = true;

  const handleCloseWindow = async () => {
    if (!animFinished) return;

    animFinished = false;
    open = false;
    await sleep(400);
    animFinished = true;
  };

  const handleToggleWindow = async () => {
    if (!animFinished) return;

    if (open) {
      document.querySelectorAll('.Window').forEach((window: HTMLElement) => {
        if (window.style.zIndex > '1')
          window.style.zIndex = `${parseInt(window.style.zIndex) - 1}`;
      });
      focusedWindowId.set(null);
      windowCount.update(count => --count);
    }
    animFinished = false;
    open = !open;
    await sleep(400);
    animFinished = true;
  };
</script>

<div class={`Application ${open ? 'open' : ''}`}>
  {#if open}
    <Window
      x={window.innerWidth / (6 - $windowCount)}
      y={window.innerHeight / (6 - $windowCount)}
      titlebar={name}
      on:close={handleCloseWindow}
      on:open
    >
      <slot />
    </Window>
  {/if}
  <button type="button" aria-label="Application" on:click={handleToggleWindow}>
    <img src={icon} alt="" aria-hidden="true" />
    <span class="tooltip">{name}</span>
  </button>
</div>

<style>
  .Application {
    width: 5rem;
    height: 5rem;
    border-radius: 1rem;
    transition: background 100ms ease-out;
  }

  .Application.open {
    background: var(--panels-fg);
  }

  .Application button {
    position: relative;
    width: 100%;
    height: 100%;
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
    transition: all 100ms ease-in-out;
  }

  .Application button:hover {
    filter: brightness(1.2);
    transform: scale(1.4);
  }

  .Application button:hover .tooltip {
    visibility: visible;
  }

  .Application button:active {
    transform: scale(1);
  }

  .Application img {
    max-width: 100%;
  }

  .Application .tooltip {
    position: absolute;
    top: -3rem;
    left: 50%;
    transform: translateX(-50%);
    visibility: hidden;
    background: var(--panels-bg);
    color: var(--font-color);
    font-size: 1.2rem;
    text-align: center;
    padding: 0.25rem 0.5rem;
    border-radius: 0.5rem;
  }

  .Application .tooltip::after {
    content: '';
    position: absolute;
    bottom: -1rem;
    left: inherit;
    border-width: 5px;
    border-style: solid;
    border-color: var(--panels-bg) transparent transparent transparent;
    margin-left: -0.5rem;
  }
</style>
