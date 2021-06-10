import { createCar, getCars } from "../api";
import { carImage, createElement } from "../utilities";
import { makeNextBtnActive } from "./footer";
import { renderGarage } from "./garage";
import { addTrack } from "./garage-page";
import { store } from "./store";
import { createNewTrack } from "./track";

export const renderModal = () => {
  const modal = createElement('div', ['modal']);
  const controls = createElement('div', ['controls']);
  const overlay = createElement('div', ['overlay']);
  const headerCreate = createElement('h2', ['controls-header'], 'Create car');
  const headerUpdate = createElement('h2', ['controls-header'], 'Update car');
  const controlsInner = createElement('div', ['controls-inner']);
  const preview = createElement('div', ['preview-car']);
  const settings = createElement('div', ['settings']);
  const inputContainer = createElement('div', ['input-container']);
  const btnContainer = createElement('div', ['modal-btn-container']);
  const textInput = createElement('input', ['text-input']);
  const colorInput = createElement('input', ['color-input']);
  const btnOk = createElement('button', ['btn', 'btn-ok'], 'ok');  
  const btnReset = createElement('button', ['btn', 'btn-reset'], 'reset');
  preview.innerHTML = `${carImage}`;
  textInput.setAttribute('type', 'text');
  textInput.setAttribute('placeholder', 'Enter car name');
  colorInput.setAttribute('type', 'color');

  overlay.addEventListener('click', closeModal);
  btnReset.addEventListener('click', closeModal);
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
  controls.appendChild(headerCreate);
  controls.appendChild(headerUpdate);
  controls.appendChild(controlsInner);
  modal.appendChild(controls);
  modal.appendChild(overlay);
  return modal;
}

export const showModal = () => {
  const modal = document.querySelector('.modal');
  (<HTMLElement>modal).style.display = 'flex';
}

export const closeModal = () => {
  const modal = document.querySelector('.modal');
  const createBtn = document.querySelector('.btn-create-submit');
  (<HTMLElement>modal).style.display = 'none';
  createBtn?.removeEventListener('click', modalHandler);
}

export const clearModal = () => {
  const textInput = document.querySelector('.text-input');
  const colorInput = document.querySelector('.color-input');
  (<HTMLInputElement>textInput).value = '';
  (<HTMLInputElement>colorInput).value = '#ffffff';
  const carParts = document.querySelectorAll('.preview-car svg path');
  carParts.forEach(carPart => {
    (<HTMLElement>carPart).style.fill = '#ffffff';
  });
}

const modalHandler = async () => {
  const main = document.querySelector('main');
  const carProps = getCarProps();
  closeModal();
  clearModal();
  await createCar(carProps);
  const response = await getCars(1);
  store.cars = response.items;
  store.carsCount = response.totalCount;

  console.log(store.carsCount);

  if (+store.carsCount! > 7) {
    makeNextBtnActive();
  }

  if (main) {
    renderGarage(main);
  }
}

export const colorPreview = (colorInput: HTMLElement) => {
  const color = (<HTMLInputElement>colorInput).value;
  const carParts = document.querySelectorAll('.preview-car svg path');
  carParts.forEach(carPart => {
    (<HTMLElement>carPart).style.fill = `${color}`;
  });
}

export const getCarProps = () => {
  const textInput = document.querySelector('.text-input');
  const colorInput = document.querySelector('.color-input');
  return {
    name: (<HTMLInputElement>textInput).value,
    color: (<HTMLInputElement>colorInput).value
  }
}

