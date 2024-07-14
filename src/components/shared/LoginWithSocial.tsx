interface LoginWithSocialProps {
  loginWithGoogle: () => void;
}

import { FaFacebook, FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
const LoginWithSocial: React.FC<LoginWithSocialProps> = ({
  loginWithGoogle,
}) => {
  return (
    <div className='mb-5 mt-10 grid gap-3'>
      <div
        onClick={loginWithGoogle}
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
