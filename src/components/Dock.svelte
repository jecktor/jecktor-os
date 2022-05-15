<script lang="ts">
  import { fly } from 'svelte/transition';

  import Program from './Program.svelte';
</script>

<div class="Dock" transition:fly={{ y: 50, delay: 500 }}>
  <Program />
  <Program />
  <Program />
  <Program />
  <Program />
</div>

<style>
  .Dock {
    width: fit-content;
    height: fit-content;
    margin-bottom: 1rem;
    padding: 0.6rem 1rem;
    border-radius: 1rem;
    display: flex;
    gap: 1rem;
    background: var(--panels-bg);
  }
</style>
