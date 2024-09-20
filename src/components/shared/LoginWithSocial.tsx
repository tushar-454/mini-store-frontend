interface LoginWithSocialProps {
  loginWithGoogle: () => void;
}

import toast from 'react-hot-toast';
import { FaFacebook, FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import axios from '../../utils/axios';

const LoginWithSocial: React.FC<LoginWithSocialProps> = ({
  loginWithGoogle,
}) => {
  const navigate = useNavigate();

  // Handle login with google
  const handleLoginWithGoogle = async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const res: any = await loginWithGoogle();
      if (res !== undefined && 'user' in res) {
        const newUser = {
          name: res?.user?.displayName,
          email: res?.user?.email,
          phone: Math.floor(Math.random() * 100000000000),
          address: 'address',
          city: 'city',
          area: 'area',
        };
        // craete a new user save it to the database
        axios.post(`/users/one`, newUser);
        await axios.post(`/token/create`, { email: res?.user?.email });
        toast.success('Login Successfully');
        navigate('/');
      }
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : 'Login Failed');
    }
  };

  return (
    <div className='mb-5 mt-10 grid gap-3'>
      <div
        onClick={handleLoginWithGoogle}
        className='flex cursor-pointer items-center gap-3 rounded-full border p-3 transition-all hover:bg-neutral-100'
      >
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
  );
};

export default LoginWithSocial;
