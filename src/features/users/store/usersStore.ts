import { create } from 'zustand';
import { fetchUsersApi } from '../../../api/usersApi';
import type { User } from '../types';

type UsersState = {
  users: User[];
  isLoading: boolean;
  isRefreshing: boolean;
  error: string | null;
  matchesByUserId: Record<number, User[]>;

  fetchUsers: () => Promise<void>;
  refreshUsers: () => Promise<void>;
  findMatches: (userId: number) => void;
};

export const useUsersStore = create<UsersState>()((set, get) => ({
  users: [],
  isLoading: false,
  isRefreshing: false,
  error: null,
  matchesByUserId: {},

  fetchUsers: async () => {
    set({ isLoading: true, error: null });

    try {
      const users = await fetchUsersApi();
      set({ users, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Something went wrong',
        isLoading: false,
      });
    }
  },

  refreshUsers: async () => {
    set({ isRefreshing: true, error: null });

    try {
      const users = await fetchUsersApi();
      set({ users, isRefreshing: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Something went wrong',
        isRefreshing: false,
      });
    }
  },

  findMatches: (userId: number) => {
    const users = get().users;
    const selectedUser = users.find((user) => user.id === userId);

    if (!selectedUser) return;

    const matches = users
      .filter((user) => user.id !== userId)
      .map((user) => {
        let score = 0;

        if (user.address.city === selectedUser.address.city) score += 2;
        if (Math.abs(user.age - selectedUser.age) <= 5) score += 1;
        if (user.gender !== selectedUser.gender) score += 1;

        return { user, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map((item) => item.user);

    set({
      matchesByUserId: {
        ...get().matchesByUserId,
        [userId]: matches,
      },
    });
  },
}));