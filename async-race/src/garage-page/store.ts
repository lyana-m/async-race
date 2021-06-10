import { getCars } from '../api';

const response = await getCars(1);


export const store = {
  carsPage: 1,
  cars: response.items,
  carsCount: response.totalCount,
  selectedId: -1
}