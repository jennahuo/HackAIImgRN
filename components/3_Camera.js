import React, {useEffect, useState} from 'react';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import { Camera } from 'expo-camera';
import CaptureButton from './CaptureButton' // ADD THIS LINE RIGHT HERE

export default () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
      setLoading(false);
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  // ADD this right here vvvvvvvv
  const snap = () => {
    console.log('SNAP!!!')
  };

  /* 
    Now, we need a button so it can take the picture!
    The component that will be the take picture button will live in a different file. CaptureButton.js
    But the action of capturing the picture will happen here. So let's make a snap function. It can be empty for now.

    So our capture picture button, we want to pass it the snap function and the loading state so it knows when to be disabled.
  */

  return (
    <View style={styles.centeredView}>
      <Camera 
        style={styles.fullFlex} 
        type={Camera.Constants.Type.back} 
        ref={ref => {
          this.camera = ref;
      }}>
        <ActivityIndicator 
          size="large" 
          style={styles.centered} 
          color="#fff" 
          animating={loading}
        />
          <CaptureButton buttonDisabled={loading} onSnap={snap}/>
          {/* ADD THIS LINE RIGHT HERE ^^^^^^^ */}
      </Camera>
    </View>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    marginTop: 22
  },
  fullFlex: {
    flex: 1
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

