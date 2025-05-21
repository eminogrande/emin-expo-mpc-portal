import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { useWallet } from '../AuthContext'; // Assuming AuthContext.tsx exports useWallet

const PortalStatusIndicator: React.FC = () => {
  const { isPortalConnected, loading: walletContextLoading } = useWallet();

  let statusText = 'Portal: Checking...';
  let statusColor = styles.checkingText;

  if (!walletContextLoading) {
    if (isPortalConnected === true) {
      statusText = 'Portal: Connected';
      statusColor = styles.connectedText;
    } else if (isPortalConnected === false) {
      statusText = 'Portal: Not Connected';
      statusColor = styles.notConnectedText;
    }
    // If isPortalConnected is null and not loading, it implies an issue or indeterminate state.
    // For now, we'll let it fall through to "Checking..." or explicitly handle if needed.
    // However, the logic in WalletContext aims to set it to true/false after loading.
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.baseText, statusColor]}>{statusText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    position: 'absolute', // Or integrate into layout as needed
    bottom: 10, // Example positioning
    alignSelf: 'center', // Example positioning
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 5,
  },
  baseText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  checkingText: {
    color: '#888', // Neutral color
  },
  connectedText: {
    color: 'green',
  },
  notConnectedText: {
    color: 'red',
  },
});

export default PortalStatusIndicator;
