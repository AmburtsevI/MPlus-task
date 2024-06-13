<script lang="ts">
  import { onMount } from 'svelte';
  import floor from '../assets/floor.png';
  import SidePanel from '../components/SidePanel.svelte';
  import Light from '../components/deviceInterfaces/Light.svelte';

  let devices = [];
  let image: HTMLImageElement;
  let openMenu = 0;

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

    const x = e.clientX - imgRect.left - 25;
    const y = e.clientY - imgRect.top - 25;

    device.coordinates = { x, y };

    devices = [...devices, device];

    localStorage.setItem('savedDevices', JSON.stringify(devices));
  };

</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="wrapper" on:drop|preventDefault={handleDrop} on:dragover>
  <img src={floor} alt="floor" class="floor" bind:this={image} on:dragover|preventDefault />
  {#each devices as device}
    {#if device.coordinates}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div
        class="device"
        style="left: {device.coordinates.x}px; top: {device.coordinates.y}px;"
        on:click={() => openMenu = device.id}
      >
        <img src={device.svg} alt={device.name} class="icon"/>
        <div class="control-menu">
          <Light />
        </div>
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
      width: 50px;
      height: 50px;
      display: flex;
      border-radius: 50%;
      position: absolute;
      justify-content: center;
      align-items: center;
      background: rgba(255, 255, 255, 0.33);
      box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(10.2px);

      .control-menu {
        position: absolute;
        width: 160px;
        height: fit-content;
        background-color: #232323;
        left: 55px;
        height: fit-content;
        padding: 5px 10px 10px 10px;
        border-radius: 10px;

        &::before {
          content: '';
          position: absolute;
          width: 10px;
          height: 10px;
          left: -5px;
          top: 50%;
          transform: translateY(-50%) rotate(45deg);
          background-color: #232323;
        }
      }
      .icon {
        width: 30px;
      }
    }
    .floor {
      transform: scale(1.3);
      // width: 80%;
      // height: 80%;
    }
  }
</style>
