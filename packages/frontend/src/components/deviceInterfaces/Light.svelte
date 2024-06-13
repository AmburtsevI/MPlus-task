<script lang="ts">
  import { Toggle } from 'flowbite-svelte'

  let value = false;

  $: console.log(value)
</script>

<div class="wrapper">
   Лампочка
  <Toggle on:change={() => value = !value} />
</div>

<style lang="scss">
  .wrapper {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    height: fit-content;
  }
</style>