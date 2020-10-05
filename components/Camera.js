import React, { useState, useEffect } from 'react';
import { Text, View, ActivityIndicator, StyleSheet, Modal, TouchableHighlight } from 'react-native';
import { Camera } from 'expo-camera';
import CaptureButton from './CaptureButton';
import identifyImage from '../apis/identifyImage';

export default () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [identifiedImg, setIdentifiedImg] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

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
  const snap = async () => {
    if (this.camera) {
      setLoading(true);

      this.camera.takePictureAsync({base64: true})
      .then( photo => {
        this.camera.pausePreview(); // v3
        let { base64 } = photo;

        identifyImage(base64, displayAnswer); // v3
        setModalVisible(true);
        this.camera.resumePreview(); // v3
      })
      .catch(e => {
        console.log('That did not go well.')
        setModalVisible(false)
        throw e
      }); // v3
    }
  };

  const displayAnswer = (idedImg) => { // v3
    setLoading(false)
    setIdentifiedImg(idedImg)
  }

  return (
    <View style={styles.fullFlex}>
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
          <CaptureButton buttonDisabled={loading} onClick={snap}/>
      </Camera>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{identifiedImg ? identifiedImg : "Can't ID this one!"}</Text>

            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.textStyle}>ID More</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
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
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  openButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  fullFlex: {
    flex: 1
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

});
