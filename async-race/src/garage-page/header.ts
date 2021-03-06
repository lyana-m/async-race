import { getCars } from '../api';
import { createElement, createRandomCars, makeBtnActive } from '../utilities';
import { renderGarage } from './garage';
import { showModal } from './modal';
import { store } from './store';

export const renderHeader = () => {
  const header = createElement('header', ['header']);
  const wrapper = createElement('div', ['wrapper', 'header-wrapper']);
  const leftContainer = createElement('div', ['header-btn-container', 'header-btn-container-left']);
  const btnGarage = createElement('button', ['btn', 'btn-garage', 'btn-active'], 'to garage');
  const btnWinners = createElement('button', ['btn', 'btn-winners'], 'to winners');
  const h1 = createElement('h1', ['main-header'], 'async-race');
  const rightContainer = createElement('div', ['header-btn-container', 'header-btn-container-right']);
  const subcontainer1 = createElement('div', ['header-btn-subcontainer']);
  const btnCreate = createElement('button', ['btn', 'btn-create'], 'create car');
  const btnRandom = createElement('button', ['btn', 'btn-random'], 'random cars');
  const subcontainer2 = createElement('div', ['header-btn-subcontainer']);
  const btnRace = createElement('button', ['btn', 'btn-race'], 'race');
  const btnReset = createElement('button', ['btn', 'btn-reset'], 'reset');
  (<HTMLButtonElement>btnReset).disabled = true;
  btnCreate.addEventListener('click', () => showModal('create'));
  btnRandom.addEventListener('click', async () => {
    const nextBtn: HTMLButtonElement | null = document.querySelector('.btn-next');
    const garage = document.querySelector('.garage');
    createRandomCars();
    const currentPage = store.carsPage;
    const response = await getCars(currentPage);
    store.cars = response.items;
    store.carsCount = response.totalCount;
    (<HTMLElement>garage).innerHTML = renderGarage().outerHTML;
    if (nextBtn) makeBtnActive(nextBtn);
  });
  subcontainer1.appendChild(btnCreate);
  subcontainer1.appendChild(btnRandom);
  subcontainer2.appendChild(btnRace);
  subcontainer2.appendChild(btnReset);
  leftContainer.appendChild(btnGarage);
  leftContainer.appendChild(btnWinners);
  rightContainer.appendChild(subcontainer1);
  rightContainer.appendChild(subcontainer2);
  wrapper.appendChild(leftContainer);
  wrapper.appendChild(h1);
  wrapper.appendChild(rightContainer);
  header.appendChild(wrapper);
  return header;
};
