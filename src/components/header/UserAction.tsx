import { CiHeart, CiSearch, CiShoppingCart, CiUser } from 'react-icons/ci';
import { FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useAuth from '../../Hook/useAuth';
import useUserInfo from '../../Hook/useUserInfo';
import LinkBtn from '../shared/LinkBtn';

const UserAction = ({
  menuOpen,
  setMenuOpen,
}: {
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { user } = useAuth();
  const { userInfo } = useUserInfo();

  return (
    <>
      {user ? (
        <div>
          <ul className='flex items-center gap-4'>
            <li className='block lg:hidden'>
              <FaBars
                onClick={() => setMenuOpen(!menuOpen)}
                className='cursor-pointer'
              />
            </li>
            <li>
              <Link to={'/product/filter'} className='text-2xl'>
                <CiSearch />
              </Link>
            </li>
            <li>
              <Link to={'/cart'} className='text-2xl'>
                <CiShoppingCart />
              </Link>
            </li>
            <li>
              <Link to={'/wishlist'} className='text-2xl'>
                <CiHeart />
              </Link>
            </li>
            <li>
              <Link
                to={
                  userInfo?.data.role === 'user'
                    ? '/profile'
                    : userInfo?.data.role === 'admin'
                      ? '/dashboard'
                      : ''
                }
                className='text-2xl'
              >
                <CiUser />
              </Link>
            </li>
          </ul>
        </div>
      ) : (
        <div>
          <LinkBtn link='/login'>Login / Signup</LinkBtn>
        </div>
      )}
    </>
  );
};

export default UserAction;
