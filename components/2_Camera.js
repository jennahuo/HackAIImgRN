import React, {useEffect, useState} from 'react';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import { Camera } from 'expo-camera';

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

/* 
  Next we'll add the camera component and a loading component.
  But before we do, we want to make sure that we have permission to use the camera, otherwise our app will crash.
  So we're going to use a Hook.
  React Hooks are a way to use the component life cycle in React without building a class (keeping it as a function)
  If you don't know what that means, don't worry about it. The function instead of a class keeps our app light weight
  And the useEffect hook lets us do something right at the start of loading the component, but before it actually shows
  up on the screen.
*/