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
  const garage = renderGarage();
  const footer = renderFooter();  
  garagePage.appendChild(garage);
  garagePage.appendChild(footer);
  return garagePage;
}

export const addTrack = (newCar: ICar) => {  
  const garage = document.querySelector('.garage');
  const track = createNewTrack(newCar);
  garage?.appendChild(track);
}
