import React, { useState, useEffect } from 'react';
import { Text, View, Alert, ActivityIndicator } from 'react-native';
import { Camera } from 'expo-camera';
import CaptureButton from './CaptureButton';

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
  let snap = async () => {
    if (this.camera) {
      this.camera.pausePreview();
      let photo = await this.camera.takePictureAsync();
      let { uri } = photo
      Alert.alert(uri)
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={Camera.Constants.Type.back} ref={ref => {
        this.camera = ref;
      }}>
        <ActivityIndicator 
          size="large" 
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }} 
          color="#fff" 
          animating={loading}
          />
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}>
          {/* Below added for step 2 */}
        </View>
          <CaptureButton buttonDisabled={loading} onClick={snap}/>
      </Camera>
    </View>
  );
}