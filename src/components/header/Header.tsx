import { useState } from 'react';
import Container from '../shared/Container';
import Logo from './Logo';
import Nav from './Nav';
import UserAction from './UserAction';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className='sticky top-0 z-[99999999] my-4 bg-[#ffffff98] backdrop-blur-2xl'>
      <Container>
        {/* wrapper  */}
        <div className='relative flex items-center justify-between py-4'>
          <Logo />
          <Nav menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
          {/* login button or user action icon */}
          <UserAction menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        </div>
      </Container>
    </header>
  );
};

export default Header;
