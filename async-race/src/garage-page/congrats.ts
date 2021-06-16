import { createElement } from '../utilities';

export const showCongrats = (name: string, time: number) => {
  const congrats = document.querySelector('.congrats-modal');
  const text = document.querySelector('.congrats-header');
  (<HTMLElement>text).innerHTML = `${name} went first on ${time} seconds`;
  (<HTMLElement>congrats).style.display = 'flex';
};

export const closeCongrats = () => {
  const congrats = document.querySelector('.congrats-modal');
  const text = document.querySelector('.congrats-header');
  const btnReset = document.querySelector('.btn-reset');
  (<HTMLElement>text).innerHTML = '';
  (<HTMLElement>congrats).style.display = 'none';
  (<HTMLButtonElement>btnReset).disabled = false;
};

export const renderCongrats = () => {
  const modal = createElement('div', ['modal', 'congrats-modal']);
  const overlay = createElement('div', ['overlay', 'congrats-overlay']);
  const modalInner = createElement('div', ['modal-inner']);
  const text = createElement('h2', ['congrats-header'], 'kykyky');
  const close = createElement('div', ['close-icon']);

  modalInner.appendChild(close);
  modalInner.appendChild(text);
  modal.appendChild(modalInner);
  modal.appendChild(overlay);
  overlay.addEventListener('click', closeCongrats);
  close.addEventListener('click', closeCongrats);

  return modal;
};
