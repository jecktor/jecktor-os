<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { blur } from 'svelte/transition';
  import { portal } from 'svelte-portal/src/Portal.svelte';
  import { windowCount, focusedWindowId } from '../stores';

  export let y = 0;
  export let x = 0;

  export let width = 600;
  export let height = 400;

  export let titlebar: string;

  const dispatch = createEventDispatcher();

  const windowId = crypto.randomUUID();

  let fixedY = y;
  let fixedX = x;

  let maximized = false;
  let minimized = false;

  let windowContainer: HTMLElement;

  windowCount.update(count => ++count);
  focusedWindowId.set(windowId);

  const handleFocus = () => {
    if (!$focusedWindowId) {
      focusedWindowId.set(windowId);
      return;
    }

    if (parseInt(windowContainer.style.zIndex) >= $windowCount) return;

    document.querySelectorAll('.Window').forEach((window: HTMLElement) => {
      if (window.style.zIndex > '1')
        window.style.zIndex = `${parseInt(window.style.zIndex) - 1}`;
    });

    windowContainer.style.zIndex = `${$windowCount}`;
    focusedWindowId.set(windowId);
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
    if (maximized) {
      handleMaximize();

      windowContainer.style.left = `${clientX - width / 2}px`;
      windowContainer.style.top = `${clientY - 13}px`;
    }

    const posX = windowContainer.offsetLeft + (clientX - x);
    const posY = windowContainer.offsetTop + (clientY - y);

    windowContainer.style.left = `${posX}px`;

    if (clientY >= 0) windowContainer.style.top = `${posY}px`;

    x = clientX;
    y = clientY;
  };

  const handleClose = () => {
    focusedWindowId.set(null);
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
      windowContainer.style.height = `2.5rem`;
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
      fixedY = parseInt(windowContainer.style.top);
      fixedX = parseInt(windowContainer.style.left);

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

<div style="position: absolute;" use:portal={'.Desktop'} transition:blur>
  <div
    class={`Window ${$focusedWindowId === windowId ? 'focused' : ''}`}
    style={initialStyle}
    bind:this={windowContainer}
    on:mousedown={handleFocus}
  >
    <header
      class="Window__titlebar"
      on:mousedown={handleMouseDown}
      on:dblclick={handleMaximize}
    >
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
    border: 1px solid var(--windows-br);
    border-radius: 0.5rem;
    box-shadow: 0 0 24px rgba(0, 0, 0, 0.2);
    background: var(--windows-bg);
    overflow: hidden;
  }

  .Window__titlebar {
    position: relative;
    height: 2.5rem;
    padding: 0 1rem;
    border-bottom: inherit;
    cursor: grab;
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
    line-height: 2.4rem;
    font-size: 1.4rem;
    font-weight: bold;
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
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 50%;
    border: none;
    outline: none;
    cursor: pointer;
    background: #aaaaaa;
  }

  .Window__button:hover {
    opacity: 0.3;
  }

  .Window.focused .Window__button--close,
  .Window__button--close:hover {
    background: #ff5f56;
  }

  .Window.focused .Window__button--min,
  .Window__button--min:hover {
    background: #ffbd2e;
  }

  .Window.focused .Window__button--max,
  .Window__button--max:hover {
    background: #27c93f;
  }

  .Window__content {
    height: calc(100% - 2.5rem);
    overflow: scroll;
  }
</style>
