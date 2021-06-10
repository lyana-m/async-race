import { renderHeader } from './header';
import { renderGarage, ICar } from './garage';
import { createElement } from '../utilities';
import { renderModal } from './modal';
import { createNewTrack, removeTrack, updateTrack } from './track';
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

document.addEventListener('click', (event: Event) => {
  const target = event.target;
  if ((<HTMLElement>target).classList.contains('btn-remove')) {
    removeTrack(event);
  };
  if ((<HTMLElement>target).classList.contains('btn-update')) {
    updateTrack(event);
  };
  if ((<HTMLElement>target).classList.contains('btn-start')) {
    console.log('start');
  };
  if ((<HTMLElement>target).classList.contains('btn-stop')) {
    console.log('stop');
  };
})
