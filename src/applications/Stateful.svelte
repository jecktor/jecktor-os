<script lang="ts">
  import { Application } from '../components';

  let count = 0;
</script>

<Application name="Stateful">
  <h1>Stateful application</h1>
  <p>count: {count}</p>
  <button type="button" on:click={() => ++count}>Increase count</button>
</Application>
