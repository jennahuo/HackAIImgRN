import React, {useEffect, useState} from 'react';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import { Camera } from 'expo-camera';
import CaptureButton from './CaptureButton'

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

  // DONT FORGET TO MAKE SNAP ASYNC ******
  const snap = async () => {
    if (this.camera) {
      setLoading(true);

      this.camera.takePictureAsync({base64: true})
      .then( photo => {
        this.camera.pausePreview();
        let { uri } = photo;
        return uri
      })
      .then((uri) => {
        console.log('uri is ', uri)
        this.camera.resumePreview();
        setLoading(false);
      })
      .catch(e => {
        console.log('That did not go well.')
        throw e
      });
    }
  };

  /* 
    Now, let's make this snap function do something.
    First, we will check that this.camera exists and was loaded properly.
    Then we'll set the status of the app loading to true so that the user doesn't goof us up by trying something crazy.

    Now I know I need to reference the camera, but I cannot remember exactly what the method looks like.
    Luckily for us, the React and React Native communities are notorious for really good documentation.
    Google -> React Native Expo Camera
    https://docs.expo.io/versions/latest/sdk/camera/

    So this is an async function. That means we need to make the parent snap async too.
    Options? Well, we read our documentation from our AI engine, and we know we need a base64 image, so set that to true.
    This is an async funciton so we need a .then(when it executes) and a .catch(when it doesn't).

    We're going to pause preview
    Get the uri
    put it in the console so we can see it took the picture and put it somewhere temporarily
    then resume preview
    
    Now we test!
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

