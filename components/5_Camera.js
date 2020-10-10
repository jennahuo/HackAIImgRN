import React, {useEffect, useState} from 'react';
import { Text, View, StyleSheet, ActivityIndicator, Modal, TouchableHighlight } from 'react-native';
import { Camera } from 'expo-camera';
import CaptureButton from './CaptureButton'

export default () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false); // ADD THIS LINE
  const [tempUri, setTempUri] = useState(null);

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
        this.camera.pausePreview();
        let { uri } = photo;
        return uri
      })
      .then((uri) => {
        // console.log('uri is ', uri)
        setTempUri(uri) // <----- Don't forget these two lines
        setModalVisible(true);

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

  /* 
    What's left to do? Send the image to our api for identificaiton, accept back that id, and display in on the screen.

    Let's start with displaying it on the screen.
    There are a number of different modal libraries in react, but we'll use the Expo version for now.
    You can pull up the expo modal api if you want, but I have it here.

    Modal should be type slyde, transparent is true and
    visible we need to create a new state variable to manage that. So let's do that.

    Now we need to control the modal with state, and not forget to show the modal at the right time
    We'll create a temporary state variable to store the URI so we have something to show
    We'll use a tertiary statementment as a shorthand if-then statement.
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              {tempUri ? tempUri : "Can't ID this one!"}
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
  modalView: { // ADD modalView, Open Button, modal text
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

