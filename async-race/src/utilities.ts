import { createCar, IBody } from "./api";

export const createElement = (tagName: keyof HTMLElementTagNameMap, classes: string[]) => {
  const element = document.createElement(tagName);
  element.classList.add(...classes);
  return element;
}

const names = ['Lada', 'Opel', 'Skoda', 'Reno', 'Mersedes', 'Audi', 'Toyota', 'Volkswagen', 'Nissan', 'Rolls-Royce'];
const models = ['Golf', 'Corolla', 'Tiguan', 'X-Ray', 'Qashqai', 'Logan', 'Tuareg', 'Passat'];

const getRandomName = () => {
  const name = names[Math.floor(Math.random() * names.length)];
  const model = models[Math.floor(Math.random() * models.length)];
  return `${name} ${model}`
}

const getRandomColor = () => {
  const r = Math.floor(Math.random() * (256));
  const g = Math.floor(Math.random() * (256));
  const b = Math.floor(Math.random() * (256));
  const color = '#' + r.toString(16) + g.toString(16) + b.toString(16);
  return color
}

export const createRandomCars = () => {
  let carProps: IBody[] = []
  for (let i = 0; i < 100; i++) {
    carProps[i] = { name: getRandomName(), color: getRandomColor() }
  }
  carProps.forEach(car => createCar(car));
}

