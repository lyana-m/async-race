const baseURL = 'http://127.0.0.1:3000';
const garage = `${baseURL}/garage`;
const winners = `${baseURL}/winners`;
const engine = `${baseURL}/engine`;

export interface IBody {
  name: string,
  color: string
}

export const getCar = async (id: number) => {
  const response = await fetch(`${garage}/${id}`, {
    method: 'GET',
  });
  return await response.json();
}

export const getCars = async (page: number, limit: number = 7) => {
  const response = await fetch(`${garage}?_page=${page}&_limit=${limit}`, {
    method: 'GET',
  });  
  return {
    items: await response.json(),
    totalCount: response.headers.get('X-Total-Count'),  
  }
}

export const createCar = async (body: IBody) => {
  const response = await fetch(`${garage}`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return await response.json();
}

export const deleteCar = async (id: number) => {
  const response = await fetch(`${garage}/${id}`, {
    method: 'DELETE',
  });
  await response.json();
}

export const updateCar = async (id: number, body: IBody) => {
  const response = await fetch(`${garage}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  await response.json();
}

export const startEngine = async (id: number) => {
  const response = await fetch(`${engine}/?id=${id}&status=started`, {
    method: 'GET',
  });
  return await response.json();
}

export const stopEngine = async (id: number) => {
  const response = await fetch(`${engine}/?id=${id}&status=stopped`, {
    method: 'GET',
  });
  await response.json();
}

export const switchToDrive = async (id: number) => {
  const response = await fetch(`${engine}/?id=${id}&status=drive`, {
    method: 'GET',
  }).catch();
  return response.status !== 200 ? { success: false } : { ...(await response.json()) };  
}

