// React Context that exposes login / logout and keeps auth state.
// --------------------------------------------------------------
//
// Why not Redux, Zustand…?  Context is enough for 2-3 values and
// avoids extra libraries for this POC.

import React, { createContext, useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';      // encrypted key-value store
import { portal } from './portal';                     // our singleton
import { create, get } from 'react-native-passkeys';
import { BackupMethods } from '@portal-hq/core';
import Constants from 'expo-constants';

// ------------
// Type helpers
// ------------
type AuthState = {
  userId: string | null;
  sessionToken: string | null;
  loading: boolean;
  login: (email: string) => Promise<void>;
  logout: () => Promise<void>;
};

// Create the Context with a dummy default; we'll override in the provider.
const Ctx = createContext<AuthState>({} as AuthState);
export const useAuth = () => useContext(Ctx);

// ---------------------------
// Provider component itself
// ---------------------------
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Three bits of state the whole app may need:
  const [userId, setUserId] = useState<string | null>(null);
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // -------------------------------------------------
  // 1. On app launch try to restore a saved session
  // -------------------------------------------------
  useEffect(() => {
    (async () => {
      const uid = await SecureStore.getItemAsync('uid');
      const token = await SecureStore.getItemAsync('token');
      if (uid && token) {
        setUserId(uid);
        setSessionToken(token);
      }
      setLoading(false);  // whatever happened, boot is finished
    })();
  }, []);

  // ---------------------------------
  // 2. "login" does register + auth
  // ---------------------------------
  const login = async (email: string) => {
    setLoading(true);
    try {
      // 2·1  Ask Portal for a WebAuthn challenge.
      //      (Portal creates the user for us if it doesn't exist.)
      // 2·1  Register/backup with passkey (creates a new wallet or backup for the user)
      const backupResult = await portal.backupWallet(
        BackupMethods.Passkey,
        (status: any) => { console.log('Backup Status: ', status); },
        {}
      );
      console.log('Backup result:', backupResult);

      // TODO: Extract user/session info from backupResult if available.
      // For now, just persist a dummy value to avoid crash.
      await SecureStore.setItemAsync('uid', 'dummy-uid');
      await SecureStore.setItemAsync('token', 'dummy-token');

      setUserId('dummy-uid');
      setSessionToken('dummy-token');
    } catch (error) {
      // Optionally, you could set an error state here to display to the user
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------------
  // 3. Simple logout helper
  // ---------------------------------
  const logout = async () => {
    await SecureStore.deleteItemAsync('uid');
    await SecureStore.deleteItemAsync('token');
    setUserId(null);
    setSessionToken(null);
  };

  return (
    <Ctx.Provider value={{ userId, sessionToken, loading, login, logout }}>
      {children}
    </Ctx.Provider>
  );
};
