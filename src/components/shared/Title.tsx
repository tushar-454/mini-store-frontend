interface TitleProps {
  children: React.ReactNode;
}

const Title: React.FC<TitleProps> = ({ children }) => {
  return (
    <div className='overflow-x-hidden text-3xl font-bold'>
      <h1 data-aos='zoom-out'>{children}</h1>
    </div>
  );
};

export default Title;
