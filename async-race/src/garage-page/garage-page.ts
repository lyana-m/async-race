import { renderHeader } from './header';
import { renderGarage, ICar } from './garage';
import { createElement } from '../utilities';
import { renderModal } from './modal';
import { createNewTrack, removeTrack, startDriving, startRace, stopDriving, stopRace, updateTrack } from './track';
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
  const track: HTMLElement | null = (<HTMLElement>target).closest('.track-container');
  const id = Number(track?.getAttribute('id'));
  if ((<HTMLElement>target).classList.contains('btn-remove')) {
    removeTrack(id);
  };
  if ((<HTMLElement>target).classList.contains('btn-update')) {
    updateTrack(id);
  };
  if ((<HTMLElement>target).classList.contains('btn-start')) {
    startDriving(id);
  };
  if ((<HTMLElement>target).classList.contains('btn-stop')) {
    stopDriving(id);
  };
  if ((<HTMLElement>target).classList.contains('btn-race')) {
    startRace();
  };
  if ((<HTMLElement>target).classList.contains('btn-reset')) {
    stopRace();
  };
})
