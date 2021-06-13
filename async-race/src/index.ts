import './style.scss';
import { renderGaragePage } from './garage-page/garage-page';
import { makeNextBtnActive } from './garage-page/footer';
import { store } from './garage-page/store';
import { renderHeader } from './garage-page/header';
import { createElement } from './utilities';
import { renderModal } from './garage-page/modal';
import { renderCongrats, closeCongrats } from './garage-page/congrats';
import { renderWinnersPage } from './winners-page/winners-page';
import { removeTrack, startDriving, startRace, stopDriving, stopRace, updateTrack } from './garage-page/track';

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
  if (+store.carsCount! > 7) {
    makeNextBtnActive();
  }
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
    closeCongrats();
  };
  if ((<HTMLElement>target).classList.contains('btn-garage')) {  
    toGarage();
  };
  if ((<HTMLElement>target).classList.contains('btn-winners')) {  
    toWinners();
  };
})

export const toWinners = async () => {
  const winnersPage = await renderWinnersPage();
  const main = document.querySelector('.main');
  const garageBtn = document.querySelector('.btn-garage');
  const winnersBtn = document.querySelector('.btn-winners');  
  const btnContainers = document.querySelectorAll('.header-btn-subcontainer');  

  garageBtn?.classList.remove('btn-active');
  winnersBtn?.classList.add('btn-active');  
  btnContainers.forEach(c => (<HTMLElement>c).style.display = 'none')

  main!.innerHTML = winnersPage.outerHTML;
}

export const toGarage = () => {
  const garagePage = renderGaragePage();;
  const main = document.querySelector('.main');
  const garageBtn = document.querySelector('.btn-garage');
  const winnersBtn = document.querySelector('.btn-winners');  
  const btnContainers = document.querySelectorAll('.header-btn-subcontainer');
  
  winnersBtn?.classList.remove('btn-active');
  garageBtn?.classList.add('btn-active');  
  btnContainers.forEach(c => (<HTMLElement>c).style.display = 'flex')

  main!.innerHTML = garagePage.outerHTML;
}