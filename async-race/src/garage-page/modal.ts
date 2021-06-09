import { createCar, getCars } from "../api";
import { makeNextBtnActive } from "./footer";
import { renderGarage } from "./garage";
import { addTrack } from "./garage-page";
import { store } from "./store";
import { createNewTrack } from "./track";

export const renderModal = () => {
  return `
    <div class="controls">
      <div class="create">
        <h2 class="controls-header">Create car</h2>
        <div class="controls-inner">
          <div class="preview-car">
            <?xml version="1.0"?>
            <svg class="car-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
              <g id="_13-car" data-name="13-car">
                <g id="glyph">
                  <path
                    d="M120,236a52,52,0,1,0,52,52A52.059,52.059,0,0,0,120,236Zm0,76a24,24,0,1,1,24-24A24,24,0,0,1,120,312Z"
                    fill="#fff" />
                  <path
                    d="M408,236a52,52,0,1,0,52,52A52.059,52.059,0,0,0,408,236Zm0,76a24,24,0,1,1,24-24A24,24,0,0,1,408,312Z"
                    fill="#fff" />
                  <path
                    d="M477.4,193.04,384,176l-79.515-65.975A44.109,44.109,0,0,0,276.526,100H159.38a43.785,43.785,0,0,0-34.359,16.514L74.232,176H40A36.04,36.04,0,0,0,4,212v44a44.049,44.049,0,0,0,44,44h9.145a64,64,0,1,1,125.71,0h162.29a64,64,0,1,1,125.71,0H472a36.04,36.04,0,0,0,36-36V228.632A35.791,35.791,0,0,0,477.4,193.04ZM180,164a12,12,0,0,1-12,12H115.245a6,6,0,0,1-4.563-9.9l34.916-40.9A12,12,0,0,1,154.724,121H168a12,12,0,0,1,12,12Zm60,56H224a12,12,0,0,1,0-24h16a12,12,0,0,1,0,24Zm94.479-43.706-114.507-.266a12,12,0,0,1-11.972-12V133a12,12,0,0,1,12-12h57.548a12,12,0,0,1,7.433,2.58l53.228,42A6,6,0,0,1,334.479,176.294Z"
                    fill="#fff" />
                  </g>
                </g>
            </svg>
          </div>
        <div class="settings">
          <div class="input-container">
            <input type="text" class="text-input" placeholder="Enter car name">
            <input type="color" class="color-input">
          </div>
          <div class="modal-btn-container">
            <button class="btn btn-create-submit">create</button>
            <button class="btn btn-cancel">cancel</button>
          </div>
        </div>
      </div>
    </div>
    <div class="update">
      <h2 class="controls-header">Update car</h2>
      <div class="controls-inner">
        <div class="preview-car">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
            <g id="_13-car" data-name="13-car">
              <g id="glyph">
                <path
                  d="M120,236a52,52,0,1,0,52,52A52.059,52.059,0,0,0,120,236Zm0,76a24,24,0,1,1,24-24A24,24,0,0,1,120,312Z"
                  fill="#fff" />
                <path
                  d="M408,236a52,52,0,1,0,52,52A52.059,52.059,0,0,0,408,236Zm0,76a24,24,0,1,1,24-24A24,24,0,0,1,408,312Z"
                  fill="#fff" />
                <path
                  d="M477.4,193.04,384,176l-79.515-65.975A44.109,44.109,0,0,0,276.526,100H159.38a43.785,43.785,0,0,0-34.359,16.514L74.232,176H40A36.04,36.04,0,0,0,4,212v44a44.049,44.049,0,0,0,44,44h9.145a64,64,0,1,1,125.71,0h162.29a64,64,0,1,1,125.71,0H472a36.04,36.04,0,0,0,36-36V228.632A35.791,35.791,0,0,0,477.4,193.04ZM180,164a12,12,0,0,1-12,12H115.245a6,6,0,0,1-4.563-9.9l34.916-40.9A12,12,0,0,1,154.724,121H168a12,12,0,0,1,12,12Zm60,56H224a12,12,0,0,1,0-24h16a12,12,0,0,1,0,24Zm94.479-43.706-114.507-.266a12,12,0,0,1-11.972-12V133a12,12,0,0,1,12-12h57.548a12,12,0,0,1,7.433,2.58l53.228,42A6,6,0,0,1,334.479,176.294Z"
                  fill="#fff" />
              </g>
            </g>
          </svg>
        </div>
        <div class="settings">
          <div class="input-container">
            <input type="text" class="text-input" placeholder="Enter car name">
            <input type="color" class="color-input">
          </div>
          <div class="modal-btn-container">
            <button class="btn">update</button>
            <button class="btn btn-cancel">cancel</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="overlay"></div>
  `
}

export const listenModal = () => {
  const colorInput: HTMLElement | null = document.querySelector('.color-input');
  const createBtn = document.querySelector('.btn-create-submit');  
  colorInput?.addEventListener('input', () => colorPreview(colorInput));
  createBtn?.addEventListener('click', modalHandler);
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

