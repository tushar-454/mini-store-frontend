import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import sslCommerz from '../../assets/ssl_logoss.webp';
import Logo from '../header/Logo';
import Container from '../shared/Container';

const Footer = () => {
  return (
    <footer className='bg-green-900 text-white'>
      <Container>
        {/* wrapper  */}
        <div className='grid gap-10 pt-20 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {/* logo and social media links  */}
          <div className='space-y-4'>
            <Logo />
            <p>
              Sure! Here's a 20-word paragraph for your footer section:
              "Discover unbeatable prices and quality products at our Mini
              Store. Shop with us for great deals and exceptional service.
            </p>
            {/* social Icons */}
            <div className='flex gap-2'>
              <Link to={'/'}>
                <FaFacebook className='mr-4 text-2xl' />
              </Link>
              <Link to={'/'}>
                <FaYoutube className='mr-4 text-2xl' />
              </Link>
              <Link to={'/'}>
                <FaInstagram className='mr-4 text-2xl' />
              </Link>
              <Link to={'/'}>
                <FaTwitter className='mr-4 text-2xl' />
              </Link>
            </div>
          </div>
          {/* Helpful link  */}
          <div className='lg:justify-self-end'>
            <p className='mb-4 text-lg font-semibold'>Helpful Links</p>
            <ul className='space-y-2'>
              <li>
                <Link to={'/'}>FAQ</Link>
              </li>
              <li>
                <Link to={'/'}>Common issues</Link>
              </li>
              <li>
                <Link to={'/'}>Shipping</Link>
              </li>
            </ul>
          </div>
          {/* COmpany link  */}
          <div className='lg:justify-self-end'>
            <p className='mb-4 text-lg font-semibold'>Company Links</p>
            <ul className='space-y-2'>
              <li>
                <Link to={'/'}>Our Story</Link>
              </li>
              <li>
                <Link to={'/'}>Corporate Gifting</Link>
              </li>
              <li>
                <Link to={'/'}>Contact Us</Link>
              </li>
            </ul>
          </div>
          {/* Compilance link  */}
          <div className='lg:justify-self-end'>
            <p className='mb-4 text-lg font-semibold'>Compilance Links</p>
            <ul className='space-y-2'>
              <li>
                <Link to={'/'}>Accessibility Statement</Link>
              </li>
              <li>
                <Link to={'/'}>Privacy Policy</Link>
              </li>
              <li>
                <Link to={'/'}>Terms and Condition</Link>
              </li>
            </ul>
          </div>
        </div>
        {/* payment method and copyright  */}
        <div>
          <div className='grid place-items-center py-10'>
            <img src={sslCommerz} alt='' />
          </div>
        </div>
      </Container>
      <p className='border-t border-white px-2 py-5 text-center'>
        &copy; 2024 All rights reserved. Developed by MS
      </p>
    </footer>
  );
};

export default Footer;
