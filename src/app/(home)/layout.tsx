import Footer from '@/components/footer/footer';
import { Header } from '@/components/header/header';
import { Wrapper } from './wrapper';

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <Wrapper>
      <Header />
      <div>{children}</div>
      <Footer />
    </Wrapper>
  );
};

export default RootLayout;
