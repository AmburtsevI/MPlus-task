<script lang="ts">
  import { Toggle, Select, Label } from 'flowbite-svelte';

  let value = false;
  let selected: string;
  let rooms = [
    { value: 'Room 1', name: 'Комната 1' },
    { value: 'Room 2', name: 'Комната 2' },
    { value: 'Room 3', name: 'Комната 3' },
  ]
  $: console.log(value);
</script>

<div class="wrapper">
  Лампочка
  <div class="room-select">
    <Label class="text-white-900">
      Комната
      <Select size="sm" class="p-1 h-8" items={rooms} bind:value={selected} />
    </Label>
  </div>
  <Toggle
    color="purple"
    size="small"
    on:change={() => (value = !value)}
    class="text-white-900"
    >Включение</Toggle
  >
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
