import React from 'react';
import { Skia, Canvas } from '@shopify/react-native-skia';

const SimpleParticle = () => {
  return (
    <Canvas style={{ width: 100, height: 100, backgroundColor: 'red' }} onDraw={(canvas) => {
        const paint = Skia.Paint();
        paint.setAntiAlias(true);
        paint.setColor(Skia.Color('white'));
        canvas.drawCircle(50, 50, 25, paint); // Ensure coordinates and radius are within the canvas bounds
        console.log('Drawing on canvas');
      }} />
  );
};

export default SimpleParticle;
