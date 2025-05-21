// Root component – decides which screen to show
// ---------------------------------------------

import React, { useState } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { WalletProvider, useWallet } from './src/AuthContext'; // AuthContext.tsx now exports WalletProvider and useWallet
import PortalStatusIndicator from './src/components/PortalStatusIndicator';
import { portal } from './src/portal'; // Import the portal instance with named import

// Placeholder for InitialWalletSetupScreen
// This screen will later handle automatic wallet creation.
function InitialWalletSetupPlaceholder() {
  const [creationStatusMessage, setCreationStatusMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCreateWallet = async () => {
    if (!portal) {
      console.error('Task 010: Portal SDK instance is not available.');
      setCreationStatusMessage('ERROR: Portal SDK not available.');
      return;
    }
    setIsLoading(true);
    setCreationStatusMessage('Creating wallet...');
    try {
      console.log('Task 010: Attempting to call portal.createWallet...');
      // Calling with no arguments, assuming defaults or that options are set elsewhere,
      // or that the type 'ProgressCallback' means the options object is for progress.
      const response = await portal.createWallet();
      console.log('Task 010: portal.createWallet SUCCESS:', JSON.stringify(response, null, 2));
      setCreationStatusMessage('SUCCESS: ' + JSON.stringify(response, null, 2));
    } catch (error) {
      console.error('Task 010: portal.createWallet ERROR:', error);
      setCreationStatusMessage('ERROR: ' + (error instanceof Error ? error.message : String(error)));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>No Wallet Detected.</Text>
      <Text style={styles.text}>Press the button to create your Nuri Bitcoin Wallet.</Text>
      <Button title="Create Wallet" onPress={handleCreateWallet} />
      {isLoading && <Text style={styles.text}>Loading...</Text>}
      {creationStatusMessage && (
        <Text style={[styles.text, { marginTop: 10, color: creationStatusMessage.startsWith('ERROR') ? 'red' : 'green' }]}>
          {creationStatusMessage}
        </Text>
      )}
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
