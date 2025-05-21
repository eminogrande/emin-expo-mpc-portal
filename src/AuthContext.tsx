// React Context that manages wallet state for an auth-less POC.
// --------------------------------------------------------------

import React, { createContext, useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';      // encrypted key-value store
import { portal, getPortalInitializationError } from './portal'; // Import portal and error checker

// ------------
// Type helpers
// ------------
type WalletState = {
  hasWallet: boolean;
  walletAddress: string | null;
  isPortalConnected: boolean | null; // New state for Portal connection status
  loading: boolean; // Indicates if loading from SecureStore is complete
  setWalletData: (address: string | null, walletExists: boolean) => Promise<void>;
  clearWalletData: () => Promise<void>; // For resetting app state for testing/POC
};

// Create the Context with a dummy default; we'll override in the provider.
const WalletContext = createContext<WalletState>({} as WalletState); // Renamed Ctx
export const useWallet = () => useContext(WalletContext); // Renamed useAuth

// ---------------------------
// Provider component itself
// ---------------------------
export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ // Renamed AuthProvider
  children,
}) => {
  const [hasWallet, setHasWallet] = useState<boolean>(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isPortalConnected, setIsPortalConnected] = useState<boolean | null>(null); // Init state
  const [loading, setLoading] = useState(true); // To know when SecureStore loading is done

  // On app launch, try to restore saved wallet state and check Portal connection
  useEffect(() => {
    (async () => {
      try {
        const storedHasWallet = await SecureStore.getItemAsync('hasWallet');
        const storedWalletAddress = await SecureStore.getItemAsync('walletAddress');

        if (storedHasWallet === 'true') {
          setHasWallet(true);
          setWalletAddress(storedWalletAddress); // This can be null if that's what was stored
        } else {
          // Defaults if nothing stored or 'hasWallet' is not 'true'
          setHasWallet(false);
          setWalletAddress(null);
        }
      } catch (e) {
        console.error("[WalletContext] Failed to load wallet state from SecureStore:", e);
        // Set to default state in case of error
        setHasWallet(false);
        setWalletAddress(null);
      } finally {
        // Check Portal SDK initialization status after attempting to load other state
        if (portal) {
          setIsPortalConnected(true);
          console.log("[WalletContext] Portal SDK connection verified.");
        } else {
          const initError = getPortalInitializationError();
          if (initError) {
            console.error("[WalletContext] Portal SDK failed to initialize:", initError.message);
          } else {
            console.error("[WalletContext] Portal SDK instance is null without a specific init error.");
          }
          setIsPortalConnected(false);
        }
        setLoading(false); // Finished all loading attempts
      }
    })();
  }, []);

  // Function to update wallet data and persist to SecureStore
  const setWalletData = async (address: string | null, walletExists: boolean) => {
    try {
      setWalletAddress(address);
      setHasWallet(walletExists);
      if (walletExists && address !== null) {
        await SecureStore.setItemAsync('walletAddress', address);
      } else {
        // If wallet doesn't exist or address is null, remove or store empty
        await SecureStore.deleteItemAsync('walletAddress');
      }
      await SecureStore.setItemAsync('hasWallet', walletExists ? 'true' : 'false');
      console.log(`[WalletContext] Wallet data ${walletExists ? 'saved' : 'cleared'}. Address: ${address}, HasWallet: ${walletExists}`);
    } catch (e) {
      console.error("[WalletContext] Failed to save wallet state to SecureStore:", e);
    }
  };

  // Function to clear all wallet data (for testing/resetting POC)
  const clearWalletData = async () => {
    try {
      await SecureStore.deleteItemAsync('walletAddress');
      await SecureStore.deleteItemAsync('hasWallet');
      setWalletAddress(null);
      setHasWallet(false);
      // Optionally, could also reset isPortalConnected here if a full app "reset" is implied,
      // but typically SDK init status is an app-load concern.
      console.log("[WalletContext] All wallet data cleared from SecureStore and context.");
    } catch (e) {
      console.error("[WalletContext] Failed to clear wallet state from SecureStore:", e);
    }
  };

  return (
    <WalletContext.Provider value={{ hasWallet, walletAddress, isPortalConnected, loading, setWalletData, clearWalletData }}>
      {children}
    </WalletContext.Provider>
  );
};
