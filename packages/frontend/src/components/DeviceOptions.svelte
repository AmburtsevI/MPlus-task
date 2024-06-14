<script lang="ts">
  import { Toggle, Select, Label } from 'flowbite-svelte';
  import type { device } from '../types/types';
  import { getAllRooms } from '../utils/house';
  import { onMount } from 'svelte';
  import { deviceInterfaces, interfaceTranslation } from '../utils/devices';
  import { socket } from '../utils/socket';

  export let device: device;

  let value = false;
  let selectedRoom: number;
  let rooms: { name: string; value: string }[] = [];
  const { params, name, id, type, room } = device;

  const settings = {
    name: '',
    params: {...params},
    roomId: 0,
  }
  let deviceSettings: Record<string, string | boolean | number> = deviceInterfaces(type.toString());

  const getRoomData = async () => {
    const allRooms = await getAllRooms();
    rooms = allRooms.map((room: Record<string, any>) => ({ name: room.name, value: room.id }));
  }

  const handleChangeParams = () => {
    if (typeof params === 'object' && params !== null) {
      socket.emit('update', { id, params, name, room });
    }
  }

  onMount(() => {
    getRoomData();
  });

  $: console.log(deviceSettings)
</script>

<div class="wrapper">
  { name }
  <div class="room-select">
    <Label class="text-white-900">
      Комната
      <Select size="sm" class="p-1 h-7" items={rooms} bind:value={settings.roomId} placeholder="Room choice" />
    </Label>
  </div>
  {#each Object.entries(deviceSettings) as [key, value]} 
  <Label class="text-white-900">
    {#if typeof value === 'boolean'}
      <Toggle
        color="purple"
        bind:checked={settings.params[key]}
        on:change={handleChangeParams}
      />
    {/if}
  </Label>
{/each}
</div>

<style lang="scss">
  .wrapper {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    gap: 5px;
    height: fit-content;

    .room-select {
      margin-bottom: 5px;
    }
  }
</style>
