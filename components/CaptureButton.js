import React from 'react';
import { Button, TouchableHighlight } from 'react-native';

export default ({buttonDisabled, onClick}) =>
  <TouchableHighlight
      style={{
        marginBottom:30,
        width:160,
        borderRadius:10,
        backgroundColor: "white",
      }}
      disabled={buttonDisabled}>
      <Button 
        onPress={onClick}
        disabled={buttonDisabled}
        title="Capture"
        accessibilityLabel="Learn more about this button"
      />
  </TouchableHighlight>