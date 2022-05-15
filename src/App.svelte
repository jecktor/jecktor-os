<script lang="ts">
  import InitScreen from './components/InitScreen.svelte';
  import Desktop from './components/Desktop.svelte';

  let showInitScreen = true;
</script>

{#if showInitScreen}
  <InitScreen on:finished={() => (showInitScreen = false)} />
{:else}
  <Desktop />
{/if}
