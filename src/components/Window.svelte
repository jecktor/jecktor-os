<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { scale } from 'svelte/transition';
  import { windowCount } from '../stores';

  export let y = 0;
  export let x = 0;

  export let width = 400;
  export let height = 300;

  export let titlebar: string;

  const dispatch = createEventDispatcher();

  const fixedY = y;
  const fixedX = x;

  let maximized = false;
  let minimized = false;

  let windowContainer: HTMLElement;

  windowCount.update(count => ++count);

  const handleFocus = () => {
    if (parseInt(windowContainer.style.zIndex) >= $windowCount) return;

    document.querySelectorAll('.Window').forEach((window: HTMLElement) => {
      if (window.style.zIndex > '1')
        window.style.zIndex = `${parseInt(window.style.zIndex) - 1}`;
    });

    windowContainer.style.zIndex = `${$windowCount}`;
  };

  const handleMouseDown = ({ clientX, clientY }: MouseEvent) => {
    x = clientX;
    y = clientY;

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = ({ clientX, clientY }: MouseEvent) => {
    const dx = clientX - x;
    const dy = clientY - y;

    windowContainer.style.top = `${windowContainer.offsetTop + dy}px`;
    windowContainer.style.left = `${windowContainer.offsetLeft + dx}px`;

    x = clientX;
    y = clientY;
  };

  const handleClose = () => {
    windowCount.update(count => --count);
    dispatch('close');
  };

  const handleMinimize = () => {
    if (maximized) {
      handleMaximize();
      return;
    }

    if (minimized) {
      windowContainer.style.height = `${height}px`;
    } else {
      windowContainer.style.height = `2rem`;
    }

    minimized = !minimized;
  };

  const handleMaximize = () => {
    if (minimized) {
      handleMinimize();
      return;
    }

    if (maximized) {
      windowContainer.parentElement.style.position = 'absolute';

      windowContainer.style.top = `${fixedY}px`;
      windowContainer.style.left = `${fixedX}px`;

      windowContainer.style.width = `${width}px`;
      windowContainer.style.height = `${height}px`;
    } else {
      windowContainer.parentElement.style.position = 'static';

      windowContainer.style.top = '0px';
      windowContainer.style.left = '0px';

      windowContainer.style.width = '100vw';
      windowContainer.style.height = '100vh';
    }

    maximized = !maximized;
  };

  const initialStyle = `
  top: ${y}px;
  left: ${x}px;
  width: ${width}px;
  height: ${height}px;
  z-index: ${$windowCount};
  `;
</script>

<div style="position: absolute;" transition:scale>
  <div
    class="Window"
    style={initialStyle}
    bind:this={windowContainer}
    on:mousedown={handleFocus}
  >
    <header class="Window__titlebar" on:mousedown={handleMouseDown}>
      <div class="Window__buttons">
        <button
          type="button"
          aria-label="close"
          class="Window__button Window__button--close"
          on:click={handleClose}
        />
        <button
          type="button"
          aria-label="minimize"
          class="Window__button Window__button--min"
          on:click={handleMinimize}
        />
        <button
          type="button"
          aria-label="maximize"
          class="Window__button Window__button--max"
          on:click={handleMaximize}
        />
      </div>
      <div class="Window__title">
        <p>{titlebar}</p>
      </div>
    </header>
    {#if !minimized}
      <div class="Window__content">
        <slot />
      </div>
    {/if}
  </div>
</div>

<style>
  .Window {
    position: absolute;
    border: 1px solid #e6e6e6;
    border-radius: 0.5rem;
    box-shadow: 0 0 24px rgba(0, 0, 0, 0.1);
    background: white;
    overflow: hidden;
  }

  .Window__titlebar {
    position: relative;
    height: 2rem;
    padding: 0 1rem;
    border-bottom: inherit;
    text-align: center;
    user-select: none;
  }

  .Window__titlebar:active {
    cursor: move;
  }

  .Window__titlebar p {
    max-width: 60%;
    margin: 0 auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 1.4rem;
    font-weight: normal;
  }

  .Window__buttons {
    position: absolute;
    left: 0.5rem;
    top: 50%;
    gap: 0.6rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translateY(-50%);
  }

  .Window__button {
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    border: none;
    outline: none;
    cursor: pointer;
  }

  .Window__button:hover {
    filter: opacity(0.3);
  }

  .Window__button--close {
    background-color: #ff5f56;
  }

  .Window__button--min {
    background-color: #ffbd2e;
  }

  .Window__button--max {
    background-color: #27c93f;
  }

  .Window__content {
    height: calc(100% - 2rem);
    overflow: scroll;
  }
</style>
