<script lang="ts">
  import { onMount } from 'svelte';
  import floor from '../assets/floor.png';

  let devices = [];
  let image: HTMLImageElement;

  onMount(() => {
    const savedDevices = localStorage.getItem('savedDevices');
    if (savedDevices) {
      devices = JSON.parse(savedDevices);
    }
  });

  const handleDrop = (e: DragEvent) => {
    const deviceData = e.dataTransfer?.getData('device');
    const device = JSON.parse(deviceData);

    const imgRect = e?.currentTarget?.getBoundingClientRect();

    const x = e.clientX - imgRect.left - 20;
    const y = e.clientY - imgRect.top - 20;

    device.coordinates = { x, y };

    devices = [...devices, device];

    localStorage.setItem('savedDevices', JSON.stringify(devices));
  };

  $: console.log(image?.getBoundingClientRect())

</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="wrapper" on:drop={handleDrop} on:dragover|preventDefault>
  <img src={floor} alt="floor" bind:this={image}/>
  {#each devices as device}
    {#if device.coordinates}
      <div
        class="device"
        style="position: absolute; left: {device.coordinates.x}px; top: {device.coordinates.y}px;"
      >
        {device.name.replace('Device ', '')}
      </div>
    {/if}
  {/each}
</div>

<style lang="scss">
  .wrapper {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .device {
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: red;
    }
    img {
      border: 1px solid red;
      transform: scale(1.2);
      // width: 80%;
      // height: 80%;
    }
  }
</style>
