<script lang="ts">
  import { fly } from 'svelte/transition';
</script>

<div class="Topbar" transition:fly={{ y: -50, delay: 500 }}>Topbar</div>

<style>
  .Topbar {
    background: white;
    width: 100%;
    height: 2rem;
    font-size: 1.4rem;
  }
</style>
