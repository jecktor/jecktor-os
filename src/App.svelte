<script lang="ts">
  import { InitScreen, Desktop } from './components';

  let showInitScreen = true;
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link
    rel="preconnect"
    href="https://fonts.gstatic.com"
    crossorigin="anonymous"
  />
  <link
    href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&family=JetBrains+Mono:wght@300;400;700&display=swap"
    rel="stylesheet"
  />
</svelte:head>
<!-- {#if showInitScreen}
  <InitScreen on:finished={() => (showInitScreen = false)} />
{:else} -->
<Desktop />
<!-- {/if} -->
