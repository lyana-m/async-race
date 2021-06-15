import { store } from "../garage-page/store";
import { createElement } from "../utilities"
import { renderWinnersFooter } from "./winners-footer";
import { renderTable } from "./winners-table";

export const renderWinnersPage = () => {
  const winnersPage = createElement('div', ['wrapper', 'winners-page']);  
  const footer = renderWinnersFooter();
  const table = renderTable();
 
  winnersPage.appendChild(table);
  winnersPage.appendChild(footer);

  return winnersPage;
}