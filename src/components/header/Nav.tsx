import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className='py-4'>
      <ul className='flex items-center gap-5'>
        <li className='relative'>
          <span className='nav-item'>
            Men{' '}
            <span>
              <MdOutlineKeyboardArrowDown className='text-lg' />
            </span>{' '}
            {/* dropdown  */}
            <ul className='absolute left-0 top-10 hidden space-y-2 rounded-lg py-2 shadow-lg'>
              <li className='drowdown-nav-item'>
                <Link to={'/'}>Shirts</Link>
              </li>
              <li className='drowdown-nav-item'>
                <Link to={'/'}>Pants</Link>
              </li>
              <li className='drowdown-nav-item'>
                <Link to={'/'}>Shoes</Link>
              </li>
              <li className='drowdown-nav-item'>
                <Link to={'/'}>Accessories</Link>
              </li>
            </ul>
          </span>
        </li>
        <li>
          <span className='nav-item'>
            Women{' '}
            <span>
              <MdOutlineKeyboardArrowDown className='text-lg' />
            </span>{' '}
          </span>
        </li>
        <li>
          <span className='nav-item'>
            Accessories{' '}
            <span>
              <MdOutlineKeyboardArrowDown className='text-lg' />
            </span>{' '}
          </span>
        </li>
        <li>
          <span className='nav-item'>
            Blog & Travels{' '}
            <span>
              <MdOutlineKeyboardArrowDown className='text-lg' />
            </span>{' '}
          </span>
        </li>
        <li>
          <span className='nav-item'>
            Electronics{' '}
            <span>
              <MdOutlineKeyboardArrowDown className='text-lg' />
            </span>{' '}
          </span>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
