import { getCars } from "../api";
import { createElement } from "../utilities"
import { renderGarage } from "./garage";
import { store } from "./store";

export const renderFooter = () => {
  const footer = createElement('footer', ['footer']);
  const wrapper = createElement('div', ['wrapper', 'footer-wrapper']);
  const prevBtn = createElement('button', ['btn', 'btn-prev'], 'prev');
  const nextBtn = createElement('button', ['btn', 'btn-next'], 'next');  
  nextBtn.addEventListener('click', nextBtnHandler);
  prevBtn.addEventListener('click', prevBtnHandler)
  prevBtn.setAttribute('disabled', 'true');
  nextBtn.setAttribute('disabled', 'true');
  wrapper.appendChild(prevBtn);
  wrapper.appendChild(nextBtn);
  footer.appendChild(wrapper);
  return footer;
}

export const makeNextBtnActive = () => {
  const nextBtn = document.querySelector('.btn-next');  
  nextBtn?.removeAttribute('disabled');
}

export const makeNextBtnDisabled = () => {
  const nextBtn = document.querySelector('.btn-next');  
  nextBtn?.setAttribute('disabled', 'true');
}

export const makePrevBtnActive = () => {
  const prevBtn = document.querySelector('.btn-prev');  
  prevBtn?.removeAttribute('disabled');
}

export const makePrevBtnDisabled = () => {
  const prevBtn = document.querySelector('.btn-prev');  
  prevBtn?.setAttribute('disabled', 'true');
}

const nextBtnHandler = async () => {
  const main = document.querySelector('main');
  const currentPage = store.carsPage;
  const response = await getCars(currentPage + 1);  
  store.cars = response.items;
  store.carsPage++;
  if (main) {
    renderGarage(main);
  }
  if (store.cars.length < 7) {
    makeNextBtnDisabled();
  }
  if (store.carsPage > 1) {
    makePrevBtnActive();
  }
}

const prevBtnHandler = async () => {
  const main = document.querySelector('main');
  const currentPage = store.carsPage;
  const response = await getCars(currentPage - 1);
  store.cars = response.items;
  store.carsPage--;
  if (main) {
    renderGarage(main);
  }
  if (store.carsPage === 1) {
    makePrevBtnDisabled();
  }
  if (store.cars.length === 7) {
    makeNextBtnActive();
  }
}