import { CARS_PER_PAGE, WINNERS_PER_PAGE } from './variables';

const baseURL = 'http://127.0.0.1:3000';
const garage = `${baseURL}/garage`;
const winners = `${baseURL}/winners`;
const engine = `${baseURL}/engine`;

export interface IBody {
  name: string,
  color: string
}

export interface IWinner {
  id: number,
  time: number,
  wins?: number
}

export interface IWinnerMod {
  id: number,
  time: number,
  wins: number,
  name: string,
  color: string
}

interface IWinners {
  items: IWinnerMod[],
  totalCount: string | null
}

export const getCar = async (id: number) => {
  const response = await fetch(`${garage}/${id}`, {
    method: 'GET',
  });
  return response.json();
};

export const getCars = async (page: number, limit: number = CARS_PER_PAGE) => {
  const response = await fetch(`${garage}?_page=${page}&_limit=${limit}`, {
    method: 'GET',
  });
  return {
    items: await response.json(),
    totalCount: response.headers.get('X-Total-Count'),
  };
};

export const createCar = async (body: IBody) => {
  const response = await fetch(`${garage}`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
};

export const deleteCar = async (id: number) => {
  const response = await fetch(`${garage}/${id}`, {
    method: 'DELETE',
  });
  await response.json();
};

export const updateCar = async (id: number, body: IBody) => {
  const response = await fetch(`${garage}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  await response.json();
};

export const startEngine = async (id: number) => {
  const response = await fetch(`${engine}/?id=${id}&status=started`, {
    method: 'GET',
  });
  return response.json();
};

export const stopEngine = async (id: number) => {
  const response = await fetch(`${engine}/?id=${id}&status=stopped`, {
    method: 'GET',
  });
  await response.json();
};

export const switchToDrive = async (id: number) => {
  const response = await fetch(`${engine}/?id=${id}&status=drive`, {
    method: 'GET',
  }).catch();
  return response.status !== 200 ? { success: false } : { ...(await response.json()) };
};

export const getWinner = async (id: number) => {
  const response = await fetch(`${winners}/{${id}}`, {
    method: 'GET',
  });
  return response.json();
};

export const getWinners = async (page: number, limit: number = WINNERS_PER_PAGE, sort: string, order: string): Promise<IWinners> => {
  const response = await fetch(`${winners}?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`, {
    method: 'GET',
  });
  const items = await response.json();
  return {
    items: await Promise.all(items.map(async (item: IWinner) => ({ ...item, ...await getCar(item.id) }))),
    totalCount: response.headers.get('X-Total-Count'),
  };
};

export const createWinner = async (body: IWinner) => {
  const response = await fetch(`${winners}`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
};

export const deleteWinner = async (id: number) => {
  const response = await fetch(`${winners}/${id}`, {
    method: 'DELETE',
  });
  await response.json();
};

export const updateWinner = async (id: number, body: IWinner) => {
  const response = await fetch(`${winners}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  await response.json();
};

export const checkWinner = async (id: number) => {
  const response = await fetch(`${winners}/${id}`, {
    method: 'GET',
  });
  return {
    isCreated: response.status !== 404,
    item: await response.json(),
  };
};
