<script lang="ts">
  import { fly } from 'svelte/transition';

  import { Draw, Terminal, Stateful } from '../applications';
</script>

<div class="Dock" transition:fly={{ y: 50, delay: 500 }}>
  <Draw />
  <Terminal />
  <Stateful />
  <Stateful />
</div>

<style>
  .Dock {
    width: fit-content;
    height: fit-content;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    margin-bottom: 1rem;
    padding: 0.6rem 1rem;
    border-radius: 1rem;
    display: flex;
    gap: 1rem;
    background: var(--panels-bg);
  }
</style>
