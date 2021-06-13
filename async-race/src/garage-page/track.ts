import { checkWinner, createWinner, deleteCar, getCar, getCars, getWinner, getWinners, startEngine, stopEngine, switchToDrive, updateWinner } from '../api';
import { animateCar, createElement, getDistanceBetween } from '../utilities';
import { renderCar } from './car';
import { showCongrats } from './congrats';
import { ICar, renderGarage } from './garage';
import { getCarProps, showModal } from './modal';
import { store } from './store';

export const renderTrack = (carName: string, color: string, id: number) => {
  const track = createElement('div', ['track-container']);
  track.setAttribute('id', `${id}`);
  const trackBtnContainer = createElement('div', ['track-btn-container']);
  const btnUpdate = createElement('button', ['btn-track', 'btn-update'], 'update');
  const btnRemove = createElement('button', ['btn-track', 'btn-remove'], 'remove');
  const name = createElement('h3', ['car-model'], `${carName}`);
  const engineBtnContainer = createElement('div', ['engine-btn-container']);
  const btnStart = createElement('button', ['btn-track', 'btn-engine', 'btn-start'], 'a');
  const btnStop = createElement('button', ['btn-track', 'btn-engine', 'btn-stop'], 'b');
  (<HTMLButtonElement>btnStop).disabled = true;
  const carContainer = createElement('div', ['car-container']);
  carContainer.innerHTML = `${renderCar(color)}`;
  const flagContainer = createElement('div', ['flag-container']);
  flagContainer.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path d="M4 24h-2v-24h2v24zm18-16l-16-6v12l16-6z" fill="#F70303" /
    </svg>
  `;

  trackBtnContainer.appendChild(btnUpdate);
  trackBtnContainer.appendChild(btnRemove);
  trackBtnContainer.appendChild(name);
  engineBtnContainer.appendChild(btnStart);
  engineBtnContainer.appendChild(btnStop);
  track.appendChild(trackBtnContainer);
  track.appendChild(engineBtnContainer);
  track.appendChild(carContainer);
  track.appendChild(flagContainer);

  return track;
}

export const createNewTrack = (newCar: ICar) => {
  return renderTrack(newCar.name, newCar.color, newCar.id);
}

export const removeTrack = async (id: number) => {
  // const target = event.target;
  // const id = Number((<HTMLElement>target).closest('.track-container')?.getAttribute('id'));
  const currentPage = store.carsPage;
  // const main: HTMLElement | null = document.querySelector('.main');

  const garage = document.querySelector('.garage');  
  await deleteCar(id);
  const response = await getCars(currentPage);
  store.cars = response.items;
  store.carsCount = response.totalCount;
  // if (main) {
  //   renderGarage(main);
  // }
  // renderGarage();
  (<HTMLElement>garage).innerHTML = renderGarage().outerHTML;
}

export const updateTrack = (id: number) => {
  // const target = event.target;  
  // const id = Number((<HTMLElement>target).closest('.track-container')?.getAttribute('id'));
  store.selectedId = id;
  const textInput = document.querySelector('.text-input');
  const colorInput = document.querySelector('.color-input');
  const carParts = document.querySelectorAll('.preview-car path');
  const car = store.cars.find((car: ICar) => car.id === id);
  carParts.forEach(part => (<HTMLElement>part).style.fill = `${car?.color}`);
  (<HTMLInputElement>textInput).value = car?.name ?? '';
  (<HTMLInputElement>colorInput).value = car?.color ?? '';
  showModal();
}

export const startDriving = async (id: number) => {
  const track = document.getElementById(`${id}`);
  const startBtn = track!.querySelector('.btn-start');
  const stopBtn = track!.querySelector('.btn-stop');

  (<HTMLButtonElement>startBtn).disabled = true;

  const response = await startEngine(id);
  const velocity = response.velocity;
  const distance = response.distance;
  const time = Math.round(distance / velocity);

  (<HTMLButtonElement>stopBtn).disabled = false;

  const car: HTMLElement | null = track!.querySelector('.car-container');
  const flag: HTMLElement | null = track!.querySelector('.flag-container');
  const distanceBetween = getDistanceBetween(car!, flag!);

  animateCar(car!, id, distanceBetween, time);

  const newReponse = await switchToDrive(id);

  if (!newReponse.success) {
    const animationId = store.animation[id];
    window.cancelAnimationFrame(animationId);
  } else {
    return Promise.resolve({ id: id, time: (time / 1000) });
  }

  return Promise.reject(new Error('not first'));
}

export const stopDriving = async (id: number) => {
  const track = document.getElementById(`${id}`);
  const car: HTMLElement | null = track!.querySelector('.car-container');
  const startBtn = track!.querySelector('.btn-start');
  const stopBtn = track!.querySelector('.btn-stop');

  await stopEngine(id);

  cancelAnimationFrame(store.animation[id]);
  car!.style.transform = `translateX(0)`;
  (<HTMLButtonElement>startBtn).disabled = false;
  (<HTMLButtonElement>stopBtn).disabled = true;
}

export const startRace = async () => {
  const raceBtn = document.querySelector('.btn-race');
  (<HTMLButtonElement>raceBtn).disabled = true;
  const promises = store.cars.map(car => startDriving(car.id));
  const winner = await Promise.any(promises).then(p => p).catch(e => new Error('nobody win'));
  
  if (!(winner instanceof Error)) {
    const winnerItem = await checkWinner(winner.id);
    
    if (!winnerItem.isCreated) {      
      await createWinner({ ...winner, wins: 1 });  
    } else {
      const bestTime = winner.time < winnerItem.item.time ? winner.time : winnerItem.item.time;
      await updateWinner(winner.id, { ...winner, time: bestTime, wins: winnerItem.item.wins + 1 });      
    }
    const car = await getCar(winner.id);
    showCongrats(car.name, winner.time);
  }
}

export const stopRace = () => {
  const raceBtn = document.querySelector('.btn-race');
  (<HTMLButtonElement>raceBtn).disabled = false;
  store.cars.forEach(car => stopDriving(car.id));
}