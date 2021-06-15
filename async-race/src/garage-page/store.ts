import { getCars, getWinners, IWinner, IWinnerMod } from '../api';
import { ICar } from './garage';

const response = await getCars(1);
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
  winners: IWinnerMod[],
  winnersCount: string | null
  sortBy: string,
  sortOrder: string
}

export const store: IStore = {
  carsPage: 1,
  cars: response.items,
  carsCount: response.totalCount,
  selectedId: -1,
  animation: {},
  winnersPage: 1,
  winners: winnersResponse.items,
  winnersCount: winnersResponse.totalCount,
  sortBy: 'id',
  sortOrder: 'ASC'
}