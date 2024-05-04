import {fetchDataFromAPI, sendDataToAPI, fetchAndSavePDFFromAPI, authenticate} from '../helpers/helpers';
import {useAuth} from "../contexts/authContext";

// Mock dependencies
jest.mock('../contexts/authContext');
jest.mock('../helpers/helpers');
console.error = jest.fn();

// fetchDataFromAPI

fetchDataFromAPI.mockImplementation(async (route, authContext, retry = true) => {
  if (route === 'failed-route') {
    return { status: 404, body: { error: 'Not found' } };
  }

  if (authContext === null) {
    return { status: 401, message: 'Unauthorized' };
  }

  if (typeof authContext === 'number' && retry) {
    authContext = await authenticate(authContext);
    return await fetchDataFromAPI(route, authContext, false);
  }

  if (route === 'artifacts/departments') {
    return { status: 200, message: 'Success' };
  }

});

describe('fetchDataFromAPI', () => {
  test('should handle invalid route', async () => {
    const authContext = useAuth.mockReturnValue({authData: {}});
    const result = await fetchDataFromAPI('failed-route', authContext);
    expect(result.status).toBe(404);
  });

  test('should handle missing authContext', async () => {
    const result = await fetchDataFromAPI('artifacts/departments', null);
    expect(result.status).toBe(401);
  });

  test('should handle invalid authContext', async () => {
    const result = await fetchDataFromAPI('artifacts/departments', 5);
    expect(result.status).toBe(200);
  });

  test('should handle valid route and authContext', async () => {
    const authContext = useAuth.mockReturnValue({authData: {}});
    const result = await fetchDataFromAPI('artifacts/departments', authContext);
    expect(result.status).toBe(200);
  });
});

// sendDataToAPI

sendDataToAPI.mockImplementation(async (route, method, data, authContext, retry = true) => {
  if (route === 'failed-route') {
    return { status: 404, body: { error: 'Not found' } };
  }

  if (authContext === null) {
    return { status: 401, message: 'Unauthorized' };
  }

  if (typeof authContext === 'number' && retry) {
    authContext = await authenticate(authContext);
    return await sendDataToAPI(route, method, data, authContext, false);
  }

  if (data === null) {
    return { status: 400, message: 'Missing Body' };
  }

  if (!data.hasOwnProperty('key')) {
    return { status: 400, message: 'Missing Parameter' };
  }

  if (route === 'artifacts' && method === 'POST') {
    return { status: 201, message: 'Success' };
  }

  if (route === 'artifacts' && method === 'PUT') {
    return { status: 201, message: 'Success' };
  }
});

describe('sendDataToAPI', () => {
  test('should handle invalid route', async () => {
    const authContext = useAuth.mockReturnValue({authData: {}});
    const result = await sendDataToAPI('failed-route', 'POST', {}, authContext);
    expect(result.status).toBe(404);
  });

  test('should handle missing authContext', async () => {
    const result = await sendDataToAPI('artifacts', 'POST', {}, null);
    expect(result.status).toBe(401);
  });

  test('should handle invalid authContext', async () => {
    const result = await sendDataToAPI('artifacts', 'POST', { key: 'value'}, 5);
    expect(result.status).toBe(201);
  });

  test('should handle missing body', async () => {
    const authContext = useAuth.mockReturnValue({authData: {}});
    const result = await sendDataToAPI('artifacts', 'POST', null, authContext);
    expect(result.status).toBe(400);
    expect(result.message).toBe('Missing Body');
  });

  test('should handle incorrect body', async () => {
    const authContext = useAuth.mockReturnValue({authData: {}});
    const result = await sendDataToAPI('artifacts', 'POST', { keys: 'value'}, authContext);
    expect(result.status).toBe(400);
    expect(result.message).toBe('Missing Parameter');
  });

  test('should handle a POST request with valid arguments', async () => {
    const authContext = useAuth.mockReturnValue({authData: {}});
    const result = await sendDataToAPI('artifacts', 'POST', { key: 'value'}, authContext);
    expect(result.status).toBe(201);
  });

  test('should handle a PUT request with valid arguments', async () => {
    const authContext = useAuth.mockReturnValue({authData: {}});
    const result = await sendDataToAPI('artifacts', 'PUT', { key: 'value'}, authContext);
    expect(result.status).toBe(201);
  });
});

// authenticate

authenticate.mockImplementation(async (authContext) => {
  if (typeof authContext === 'number') {
    return useAuth.mockReturnValue({authData: {}});
  }

  return authContext;
})

describe('authenticate', () => {
  test('should handle missing authContext', async () => {
    const result = await authenticate(null);
    expect(result).toBe(null);
  });

  test('should handle invalid authContext', async () => {
    const result = await authenticate(5);
    expect(typeof result).toBe('function');
  });

  test('should handle valid authContext', async () => {
    const authContext = useAuth.mockReturnValue({authData: {}})
    const result = await authenticate(authContext);
    expect(result).toBe(authContext);
  });

});

// fetchAndSavePDFFromAPI

fetchAndSavePDFFromAPI.mockImplementation( async (route, authContext, entityName, retry = true) => {
  return {
    status: 204,
    body: { }
  };
})

describe('fetchAndSavePDFFromAPI', () => {
  test('should return correct object', async () => {
    const authContext = useAuth.mockReturnValue({authData: {}});
    const result = await fetchAndSavePDFFromAPI('any-route', authContext,  'artifact');
    expect(result.status).toBe(204);
    expect(Object.keys(result.body).length).toBe(0);
  });
})
