type BreadcrumbType = {
  name: string;
  link: string;
};
interface BreadcrumbProps {
  breadcrumbArr: BreadcrumbType[];
}
import { GoChevronRight } from 'react-icons/go';
import { Link } from 'react-router-dom';

const Breadcrumb: React.FC<BreadcrumbProps> = ({ breadcrumbArr }) => {
  return (
    <ul className='flex flex-wrap gap-2 text-lg font-medium'>
      {breadcrumbArr.map((item, index) => (
        <li key={index}>
          <Link
            to={item.link}
            className={`flex items-center gap-3 ${index !== breadcrumbArr.length - 1 ? 'text-green-600' : 'text-black'}`}
          >
            {item.name}
            {index !== breadcrumbArr.length - 1 && <GoChevronRight />}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Breadcrumb;
