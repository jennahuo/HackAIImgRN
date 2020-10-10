import React from 'react'
import { Button, StyleSheet, TouchableHighlight } from 'react-native'

export default ({buttonDisabled, onSnap}) => 
  <TouchableHighlight
    style={styles.touchable}
    disabled={buttonDisabled}
  >
    <Button
      onPress={onSnap}
      disabled={buttonDisabled}
      title="Capture"
      accessibilityLabel="Learn more about this button"
    />
  </TouchableHighlight>

const styles = StyleSheet.create({
  touchable: {
    marginBottom:30,
    width:160,
    borderRadius:10,
    backgroundColor: "white"
  }
})
  /*
    TouchableHighlight
    is a wrapper to make views behave properly

    Now let's test our app!

    Remember that console.log? Let's see where that goes.
  */