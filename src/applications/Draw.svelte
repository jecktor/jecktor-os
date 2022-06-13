<script lang="ts">
  import { Application } from '../components';

  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;
  let bounds: DOMRect;

  let mouseY = 0;
  let mouseX = 0;

  let isDrawing = false;

  const initDraw = () => {
    ctx = canvas.getContext('2d');

    ctx.canvas.width = canvas.parentElement.clientWidth;
    ctx.canvas.height = canvas.parentElement.clientHeight;

    ctx.lineWidth = 3;
    ctx.strokeStyle = 'black';
  };

  const updateMousePos = (x: number, y: number) => {
    bounds = canvas.getBoundingClientRect();

    mouseY = y - bounds.top;
    mouseX = x - bounds.left;
  };

  const handleMouseDown = ({ clientX, clientY }: MouseEvent) => {
    updateMousePos(clientX, clientY);

    isDrawing = true;

    ctx.beginPath();
    ctx.moveTo(mouseX, mouseY);
  };

  const handleMouseMove = ({ clientX, clientY }: MouseEvent) => {
    updateMousePos(clientX, clientY);

    if (isDrawing) {
      ctx.lineTo(mouseX, mouseY);
      ctx.stroke();
    }
  };

  const handleMouseUp = ({ clientX, clientY }: MouseEvent) => {
    updateMousePos(clientX, clientY);

    isDrawing = false;
  };

  const handleMouseOut = () => {
    isDrawing = false;
  };

  const handleColors = ({ target }: MouseEvent) => {
    const color = (target as HTMLButtonElement).value;

    if (color) {
      ctx.strokeStyle = color;
    }
  };

  const handleStrokes = ({ target }: MouseEvent) => {
    const stroke = (target as HTMLButtonElement).value;

    if (stroke) {
      ctx.lineWidth = parseInt(stroke);
    }
  };
</script>

<Application name="Draw" icon="/static/icons/paint.svg" on:open={initDraw}>
  <div class="Draw">
    <div>
      <div class="Draw__colors" on:click={handleColors}>
        <button
          type="button"
          aria-label="Black"
          value="black"
          style="background-color: black;"
        />
        <button
          type="button"
          aria-label="Crimson"
          value="crimson"
          style="background-color: crimson;"
        />
        <button
          type="button"
          aria-label="Limegreen"
          value="limegreen"
          style="background-color: limegreen;"
        />
        <button
          type="button"
          aria-label="Aqua"
          value="aqua"
          style="background-color: aqua;"
        />
        <button
          type="button"
          aria-label="Blueviolet"
          value="blueviolet"
          style="background-color: blueviolet;"
        />
        <button
          type="button"
          aria-label="Gold"
          value="gold"
          style="background-color: gold;"
        />
      </div>
      <div class="Draw__strokes" on:click={handleStrokes}>
        <button
          type="button"
          aria-label="Small"
          value="1"
          style="height: 1px"
        />
        <button
          type="button"
          aria-label="Medium"
          value="3"
          style="height: 3px"
        />
        <button
          type="button"
          aria-label="Large"
          value="5"
          style="height: 5px"
        />
      </div>
    </div>
    <div class="Draw__canvas">
      <!-- svelte-ignore a11y-mouse-events-have-key-events -->
      <canvas
        on:mousedown={handleMouseDown}
        on:mousemove={handleMouseMove}
        on:mouseout={handleMouseOut}
        on:mouseup={handleMouseUp}
        bind:this={canvas}
      />
    </div>
  </div>
</Application>

<style>
  .Draw {
    height: 100%;
    display: grid;
    grid-template-columns: 5rem 1fr;
    overflow: hidden;
  }

  .Draw__colors,
  .Draw__strokes {
    margin-top: 3rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 2rem;
  }

  .Draw__colors button {
    border: none;
    outline: none;
    width: 2rem;
    height: 2rem;
    cursor: pointer;
    border-radius: 50%;
  }

  .Draw__strokes button {
    border: none;
    outline: none;
    cursor: pointer;
    width: 50%;
    background-color: var(--font-color);
  }

  .Draw__canvas {
    background-color: #ffffff;
  }
</style>
