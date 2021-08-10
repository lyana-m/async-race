import { getCars, getWinners, IWinnerCar } from '../api';
import { ICar } from './garage';

const carsResponse = await getCars(1);
const winnersResponse = await getWinners(1, 10, 'id', 'ASC');

interface IAnimation {
  [key: string]: number
}

interface IStore {
  carsPage: number,
  cars: ICar[],
  carsCount: string | null,
  selectedId: number,
  animation: IAnimation,
  winnersPage: number,
  winners: IWinnerCar[],
  winnersCount: string | null,
  sortBy: string,
  sortOrder: string
}

export const store: IStore = {
  carsPage: 1,
  cars: carsResponse.items,
  carsCount: carsResponse.totalCount,
  selectedId: -1,
  animation: {},
  winnersPage: 1,
  winners: winnersResponse.items,
  winnersCount: winnersResponse.totalCount,
  sortBy: 'id',
  sortOrder: 'ASC',
};
