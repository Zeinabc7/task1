import { fetchUsersApi } from '../usersApi';
import type { User } from '../../features/users/types';

const mockUser: User = {
  id: 1,
  firstName: 'Emily',
  lastName: 'Johnson',
  age: 29,
  gender: 'female',
  email: 'emily@example.com',
  phone: '+123456789',
  username: 'emilyj',
  birthDate: '1996-01-01',
  image: 'https://example.com/image.png',
  address: {
    address: '123 Main Street',
    city: 'Phoenix',
    state: 'Arizona',
    country: 'USA',
    postalCode: '85001',
  },
  company: {
    department: 'Engineering',
    name: 'Test Company',
    title: 'Developer',
  },
  university: 'Test University',
};

describe('fetchUsersApi', () => {
  const mockFetch = jest.fn();

  beforeEach(() => {
    mockFetch.mockReset();

    Object.defineProperty(globalThis, 'fetch', {
      writable: true,
      value: mockFetch,
    });
  });

  it('returns users when request succeeds', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        users: [mockUser],
        total: 1,
        skip: 0,
        limit: 30,
      }),
    });

    const users = await fetchUsersApi();

    expect(mockFetch).toHaveBeenCalledWith('https://dummyjson.com/users');
    expect(users).toEqual([mockUser]);
  });

  it('throws an error when request fails', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
    });

    await expect(fetchUsersApi()).rejects.toThrow('Failed to fetch users');
  });
});