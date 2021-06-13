import { renderTrack } from './track';
import { store } from './store';
import { createElement } from '../utilities';

export interface ICar {
  name: string,
  color: string,
  id: number
}

export const renderGarage = () => { 
  // const main: HTMLElement | null = document.querySelector('.main');
  // const garage = document.querySelector('.garage');
  // const main = createElement('div', ['garage']);
  const garage = createElement('div', ['garage']);
  // const wrapper = createElement('div', ['wrapper', 'main-wrapper']);
  const pageDescription = createElement('div', ['page-description']);
  const fragment = document.createDocumentFragment();

  pageDescription.innerHTML = `
    <h2 class="currnent-page">Garage: ${store.carsCount} cars</h2>
    <h2 class="page-number">Page #${store.carsPage}</h2>
  `;

  fragment.appendChild(pageDescription);

  store.cars.map((car: ICar) => {
    fragment.appendChild(renderTrack(car.name, car.color, car.id));
  });
  
  // (<HTMLElement>garage).appendChild(pageDescription);
  // (<HTMLElement>garage).appendChild(fragment);

  garage.appendChild(pageDescription);
  garage.appendChild(fragment);

  // (<HTMLElement>garage).innerHTML = wrapper.outerHTML;
  
  // main.innerHTML = garage.outerHTML;
  // main?.appendChild(garage);
  // return main;
  return garage;
}
