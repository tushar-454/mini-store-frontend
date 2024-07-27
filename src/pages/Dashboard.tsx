import { useState } from 'react';
import toast from 'react-hot-toast';
import { MdArrowForwardIos } from 'react-icons/md';
import { NavLink, Outlet } from 'react-router-dom';
import Container from '../components/shared/Container';
import useAuth from '../Hook/useAuth';

const Dashboard = () => {
  const { logout, user } = useAuth();
  const [isAsideOpen, setIsAsideOpen] = useState(false);
  return (
    <section>
      <Container>
        <div className='flex'>
          <aside
            className={`absolute z-50 h-screen w-[350px] border-x bg-white transition-all md:relative md:z-auto ${isAsideOpen ? 'left-0' : 'left-[-23rem] md:left-0'}`}
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
                  'https://cdn-icons-png.flaticon.com/512/21/21104.png'
                }
                alt={user?.displayName ?? 'user name'}
                className='h-20 w-20 rounded-full object-cover'
              />
              <p className='grid'>
                <span className='text-xl font-medium'>
                  {user?.displayName ?? 'User Name'}
                </span>
                <span>Admin</span>
              </p>
            </div>
            <div className='mt-10 grid'>
              <NavLink
                onClick={() => setIsAsideOpen(false)}
                to={'/dashboard'}
                className='mb-2 cursor-pointer p-2 px-3 text-lg font-semibold hover:bg-neutral-100'
              >
                Dashboard
              </NavLink>
              <NavLink
                onClick={() => setIsAsideOpen(false)}
                to={'/dashboard/users'}
                className='mb-2 cursor-pointer p-2 px-3 text-lg font-semibold hover:bg-neutral-100'
              >
                Users
              </NavLink>
              <NavLink
                onClick={() => setIsAsideOpen(false)}
                to={'/dashboard/products'}
                className='mb-2 cursor-pointer p-2 px-3 text-lg font-semibold hover:bg-neutral-100'
              >
                Products
              </NavLink>
              <NavLink
                onClick={() => setIsAsideOpen(false)}
                to={'/dashboard/orders'}
                className='mb-2 cursor-pointer p-2 px-3 text-lg font-semibold hover:bg-neutral-100'
              >
                Orders
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

export default Dashboard;
