import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { RxCross1 } from 'react-icons/rx';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <>
      {/* desktop nav */}
      <nav className='hidden lg:block'>
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
      {/* mobile view nav */}
      <nav className='absolute -left-20 top-0 hidden h-screen w-full bg-neutral-100 p-5 sm:w-1/2 lg:hidden'>
        {/* cross icon for close  */}
        <div className='grid place-content-end pb-5'>
          <RxCross1 className='text-3xl' />
        </div>
        <ul className='flex flex-col gap-5 space-y-4'>
          <li className='relative'>
            <span className='nav-item'>
              Men{' '}
              <span>
                <MdOutlineKeyboardArrowDown className='text-lg' />
              </span>{' '}
              {/* dropdown  */}
              <ul className='absolute left-32 top-0 z-[9999] hidden space-y-2 rounded-lg bg-white py-2 shadow-lg'>
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
    </>
  );
};

export default Nav;
