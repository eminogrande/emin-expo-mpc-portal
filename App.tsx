// Root component – decides which screen to show
// ---------------------------------------------

import React from 'react';
import { Text, View } from 'react-native';
import { AuthProvider, useAuth } from './src/AuthContext';
import LoginScreen from './src/screens/LoginScreen';
import Constants from 'expo-constants';

function Root() {
  const { userId, loading } = useAuth();

  if (loading) {
    // While we're reading SecureStore
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Booting…</Text>
      </View>
    );
  }

  // Not logged in yet
  if (!userId) return <LoginScreen />;

  // Logged in – placeholder until we build the Wallet UI
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>✅ Logged in as {userId.slice(0, 6)}…</Text>
    </View>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Root />
    </AuthProvider>
  );
}
