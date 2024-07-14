interface LinkBtnProps {
  children: React.ReactNode;
  link: string;
}
import { Link } from 'react-router-dom';

const LinkBtn: React.FC<LinkBtnProps> = ({ link, children }) => {
  return (
    <div>
      <Link
        to={link}
        className='grid place-items-center rounded-lg bg-orange-500 px-5 py-3 font-medium text-white transition-all hover:bg-orange-600'
      >
        {children}
      </Link>
    </div>
  );
};

export default LinkBtn;
