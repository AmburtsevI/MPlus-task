<script lang="ts">
  import light from '../assets/devices/light.svg';
  import thermostat from '../assets/devices/thermostat.svg';
  import conditioner from '../assets/devices/conditioner.svg';
  import door from '../assets/devices/door.svg';
  import fan from '../assets/devices/fan.svg';
  import heating from '../assets/devices/heating.svg';
  import leak from '../assets/devices/leak.svg';
  import socket from '../assets/devices/socket.svg';
  import swiitch from '../assets/devices/switch.svg';
  import window from '../assets/devices/window.svg';
  import arrow from '../assets/arrow.svg';

  let show = false;

  let devices = [
    { id: 1, type: 'light', room: '', name: 'Свет', coordinates: null, svg: light },
    { id: 2, type: 'thermostat', room: '', name: 'Термостат', coordinates: null, svg: thermostat },
    { id: 3, type: 'conditioner', room: '', name: 'Кондиционер', coordinates: null, svg: conditioner },
    { id: 4, type: 'door', room: '', name: 'Дверь', coordinates: null, svg: door },
    { id: 5, type: 'fan', room: '', name: 'Вентилятор', coordinates: null, svg: fan },
    { id: 6, type: 'heating', room: '', name: 'Обогрев', coordinates: null, svg: heating },
    { id: 7, type: 'leak', room: '', name: 'Вода', coordinates: null, svg: leak },
    { id: 8, type: 'socket', room: '', name: 'Розетка', coordinates: null, svg: socket },
    { id: 9, type: 'switch', room: '', name: 'Выключатель', coordinates: null, svg: swiitch },
    { id: 10, type: 'window', room: '', name: 'Окно', coordinates: null, svg: window },
  ];

  const handleDragStart = (event: DragEvent, device: any) => {
    if (!event.dataTransfer) {
      return;
    }
    const imageEl = createImage(device.svg);

    console.log(imageEl);
    if (imageEl) event.dataTransfer.setDragImage(imageEl, 30, 30);

    event.dataTransfer.setData('device', JSON.stringify(device));
  };

  const createImage = (svgElement: string) => {
    const img = new Image();
    img.src = svgElement;

    img.onload = () => {
      img.style.width = '60px';
      img.style.height = '60px';
    };

    return img;
  };

</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="open-panel" class:active={show} on:click={() => (show = !show)}>
  <img class="arrow" src={arrow} alt="arrow" />
  <span class="text">Устройства</span>
</div>
<div class="side-panel" class:active={show}>
  {#each devices as device}
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
      class="device-item"
      draggable="true"
      on:dragstart={(event) => handleDragStart(event, device)}
    >
      <img src={device.svg} alt={device.name} />
      <span>{device.name}</span>
    </div>
  {/each}
</div>

<style lang="scss">
  .open-panel {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 10px;
    background: rgba(213, 11, 255, 0.5);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(12.4px);
    height: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    text-align: center;
    width: 50px;
    height: 50px;
    transition: 0.3s ease;
    cursor: pointer;
    .text {
      width: 0;
      overflow: hidden;
      font-size: 18px;
      font-weight: 600;
      transition: 0.3s ease;
      cursor: inherit;
      pointer-events: none;
    }

    .arrow {
      transition: 0.3s ease;
      cursor: inherit;
    }

    &:hover {
      width: 150px;
      border-radius: 15px;
      padding: 0 10px 0 10px;

      .text {
        width: 120px;
      }
      .arrow {
        transform: rotate(180deg);
      }
    }

    &.active {
      left: 125px;
      width: 50px;
      padding: 0;
      border-radius: 50%;
      .arrow {
        transform: rotate(180deg);
      }
      .text {
        width: 0;
      }
    }
  }
  .side-panel {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 0 10px 10px 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    box-sizing: border-box;
    overflow-y: scroll;
    overflow-x: hidden;
    direction: rtl;
    gap: 10px;
    width: 0;
    max-height: 600px;
    z-index: 10;
    transition: 0.5s ease;

    &.active {
      width: 120px;
      padding: 10px;
    }
    &::-webkit-scrollbar {
      width: 3px;
      border-radius: 30px;
      -webkit-appearance: none;
    }
    &::-webkit-scrollbar-track {
      background: transparent;
    }
    &::-webkit-scrollbar-thumb {
      background: rgba(224, 224, 224, 0.2) !important;
    }
    .device-item {
      background: rgba(255, 255, 255, 0.33);
      box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(10.2px);
      border: 1px solid white;
      display: flex;
      flex-direction: column;
      padding: 10px;
      border-radius: 15px;
      box-sizing: border-box;
      text-align: center;
      font-size: 12px;
      font-weight: 500;
      width: 100px;
      height: 100px;
      justify-content: space-around;
      align-items: center;
      word-wrap: normal;

      img {
        width: 40px;
        height: 40px;
      }
    }
  }
</style>
