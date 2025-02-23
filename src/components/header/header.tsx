'use client';

import { assets } from '@/assets/assets';
import { nav_items } from '@/constant/nav_items';
// import { getDataSessionStorage } from '@/lib/utils';
// import { initCart } from '@/store/features/cart';
import { useCreateTokenMutation, useCreateUserMutation } from '@/api/auth';
import { useUserRole } from '@/hooks/use_user_role';
import {
  addLocalStorage,
  getDataSessionStorage,
  getLocalStorage,
  removeLocalStorage,
} from '@/lib/utils';
import { initCart } from '@/store/features/cart';
import { setOpenFilter } from '@/store/features/globalReducer';
import { AppDispatch, RootState } from '@/store/store';
import { MenuIcon, Plus, Search, ShoppingCart } from 'lucide-react';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cart from '../cart/cart';
import { Container } from '../shared/container';
import { Button } from '../ui/button';
import Gradient from '../ui/gradient';

const Header = () => {
  const [createUser] = useCreateUserMutation();
  const [createToken] = useCreateTokenMutation();
  const carts = useSelector((state: RootState) => state.cart.carts);
  const dispatch = useDispatch<AppDispatch>();
  const [cartOpen, setCartOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const [loading, setLoading] = useState(false);
  const { data: user } = useSession();
  const role = useUserRole();

  useEffect(() => {
    const createUserAndToken = async () => {
      if (user) {
        await createToken({
          email: user?.user?.email,
        });
        await createUser({
          name: user?.user?.name,
          email: user?.user?.email,
          photo: user?.user?.image,
        });
        addLocalStorage('isLogin', true);
      }
    };
    if (getLocalStorage('isLogin') === null) {
      createUserAndToken();
    }
  }, [user, createToken, createUser]);

  useEffect(() => {
    // const head = headerRef.current;
    // document.addEventListener('scrollend', () => {
    //   if (head && window.scrollY > 80) {
    //     head.classList.add('sticky_animation');
    //   }
    //   if (head && window.scrollY === 0) {
    //     head.classList.remove('sticky_animation');
    //   }
    // });
    const data = getDataSessionStorage('carts');
    dispatch(initCart(data ? data : []));
    // return () => {
    //   document.removeEventListener('scrollend', () => {
    //     if (head && window.scrollY > 90) {
    //       console.log(head);
    //     }
    //   });
    // };
  }, [dispatch]);

  return (
    <>
      <header className='border-b bg-white py-3' ref={headerRef}>
        <Container>
          <nav className='flex items-center justify-between'>
            <Link href='/'>
              <Image
                src={assets.logo}
                alt='logo'
                width={100}
                height={100}
                className='max-w-16 cursor-pointer rounded-full shadow-lg'
              />
            </Link>
            <div
              className={`min-h-auto absolute left-0 top-[5.5rem] z-[999999] flex w-full origin-top justify-start border-y-2 bg-white/80 p-5 backdrop-blur transition-all lg:static lg:z-auto lg:scale-y-100 lg:justify-center lg:border-0 lg:bg-transparent ${showMenu ? 'nav_animation' : 'scale-y-0'}`}
            >
              <ul className='flex flex-col items-start gap-8 lg:flex-row lg:items-center'>
                {nav_items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.name}>
                      <Link
                        href={item.link}
                        className='whitespace-nowrap hover:text-gray-500'
                        onClick={() => setShowMenu(false)}
                      >
                        <span className='flex items-center justify-center gap-2'>
                          <Icon />
                          <Gradient>{item.name}</Gradient>
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className='flex items-center gap-6'>
              {user ? (
                <Link
                  href={role === 'user' ? '/' : role === 'admin' ? '/dashboard' : '/'}
                  onClick={
                    role === 'user'
                      ? () => {
                          signOut();
                          removeLocalStorage('isLogin');
                        }
                      : () => {}
                  }
                >
                  <Image
                    src={user.user?.image || assets.DEFAULT_AVATAR}
                    alt={`${user.user?.name} user_image`}
                    width={50}
                    height={50}
                    className='size-10 min-w-10 cursor-pointer rounded-full object-cover'
                  />
                </Link>
              ) : (
                <Button
                  variant={'secondary'}
                  onClick={() => {
                    setLoading(true);
                    signIn('google');
                  }}
                  disabled={loading && !user ? true : false}
                >
                  {loading ? (
                    <>
                      <svg
                        className='h-5 w-5 animate-spin text-black'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                      >
                        <circle
                          className='opacity-25'
                          cx='12'
                          cy='12'
                          r='10'
                          stroke='currentColor'
                          strokeWidth='4'
                        ></circle>
                        <path
                          className='opacity-75'
                          fill='currentColor'
                          d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z'
                        ></path>
                      </svg>
                    </>
                  ) : (
                    <>
                      <span>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          version='1.1'
                          xmlnsXlink='http://www.w3.org/1999/xlink'
                          width='512'
                          height='512'
                          x='0'
                          y='0'
                          viewBox='0 0 512 512'
                          xmlSpace='preserve'
                        >
                          <g>
                            <path
                              d='M113.47 309.408 95.648 375.94l-65.139 1.378C11.042 341.211 0 299.9 0 256c0-42.451 10.324-82.483 28.624-117.732h.014L86.63 148.9l25.404 57.644c-5.317 15.501-8.215 32.141-8.215 49.456.002 18.792 3.406 36.797 9.651 53.408z'
                              fill='#fbbb00'
                              data-original='#fbbb00'
                            ></path>
                            <path
                              d='M507.527 208.176C510.467 223.662 512 239.655 512 256c0 18.328-1.927 36.206-5.598 53.451-12.462 58.683-45.025 109.925-90.134 146.187l-.014-.014-73.044-3.727-10.338-64.535c29.932-17.554 53.324-45.025 65.646-77.911h-136.89V208.176h245.899z'
                              fill='#518ef8'
                              data-original='#518ef8'
                            ></path>
                            <path
                              d='m416.253 455.624.014.014C372.396 490.901 316.666 512 256 512c-97.491 0-182.252-54.491-225.491-134.681l82.961-67.91c21.619 57.698 77.278 98.771 142.53 98.771 28.047 0 54.323-7.582 76.87-20.818l83.383 68.262z'
                              fill='#28b446'
                              data-original='#28b446'
                            ></path>
                            <path
                              d='m419.404 58.936-82.933 67.896C313.136 112.246 285.552 103.82 256 103.82c-66.729 0-123.429 42.957-143.965 102.724l-83.397-68.276h-.014C71.23 56.123 157.06 0 256 0c62.115 0 119.068 22.126 163.404 58.936z'
                              fill='#f14336'
                              data-original='#f14336'
                            ></path>
                          </g>
                        </svg>
                      </span>
                      <span>Google</span>
                    </>
                  )}
                </Button>
              )}
              {/* search filter icon  */}
              <span className='block cursor-pointer lg:hidden'>
                <Search onClick={() => dispatch(setOpenFilter(true))} />
              </span>
              {/* cart icon */}
              <span className='relative cursor-pointer'>
                <ShoppingCart onClick={() => setCartOpen(!cartOpen)} />
                <small className='absolute -right-2 -top-2 grid h-4 w-4 place-content-center rounded-full bg-red-500 text-[9px] text-white'>
                  {carts?.length || 0}
                </small>
              </span>
              <span className='cursor-pointer lg:hidden' onClick={() => setShowMenu(!showMenu)}>
                {showMenu ? <Plus className='rotate-45' /> : <MenuIcon />}
              </span>
            </div>
          </nav>
        </Container>
      </header>
      <Cart cartOpen={cartOpen} setCartOpen={setCartOpen} />
    </>
  );
};

export { Header };
