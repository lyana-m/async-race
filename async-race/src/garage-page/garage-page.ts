import { listenHeader, renderHeader } from './header';
import { renderGarage, ICar } from './garage';
import { createElement } from '../utilities';
import { listenModal, renderModal } from './modal';
import { createNewTrack } from './track';
import { renderFooter } from './footer';

export const fragment = document.createDocumentFragment();
const header = createElement('header', ['header']);
const main = createElement('main', ['main']);
const footer = renderFooter()
const modal = createElement('div', ['modal']);
renderGarage(main);
header.innerHTML = renderHeader();

// main.innerHTML = renderGarage();
// main.appendChild(garage);
modal.innerHTML = renderModal();
fragment.appendChild(header);
fragment.appendChild(main);
fragment.appendChild(footer);
fragment.appendChild(modal);
listenHeader();

export const addTrack = (newCar: ICar) => {
  const container = document.querySelector('.main-wrapper');
  const track = createNewTrack(newCar);
  container?.appendChild(track);
}
