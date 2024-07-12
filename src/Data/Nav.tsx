export type dropdownType = {
  dropdownName: string;
  link: string;
};

export type NavType = {
  name: string;
  link?: string;
  dropdown?: dropdownType[];
};

const nav: NavType[] = [
  {
    name: 'Men',
    dropdown: [
      {
        dropdownName: 'Clothing',
        link: '/product/filter',
      },
      {
        dropdownName: 'Shoes',
        link: '/product/filter',
      },
      {
        dropdownName: 'Pants',
        link: '/product/filter',
      },
      {
        dropdownName: 'T-Shirts',
        link: '/product/filter',
      },
    ],
  },
  {
    name: 'Women',
    link: '/product/filter',
  },
  {
    name: 'Accessories',
    link: '/product/filter',
  },
  {
    name: ' Blog & Travel',
    link: '/product/filter',
  },
  {
    name: 'Electronic',
    dropdown: [
      {
        dropdownName: 'Mobile',
        link: '/product/filter',
      },
      {
        dropdownName: 'Laptop',
        link: '/product/filter',
      },
      {
        dropdownName: 'Camera',
        link: '/product/filter',
      },
      {
        dropdownName: 'Headphone',
        link: '/product/filter',
      },
    ],
  },
];

export default nav;
