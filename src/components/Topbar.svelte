<script lang="ts">
  import { fly } from 'svelte/transition';
</script>

<div class="Topbar" transition:fly={{ y: -50, delay: 500 }}>
  <div class="Topbar__menu">Menu</div>
  <div class="Topbar__clock">Clock</div>
</div>

<style>
  .Topbar {
    width: 100%;
    height: 2.5rem;
    padding: 0 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.4rem;
    font-weight: bold;
    background: var(--panels-bg);
  }
</style>
