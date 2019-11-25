import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import MQTTUser from './components/MQTTUser';
// import EmptyComponent from './components/EmptyComponent'; //Avmarkera för att visa emptycomponent
export default function App() {
  return (
    <View style={styles.container}>   
      {/* <EmptyComponent></EmptyComponent> //Avmarkera för att visa emptycomponent  */}  
      <MQTTUser></MQTTUser>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
