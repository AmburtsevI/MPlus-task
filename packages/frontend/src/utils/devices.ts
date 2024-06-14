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
import unknown from '../assets/devices/unknown.svg';
import type { devices, device, deviceInterface, TranslationMap } from '../types/types';

export const devicesArr: Record<string, string>[] = [
  { type: 'light', name: 'Свет' },
  { type: 'thermostat', name: 'Термостат' },
  { type: 'conditioner', name: 'Кондиционер' },
  { type: 'door', name: 'Дверь' },
  { type: 'fan', name: 'Вентилятор' },
  { type: 'heating', name: 'Обогрев' },
  { type: 'leak', name: 'Вода' },
  { type: 'socket', name: 'Розетка' },
  { type: 'switch', name: 'Выключатель' },
  { type: 'window', name: 'Окно' },
];

export const deviceIcon: (type: string) => string = (type: string) => {
  const icons: Record<string, string> = {
    light: light,
    thermostat: thermostat,
    conditioner: conditioner,
    door: door,
    fan: fan,
    heating: heating,
    leak: leak,
    socket: socket,
    switch: swiitch,
    window: window,
  };

  return icons[type] ? icons[type] : unknown;
};

export const deviceInterfaces: (type: string) => Record<string, string | number | boolean> = (type: string) => {
  const interfaces: deviceInterface = {
    light: { active: false, brightness: 0 },
    thermostat: { active: false, temperature: 0 },
    conditioner: { active: false, temperature: 0, swing: false },
    door: { active: false, open: false },
    fan: { active: false, speed: 0 },
    heating: { active: false, temperature: 0 },
    leak: { active: false },
    socket: { active: false },
    switch: { active: false },
    window: { active: false, open: false },
    unknown: { active: false },
  };

  return interfaces[type] ? interfaces[type] : interfaces['unknown'];
};


export const interfaceTranslation: TranslationMap = {
    active: 'Вкл/Выкл',
    brightness: 'Яркость',
    temperature: 'Температура',
    open: 'Открыть',
    speed: 'Скорость',
}