import { useUsersStore } from '../usersStore';
import type { User } from '../../types';

function createUser(
  id: number,
  firstName: string,
  lastName: string,
  age: number,
  gender: string,
  city: string,
): User {
  return {
    id,
    firstName,
    lastName,
    age,
    gender,
    email: `${firstName.toLowerCase()}@example.com`,
    phone: '+123456789',
    username: firstName.toLowerCase(),
    birthDate: '1995-01-01',
    image: 'https://example.com/image.png',
    address: {
      address: 'Test Address',
      city,
      state: 'Test State',
      country: 'Test Country',
      postalCode: '12345',
    },
    company: {
      department: 'Engineering',
      name: 'Test Company',
      title: 'Developer',
    },
    university: 'Test University',
  };
}

describe('usersStore', () => {
  beforeEach(() => {
    useUsersStore.setState({
      users: [],
      isLoading: false,
      isRefreshing: false,
      error: null,
      matchesByUserId: {},
    });
  });

  it('generates three matches and excludes selected user', () => {
    const users = [
      createUser(1, 'Emily', 'Johnson', 30, 'female', 'Phoenix'),
      createUser(2, 'Michael', 'Williams', 32, 'male', 'Phoenix'),
      createUser(3, 'Sophia', 'Brown', 28, 'female', 'Phoenix'),
      createUser(4, 'James', 'Davis', 36, 'male', 'Houston'),
      createUser(5, 'Emma', 'Miller', 45, 'female', 'Seattle'),
    ];

    useUsersStore.setState({ users });

    useUsersStore.getState().findMatches(1);

    const matches = useUsersStore.getState().matchesByUserId[1];

    expect(matches).toHaveLength(3);
    expect(matches.some((user) => user.id === 1)).toBe(false);
  });

  it('does not create matches if selected user does not exist', () => {
    useUsersStore.setState({
      users: [createUser(1, 'Emily', 'Johnson', 30, 'female', 'Phoenix')],
    });

    useUsersStore.getState().findMatches(999);

    expect(useUsersStore.getState().matchesByUserId[999]).toBeUndefined();
  });
});