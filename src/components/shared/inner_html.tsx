type InnerHTMLProps = {
  content: string;
};

const InnerHTML = ({ content }: InnerHTMLProps) => {
  return <div className='inner-html-wrapper' dangerouslySetInnerHTML={{ __html: content }} />;
};
export { InnerHTML };
