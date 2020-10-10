import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default () => {
  return <View style={styles.centeredView}>
    <Text>We're building an app Harry!</Text>
  </View>
}

const styles= StyleSheet.create({
  centeredView: {
    flex: 1,
    marginTop: 22,
  }
})

/* 
  Let's build a react component eh?
  We'll add a bit of styling to it so it's easy to read
  And we'll clean up the App.js component and import it there
*/