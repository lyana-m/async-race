import { getCars } from '../api';
import { createElement } from '../utilities';
import { CARS_PER_PAGE } from '../variables';
import { renderGarage } from './garage';
import { store } from './store';

export const renderFooter = () => {
  const footer = createElement('footer', ['footer']);
  const wrapper = createElement('div', ['wrapper', 'footer-wrapper']);
  const prevBtn = createElement('button', ['btn', 'btn-prev', 'garage-btn-prev'], 'prev');
  const nextBtn = createElement('button', ['btn', 'btn-next', 'garage-btn-next'], 'next');
  wrapper.appendChild(prevBtn);
  wrapper.appendChild(nextBtn);
  footer.appendChild(wrapper);
  return footer;
};

export const updateGarageBtnState = () => {
  const nextBtn: HTMLButtonElement | null = document.querySelector('.btn-next');
  const prevBtn: HTMLButtonElement | null = document.querySelector('.btn-prev');

  if (!nextBtn || !prevBtn) {
    return;
  }

  if (store.carsPage === 1) {
    prevBtn.disabled = true;
    if (store.cars.length < +store.carsCount!) {
      nextBtn.disabled = false;
    } else nextBtn.disabled = true;
  } else {
    prevBtn.disabled = false;
    if ((store.carsPage - 1) * CARS_PER_PAGE + store.cars.length === +store.carsCount!) {
      nextBtn.disabled = true;
    } else nextBtn.disabled = false;
  }
};

export const nextBtnHandler = async () => {
  const raceBtn = document.querySelector('.btn-race');
  const resetBtn = document.querySelector('.btn-reset');
  const garage = document.querySelector('.garage');
  const currentPage = store.carsPage;
  const response = await getCars(currentPage + 1);
  store.cars = response.items;
  store.carsPage++;
  updateGarageBtnState();
  (<HTMLButtonElement>raceBtn).disabled = false;
  (<HTMLButtonElement>resetBtn).disabled = true;
  (<HTMLElement>garage).innerHTML = renderGarage().outerHTML;
};

export const prevBtnHandler = async () => {
  const raceBtn = document.querySelector('.btn-race');
  const resetBtn = document.querySelector('.btn-reset');
  const garage = document.querySelector('.garage');
  const currentPage = store.carsPage;
  const response = await getCars(currentPage - 1);
  store.cars = response.items;
  store.carsPage--;
  updateGarageBtnState();
  (<HTMLButtonElement>raceBtn).disabled = false;
  (<HTMLButtonElement>resetBtn).disabled = true;
  (<HTMLElement>garage).innerHTML = renderGarage().outerHTML;
};
