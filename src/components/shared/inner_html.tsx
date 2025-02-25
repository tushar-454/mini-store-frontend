'use client';
import DOMPurify from 'dompurify';

type InnerHTMLProps = {
  content: string;
};

const InnerHTML = ({ content }: InnerHTMLProps) => {
  const cleanContent = DOMPurify.sanitize(content);
  return <div className='inner-html-wrapper' dangerouslySetInnerHTML={{ __html: cleanContent }} />;
};
export { InnerHTML };
