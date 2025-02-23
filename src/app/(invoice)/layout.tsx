import { Wrapper } from './wrapper';

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <Wrapper>
      <div className='w-full'>{children}</div>
    </Wrapper>
  );
};

export default RootLayout;
