import { useState } from 'react';
import toast from 'react-hot-toast';
import { MdArrowForwardIos } from 'react-icons/md';
import { NavLink, Outlet } from 'react-router-dom';
import Container from '../components/shared/Container';
import useAuth from '../Hook/useAuth';

const Profile = () => {
  const { logout, user } = useAuth();
  const [isAsideOpen, setIsAsideOpen] = useState(false);
  return (
    <section>
      <Container>
        <div className='flex'>
          <aside
            className={`absolute z-50 h-screen w-[300px] border-x bg-white transition-all md:relative md:z-auto ${isAsideOpen ? 'left-0' : 'left-[-19rem] md:left-0'}`}
          >
            {/* user information  */}
            <div className='relative flex items-center gap-5 p-3'>
              <MdArrowForwardIos
                onClick={() => setIsAsideOpen(!isAsideOpen)}
                className={`absolute -right-10 top-0 block h-10 w-10 bg-green-600 p-2 text-white md:hidden ${isAsideOpen ? 'rotate-180 rounded-l-full' : 'rotate-0 rounded-r-full'}`}
              />
              <img
                src={
                  user?.photoURL ??
                  'https://media.istockphoto.com/id/610003972/vector/vector-businessman-black-silhouette-isolated.jpg?s=612x612&w=0&k=20&c=Iu6j0zFZBkswfq8VLVW8XmTLLxTLM63bfvI6uXdkacM='
                }
                alt={user?.displayName ?? 'user name'}
                className='h-20 w-20 rounded-full object-cover'
              />
              <p className='grid'>
                <span className='text-xl font-medium'>
                  {user?.displayName ?? 'User Name'}
                </span>
                <span>User</span>
              </p>
            </div>
            <div className='mt-10 grid'>
              <NavLink
                onClick={() => setIsAsideOpen(false)}
                to={'/profile'}
                className='mb-2 cursor-pointer p-2 px-3 text-lg font-semibold hover:bg-neutral-100'
              >
                Profile
              </NavLink>
              <NavLink
                onClick={() => setIsAsideOpen(false)}
                to={'/profile/shipping'}
                className='mb-2 cursor-pointer p-2 px-3 text-lg font-semibold hover:bg-neutral-100'
              >
                Shipping
              </NavLink>
              <NavLink
                onClick={() => setIsAsideOpen(false)}
                to={'/profile/order'}
                className='mb-2 cursor-pointer p-2 px-3 text-lg font-semibold hover:bg-neutral-100'
              >
                Order
              </NavLink>
              <NavLink
                onClick={() => setIsAsideOpen(false)}
                to={'/profile/review'}
                className='mb-2 cursor-pointer p-2 px-3 text-lg font-semibold hover:bg-neutral-100'
              >
                Reviews
              </NavLink>
              <NavLink
                to={'/'}
                onClick={() => {
                  logout();
                  toast.success('Logout Successfully');
                  setIsAsideOpen(false);
                }}
                className='mb-2 cursor-pointer p-2 px-3 text-lg font-semibold hover:bg-neutral-100'
              >
                Log out
              </NavLink>
            </div>
          </aside>
          <div className='w-full flex-grow overflow-x-hidden p-4'>
            <Outlet />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Profile;
