export type DealsAndOfferProductType = {
  _id: string;
  name: string;
  image: string;
  price: number;
  discount: number;
};

const DealsAndOffer: DealsAndOfferProductType[] = [
  {
    _id: '09534783475890808968',
    name: 'Hand Bag',
    image:
      'https://static-01.daraz.com.bd/p/d64a3d50a2df4ae391cdade5aee26b04.jpg_750x400.jpg_.webp',
    price: 320,
    discount: 20,
  },
  {
    _id: '345345345856098645656',
    name: 'Men Boots',
    image:
      'https://cbu01.alicdn.com/img/ibank/O1CN01RXRkqE1mY1KOxzogG_!!2912524965-0-cib.310x310.jpg',
    price: 250,
    discount: 10,
  },
  {
    _id: '34534533503475345656',
    name: 'Ladies Watch',
    image:
      'https://cbu01.alicdn.com/img/ibank/O1CN01OnZArh1NjaooybwYx_!!2357281606-0-cib.310x310.jpg',
    price: 150,
    discount: 15,
  },
  {
    _id: '3453434463454775656',
    name: 'Necklace',
    image:
      'https://cbu01.alicdn.com/img/ibank/9515396411_1651542055.310x310.jpg',
    price: 500,
    discount: 25,
  },
  {
    _id: '3453434463658907756',
    name: 'Cashmere Jacket',
    image:
      'https://cbu01.alicdn.com/img/ibank/O1CN018HcrIr1qTDRNRJdFT_!!2207804645496-0-cib.310x310.jpg',
    price: 400,
    discount: 18,
  },
];

export default DealsAndOffer;
