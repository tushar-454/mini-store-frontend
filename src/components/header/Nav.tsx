import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { RxCross1 } from 'react-icons/rx';
import { Link } from 'react-router-dom';
import navs, { NavType, dropdownType } from '../../Data/Nav.tsx';

const Nav = ({
  menuOpen,
  setMenuOpen,
}: {
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <>
      {/* desktop nav */}
      <nav className='hidden lg:block'>
        <ul className='flex items-center gap-5'>
          {navs.map((nav: NavType) => (
            <li key={Math.random()} className='group relative'>
              <span className='nav-item'>
                {nav?.link ? (
                  <Link to={nav.link}>{nav.name}</Link>
                ) : (
                  <>{nav.name}</>
                )}
                <span>
                  {!nav?.link && (
                    <MdOutlineKeyboardArrowDown className='text-lg' />
                  )}
                </span>{' '}
                {/* dropdown  */}
                {nav?.dropdown && (
                  <ul className='absolute left-0 top-10 -mt-4 hidden space-y-2 rounded-lg bg-white py-2 pt-4 shadow-lg group-hover:block'>
                    {// dropdown items
                    nav?.dropdown?.map((dropdown: dropdownType) => (
                      <li key={Math.random()} className='drowdown-nav-item'>
                        <Link to={dropdown.link || '/'}>
                          {dropdown.dropdownName}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </span>
            </li>
          ))}
        </ul>
      </nav>
      {/* mobile view nav */}
      <nav
        className={`absolute top-0 block h-screen w-full bg-neutral-100 p-5 transition-all sm:w-1/2 lg:hidden ${menuOpen ? '-left-4' : '-left-[35rem]'}`}
      >
        {/* cross icon for close  */}
        <div className='grid place-content-end pb-5'>
          <RxCross1
            onClick={() => setMenuOpen(!menuOpen)}
            className='text-3xl'
          />
        </div>
        <ul className='flex flex-col gap-5 space-y-4'>
          {navs?.map((nav: NavType) => (
            <li key={Math.random()} className='relative'>
              <span className='nav-item group'>
                {nav?.link ? (
                  <Link to={nav.link}>{nav.name}</Link>
                ) : (
                  <>{nav.name}</>
                )}
                <span>
                  {!nav?.link && (
                    <MdOutlineKeyboardArrowDown className='text-lg' />
                  )}
                </span>{' '}
                {/* dropdown  */}
                {nav?.dropdown && (
                  <ul className='absolute left-32 top-0 z-[9999] hidden space-y-2 rounded-lg bg-white py-2 shadow-lg group-hover:block'>
                    {nav?.dropdown?.map((dropdown: dropdownType) => (
                      <li key={Math.random()} className='drowdown-nav-item'>
                        <Link to={dropdown.link || '/'}>
                          {dropdown.dropdownName}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </span>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Nav;
