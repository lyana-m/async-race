import { CARS_PER_PAGE, WINNERS_PER_PAGE } from './variables';

const baseURL = 'http://127.0.0.1:3000';
const garage = `${baseURL}/garage`;
const winners = `${baseURL}/winners`;
const engine = `${baseURL}/engine`;

export interface ICar {
  name: string;
  color: string;
}

export interface IWinner {
  id: number;
  time: number;
  wins: number;
}

export type IWinnerCar = IWinner & ICar;

interface IWinners {
  items: IWinnerCar[];
  totalCount: string | null;
}

export const getCar = async (id: number) => {
  try {
    const response = await fetch(`${garage}/${id}`, {
      method: 'GET',
    });
    if (response.ok) {
      return await response.json();
    } else {
      throw Error(`error: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    throw Error(error);
  }
};

export const getCars = async (page: number, limit: number = CARS_PER_PAGE) => {
  try {
    const response = await fetch(`${garage}?_page=${page}&_limit=${limit}`, {
      method: 'GET',
    });
    if (response.ok) {
      return {
        items: await response.json(),
        totalCount: response.headers.get('X-Total-Count'),
      };
    } else {
      throw Error(`error: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    throw Error(error);
  }
};

export const createCar = async (body: ICar) => {
  try {
    const response = await fetch(`${garage}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      return response.json();
    } else {
      throw Error(`error: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    throw Error(error);
  }
};

export const deleteCar = async (id: number) => {
  try {
    const response = await fetch(`${garage}/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      await response.json();
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw Error(error);
  }
};

export const updateCar = async (id: number, body: ICar) => {
  try {
    const response = await fetch(`${garage}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      await response.json();
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw Error(error);
  }
};

export const startEngine = async (id: number) => {
  try {
    const response = await fetch(`${engine}/?id=${id}&status=started`, {
      method: 'GET',
    });
    if (response.ok) {
      return response.json();
    } else {
      throw Error(`error: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    throw Error(error);
  }
};

export const stopEngine = async (id: number) => {
  try {
    const response = await fetch(`${engine}/?id=${id}&status=stopped`, {
      method: 'GET',
    });
    if (response.ok) {
      await response.json();
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw Error(error);
  }
};

export const switchToDrive = async (id: number) => {
  try {
    const response = await fetch(`${engine}/?id=${id}&status=drive`, {
      method: 'GET',
    });
    return response.status !== 200 ? { success: false } : { ...(await response.json()) };
  } catch (error) {
    throw Error(error);
  }
};

export const getWinner = async (id: number) => {
  try {
    const response = await fetch(`${winners}/{${id}}`, {
      method: 'GET',
    });
    if (response.ok) {
      return response.json();
    } else {
      throw Error(`error: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    throw Error(error);
  }
};

export const getWinners = async (page: number, limit: number = WINNERS_PER_PAGE, sort: string, order: string): Promise<IWinners> => {
  try {
    const response = await fetch(`${winners}?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`, {
      method: 'GET',
    });
    if (response.ok) {
      const items = await response.json();
      return {
        items: await Promise.all(items.map(async (item: IWinner) => ({ ...item, ...await getCar(item.id) }))),
        totalCount: response.headers.get('X-Total-Count'),
      };
    } else {
      throw Error(`error: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    throw Error(error);
  }
};

export const createWinner = async (body: IWinner) => {
  try {
    const response = await fetch(`${winners}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      return response.json();
    } else {
      throw Error(`error: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    throw Error(error);
  }
};

export const deleteWinner = async (id: number) => {
  try {
    const response = await fetch(`${winners}/${id}`, {
      method: 'DELETE',
    });
    await response.json();
  } catch (error) {
    throw Error(error);
  }
};

export const updateWinner = async (id: number, body: IWinner) => {
  try {
    const response = await fetch(`${winners}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    await response.json();
  } catch (error) {
    throw Error(error);
  }
};

export const checkWinner = async (id: number) => {
  try {
    const response = await fetch(`${winners}/${id}`, {
      method: 'GET',
    });
    return {
      isCreated: response.status !== 404,
      item: await response.json(),
    };
  } catch (error) {
    throw Error(error);
  }
};
