import { FaFacebook, FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import Logo from '../components/header/Logo';
import Container from '../components/shared/Container';

const Login = () => {
  return (
    <section>
      <Container>
        {/* wrapper  */}
        <div className='grid h-screen place-items-center'>
          <div className='rounded-lg border p-5 sm:w-[560px]'>
            <div className='mb-8 grid place-items-center space-y-4'>
              <Logo />
              <h1 className='text-center text-3xl font-bold'>Login</h1>
            </div>
            {/* login form inputs */}
            <form className='space-y-4'>
              <div className='grid gap-2'>
                <label htmlFor='email' className='font-bold'>
                  Email
                </label>
                <input
                  type='email'
                  id='email'
                  className='primaryInput'
                  placeholder='example@yhaoo.com'
                />
              </div>
              <div className='grid gap-2'>
                <label htmlFor='password' className='font-bold'>
                  Password
                </label>
                <input
                  type='password'
                  id='password'
                  className='primaryInput'
                  placeholder='f9*&%&5'
                />
              </div>
              <button type='submit' className='primaryBtn'>
                Login
              </button>
            </form>
            {/* login with social media */}
            <div className='mb-5 mt-10 grid gap-3'>
              <div className='flex cursor-pointer items-center gap-3 rounded-full border p-3 transition-all hover:bg-neutral-100'>
                <FcGoogle className='text-2xl' />
                <p className='text-lg'>Continou with Google</p>
              </div>
              <div className='flex cursor-pointer items-center gap-3 rounded-full border p-3 transition-all hover:bg-neutral-100'>
                <FaFacebook className='text-2xl text-blue-600' />
                <p className='text-lg'>Continoue with Facebook</p>
              </div>
              <div className='flex cursor-pointer items-center gap-3 rounded-full border p-3 transition-all hover:bg-neutral-100'>
                <FaGithub className='text-2xl' />
                <p className='text-lg'>Continoue with GitHub</p>
              </div>
            </div>
            <p className='text-center'>
              Don't Have account.{' '}
              <Link to={'/signup'} className='text-orange-600 hover:underline'>
                Signup
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Login;
