interface TitleProps {
  children: React.ReactNode;
}

const Title: React.FC<TitleProps> = ({ children }) => {
  return (
    <div data-aos='zoom-out' className='text-3xl font-bold'>
      {children}
    </div>
  );
};

export default Title;
