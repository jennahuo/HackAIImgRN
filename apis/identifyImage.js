const Clarifai = require('clarifai');

export default (imageData, displayAnswer) => {
    const app = new Clarifai.App({
        // apiKey: 'YOUR_KEY_HERE'
        apiKey: '491f1dcd00ad45c3a37c50965f924e64'
    });

    app.models.predict(Clarifai.GENERAL_MODEL, {base64: imageData})
        .then((response) => displayAnswer(response.outputs[0].data.concepts[0].name)
        .catch((err) => alert(err))
    );
}