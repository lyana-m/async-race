import { store } from "../garage-page/store";
import { createElement } from "../utilities"
import { renderWinnersFooter } from "./winners-footer";
import { renderTable } from "./winners-table";

export const renderWinnersPage = async () => {
  const winnersPage = createElement('div', ['wrapper', 'winners-page']);
  const pageDescription = createElement('div', ['page-description']);
  const footer = renderWinnersFooter();
  
  pageDescription.innerHTML = `
    <h2 class="currnent-page">Winners: ${store.winnersCount}</h2>
    <h2 class="page-number">Page #${store.winnersPage}</h2>
  `;

  const table = await renderTable();

  winnersPage.appendChild(pageDescription);
  winnersPage.appendChild(table);
  winnersPage.appendChild(footer);

  return winnersPage;
}