import { useMemo, useRef } from 'react';
import {
  Animated,
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { MatchCard } from '../../../components/MatchCard';
import type { RootStackParamList } from '../../../navigation/types';
import { rtlText } from '../../../styles/rtl';
import { useUsersStore } from '../store/usersStore';

type Props = NativeStackScreenProps<RootStackParamList, 'UserDetails'>;

export function UserDetailsScreen({ route }: Props) {
  const { userId } = route.params;

  const users = useUsersStore((state) => state.users);
  const matchesByUserId = useUsersStore((state) => state.matchesByUserId);
  const findMatches = useUsersStore((state) => state.findMatches);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const user = useMemo(
    () => users.find((item) => item.id === userId),
    [users, userId],
  );

  const matches = matchesByUserId[userId] ?? [];

  const handleFindMatches = () => {
    fadeAnim.setValue(0);
    findMatches(userId);

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 350,
      useNativeDriver: true,
    }).start();
  };

  if (!user) {
    return (
      <View style={styles.center}>
        <Text style={rtlText}>User not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Image source={{ uri: user.image }} style={styles.avatar} />

      <Text style={[styles.name, rtlText]}>
        {user.firstName} {user.lastName}
      </Text>

      <View style={styles.infoBox}>
        <Info label="Username" value={user.username} />
        <Info label="Age" value={String(user.age)} />
        <Info label="Gender" value={user.gender} />
        <Info label="Email" value={user.email} />
        <Info label="Phone" value={user.phone} />
        <Info label="Birth Date" value={user.birthDate} />
        <Info label="City" value={user.address.city} />
        <Info label="Address" value={user.address.address} />
        <Info label="Company" value={user.company?.name ?? '-'} />
        <Info label="Job Title" value={user.company?.title ?? '-'} />
        <Info label="University" value={user.university ?? '-'} />
      </View>

      <View style={styles.buttonWrapper}>
        <Button title="Find Matches" onPress={handleFindMatches} />
      </View>

      {matches.length > 0 && (
        <Animated.View style={[styles.matchesWrapper, { opacity: fadeAnim }]}>
          <Text style={[styles.sectionTitle, rtlText]}>Top Matches</Text>

          {matches.map((match) => (
            <MatchCard key={match.id} user={match} />
          ))}
        </Animated.View>
      )}
    </ScrollView>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <Text style={[styles.infoLabel, rtlText]}>{label}</Text>
      <Text style={[styles.infoValue, rtlText]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
  },
  content: {
    padding: 16,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: 'center',
    backgroundColor: '#eee',
  },
  name: {
    marginTop: 12,
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
  },
  infoBox: {
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
  },
  infoRow: {
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ddd',
  },
  infoLabel: {
    fontSize: 12,
    color: '#777',
  },
  infoValue: {
    marginTop: 3,
    fontSize: 15,
    fontWeight: '600',
  },
  buttonWrapper: {
    marginTop: 20,
  },
  matchesWrapper: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 8,
  },
});