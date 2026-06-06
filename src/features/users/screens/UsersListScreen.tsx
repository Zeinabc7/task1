import { useCallback, useEffect } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { ErrorView } from '../../../components/ErrorView';
import { LoadingView } from '../../../components/LoadingView';
import { UserCard } from '../../../components/UserCard';
import type { RootStackParamList } from '../../../navigation/types';
import { rtlText } from '../../../styles/rtl';
import { useUsersStore } from '../store/usersStore';
import type { User } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'UsersList'>;

export function UsersListScreen({ navigation }: Props) {
  const users = useUsersStore((state) => state.users);
  const isLoading = useUsersStore((state) => state.isLoading);
  const isRefreshing = useUsersStore((state) => state.isRefreshing);
  const error = useUsersStore((state) => state.error);
  const fetchUsers = useUsersStore((state) => state.fetchUsers);
  const refreshUsers = useUsersStore((state) => state.refreshUsers);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleUserPress = useCallback(
    (userId: number) => {
      navigation.navigate('UserDetails', { userId });
    },
    [navigation],
  );

  const renderItem = useCallback(
    ({ item }: { item: User }) => (
      <UserCard user={item} onPress={() => handleUserPress(item.id)} />
    ),
    [handleUserPress],
  );

  const keyExtractor = useCallback((item: User) => String(item.id), []);

  if (isLoading && users.length === 0) {
    return <LoadingView />;
  }

  if (error && users.length === 0) {
    return <ErrorView message={error} onRetry={fetchUsers} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        refreshing={isRefreshing}
        onRefresh={refreshUsers}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={[styles.emptyText, rtlText]}>No users found.</Text>
        }
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={7}
        removeClippedSubviews
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
  },
  listContent: {
    paddingVertical: 10,
    flexGrow: 1,
  },
  emptyText: {
    marginTop: 40,
    textAlign: 'center',
    color: '#666',
  },
});