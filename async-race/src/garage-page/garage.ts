import { renderTrack } from './track';
import { store } from './store';
import { createElement } from '../utilities';

export interface ICar {
  name: string,
  color: string,
  id: number
}

export const renderGarage = () => {  
  const garage = createElement('div', ['garage']);  
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

  garage.appendChild(pageDescription);
  garage.appendChild(fragment);
  
  return garage;
}
