from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np
from PIL import Image
from io import BytesIO
import os
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app) 


model_path = "model.tflite"

# Load your TensorFlow Lite model
interpreter = tf.lite.Interpreter(model_path=model_path)
interpreter.allocate_tensors()

# Get input and output tensors
input_tensor_index = interpreter.get_input_details()[0]['index']
output_tensor_index = interpreter.get_output_details()[0]['index']

@app.route('/')
@cross_origin()
def home():
    return 'Welcome to the TensorFlow Lite Flask API'

@app.route('/predict', methods=['POST'])
@cross_origin()
def predict():
    try:
        # Assuming the image is sent as a file in the 'file' field of the form data
        image_file = request.files['file']

        # Read the image file
        image = Image.open(image_file)

        # Resize the image to 224x224
        image = image.resize((224, 224))

        # Convert image to a NumPy array
        image_array = np.array(image).astype(np.float32) / 255.0  # Normalize to [0, 1]

        # Set the input tensor
        interpreter.set_tensor(input_tensor_index, image_array.reshape(1, *image_array.shape))
        # Run the interpreter
        interpreter.invoke()

        # Get the output tensor
        output_data = interpreter.get_tensor(output_tensor_index)

        # Return predictions as JSON
        return jsonify({'predictions': output_data.tolist()})

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
