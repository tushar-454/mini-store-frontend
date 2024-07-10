import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
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
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
              perferendis, nemo ipsa maxime officiis est temporibus odit
              mollitia? Architecto, praesentium.
            </p>
            {/* social Icons */}
            <div className='flex gap-2'>
              <FaFacebook className='mr-4 text-2xl' />
              <FaYoutube className='mr-4 text-2xl' />
              <FaInstagram className='mr-4 text-2xl' />
              <FaTwitter className='mr-4 text-2xl' />
            </div>
          </div>
          {/* Helpful link  */}
          <div className='lg:justify-self-end'>
            <p className='mb-4 text-lg font-semibold'>Helpful Links</p>
            <ul className='space-y-2'>
              <li>FAQ</li>
              <li>Common issues</li>
              <li>Shipping</li>
            </ul>
          </div>
          {/* COmpany link  */}
          <div className='lg:justify-self-end'>
            <p className='mb-4 text-lg font-semibold'>Company Links</p>
            <ul className='space-y-2'>
              <li>Our Story</li>
              <li>Corporate Gifting</li>
              <li>Contact Us</li>
            </ul>
          </div>
          {/* Compilance link  */}
          <div className='lg:justify-self-end'>
            <p className='mb-4 text-lg font-semibold'>Compilance Links</p>
            <ul className='space-y-2'>
              <li>Accessibility Statement</li>
              <li>Privacy Policy</li>
              <li>Terms and Condition</li>
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
