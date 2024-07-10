interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return <div className='mx-auto max-w-screen-2xl px-2'>{children}</div>;
};

export default Container;
