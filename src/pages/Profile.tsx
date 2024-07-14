import { NavLink, Outlet } from 'react-router-dom';
import Container from '../components/shared/Container';
import useAuth from '../Hook/useAuth';

const Profile = () => {
  const { logout } = useAuth();
  return (
    <section>
      <Container>
        <div className='flex'>
          <aside className='h-screen w-[300px] border-x'>
            {/* user information  */}
            <div className='flex items-center gap-5 p-3'>
              <img
                src='https://images.ctfassets.net/lh3zuq09vnm2/yBDals8aU8RWtb0xLnPkI/19b391bda8f43e16e64d40b55561e5cd/How_tracking_user_behavior_on_your_website_can_improve_customer_experience.png'
                alt=''
                className='h-20 w-20 rounded-full object-cover'
              />
              <p className='grid'>
                <span className='text-xl font-medium'>John Doe</span>
                <span>User</span>
              </p>
            </div>
            <div className='mt-10 grid'>
              <NavLink
                to={'/profile'}
                className='mb-2 cursor-pointer p-2 px-3 text-lg font-semibold hover:bg-neutral-100'
              >
                Profile
              </NavLink>
              <NavLink
                to={'/profile/shipping'}
                className='mb-2 cursor-pointer p-2 px-3 text-lg font-semibold hover:bg-neutral-100'
              >
                Shipping
              </NavLink>
              <NavLink
                to={'/profile/order'}
                className='mb-2 cursor-pointer p-2 px-3 text-lg font-semibold hover:bg-neutral-100'
              >
                Order
              </NavLink>
              <NavLink
                to={'/profile/review'}
                className='mb-2 cursor-pointer p-2 px-3 text-lg font-semibold hover:bg-neutral-100'
              >
                Reviews
              </NavLink>
              <NavLink
                to={'/'}
                onClick={logout}
                className='mb-2 cursor-pointer p-2 px-3 text-lg font-semibold hover:bg-neutral-100'
              >
                Log out
              </NavLink>
            </div>
          </aside>
          <div className='flex-grow p-4'>
            <Outlet />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Profile;
