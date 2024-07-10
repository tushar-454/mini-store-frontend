import logo from '../../assets/logo.webp';

const Logo = () => {
  return (
    <div className='flex items-center gap-2'>
      <img src={logo} alt='mini store logo' className='w-20' />
      <span className='text-3xl font-black text-green-600'>MS</span>
    </div>
  );
};

export default Logo;
