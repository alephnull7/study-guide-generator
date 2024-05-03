import {fetchDataFromAPI, sendDataToAPI, fetchAndSavePDFFromAPI, authenticate} from '../helpers/helpers';
import {useAuth} from "../contexts/authContext";

// Mock dependencies
jest.mock('expo-file-system');
jest.mock('expo-sharing');
jest.mock('../contexts/authContext');
console.error = jest.fn();

describe('fetchDataFromAPI', () => {
  test('should handle invalid route', async () => {
    const authContext = useAuth.mockReturnValue({authData: {}});
    const result = await fetchDataFromAPI('some-route', authContext);
    expect(result.status).toBe(404);
  });

  test('should handle missing authContext', async () => {
    const authContext = useAuth.mockReturnValue({authData: {}});
    const result = await fetchDataFromAPI('artifacts/departments', authContext);
    expect(result.status).toBe(401);
  });
});
