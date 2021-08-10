import { getWinners, IWinnerCar } from '../api';
import { store } from '../garage-page/store';
import { createElement } from '../utilities';
import { WINNERS_PER_PAGE } from '../variables';
import { renderEntry } from './table-entry';

export const renderTable = () => {
  const winnersContainer = createElement('div', ['winners']);
  const pageDescription = createElement('div', ['page-description']);
  const table = createElement('table', ['table']);
  const tbody = createElement('tbody', ['tbody']);
  const header = createElement('tr', ['table-header']);
  const number = createElement('th', ['header-number'], 'number');
  const car = createElement('th', ['header-car'], 'car');
  const name = createElement('th', ['header-name'], 'name');
  const wins = createElement('th', ['header-wins', 'header-sort'], 'wins');
  const time = createElement('th', ['header-time', 'header-sort'], 'best time');
  const fragment = document.createDocumentFragment();

  pageDescription.innerHTML = `
    <h2 class="currnent-page">Winners: ${store.winnersCount}</h2>
    <h2 class="page-number">Page #${store.winnersPage}</h2>
  `;

  const { winners } = store;
  winners.forEach((winner: IWinnerCar, index: number) => {
    const entry = renderEntry((index + 1) + (store.winnersPage - 1) * WINNERS_PER_PAGE, winner.color, winner.name, winner.wins, winner.time);
    fragment.appendChild(entry);
  });

  header.appendChild(number);
  header.appendChild(car);
  header.appendChild(name);
  header.appendChild(wins);
  header.appendChild(time);
  tbody.appendChild(header);
  tbody.appendChild(fragment);
  table.appendChild(tbody);
  winnersContainer.appendChild(pageDescription);
  winnersContainer.appendChild(table);
  return winnersContainer;
};

export const sort = async (sortBy: string) => {
  store.sortOrder = store.sortOrder === 'ASC' ? 'DESC' : 'ASC';
  store.sortBy = sortBy;
  const winners = document.querySelector('.winners');
  const currentPage = store.winnersPage;
  const response = await getWinners(currentPage, WINNERS_PER_PAGE, store.sortBy, store.sortOrder);
  store.winners = response.items;
  (<HTMLElement>winners).innerHTML = renderTable().outerHTML;
};
