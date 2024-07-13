export type ProductType = {
  name: string;
  image: string;
  link: string;
};

const ProductsCategoryArr: ProductType[] = [
  {
    name: 'Men',
    image:
      'https://t3.ftcdn.net/jpg/03/28/19/46/360_F_328194664_RKSHvMLgHphnD1nwQYb4QKcNeEApJmqa.jpg',
    link: '/product/filter',
  },
  {
    name: 'Women',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Woman_at_Lover%27s_Bridge_Tanjung_Sepat_%28cropped%29.jpg/1200px-Woman_at_Lover%27s_Bridge_Tanjung_Sepat_%28cropped%29.jpg',
    link: '/product/filter',
  },
  {
    name: 'Children',
    image:
      'https://childcare.gov/sites/default/files/inline-images/Picture11.jpg',
    link: '/product/filter',
  },
  {
    name: 'Fairy Lights',
    image:
      'https://static-01.daraz.com.bd/p/192e92513c8f6b00c5ef45b5eaf1f1f9.jpg',
    link: '/product/filter',
  },
  {
    name: 'Cloth & Towel',
    image:
      'https://static-01.daraz.com.bd/p/7b2b1e15f434fb48e0bb32557908cf11.jpg',
    link: '/product/filter',
  },
];

export default ProductsCategoryArr;
