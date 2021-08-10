import { getCarImage } from '../garage-page/car';
import { createElement } from '../utilities';

export const renderEntry = (number: number, color: string, name: string, wins: number, time: number) => {
  const row = createElement('tr', ['table-row']);
  const carNumber = createElement('td', ['row-number'], `${number}`);
  const carImage = createElement('td', ['row-car'], 'car');
  carImage.innerHTML = `${getCarImage(color)}`;
  const carName = createElement('td', ['row-name'], `${name}`);
  const carWins = createElement('td', ['row-wins'], `${wins}`);
  const carTime = createElement('td', ['row-time'], `${time}`);

  row.appendChild(carNumber);
  row.appendChild(carImage);
  row.appendChild(carName);
  row.appendChild(carWins);
  row.appendChild(carTime);
  return row;
};
