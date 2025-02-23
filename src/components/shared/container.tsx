type TContainer = {
  children: React.ReactNode;
};
import React from 'react';

const Container = ({ children }: TContainer) => {
  return <div className='mx-auto w-full px-2 lg:w-[92%] 2xl:px-0'>{children}</div>;
};

export { Container };
