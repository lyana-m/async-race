import { renderHeader } from './header';
import { renderGarage, ICar } from './garage';
import { createElement } from '../utilities';
import { renderModal } from './modal';
import { createNewTrack } from './track';
import { renderFooter } from './footer';

export const fragment = document.createDocumentFragment();
const header = renderHeader();
const main = createElement('main', ['main']);
const footer = renderFooter();
const modal = renderModal();
renderGarage(main);
fragment.appendChild(header);
fragment.appendChild(main);
fragment.appendChild(footer);
fragment.appendChild(modal);

export const addTrack = (newCar: ICar) => {
  const container = document.querySelector('.main-wrapper');
  const track = createNewTrack(newCar);
  container?.appendChild(track);
}
