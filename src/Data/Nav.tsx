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
    name: 'Shoes',
    dropdown: [
      {
        dropdownName: 'Men Shoes',
        link: '/product/filter',
      },
      {
        dropdownName: 'Men Boots',
        link: '/product/filter',
      },
      {
        dropdownName: 'Ladies Shoes',
        link: '/product/filter',
      },
      {
        dropdownName: 'Ladies Boots',
        link: '/product/filter',
      },
      {
        dropdownName: 'Sandles',
        link: '/product/filter',
      },
      {
        dropdownName: 'Runnign Shoes',
        link: '/product/filter',
      },
      {
        dropdownName: 'Gym Shoes',
        link: '/product/filter',
      },
      {
        dropdownName: 'Casual Shoes',
        link: '/product/filter',
      },
      {
        dropdownName: 'Sports Shoes',
        link: '/product/filter',
      },
      {
        dropdownName: 'Baby Shoes',
        link: '/product/filter',
      },
      {
        dropdownName: 'Rain Shoes',
        link: '/product/filter',
      },
    ],
  },
  {
    name: 'Bags',
    dropdown: [
      {
        dropdownName: 'Ladies Purse',
        link: '/product/filter',
      },
      {
        dropdownName: 'Ladies Bag',
        link: '/product/filter',
      },
      {
        dropdownName: 'Backpack',
        link: '/product/filter',
      },
      {
        dropdownName: 'Laptop Bag',
        link: '/product/filter',
      },
      {
        dropdownName: 'Hand Bag',
        link: '/product/filter',
      },
    ],
  },
  {
    name: "Men's",
    dropdown: [
      {
        dropdownName: 'Pants casual for Men',
        link: '/product/filter',
      },
      {
        dropdownName: 'Men Jeans Pant',
        link: '/product/filter',
      },
      {
        dropdownName: 'Men Suit',
        link: '/product/filter',
      },
      {
        dropdownName: 'Winter Pajamas',
        link: '/product/filter',
      },
      {
        dropdownName: 'Shirts',
        link: '/product/filter',
      },
      {
        dropdownName: 'Tie Clips',
        link: '/product/filter',
      },
      {
        dropdownName: 'Mens Sweater',
        link: '/product/filter',
      },
      {
        dropdownName: 'Socks',
        link: '/product/filter',
      },
      {
        dropdownName: 'Formal Tie',
        link: '/product/filter',
      },
    ],
  },
  {
    name: "Women's",
    dropdown: [
      {
        dropdownName: 'Women Sets',
        link: '/product/filter',
      },
      {
        dropdownName: 'Women Suits Blazers',
        link: '/product/filter',
      },
      {
        dropdownName: 'Women Bodysuits',
        link: '/product/filter',
      },
      {
        dropdownName: 'Swimwear',
        link: '/product/filter',
      },
      {
        dropdownName: 'Skirts',
        link: '/product/filter',
      },
      {
        dropdownName: 'Women Jeans',
        link: '/product/filter',
      },
      {
        dropdownName: 'Event Dresses',
        link: '/product/filter',
      },
      {
        dropdownName: 'Wedding Dresses',
        link: '/product/filter',
      },
      {
        dropdownName: 'Female Belt',
        link: '/product/filter',
      },
    ],
  },
  {
    name: 'Watches',
    dropdown: [
      {
        dropdownName: 'Male Watches',
        link: '/product/filter',
      },
      {
        dropdownName: 'Simple Watches',
        link: '/product/filter',
      },
      {
        dropdownName: 'Smart Watches',
        link: '/product/filter',
      },
      {
        dropdownName: 'Branded Watches',
        link: '/product/filter',
      },
      {
        dropdownName: 'Apple Waches',
        link: '/product/filter',
      },
      {
        dropdownName: 'Smart Band Fit',
        link: '/product/filter',
      },
    ],
  },
  {
    name: 'Jewelry',
    dropdown: [
      {
        dropdownName: 'Women Earring',
        link: '/product/filter',
      },
      {
        dropdownName: 'Women Necklaces',
        link: '/product/filter',
      },
      {
        dropdownName: 'Ring',
        link: '/product/filter',
      },
    ],
  },
];

export default nav;
