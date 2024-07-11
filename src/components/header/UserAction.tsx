import { CiHeart, CiSearch, CiShoppingCart, CiUser } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import LinkBtn from '../shared/LinkBtn';

const UserAction = () => {
  const userLoggedIn = true;
  return (
    <>
      {userLoggedIn ? (
        <div>
          <ul className='flex items-center gap-4'>
            <li>
              <Link to={'/product/filter'} className='text-2xl'>
                <CiSearch />
              </Link>
            </li>
            <li>
              <Link to={'/'} className='text-2xl'>
                <CiShoppingCart />
              </Link>
            </li>
            <li>
              <Link to={'/'} className='text-2xl'>
                <CiHeart />
              </Link>
            </li>
            <li>
              <Link to={'/'} className='text-2xl'>
                <CiUser />
              </Link>
            </li>
          </ul>
        </div>
      ) : (
        <div>
          <LinkBtn>Login / Signup</LinkBtn>
        </div>
      )}
    </>
  );
};

export default UserAction;
