import { useCallback, useEffect, useRef } from 'react';
import { useCameraKit } from './hooks/useCameraKit';
import { createMediaStreamSource, Transform2D } from '@snap/camera-kit';

function App() {
  const { session, lenses } = useCameraKit();
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  const startCameraKit = useCallback(async () => {
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      video: true,
    });

    const source = createMediaStreamSource(mediaStream, {
      transform: Transform2D.MirrorX,
    });

    session.setSource(source);
    session.applyLens(lenses[20]);
    session.play('live');
  }, [session, lenses]);

  useEffect(() => {
    startCameraKit();
  }, [startCameraKit]);

  useEffect(() => {
    canvasContainerRef?.current?.replaceWith(session.output.live);
  }, [session]);
  const handleClick = () => {
    window.location.href = 'https://ar-trail.vercel.app/'; 
  };

  return <>
  <div>
 
  <button onClick={handleClick}>
      Go to Example
    </button>
   <div ref={canvasContainerRef}>
    
  </div>;
  </div>
  </>
}

export default App;
