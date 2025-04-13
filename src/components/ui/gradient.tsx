import React from 'react';

type TGradient = {
  children: React.ReactNode;
};

const Gradient = ({ children }: TGradient) => {
  return (
    // <span className='bg-gradient-to-t from-secondary-foreground to-primary bg-clip-text text-transparent'>
    <span className='bg-black bg-clip-text text-transparent'>{children}</span>
  );
};

export default Gradient;
