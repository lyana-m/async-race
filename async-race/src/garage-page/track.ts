import { createElement } from '../utilities';
import { renderCar } from './car';
import { ICar } from './garage';
import { getCarProps } from './modal';
import { store } from './store';

export const renderTrack = (carName: string, color: string, id: number) => {  
  const track = createElement('div', ['track-container']);
  track.setAttribute('id', `${id}`);
  const trackBtnContainer = createElement('div', ['track-btn-container']);
  const btnUpdate = createElement('button', ['btn-track', 'btn-update'], 'update');
  const btnRemove = createElement('button', ['btn-track', 'btn-remove'], 'remove');
  const name = createElement('h3', ['car-model'], `${carName}`);
  const engineBtnContainer = createElement('div', ['engine-btn-container']);
  const btnStart = createElement('button', ['btn-track', 'btn-engine', 'btn-start'], 'a');
  const btnStop = createElement('button', ['btn-track', 'btn-engine', 'btn-stop'], 'b');
  const carContainer = createElement('div', ['car-container']);
  carContainer.innerHTML = `${renderCar(color)}`;
  const flagContainer = createElement('div', ['flag-container']);
  flagContainer.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path d="M4 24h-2v-24h2v24zm18-16l-16-6v12l16-6z" fill="#F70303" /
    </svg>
  `;

  trackBtnContainer.appendChild(btnUpdate);
  trackBtnContainer.appendChild(btnRemove);
  trackBtnContainer.appendChild(name);
  engineBtnContainer.appendChild(btnStart);
  engineBtnContainer.appendChild(btnStop);
  track.appendChild(trackBtnContainer);
  track.appendChild(engineBtnContainer);
  track.appendChild(carContainer);
  track.appendChild(flagContainer);
  
  return track;  
}

export const createNewTrack = (newCar: ICar) => {  
  return renderTrack(newCar.name, newCar.color, newCar.id);  
} 