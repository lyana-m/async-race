import { createCar, IBody } from "./api";
import { store } from "./garage-page/store";

export const carImage = `
  <?xml version="1.0"?>
  <svg class="car-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
    <g id="_13-car" data-name="13-car">
      <g id="glyph">
        <path
          d="M120,236a52,52,0,1,0,52,52A52.059,52.059,0,0,0,120,236Zm0,76a24,24,0,1,1,24-24A24,24,0,0,1,120,312Z"
          fill="#fff" />
        <path
          d="M408,236a52,52,0,1,0,52,52A52.059,52.059,0,0,0,408,236Zm0,76a24,24,0,1,1,24-24A24,24,0,0,1,408,312Z"
          fill="#fff" />
        <path
          d="M477.4,193.04,384,176l-79.515-65.975A44.109,44.109,0,0,0,276.526,100H159.38a43.785,43.785,0,0,0-34.359,16.514L74.232,176H40A36.04,36.04,0,0,0,4,212v44a44.049,44.049,0,0,0,44,44h9.145a64,64,0,1,1,125.71,0h162.29a64,64,0,1,1,125.71,0H472a36.04,36.04,0,0,0,36-36V228.632A35.791,35.791,0,0,0,477.4,193.04ZM180,164a12,12,0,0,1-12,12H115.245a6,6,0,0,1-4.563-9.9l34.916-40.9A12,12,0,0,1,154.724,121H168a12,12,0,0,1,12,12Zm60,56H224a12,12,0,0,1,0-24h16a12,12,0,0,1,0,24Zm94.479-43.706-114.507-.266a12,12,0,0,1-11.972-12V133a12,12,0,0,1,12-12h57.548a12,12,0,0,1,7.433,2.58l53.228,42A6,6,0,0,1,334.479,176.294Z"
          fill="#fff" />
        </g>
      </g>
  </svg>
`;

export const createElement = (tagName: keyof HTMLElementTagNameMap, classes: string[], text = '') => {
  const element = document.createElement(tagName);
  element.classList.add(...classes);
  element.innerHTML = text;
  return element;
}

const names = ['Lada', 'Opel', 'Skoda', 'Reno', 'Mersedes', 'Audi', 'Toyota', 'Volkswagen', 'Nissan', 'Rolls-Royce', 'Aston Martin', 'Kia'];
const models = ['Golf', 'Corolla', 'Tiguan', 'X-Ray', 'Qashqai', 'Logan', 'Tuareg', 'Passat', 'Rio', 'Sportage', 'TT', 'R8'];

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

export const getDistanceBetween = (car: HTMLElement, flag: HTMLElement) => {
  const carProps = car.getBoundingClientRect();
  const flagProps = flag.getBoundingClientRect();
  // const carCenter = { x: carProps.x + carProps.width / 2,  y: carProps.y + carProps.height / 2 };
  // const flagCenter = { x: flagProps.x + flagProps.width / 2,  y: flagProps.y + flagProps.height / 2 };
  const carCenter = carProps.x + carProps.width / 2;
  const flagCenter = flagProps.x + flagProps.width / 2;

  return flagCenter - carCenter;
}

interface IState {
  id: number;
}

export const animateCar = (car: HTMLElement, id: number, distance: number, duration: number) => {
  let start: number;
  let requestId: number;  

  function move(timestamp: DOMHighResTimeStamp) {
    if (start === undefined) {
      start = timestamp;
    }

    const elapsedTime = timestamp - start;
    const passedDistance = Math.round(elapsedTime * (distance / duration));

    car!.style.transform = `translateX(${Math.min(passedDistance, distance) + 70}px)`;

    // if (passedDistance < distance) {      
    //   requestId = window.requestAnimationFrame(move);
    // }
    if (elapsedTime < duration) {
      requestId = window.requestAnimationFrame(move);
      // console.log('requestId', requestId);
      store.animation[id] = requestId;
    }
  }
  requestId = window.requestAnimationFrame(move);
  // console.log('1', requestId);
  return;
}
