// Root component – decides which screen to show
// ---------------------------------------------

import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { WalletProvider, useWallet } from './src/AuthContext'; // AuthContext.tsx now exports WalletProvider and useWallet
import PortalStatusIndicator from './src/components/PortalStatusIndicator';

// Placeholder for InitialWalletSetupScreen
// This screen will later handle automatic wallet creation.
function InitialWalletSetupPlaceholder() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>No Wallet Detected.</Text>
      <Text style={styles.text}>Preparing for initial wallet setup...</Text>
      {/* In a subsequent task, this screen would trigger portal.createWallet() */}
    </View>
  );
}

// Placeholder for WalletDisplayScreen
// This screen will later display the wallet address and backup options.
function WalletDisplayPlaceholder() {
  const { walletAddress } = useWallet(); // To show the address if needed
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Wallet Exists!</Text>
      {walletAddress && <Text style={styles.text}>Address: {walletAddress}</Text>}
      <Text style={styles.text}>Display Screen Placeholder</Text>
      {/* In a subsequent task, this screen would show address and backup button */}
    </View>
  );
}

function Root() {
  const { hasWallet, loading } = useWallet();

  if (loading) {
    // While we're reading SecureStore from WalletContext
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Booting Wallet…</Text>
      </View>
    );
  }

  if (hasWallet) {
    return <WalletDisplayPlaceholder />;
  } else {
    return <InitialWalletSetupPlaceholder />;
  }
}

export default function App() {
  return (
    <WalletProvider>
      <View style={{ flex: 1 }}>
        <Root />
        <PortalStatusIndicator />
      </View>
    </WalletProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
});
