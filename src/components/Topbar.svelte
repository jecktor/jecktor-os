<script lang="ts">
  import { fly } from 'svelte/transition';
  import { darkTheme } from '../stores';
</script>

<div class="Topbar" transition:fly={{ y: -50, delay: 500 }}>
  <div class="Topbar__left">
    <button class="Topbar__menu" type="button" aria-label="Menu">
      <img src="/static/menu.svg" alt="" aria-hidden="true" />
    </button>
  </div>
  <div class="Topbar__right">
    <button
      class="Topbar__theme"
      type="button"
      aria-label="Toggle dark theme"
      on:click={darkTheme.toggle}
    >
      <img
        src={$darkTheme ? '/static/moon.svg' : '/static/sun.svg'}
        alt=""
        aria-hidden="true"
      />
    </button>
    <p>{new Date().toDateString()}</p>
  </div>
</div>

<style>
  .Topbar {
    width: 100%;
    height: 2.5rem;
    padding: 0 1rem;
    position: absolute;
    top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.4rem;
    font-weight: bold;
    user-select: none;
    background: var(--panels-bg);
  }

  .Topbar__left,
  .Topbar__right {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .Topbar__menu,
  .Topbar__theme {
    width: 1.5rem;
    height: 1.7rem;
    display: block;
    border: none;
    outline: none;
    background: none;
    cursor: pointer;
  }

  img {
    max-width: 100%;
    filter: var(--icon-tint);
    transition: filter 150ms;
  }

  img:hover {
    filter: var(--icon-hover);
  }
</style>
