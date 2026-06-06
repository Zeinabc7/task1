import type { User, UsersResponse } from '../features/users/types';

const USERS_API_URL = 'https://dummyjson.com/users';

export async function fetchUsersApi(): Promise<User[]> {
  const response = await fetch(USERS_API_URL);

  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }

  const data = (await response.json()) as UsersResponse;
  return data.users;
}