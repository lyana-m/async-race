import { getWinners } from "../api";
import { store } from "../garage-page/store";
import { createElement } from "../utilities";
import { renderTable } from "./winners-table";

export const renderWinnersFooter = () => {
  const footer = createElement('footer', ['footer']);
  const wrapper = createElement('div', ['wrapper', 'footer-wrapper']);
  const prevBtn = createElement('button', ['btn', 'btn-prev', 'win-btn-prev'], 'prev');
  const nextBtn = createElement('button', ['btn', 'btn-next', 'win-btn-next'], 'next'); 
  wrapper.appendChild(prevBtn);
  wrapper.appendChild(nextBtn);
  footer.appendChild(wrapper);
  return footer;
}

export const winNextBtnHandler = async () => {
  const winners = document.querySelector('.winners');  
  const currentPage = store.winnersPage;
  const response = await getWinners(currentPage + 1, 10, store.sortBy, store.sortOrder);
  store.winners = response.items;
  store.winnersPage++;
  updateWinBtnState();
  (<HTMLElement>winners).innerHTML = renderTable().outerHTML;  
}

export const winPrevBtnHandler = async () => {
  const winners = document.querySelector('.winners');
  const currentPage = store.winnersPage;
  const response = await getWinners(currentPage - 1, 10, store.sortBy, store.sortOrder);
  store.winners = response.items;
  store.winnersPage--;
  updateWinBtnState();
  (<HTMLElement>winners).innerHTML = renderTable().outerHTML;
}

export const updateWinBtnState = () => {
  const nextBtn: HTMLButtonElement | null = document.querySelector('.win-btn-next');
  const prevBtn: HTMLButtonElement | null = document.querySelector('.win-btn-prev');

  if (store.winnersPage === 1) {
    if (prevBtn) prevBtn.disabled = true;
    if (store.winners.length < +store.winnersCount!) {
      if (nextBtn) nextBtn.disabled = false;
    } else {
      if (nextBtn) nextBtn.disabled = true;
    }
  } else {
    if (prevBtn) prevBtn.disabled = false;    
    if ((store.winnersPage - 1) * 10 + store.winners.length === +store.winnersCount!) {
      if (nextBtn) nextBtn.disabled = true;
    } else {
      if (nextBtn) nextBtn.disabled = false;
    }
  }
}