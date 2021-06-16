import { createCar, getCars, updateCar } from '../api';
import { carImage, createElement, makeBtnActive } from '../utilities';
import { CARS_PER_PAGE } from '../variables';
import { renderGarage } from './garage';
import { store } from './store';

export const checkField = () => {
  const input = document.querySelector('.text-input');
  const { value } = <HTMLInputElement>input;
  const btnOk = document.querySelector('.btn-ok');
  if (value) {
    (<HTMLButtonElement>btnOk).disabled = false;
  } else {
    (<HTMLButtonElement>btnOk).disabled = true;
  }
};

export const showModal = (action: string) => {
  const modal = document.querySelector('.car-modal');
  const header = document.querySelector('.controls-header');
  if (action === 'create') {
    (<HTMLElement>header).innerHTML = 'Create car';
  } else {
    (<HTMLElement>header).innerHTML = 'Update car';
  }
  (<HTMLElement>modal).style.display = 'flex';
  checkField();
};

export const clearModal = () => {
  const textInput = document.querySelector('.text-input');
  const colorInput = document.querySelector('.color-input');
  (<HTMLInputElement>textInput).value = '';
  (<HTMLInputElement>colorInput).value = '#ffffff';
  const carParts = document.querySelectorAll('.preview-car svg path');
  carParts.forEach((carPart) => {
    (<HTMLElement>carPart).style.fill = '#ffffff';
  });
};

export const closeModal = () => {
  const modal = document.querySelector('.car-modal');
  (<HTMLElement>modal).style.display = 'none';
  store.selectedId = -1;
  clearModal();
};

export const getCarProps = () => {
  const textInput = document.querySelector('.text-input');
  const colorInput = document.querySelector('.color-input');
  return {
    name: (<HTMLInputElement>textInput).value,
    color: (<HTMLInputElement>colorInput).value,
  };
};

const modalHandler = async () => {
  const garage = document.querySelector('.garage');
  const nextBtn: HTMLButtonElement | null = document.querySelector('.btn-next');
  const id = store.selectedId;
  const carProps = getCarProps();
  const currentPage = store.carsPage;
  closeModal();

  if (id >= 0) {
    await updateCar(id, carProps);
    store.selectedId = -1;
    const response = await getCars(currentPage);
    store.cars = response.items;
  } else {
    await createCar(carProps);
    const response = await getCars(currentPage);
    store.cars = response.items;
    store.carsCount = response.totalCount;

    if (+store.carsCount! > CARS_PER_PAGE) {
      if (nextBtn) makeBtnActive(nextBtn);
    }
  }
  (<HTMLElement>garage).innerHTML = renderGarage().outerHTML;
};

export const colorPreview = (colorInput: HTMLElement) => {
  const color = (<HTMLInputElement>colorInput).value;
  const carParts = document.querySelectorAll('.preview-car svg path');
  carParts.forEach((carPart) => {
    (<HTMLElement>carPart).style.fill = `${color}`;
  });
};

export const renderModal = () => {
  const modal = createElement('div', ['modal', 'car-modal']);
  const controls = createElement('div', ['controls']);
  const overlay = createElement('div', ['overlay']);
  const header = createElement('h2', ['controls-header'], 'Create car');
  const controlsInner = createElement('div', ['controls-inner']);
  const preview = createElement('div', ['preview-car']);
  const settings = createElement('div', ['settings']);
  const inputContainer = createElement('div', ['input-container']);
  const btnContainer = createElement('div', ['modal-btn-container']);
  const textInput = createElement('input', ['text-input']);
  const colorInput = createElement('input', ['color-input']);
  const btnOk = createElement('button', ['btn', 'btn-ok'], 'ok');
  const btnReset = createElement('button', ['btn', 'btn-reset-modal'], 'reset');
  preview.innerHTML = `${carImage}`;
  textInput.setAttribute('type', 'text');
  textInput.setAttribute('placeholder', 'Enter car name');
  colorInput.setAttribute('type', 'color');
  colorInput.setAttribute('value', '#ffffff');

  overlay.addEventListener('click', closeModal);
  btnReset.addEventListener('click', closeModal);
  textInput.addEventListener('input', () => checkField());
  colorInput.addEventListener('input', () => colorPreview(colorInput));
  btnOk.addEventListener('click', modalHandler);

  inputContainer.appendChild(textInput);
  inputContainer.appendChild(colorInput);
  btnContainer.appendChild(btnOk);
  btnContainer.appendChild(btnReset);
  settings.appendChild(inputContainer);
  settings.appendChild(btnContainer);
  controlsInner.appendChild(preview);
  controlsInner.appendChild(settings);
  controls.appendChild(header);
  controls.appendChild(controlsInner);
  modal.appendChild(controls);
  modal.appendChild(overlay);
  return modal;
};
