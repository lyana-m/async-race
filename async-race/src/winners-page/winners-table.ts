import { getCar, getWinners,IWinner } from "../api";
import { createElement } from "../utilities"
import { renderEntry } from "./table-entry";

interface IWinnerMod {
  id: number, 
  time: number, 
  wins: number, 
  name: string, 
  color: string
}

export const renderTable = async () => {  
  const table = createElement('table', ['table']);
  const tbody = createElement('tbody', ['tbody']);
  const header = createElement('tr', ['table-header']);
  const number = createElement('th', ['header-number'], 'number');
  const car = createElement('th', ['header-car'], 'car');
  const name = createElement('th', ['header-name'], 'name');
  const wins = createElement('th', ['header-wins'], 'wins');
  const time = createElement('th', ['header-time'], 'best time');
  const fragment = document.createDocumentFragment();

  const response = await getWinners(1);
  const winners: IWinnerMod[] = response.items;
  console.log(winners);
  winners.forEach((winner: IWinnerMod, index: number) => {
    const entry = renderEntry(index + 1, winner.color, winner.name, winner.wins, winner.time)
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

  return table;
}