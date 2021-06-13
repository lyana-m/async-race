import { getCars, getWinners } from '../api';
import { ICar } from './garage';

const response = await getCars(1);
const winnersResponse = await getWinners(1);

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
  winnersCount: string | null
}

export const store: IStore = {
  carsPage: 1,
  cars: response.items,
  carsCount: response.totalCount,
  selectedId: -1,
  animation: {},
  winnersPage: 1,
  winnersCount: winnersResponse.totalCount  
}