export type ProductType = {
  name: string;
  image: string;
  link: string;
};

const ProductsCategoryArr: ProductType[] = [
  {
    name: 'Jewelry',
    image:
      'https://cbu01.alicdn.com/img/ibank/O1CN01ZX2Wzp1kGUleVZzJ1_!!3014884656-0-cib.310x310.jpg',
    link: '/product/filter',
  },
  {
    name: 'Watches',
    image:
      'https://cbu01.alicdn.com/img/ibank/17399422521_1930838555.310x310.jpg',
    link: '/product/filter',
  },

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
    name: 'Backpack',
    image:
      'https://cbu01.alicdn.com/img/ibank/21618048601_1404253929.310x310.jpg',
    link: '/product/filter',
  },
  {
    name: 'Sports Shoes',
    image:
      'https://cbu01.alicdn.com/img/ibank/16646725265_1920519508.310x310.jpg',
    link: '/product/filter',
  },
];

export default ProductsCategoryArr;
