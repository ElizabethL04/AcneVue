import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs';
import '/public/model.tflite';

const TFLiteInterference = () => {
    const runInterference = async () => {
        const model = await tf.loadLayersModel('model.tflite');
        const input = model.upload(); //parameter is image path
        const prediction = model.pre_result(input);
        prediction.print();

        input.dispose();
        prediction.dispose();
        model.dispose();
    };

    return (
        <div>
            <button onClick={runInterference}>Run Interference</button>
        </div>
    );
};
export default TFLiteInterference;