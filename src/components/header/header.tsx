'use client';

import { useCategoryQuery } from '@/api/category';
import { assets } from '@/assets/assets';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
// import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import {
  Calendar,
  ChevronDown,
  Gift,
  ImageIcon,
  Menu,
  Package,
  Search,
  ShoppingCart,
  Star,
  TrendingUp,
  X,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

// import { getDataSessionStorage } from '@/lib/utils';
// import { initCart } from '@/store/features/cart';
import { useCreateTokenMutation, useCreateUserMutation } from '@/api/auth';
import { nav_items } from '@/constant/nav_items';
import { useUserRole } from '@/hooks/use_user_role';
import {
  addLocalStorage,
  getDataSessionStorage,
  getLocalStorage,
  removeLocalStorage,
} from '@/lib/utils';
import { initCart } from '@/store/features/cart';
import { AppDispatch, RootState } from '@/store/store';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useDispatch, useSelector } from 'react-redux';
import Cart from '../cart/cart';
import { Container } from '../shared/container';

const navItems = [
  { name: 'Products', href: '/products', icon: <Gift className='mr-2 h-4 w-4' /> },
  { name: 'Top Sell', href: '/top-sell', icon: <TrendingUp className='mr-2 h-4 w-4' /> },
  { name: 'Featured', href: '/featured', icon: <Star className='mr-2 h-4 w-4' /> },
  { name: 'Upcoming', href: '/upcoming', icon: <Calendar className='mr-2 h-4 w-4' /> },
  { name: 'Gallery', href: '/gallery', icon: <ImageIcon className='mr-2 h-4 w-4' /> },
  { name: 'Track Order', href: '/track-order', icon: <Package className='mr-2 h-4 w-4' /> },
];

export function Header() {
  const { data: { data: categories } = {}, isLoading, isError } = useCategoryQuery();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();
  // const isMobile = useIsMobile();
  const [createUser] = useCreateUserMutation();
  const [createToken] = useCreateTokenMutation();
  const carts = useSelector((state: RootState) => state.cart.carts);
  const dispatch = useDispatch<AppDispatch>();
  const [cartOpen, setCartOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { data: user } = useSession();
  const role = useUserRole();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    const data = getDataSessionStorage('carts');
    dispatch(initCart(data ? data : []));
  }, [dispatch]);

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 w-full transition-all duration-300',
          isScrolled ? 'bg-white/80 shadow-sm backdrop-blur-md' : 'bg-white',
        )}
      >
        {/* Announcement bar */}
        <div className='bg-gradient-to-r from-primary to-primary/60 px-4 py-2 text-center text-sm font-medium text-white'>
          Free shipping on all orders over $50! Use code FREESHIP at checkout
        </div>
        <Container>
          <div className='px-4'>
            <div className='flex h-16 items-center justify-between'>
              {/* Logo */}
              <Link href='/' className='flex items-center space-x-2'>
                <div className='relative h-10 w-10 overflow-hidden'>
                  <Image
                    src={assets.logo1}
                    alt='Giftie Logo'
                    width={40}
                    height={40}
                    className='rounded-full object-contain'
                  />
                </div>
                <span className='hidden bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-2xl font-bold text-transparent sm:inline-block'>
                  Mini Store
                </span>
              </Link>

              {/* Desktop Navigation */}
              <nav className='hidden items-center space-x-1 lg:flex'>
                {nav_items.map((item) => (
                  <Link
                    key={item.name}
                    href={item.link}
                    className={cn(
                      'group relative rounded-full px-3 py-2 text-sm font-medium transition-colors',
                      pathname === item.link
                        ? 'text-primary'
                        : 'text-gray-700 hover:bg-primary/10 hover:text-primary',
                    )}
                  >
                    {item.name}
                    {pathname === item.link && (
                      <span className='absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-primary' />
                    )}
                  </Link>
                ))}
              </nav>

              {/* Search, Cart, and Profile */}
              <div className='flex items-center space-x-4'>
                {/* Search */}
                <div
                  className={cn(
                    'overflow-hidden transition-all duration-300',
                    isSearchOpen ? 'w-64' : 'w-0 md:w-auto',
                  )}
                >
                  <div className='relative'>
                    <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-gray-500' />
                    <Input
                      type='search'
                      placeholder='Search...'
                      className={cn(
                        'h-9 rounded-full border-0 bg-gray-100 pl-8 focus:!ring-0 md:w-64',
                        isSearchOpen ? 'opacity-100' : 'opacity-0 md:opacity-100',
                      )}
                    />
                  </div>
                </div>

                <Button
                  variant='ghost'
                  size='icon'
                  className='md:hidden'
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                >
                  {isSearchOpen ? <X className='h-5 w-5' /> : <Search className='h-5 w-5' />}
                </Button>

                {/* Cart */}
                <div className='relative'>
                  <ShoppingCart
                    onClick={() => setCartOpen(!cartOpen)}
                    size={24}
                    className='cursor-pointer'
                  />
                  <span className='absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white'>
                    {carts?.length || 0}
                  </span>
                </div>

                {/* Profile */}
                <div className=''>
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
                </div>

                {/* Mobile Menu */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant='ghost' size='icon' className='lg:hidden'>
                      <Menu className='h-5 w-5' />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side='right' className='w-[300px] sm:w-[400px]'>
                    <nav className='mt-8 flex flex-col gap-4'>
                      {navItems.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={cn(
                            'flex items-center rounded-lg px-4 py-3 text-sm font-medium transition-colors',
                            pathname === item.href
                              ? 'bg-rose-50 text-rose-600'
                              : 'text-gray-700 hover:bg-rose-50 hover:text-rose-600',
                          )}
                        >
                          {item.icon}
                          {item.name}
                        </Link>
                      ))}
                    </nav>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>

          {/* Categories bar - optional */}
          <div
            className={cn(
              'overflow-hidden border-t border-gray-100 py-2 transition-all duration-300',
              isScrolled ? 'max-h-0 py-0 opacity-0' : 'max-h-10 opacity-100',
            )}
          >
            <div className='px-4'>
              <div className='flex items-center justify-between'>
                <div className='scrollbar-hide flex items-center space-x-6 overflow-x-auto pb-2 text-sm text-gray-600'>
                  {!isLoading &&
                    !isError &&
                    Array.isArray(categories) &&
                    categories.length > 0 &&
                    categories.map((category) => (
                      <Link
                        key={category._id}
                        href={`https://mini-store-eight.vercel.app/products?category=${category.name}`}
                        className='whitespace-nowrap transition-colors hover:text-primary'
                      >
                        {category.name || 'Category Name'}
                      </Link>
                    ))}
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant='ghost' size='sm' className='text-sm'>
                      More <ChevronDown className='ml-1 h-4 w-4' />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Baby Shower</DropdownMenuItem>
                    <DropdownMenuItem>Housewarming</DropdownMenuItem>
                    <DropdownMenuItem>Retirement</DropdownMenuItem>
                    <DropdownMenuItem>Get Well</DropdownMenuItem>
                    <DropdownMenuItem>Thank You</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </Container>
      </header>
      <Cart cartOpen={cartOpen} setCartOpen={setCartOpen} />
    </>
  );
}
