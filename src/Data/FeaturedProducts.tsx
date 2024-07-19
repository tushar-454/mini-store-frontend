export type productType = {
  name: string;
  image: string;
  price: number;
  discount: number;
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
        image: 'https://i.ibb.co/0s3pdnc/1.jpg',
        name: 'Men T-shirt',
        price: 25,
        discount: 20,
      },
      {
        image: 'https://i.ibb.co/0s3pdnc/1.jpg',
        name: 'Men T-shirt',
        price: 25,
        discount: 20,
      },
      {
        image: 'https://i.ibb.co/0s3pdnc/1.jpg',
        name: 'Men T-shirt',
        price: 25,
        discount: 20,
      },
    ],
  },
  {
    id: 1,
    category: 'Women',
    products: [
      {
        image: 'https://i.ibb.co/0s3pdnc/2.jpg',
        name: 'Women Pant',
        price: 25,
        discount: 20,
      },
      {
        image: 'https://i.ibb.co/0s3pdnc/2.jpg',
        name: 'Women Pant',
        price: 25,
        discount: 20,
      },
      {
        image: 'https://i.ibb.co/0s3pdnc/2.jpg',
        name: 'Women Pant',
        price: 25,
        discount: 20,
      },
      {
        image: 'https://i.ibb.co/0s3pdnc/2.jpg',
        name: 'Women Pant',
        price: 25,
        discount: 20,
      },
      {
        image: 'https://i.ibb.co/0s3pdnc/2.jpg',
        name: 'Women Pant',
        price: 25,
        discount: 20,
      },
    ],
  },
  {
    id: 2,
    category: 'Children',
    products: [
      {
        image: 'https://i.ibb.co/0s3pdnc/3.jpg',
        name: 'Children Shoes',
        price: 25,
        discount: 20,
      },
      {
        image: 'https://i.ibb.co/0s3pdnc/3.jpg',
        name: 'Children Shoes',
        price: 25,
        discount: 20,
      },
    ],
  },
  {
    id: 3,
    category: 'Sports',
    products: [
      {
        image: 'https://i.ibb.co/0s3pdnc/4.jpg',
        name: 'Football',
        price: 25,
        discount: 20,
      },
      {
        image: 'https://i.ibb.co/0s3pdnc/4.jpg',
        name: 'Football',
        price: 25,
        discount: 20,
      },
      {
        image: 'https://i.ibb.co/0s3pdnc/4.jpg',
        name: 'Football',
        price: 25,
        discount: 20,
      },
    ],
  },
  {
    id: 4,
    category: 'Travel',
    products: [
      {
        image: 'https://i.ibb.co/0s3pdnc/5.jpg',
        name: 'Camera',
        price: 25,
        discount: 20,
      },
    ],
  },
  {
    id: 5,
    category: 'Electronics',
    products: [
      {
        image: 'https://i.ibb.co/0s3pdnc/6.jpg',
        name: 'Calculator',
        price: 25,
        discount: 20,
      },
    ],
  },
];

export default FeaturedProductsArr;
