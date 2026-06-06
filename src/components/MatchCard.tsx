import React, { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import type { User } from '../features/users/types';
import { rtlRow, rtlText } from '../styles/rtl';

type Props = {
  user: User;
};

function MatchCardComponent({ user }: Props) {
  const [imageError, setImageError] = useState(false);

  const initials = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;

  return (
    <View style={[styles.card, rtlRow]}>
      {!imageError ? (
        <Image
          source={{ uri: user.image }}
          style={styles.image}
          onError={() => setImageError(true)}
        />
      ) : (
        <View style={styles.fallbackImage}>
          <Text style={styles.fallbackText}>{initials}</Text>
        </View>
      )}

      <View style={styles.info}>
        <Text style={[styles.name, rtlText]}>
          {user.firstName} {user.lastName}
        </Text>
        <Text style={[styles.meta, rtlText]}>
          {user.age} years old · {user.address.city}
        </Text>
      </View>
    </View>
  );
}

export const MatchCard = React.memo(MatchCardComponent);

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 12,
    marginTop: 8,
  },
  image: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#eee',
  },
  fallbackImage: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#dbeafe',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fallbackText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1d4ed8',
  },
  info: {
    flex: 1,
  },
  name: {
    fontWeight: '700',
  },
  meta: {
    marginTop: 3,
    color: '#666',
  },
});