// src/__mocks__/axios.ts
const mockAxios = {
  get: jest.fn(),
  post: jest.fn(),
  delete: jest.fn(),
  patch: jest.fn(),
  create: () => mockAxios,
};

export default mockAxios;
