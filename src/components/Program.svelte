<script lang="ts">
  import { windowCount } from '../stores';

  import Window from './Window.svelte';

  let open = false;

  const handleToggleWindow = () => {
    if (open) {
      document.querySelectorAll('.Window').forEach((window: HTMLElement) => {
        if (window.style.zIndex > '1')
          window.style.zIndex = `${parseInt(window.style.zIndex) - 1}`;
      });
      windowCount.update(count => --count);
    }
    open = !open;
  };
</script>

<div class={`Program ${open ? 'open' : ''}`}>
  {#if open}
    <Window
      x={-180}
      y={-400}
      titlebar="testfor01"
      on:close={() => (open = false)}
    >
      <h1>Floating window</h1>
    </Window>
  {/if}
  <button type="button" on:click={handleToggleWindow}>
    <img src="/static/Papirus-Team-Papirus-Apps-0ad.svg" alt="icon" />
  </button>
</div>

<style>
  .Program {
    width: 5rem;
    height: 5rem;
    border-radius: 1rem;
    transition: background 100ms ease-out;
  }

  .Program.open {
    background: rgba(10, 10, 10, 0.5);
  }

  .Program button {
    width: 100%;
    height: 100%;
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
    transition: all 100ms ease-in-out;
  }

  .Program button:hover {
    filter: brightness(1.2);
    transform: scale(1.4);
  }

  .Program img {
    max-width: 100%;
  }
</style>
