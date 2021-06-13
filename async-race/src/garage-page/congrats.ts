import { createElement } from "../utilities";

export const renderCongrats = () => {
  const modal = createElement('div', ['congrats-modal']);
  // const overlay = createElement('div', ['overlay']);
  const text = createElement('h2', ['congrats-header']);
  
  modal.appendChild(text);
  // modal.appendChild(overlay);

  return modal;
}

export const showCongrats = (name: string, time: number) => {
  const congrats = document.querySelector('.congrats-modal');
  const text = document.querySelector('.congrats-header');
  const btnReset = document.querySelector('.btn-reset');
  (<HTMLButtonElement>btnReset).disabled = false;
  (<HTMLElement>text).innerHTML = `${name} went first on ${time} seconds`;
  (<HTMLElement>congrats).style.display = 'flex';
}

export const closeCongrats = () => {
  const congrats = document.querySelector('.congrats-modal');
  const text = document.querySelector('.congrats-header');
  const btnReset = document.querySelector('.btn-reset');
  (<HTMLElement>text).innerHTML = '';
  (<HTMLElement>congrats).style.display = 'none';  
  (<HTMLButtonElement>btnReset).disabled = true;
}