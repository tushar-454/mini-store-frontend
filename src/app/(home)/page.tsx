import { Carousel } from '@/components/carousel/carousel';
import { Category } from '@/components/category/category';
import CountdownTimer from '@/components/countdown-timer/countdown-timer';
import FAQSection from '@/components/faq-section/faq-section';
import { Featured } from '@/components/featured/featured';
import { Gallery } from '@/components/gallery/gallery';
import NewsletterSignup from '@/components/newsletter-signup/newsletter-signup';
import { Reviews } from '@/components/reviews/reviews';
import { TopSelling } from '@/components/top_selling/top_selling';
import TrustBadges from '@/components/trust-badges/trust-badges';
import { Upcoming } from '@/components/upcoming/upcoming';
import WhyChooseUs from '@/components/why-choose-us/why-choose-us';

const Home = () => {
  return (
    <main className=''>
      <Carousel />
      <span className='my-24 block'></span>
      <Category />
      <span className='my-24 block'></span>
      <TopSelling />
      <span className='my-24 block'></span>
      <Featured />
      <span className='my-24 block'></span>
      <Upcoming />
      <span className='my-24 block'></span>
      <Gallery />
      <span className='my-24 block'></span>
      <Reviews />
      <span className='my-24 block'></span>
      <WhyChooseUs />
      <span className='my-24 block'></span>
      <TrustBadges />
      <span className='my-24 block'></span>
      <CountdownTimer targetDate={new Date('4/20/2025')} />
      <span className='my-24 block'></span>
      <FAQSection />
      <span className='my-24 block'></span>
      <NewsletterSignup />
    </main>
  );
};

export default Home;
