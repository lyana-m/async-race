import { renderTrack } from './track';
import { store } from './store';
import { createElement } from '../utilities';

export interface ICar {
  name: string,
  color: string,
  id: number
}

export const renderGarage = (main: HTMLElement) => {  
  const garage = createElement('div', ['wrapper', 'main-wrapper']);
  const pageDescription = createElement('div', ['page-description']);
  const fragment = document.createDocumentFragment();

  pageDescription.innerHTML = `
    <h2 class="currnent-page">Garage: ${store.carsCount} cars</h2>
    <h2 class="page-number">Page #${store.carsPage}</h2>
  `;

  store.cars.map((car: ICar) => {
    fragment.appendChild(renderTrack(car.name, car.color));
  });

  garage.appendChild(pageDescription);
  garage.appendChild(fragment);
  
  main.innerHTML = garage.outerHTML;


  // store.cars.map((car: ICar) => {
  //   renderTrack(car.name, car.color);
  // });
  // return `
  //   <div class="wrapper">
  //     <div class="page-description">
  //       <h2 class="currnent-page">Garage: 4 cars</h2>
  //       <h2 class="page-number">Page #1</h2>
  //     </div>
  //     ${store.cars.map((car: ICar) => {
  //       return renderTrack(car.name, car.color);
  //     }).join('')}       
  //   </div>
  // `
}