import { Button } from '@mui/material';
import { useRef } from 'react';
import Webcam from 'react-webcam';

const CameraInput = ({ onCapture }) => {
  const webcamRef = useRef<Webcam>(null);

  const capture = () => {
    const imageSrc = webcamRef?.current.getScreenshot();
    onCapture(imageSrc);
  };

  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width="100%"
      />
      <Button type="button" onClick={capture}>
        Capture Photo
      </Button>
    </div>
  );
};

export default CameraInput;
