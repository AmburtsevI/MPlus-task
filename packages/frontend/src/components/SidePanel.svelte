<script lang="ts">
  let devices = [
    { id: 1, name: 'Device 1', coordinates: null },
    { id: 2, name: 'Device 2', coordinates: null },
  ];

  function handleDragStart(event: DragEvent, device: any) {
    event.dataTransfer.setData('device', JSON.stringify(device));
  }
</script>

<div class="side-panel">
    {#each devices as device}
      <div
        class="device-item"
        draggable="true"
        on:dragstart={(event) => handleDragStart(event, device)}
      >
        {device.name}
      </div>
    {/each}
</div>


<style lang="scss">
    .side-panel {
        position: absolute;
        top: 0;
    }
</style>