export type productType = {
  img: string;
  title: string;
  price: number;
  salePrice: number;
};

export type FeaturedProductsType = {
  id?: number;
  category: string;
  products: productType[];
};

const FeaturedProductsArr: FeaturedProductsType[] = [
  {
    id: 0,
    category: 'Men',
    products: [
      {
        img: 'https://i.ibb.co/0s3pdnc/1.jpg',
        title: 'Men T-shirt',
        price: 25,
        salePrice: 20,
      },
      {
        img: 'https://i.ibb.co/0s3pdnc/1.jpg',
        title: 'Men T-shirt',
        price: 25,
        salePrice: 20,
      },
      {
        img: 'https://i.ibb.co/0s3pdnc/1.jpg',
        title: 'Men T-shirt',
        price: 25,
        salePrice: 20,
      },
    ],
  },
  {
    id: 1,
    category: 'Women',
    products: [
      {
        img: 'https://i.ibb.co/0s3pdnc/2.jpg',
        title: 'Women Pant',
        price: 25,
        salePrice: 20,
      },
      {
        img: 'https://i.ibb.co/0s3pdnc/2.jpg',
        title: 'Women Pant',
        price: 25,
        salePrice: 20,
      },
      {
        img: 'https://i.ibb.co/0s3pdnc/2.jpg',
        title: 'Women Pant',
        price: 25,
        salePrice: 20,
      },
      {
        img: 'https://i.ibb.co/0s3pdnc/2.jpg',
        title: 'Women Pant',
        price: 25,
        salePrice: 20,
      },
      {
        img: 'https://i.ibb.co/0s3pdnc/2.jpg',
        title: 'Women Pant',
        price: 25,
        salePrice: 20,
      },
    ],
  },
  {
    id: 2,
    category: 'Children',
    products: [
      {
        img: 'https://i.ibb.co/0s3pdnc/3.jpg',
        title: 'Children Shoes',
        price: 25,
        salePrice: 20,
      },
      {
        img: 'https://i.ibb.co/0s3pdnc/3.jpg',
        title: 'Children Shoes',
        price: 25,
        salePrice: 20,
      },
    ],
  },
  {
    id: 3,
    category: 'Sports',
    products: [
      {
        img: 'https://i.ibb.co/0s3pdnc/4.jpg',
        title: 'Football',
        price: 25,
        salePrice: 20,
      },
      {
        img: 'https://i.ibb.co/0s3pdnc/4.jpg',
        title: 'Football',
        price: 25,
        salePrice: 20,
      },
      {
        img: 'https://i.ibb.co/0s3pdnc/4.jpg',
        title: 'Football',
        price: 25,
        salePrice: 20,
      },
    ],
  },
  {
    id: 4,
    category: 'Travel',
    products: [
      {
        img: 'https://i.ibb.co/0s3pdnc/5.jpg',
        title: 'Camera',
        price: 25,
        salePrice: 20,
      },
    ],
  },
  {
    id: 5,
    category: 'Electronics',
    products: [
      {
        img: 'https://i.ibb.co/0s3pdnc/6.jpg',
        title: 'Calculator',
        price: 25,
        salePrice: 20,
      },
    ],
  },
];

export default FeaturedProductsArr;
