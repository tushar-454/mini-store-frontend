interface BreadcrumbProps {
  breadcrumbArr: string[];
}
import { GoChevronRight } from 'react-icons/go';

const Breadcrumb: React.FC<BreadcrumbProps> = ({ breadcrumbArr }) => {
  return (
    <ul className='mt-20 flex gap-2 text-lg font-medium'>
      {breadcrumbArr.map((item, index) => (
        <li key={index} className='flex items-center gap-3'>
          {item}
          {index !== breadcrumbArr.length - 1 && <GoChevronRight />}
        </li>
      ))}
    </ul>
  );
};

export default Breadcrumb;
