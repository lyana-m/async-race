import { renderHeader } from './header';
import { renderGarage, ICar } from './garage';
import { createElement } from '../utilities';
import { renderModal } from './modal';
import { createNewTrack, removeTrack, startDriving, startRace, stopDriving, stopRace, updateTrack } from './track';
import { renderFooter } from './footer';
import { closeCongrats, renderCongrats } from './congrats';
import { store } from './store';

export const fragment = document.createDocumentFragment();

export const renderGaragePage = () => {
  const garagePage = createElement('div', ['wrapper', 'garage-page']);
  // const garage = createElement('div', ['garage']);
  
  // const pageDescription = createElement('div', ['page-description']);
  // pageDescription.innerHTML = `
  //   <h2 class="currnent-page">Garage: ${store.carsCount} cars</h2>
  //   <h2 class="page-number">Page #${store.carsPage}</h2>
  // `;
  // const fragment = document.createDocumentFragment();
  // const garage = renderGarage();
  // renderGarage();
  const garage = renderGarage();
  const footer = renderFooter();
  // garagePage.appendChild(pageDescription);
  // garagePage.appendChild(garage);
  garagePage.appendChild(garage);
  garagePage.appendChild(footer);
  return garagePage;
}

// const main: HTMLElement | null = document.querySelector('.main');
// const header = renderHeader();
// const main = createElement('main', ['main']);
// const main = renderGarage();
// const footer = renderFooter();
// const modal = renderModal();
// const congrats = renderCongrats();
// if (main) {
//   renderGarage(main);
// }
// fragment.appendChild(header);
// fragment.appendChild(main);
// fragment.appendChild(footer);
// fragment.appendChild(modal);
// fragment.appendChild(congrats);

export const addTrack = (newCar: ICar) => {
  // const container = document.querySelector('.main-wrapper');
  // const track = createNewTrack(newCar);
  // container?.appendChild(track);
  const garage = document.querySelector('.garage');
  const track = createNewTrack(newCar);
  garage?.appendChild(track);
}

// document.addEventListener('click', (event: Event) => {
//   const target = event.target;
//   const track: HTMLElement | null = (<HTMLElement>target).closest('.track-container');
//   const id = Number(track?.getAttribute('id'));
//   if ((<HTMLElement>target).classList.contains('btn-remove')) {
//     removeTrack(id);
//   };
//   if ((<HTMLElement>target).classList.contains('btn-update')) {
//     updateTrack(id);
//   };
//   if ((<HTMLElement>target).classList.contains('btn-start')) {
//     startDriving(id);
//   };
//   if ((<HTMLElement>target).classList.contains('btn-stop')) {
//     stopDriving(id);
//   };
//   if ((<HTMLElement>target).classList.contains('btn-race')) {
//     startRace();
//   };
//   if ((<HTMLElement>target).classList.contains('btn-reset')) {
//     stopRace();
//     closeCongrats();
//   };
// })
