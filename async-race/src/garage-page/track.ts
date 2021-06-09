import { createElement } from '../utilities';
import { renderCar } from './car';
import { ICar } from './garage';
import { getCarProps } from './modal';
import { store } from './store';

export const renderTrack = (carName: string, color: string) => {  
  const track = createElement('div', ['track-container']);
  track.innerHTML = `    
      <div class="track-btn-container">
        <button class="btn-track btn-update">update</button>
        <button class="btn-track btn-remove">remove</button>
        <h3 class="car-model">${carName}</h3>
      </div>
      <div class="engine-btn-container">
        <button class="btn-track btn-engine btn-start">a</button>
        <button class="btn-track btn-engine btn-stop">b</button>
      </div>
      <div class="car-container">
        ${renderCar(color)}       
      </div>
      <div class="flag-container">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path d="M4 24h-2v-24h2v24zm18-16l-16-6v12l16-6z" fill="#F70303" /
        </svg>
      </div>    
  `;
  return track;  


  // return `
  //   <div class="track-container">
  //     <div class="track-btn-container">
  //       <button class="btn-track btn-update">update</button>
  //       <button class="btn-track btn-remove">remove</button>
  //       <h3 class="car-model">${carName}</h3>
  //     </div>
  //     <div class="engine-btn-container">
  //       <button class="btn-track btn-engine btn-start">a</button>
  //       <button class="btn-track btn-engine btn-stop">b</button>
  //     </div>
  //     <div class="car-container">
  //       ${renderCar(color)}       
  //     </div>
  //     <div class="flag-container">
  //       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
  //         <path d="M4 24h-2v-24h2v24zm18-16l-16-6v12l16-6z" fill="#F70303" /
  //       </svg>
  //     </div>
  //   </div>
  // `
}

export const createNewTrack = (newCar: ICar) => {  
  return renderTrack(newCar.name, newCar.color);  
} 