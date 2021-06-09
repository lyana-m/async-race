import { getCars } from "../api";
import { createRandomCars } from "../utilities";
import { makeNextBtnActive } from "./footer";
import { renderGarage } from "./garage";
import { showModal, closeModal, colorPreview, listenModal } from "./modal";
import { store } from "./store";

export const renderHeader = () => {
  return `
    <header class="header">
      <div class="wrapper header-wrapper">
        <div class="header-btn-container header-btn-container-left">
          <button class="btn btn-garage">to garage</button>
          <button class="btn btn-winners">to winners</button>
        </div>
        <h1 class="main-header">async-race</h1>
        <div class="header-btn-container header-btn-container-right">
          <div class="header-btn-subcontainer">
            <button class="btn btn-create">create car</button>
            <button class="btn btn-random">random cars</button>
          </div>
          <div class="header-btn-subcontainer">
            <button class="btn btn-race">race</button>
            <button class="btn btn-reset">reset</button>
          </div>
        </div>
      </div>
    </header>
  `
}

export const listenHeader = async () => {
  document.body.addEventListener('click', async (event: MouseEvent) => {
    const target = <HTMLElement>event?.target;
    if (target.classList.contains('btn-create')) {
      showModal();
      listenModal();
    }
    if (target.classList.contains('overlay') || target.classList.contains('btn-cancel')) {
      closeModal();
    }
    if (target.classList.contains('btn-random')) {
      const main: HTMLElement | null = document.querySelector('.main');
      console.log(main);
      await createRandomCars();
      const currentPage = store.carsPage;

      const response = await getCars(currentPage);
      store.cars = response.items;
      store.carsCount = response.totalCount;

      if (main) {
        renderGarage(main);
      }
      makeNextBtnActive();
    }
  })
}