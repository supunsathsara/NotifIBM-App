import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Using Material Icons for example

const ComingSoon = () => {
  return (
    <View style={styles.container}>
      <Icon name="construction" size={100} color="#00BFFF" />
      <Text style={styles.text}>Coming Soon...</Text>
    </View>
  );
};

export default ComingSoon;

const styles = StyleSheet.create({
  container: {
    flex: 1,  // Takes full height of the parent
    justifyContent: 'center',  // Centers content vertically
    alignItems: 'center',  // Centers content horizontally
    backgroundColor: '#1A232E'  
  },
  text: {
    color: '#00BFFF',  // White text for readability on dark background
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,  // Margin top to space out text from the icon
  }
});
