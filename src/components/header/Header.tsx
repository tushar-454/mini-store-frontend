import Container from '../shared/Container';
import Logo from './Logo';
import Nav from './Nav';
import UserAction from './UserAction';

const Header = () => {
  return (
    <header>
      <Container>
        {/* wrapper  */}
        <div className='relative flex items-center justify-between py-4'>
          <Logo />
          <Nav />
          {/* login button or user action icon */}
          <UserAction />
        </div>
      </Container>
    </header>
  );
};

export default Header;
