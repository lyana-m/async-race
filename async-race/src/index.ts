import './style.scss';
import { renderGaragePage } from './garage-page/garage-page';
import { renderHeader } from './garage-page/header';
import { createElement, makeBtnActive } from './utilities';
import { renderModal } from './garage-page/modal';
import { renderCongrats, closeCongrats } from './garage-page/congrats';
import { renderWinnersPage } from './winners-page/winners-page';
import { removeTrack, startDriving, startRace, stopDriving, stopRace, updateTrack } from './garage-page/track';
import { updateWinBtnState, winNextBtnHandler, winPrevBtnHandler } from './winners-page/winners-footer';
import { nextBtnHandler, prevBtnHandler, updateGargeBtnState } from './garage-page/footer';
import { sort } from './winners-page/winners-table';

const body = document.querySelector('body');
const header = renderHeader();
const main = createElement('main', ['main']);
const garagePage = renderGaragePage();
main.appendChild(garagePage);
const modal = renderModal();
const congrats = renderCongrats();

body?.appendChild(header);
body?.appendChild(main);
body?.appendChild(modal);
body?.appendChild(congrats);

const init = () => {  
  updateGargeBtnState();
}
init();

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
    startDriving(id).catch(e => new Error('not finished'));
  };
  if ((<HTMLElement>target).classList.contains('btn-stop')) {
    stopDriving(id);
  };
  if ((<HTMLElement>target).classList.contains('btn-race')) {
    startRace();
  };
  if ((<HTMLElement>target).classList.contains('btn-reset')) {
    stopRace();
    // closeCongrats();
  };
  if ((<HTMLElement>target).classList.contains('btn-garage')) {  
    toGarage();
  };
  if ((<HTMLElement>target).classList.contains('btn-winners')) {    
    toWinners();
  };
  if ((<HTMLElement>target).classList.contains('garage-btn-prev')) {  
    prevBtnHandler();
  };
  if ((<HTMLElement>target).classList.contains('garage-btn-next')) {  
    nextBtnHandler();
  };
  if ((<HTMLElement>target).classList.contains('win-btn-prev')) {    
    winPrevBtnHandler();
  };
  if ((<HTMLElement>target).classList.contains('win-btn-next')) {  
    winNextBtnHandler();
  };
  if ((<HTMLElement>target).classList.contains('header-time')) {    
    sort('time');
  };
  if ((<HTMLElement>target).classList.contains('header-wins')) { 
    sort('wins');
  };
})

export const toWinners = async () => {
  const winnersPage = renderWinnersPage();
  const main = document.querySelector('.main');
  const garageBtn = document.querySelector('.btn-garage');
  const winnersBtn = document.querySelector('.btn-winners');  
  const btnContainers = document.querySelectorAll('.header-btn-subcontainer');  

  garageBtn?.classList.remove('btn-active');
  winnersBtn?.classList.add('btn-active');  
  btnContainers.forEach(c => (<HTMLElement>c).style.display = 'none');

  main!.innerHTML = winnersPage.outerHTML;
  updateWinBtnState();
}

export const toGarage = () => {
  const garagePage = renderGaragePage();
  const main = document.querySelector('.main');
  const garageBtn = document.querySelector('.btn-garage');
  const winnersBtn = document.querySelector('.btn-winners');  
  const btnContainers = document.querySelectorAll('.header-btn-subcontainer');
  
  winnersBtn?.classList.remove('btn-active');
  garageBtn?.classList.add('btn-active');  
  btnContainers.forEach(c => (<HTMLElement>c).style.display = 'flex')

  main!.innerHTML = garagePage.outerHTML;
  updateGargeBtnState();
}