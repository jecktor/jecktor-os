<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import { shuffle, sleep } from '../utils';

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

<div class="InitScreen" out:fade>
  <div class="InitScreen__greet">
    <div>{new Date().toLocaleString()}<br />Version 1.0.0</div>
    <div>Welcome to <span>jecktorOS</span>!</div>
  </div>
  <div bind:this={logsContainer}>
    {#each initLogs as log, idx (idx)}
      <div class="InitScreen__log hidden notDone">
        &#91; <span class="status">ok</span> &#93; {log} ...<span class="done"
          >done.</span
        >
      </div>
    {/each}
  </div>
</div>

<style>
  .InitScreen {
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    user-select: none;
    background: black;
    color: white;
    font-family: 'JetBrains Mono', Consolas, Lucida Console, monospace;
  }

  .InitScreen__greet div {
    margin-bottom: 3rem;
  }

  .InitScreen__greet span {
    color: cyan;
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
