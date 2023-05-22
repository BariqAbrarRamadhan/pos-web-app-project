import React from 'react';
import { Spin } from 'antd';

const Spinner = () => {
  return (
    <div style={{
      zIndex: '100',
      position: 'absolute',
      top: '50%',
      left: '50%',
    }}>
      <Spin indicator={Spinner} />
    </div>
  );
};

export default Spinner;