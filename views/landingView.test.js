import { renderHook, act } from '@testing-library/react';
import { fetchDataFromAPI } from '../helpers/helpers';
import { checkConnection } from './landingView'; // Assuming you export the checkConnection function from the LandingView file

describe('checkConnection', () => {
  test('should set connection status to true if data is fetched successfully', async () => {
    const mockData = [{/* Mock data */}];
    jest.spyOn(fetchDataFromAPI, 'mockResolvedValueOnce').mockResolvedValue(mockData);

    const { result, waitForNextUpdate } = renderHook(() => checkConnection());

    await act(async () => {
      await waitForNextUpdate();
    });

    expect(result.current).toBe(true);
  });

  test('should set connection status to false if data fetch fails', async () => {
    jest.spyOn(fetchDataFromAPI, 'mockRejectedValueOnce').mockRejectedValue(new Error('Failed to fetch data'));

    const { result, waitForNextUpdate } = renderHook(() => checkConnection());

    await act(async () => {
      await waitForNextUpdate();
    });

    expect(result.current).toBe(false);
  });
});
