import { renderGarage, ICar } from './garage';
import { createElement } from '../utilities';
import { createNewTrack } from './track';
import { renderFooter } from './footer';

export const fragment = document.createDocumentFragment();

export const renderGaragePage = () => {
  const garagePage = createElement('div', ['wrapper', 'garage-page']);
  const garage = renderGarage();
  const footer = renderFooter();
  garagePage.appendChild(garage);
  garagePage.appendChild(footer);
  return garagePage;
};

export const addTrack = (newCar: ICar) => {
  const garage = document.querySelector('.garage');
  const track = createNewTrack(newCar);
  garage?.appendChild(track);
};
