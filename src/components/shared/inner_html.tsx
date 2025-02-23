type InnerHTMLProps = {
  content: string;
};

const InnerHTML = ({ content }: InnerHTMLProps) => {
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
};
export { InnerHTML };
