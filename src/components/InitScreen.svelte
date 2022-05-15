<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import { fade } from 'svelte/transition';

  const dispatch = createEventDispatcher();

  let logsContainer: HTMLElement;
  let initLogs = [
    'Mounting local filesystems',
    'Activating swapfile swap',
    'Cleaning up temporary files',
    'Setting kernel variables',
    'Configuring network interfaces',
    'Setting up ALSA',
    'Setting up console font and keymap',
    'Starting enhanced syslogd: rsyslogd',
    'Starting periodic command scheduler: cron',
    'Starting system message bus: dbus',
    'Starting NTP server: ntpd',
  ];

  const shuffle = (arr: string[]) => {
    const a = arr.slice();

    for (let i = a.length - 1; i > 0; --i) {
      let j = Math.floor(Math.random() * (i + 1));
      let tmp = a[i];
      a[i] = a[j];
      a[j] = tmp;
    }
    return a;
  };

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  initLogs = shuffle(initLogs);

  onMount(async () => {
    for (let i = 0; i <= logsContainer.childNodes.length - 1; ++i) {
      logsContainer.children[i].classList.remove('hidden');
      await sleep(50);
      logsContainer.children[i].classList.remove('notDone');
      await sleep(200);
    }

    dispatch('finished');
  });
</script>

<div class="InitScreen" bind:this={logsContainer} out:fade>
  {#each initLogs as log, idx (idx)}
    <div class="InitScreen__log hidden notDone">
      &#91; <span class="status">ok</span> &#93; {log} ...<span class="done"
        >done.</span
      >
    </div>
  {/each}
</div>

<style>
  .InitScreen {
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    background: black;
    color: white;
  }

  .InitScreen__log {
    font-family: monospace;
  }

  .InitScreen__log .status {
    text-transform: uppercase;
    font-weight: bold;
    color: green;
  }

  .hidden,
  .notDone .done {
    visibility: hidden;
  }
</style>
