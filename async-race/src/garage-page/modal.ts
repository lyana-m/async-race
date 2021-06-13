import { createCar, getCars, updateCar } from "../api";
import { carImage, createElement } from "../utilities";
import { makeNextBtnActive } from "./footer";
import { renderGarage } from "./garage";
import { addTrack } from "./garage-page";
import { store } from "./store";
import { createNewTrack } from "./track";

export const renderModal = () => {
  const modal = createElement('div', ['modal', 'car-modal']);
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
  const modal = document.querySelector('.car-modal');
  (<HTMLElement>modal).style.display = 'flex';
}

export const closeModal = () => {
  const modal = document.querySelector('.car-modal');
  const createBtn = document.querySelector('.btn-create-submit');
  (<HTMLElement>modal).style.display = 'none';
  // createBtn?.removeEventListener('click', modalHandler);
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
  const garage = document.querySelector('.garage');
  const id = store.selectedId;
  // const main = document.querySelector('main');
  const carProps = getCarProps();
  const currentPage = store.carsPage;
  closeModal();
  clearModal();

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

    if (+store.carsCount! > 7) {
      makeNextBtnActive();
    }    
  }
  // if (main) {
  //   renderGarage(main);
  // }
  // renderGarage();
  (<HTMLElement>garage).innerHTML = renderGarage().outerHTML;
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

