interface TitleProps {
  children: React.ReactNode;
}

const Title: React.FC<TitleProps> = ({ children }) => {
  return <div className='text-3xl font-bold'>{children}</div>;
};

export default Title;
