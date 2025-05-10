// Uncomment the code below and write your tests
import axios, { AxiosInstance } from 'axios';
import { throttledGetDataFromApi } from '07-mocking-lib-api';

jest.mock('axios');
const baseURL = 'https://jsonplaceholder.typicode.com';
const mockData = {
  data: {
    name: 'Username',
    age: 42,
  },
};
describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });
  afterAll(() => {
    jest.useRealTimers();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('should create instance with provided base url', async () => {
    const axiosCreateMock = jest.spyOn(axios, 'create').mockReturnValue({
      get: jest.fn().mockResolvedValue({ data: mockData }),
    } as unknown as AxiosInstance);
    await throttledGetDataFromApi('/user/1');
    expect(axios.create).toHaveBeenCalledWith({ baseURL });
    axiosCreateMock.mockReset();
  });

  test('should perform request to correct provided url', async () => {
    const axiosCreateMock = jest.spyOn(axios, 'create').mockReturnValue({
      get: jest.fn().mockResolvedValue({ data: mockData }),
    } as unknown as AxiosInstance);
    await throttledGetDataFromApi('/user/1');
    jest.runAllTimers();
    const instance = axios.create({ baseURL });
    expect(instance.get).toHaveBeenCalledWith('/user/1');
    axiosCreateMock.mockReset();
  });

  test('should return response data', async () => {
    const axiosCreateMock = jest.spyOn(axios, 'create').mockReturnValue({
      get: jest.fn().mockResolvedValue({ data: mockData }),
    } as unknown as AxiosInstance);
    const result = await throttledGetDataFromApi('/user/1');
    jest.runAllTimers();
    expect(result).toBe(mockData);
    axiosCreateMock.mockReset();
  });
});
