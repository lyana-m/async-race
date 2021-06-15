import { getCars } from "../api";
import { createElement, makeBtnActive, makeBtnDisabled } from "../utilities"
import { renderGarage } from "./garage";
import { store } from "./store";

export const renderFooter = () => {
  const footer = createElement('footer', ['footer']);
  const wrapper = createElement('div', ['wrapper', 'footer-wrapper']);
  const prevBtn = createElement('button', ['btn', 'btn-prev', 'garage-btn-prev'], 'prev');
  const nextBtn = createElement('button', ['btn', 'btn-next', 'garage-btn-next'], 'next');  
  wrapper.appendChild(prevBtn);
  wrapper.appendChild(nextBtn);
  footer.appendChild(wrapper);
  return footer;
}

export const nextBtnHandler = async () => {  
  const garage = document.querySelector('.garage');  
  const currentPage = store.carsPage;
  const response = await getCars(currentPage + 1);  
  store.cars = response.items;
  store.carsPage++;  
  updateGargeBtnState();
  (<HTMLElement>garage).innerHTML = renderGarage().outerHTML;  
}

export const prevBtnHandler = async () => {  
  const garage = document.querySelector('.garage');  
  const currentPage = store.carsPage;
  const response = await getCars(currentPage - 1);
  store.cars = response.items;
  store.carsPage--;  
  updateGargeBtnState();
  (<HTMLElement>garage).innerHTML = renderGarage().outerHTML;  
}

export const updateGargeBtnState = () => {
  const nextBtn: HTMLButtonElement | null = document.querySelector('.btn-next');
  const prevBtn: HTMLButtonElement | null = document.querySelector('.btn-prev');  

  if (store.carsPage === 1) {
    if (prevBtn) prevBtn.disabled = true;
    if (store.cars.length < +store.carsCount!) {
      if (nextBtn) nextBtn.disabled = false;
    } else {
      if (nextBtn) nextBtn.disabled = true;
    }
  } else {
    if (prevBtn) prevBtn.disabled = false;    
    if ((store.carsPage - 1) * 7 + store.cars.length === +store.carsCount!) {
      if (nextBtn) nextBtn.disabled = true;
    } else {
      if (nextBtn) nextBtn.disabled = false;
    }
  }
}