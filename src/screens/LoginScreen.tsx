// Dumb UI component – grabs "login" from the context, collects an email
// --------------------------------------------------------------------

import React, { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { useAuth } from '../AuthContext';

export default function LoginScreen() {
  const { login, loading } = useAuth();
  const [email, setEmail] = useState('');

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 24 }}>
      <Text style={{ fontSize: 24, marginBottom: 16 }}>MPC Wallet – Login</Text>

      {/* Email input */}
      <TextInput
        autoCapitalize="none"
        autoComplete="email"
        keyboardType="email-address"
        placeholder="email@example.com"
        value={email}
        onChangeText={setEmail}
        style={{
          borderWidth: 1,
          borderRadius: 8,
          padding: 12,
          marginBottom: 16,
        }}
      />

      {/* The single button */}
      <Button
        title={loading ? 'Working…' : 'Create passkey / Sign in'}
        onPress={() => login(email.trim())}
        disabled={!email || loading}
      />
    </View>
  );
}