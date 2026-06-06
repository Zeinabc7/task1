import { fireEvent, render } from '@testing-library/react-native';

import { UserCard } from '../UserCard';
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

describe('UserCard', () => {
  it('renders user information correctly', () => {
    const { getByText } = render(
      <UserCard user={mockUser} onPress={jest.fn()} />,
    );

    expect(getByText('Emily Johnson')).toBeTruthy();
    expect(getByText('City: Phoenix')).toBeTruthy();
    expect(getByText('Age: 29')).toBeTruthy();
  });

  it('calls onPress when card is pressed', () => {
    const onPress = jest.fn();

    const { getByRole } = render(
      <UserCard user={mockUser} onPress={onPress} />,
    );

    fireEvent.press(getByRole('button'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });
});