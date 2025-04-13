import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function FAQSection() {
  const faqs = [
    {
      question: 'How long does shipping take?',
      answer:
        'Standard shipping typically takes 3-5 business days within the continental US. Express shipping options are available at checkout for 1-2 business day delivery.',
    },
    {
      question: 'What is your return policy?',
      answer:
        'We offer a 30-day return policy for most items. Products must be in their original condition with tags attached. Some products like intimate apparel and personalized items cannot be returned.',
    },
    {
      question: 'Do you ship internationally?',
      answer:
        'Yes, we ship to most countries worldwide. International shipping times vary between 7-21 business days depending on the destination and customs processing.',
    },
    {
      question: 'How can I track my order?',
      answer:
        "Once your order ships, you'll receive a confirmation email with tracking information. You can also track your order by logging into your account on our website.",
    },
    {
      question: 'Are my payment details secure?',
      answer:
        'Absolutely. We use industry-standard encryption and secure payment processors to ensure your payment information is always protected.',
    },
    {
      question: 'Do you offer size exchanges?',
      answer:
        "Yes, we offer free size exchanges on most clothing items. Simply initiate a return and select 'exchange' as the reason, then place a new order for the desired size.",
    },
  ];

  return (
    <section className='bg-white py-16'>
      <div className='container mx-auto px-4'>
        <div className='mb-12 text-center'>
          <h2 className='mb-4 text-3xl font-bold tracking-tight'>Frequently Asked Questions</h2>
          <p className='mx-auto max-w-2xl text-muted-foreground'>
            Find answers to common questions about our products, shipping, returns, and more.
          </p>
        </div>

        <div className='mx-auto max-w-3xl'>
          <Accordion type='single' collapsible className='w-full'>
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className='text-left'>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className='mt-8 text-center'>
            <p className='text-muted-foreground'>
              Still have questions?{' '}
              <a href='/contact' className='font-medium text-emerald-600 hover:text-emerald-500'>
                Contact our support team
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
