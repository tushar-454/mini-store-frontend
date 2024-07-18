export type productType = {
  _id: number;
  name: string;
  image: {
    main: string;
    gallery: string[];
  };
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
        _id: 1,
        image: {
          main: 'https://i.ibb.co/0s3pdnc/1.jpg',
          gallery: [''],
        },
        name: 'Men T-shirt',
        price: 25,
        discount: 20,
      },
      {
        _id: 1,
        image: {
          main: 'https://i.ibb.co/0s3pdnc/1.jpg',
          gallery: [''],
        },
        name: 'Men T-shirt',
        price: 25,
        discount: 20,
      },
      {
        _id: 1,
        image: {
          main: 'https://i.ibb.co/0s3pdnc/1.jpg',
          gallery: [''],
        },
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
        _id: 1,
        image: {
          main: 'https://i.ibb.co/0s3pdnc/2.jpg',
          gallery: [''],
        },
        name: 'Women Pant',
        price: 25,
        discount: 20,
      },
      {
        _id: 1,
        image: {
          main: 'https://i.ibb.co/0s3pdnc/2.jpg',
          gallery: [''],
        },
        name: 'Women Pant',
        price: 25,
        discount: 20,
      },
      {
        _id: 1,
        image: {
          main: 'https://i.ibb.co/0s3pdnc/2.jpg',
          gallery: [''],
        },
        name: 'Women Pant',
        price: 25,
        discount: 20,
      },
      {
        _id: 1,
        image: {
          main: 'https://i.ibb.co/0s3pdnc/2.jpg',
          gallery: [''],
        },
        name: 'Women Pant',
        price: 25,
        discount: 20,
      },
      {
        _id: 1,
        image: {
          main: 'https://i.ibb.co/0s3pdnc/2.jpg',
          gallery: [''],
        },
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
        _id: 1,
        image: {
          main: 'https://i.ibb.co/0s3pdnc/3.jpg',
          gallery: [''],
        },
        name: 'Children Shoes',
        price: 25,
        discount: 20,
      },
      {
        _id: 1,
        image: {
          main: 'https://i.ibb.co/0s3pdnc/3.jpg',
          gallery: [''],
        },
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
        _id: 1,
        image: {
          main: 'https://i.ibb.co/0s3pdnc/4.jpg',
          gallery: [''],
        },
        name: 'Football',
        price: 25,
        discount: 20,
      },
      {
        _id: 1,
        image: {
          main: 'https://i.ibb.co/0s3pdnc/4.jpg',
          gallery: [''],
        },
        name: 'Football',
        price: 25,
        discount: 20,
      },
      {
        _id: 1,
        image: {
          main: 'https://i.ibb.co/0s3pdnc/4.jpg',
          gallery: [''],
        },
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
        _id: 1,
        image: {
          main: 'https://i.ibb.co/0s3pdnc/5.jpg',
          gallery: [''],
        },
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
        _id: 1,
        image: {
          main: 'https://i.ibb.co/0s3pdnc/6.jpg',
          gallery: [''],
        },
        name: 'Calculator',
        price: 25,
        discount: 20,
      },
    ],
  },
];

export default FeaturedProductsArr;
