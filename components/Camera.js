import React, {useEffect, useState} from 'react';
import { Text, View, StyleSheet, ActivityIndicator, Modal, TouchableHighlight } from 'react-native';
import { Camera } from 'expo-camera';
import CaptureButton from './CaptureButton'
import identifyImage from '../apis/identifyImage'; // BRAVO

export default () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false); // ADD THIS LINE
  const [identifiedImg, setIdentifiedImg] = useState(null);

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

  const displayAnswer = (idedImg) => { // BRAVO
    setIdentifiedImg(idedImg)
    setModalVisible(true)
  }

  const snap = async () => {
    if (this.camera) {
      setLoading(true);

      this.camera.takePictureAsync({base64: true})
      .then( photo => {
        this.camera.pausePreview();
        let { base64 } = photo; // XX
        return base64 // XX
      })
      .then((base64) => { // XX
        identifyImage(base64, displayAnswer); // ALPHA
        // setIdentifiedImg(uri) // ALPHA
        // setModalVisible(true); // BRAVO

        this.camera.resumePreview();
        setLoading(false);
      })
      .catch(e => {
        console.log('That did not go well.')
        setModalVisible(false); // <------- this line too
        throw e
      });
    }
  };

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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              {identifiedImg ? identifiedImg : "Can't ID this one!"}
            </Text>

            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.textStyle}>ID Another</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
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
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
})

