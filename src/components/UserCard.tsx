import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import type { User } from '../features/users/types';
import { rtlRow, rtlText } from '../styles/rtl';

type Props = {
  user: User;
  onPress: () => void;
};

function UserCardComponent({ user, onPress }: Props) {
  const [imageError, setImageError] = useState(false);

  const initials = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
      accessibilityRole="button"
    >
      <View style={[styles.content, rtlRow]}>
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
          <Text style={[styles.meta, rtlText]}>City: {user.address.city}</Text>
          <Text style={[styles.meta, rtlText]}>Age: {user.age}</Text>
        </View>
      </View>
    </Pressable>
  );
}

export const UserCard = React.memo(UserCardComponent);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 6,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  pressed: {
    opacity: 0.7,
  },
  content: {
    alignItems: 'center',
    gap: 12,
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#eee',
  },
  fallbackImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#dbeafe',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fallbackText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1d4ed8',
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 17,
    fontWeight: '700',
  },
  meta: {
    marginTop: 4,
    color: '#555',
  },
});