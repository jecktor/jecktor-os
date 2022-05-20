<script lang="ts">
  import { darkTheme } from '../stores';

  import Topbar from './Topbar.svelte';
  import Dock from './Dock.svelte';

  darkTheme.toggle();
</script>

<div class="Desktop">
  <Topbar />
  <Dock />
</div>

<style>
  .Desktop {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url('/static/wallpaper.webp');
  }
</style>
