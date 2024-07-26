export type productType = {
  _id: string;
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
    category: 'Shoes',
    products: [
      {
        _id: '432534543545234235452',
        image:
          'https://cbu01.alicdn.com/img/ibank/2018/430/437/9494734034_1371897451.jpg',
        name: 'Martens, high footwear, cloth extra large sports shoes, custom made, plus size',
        price: 1030,
        discount: 10,
      },
      {
        _id: '432534543545234235452',
        image: 'https://cbu01.alicdn.com/img/ibank/21090581154_1786367241.jpg',
        name: 'Air jordan, demi-season low footwear, basketball fashionable sports shoes for beloved suitable for men and women, 2021 collection, trend of season',
        price: 806,
        discount: 8,
      },
      {
        _id: '432534543545234235452',
        image: 'https://cbu01.alicdn.com/img/ibank/5283740945_1844439339.jpg',
        name: 'High camouflage work shoes platform',
        price: 1200,
        discount: 15,
      },
      {
        _id: '432534543545234235452',
        image:
          'https://cbu01.alicdn.com/img/ibank/2018/035/490/8669094530_1525855830.jpg',
        name: "Men's autumn casual footwear for leisure, trend sneakers, wear-resistant white shoes for elementary school students, sports shoes",
        price: 990,
        discount: 11,
      },
    ],
  },
  {
    id: 1,
    category: 'Bags',
    products: [
      {
        _id: '432534543545234235452',
        image: 'https://cbu01.alicdn.com/img/ibank/4014067416_1814993109.jpg',
        name: 'Long wallet, small clutch bag, shoulder bag with zipper, 2023 collection, Korean style',
        price: 164,
        discount: 2,
      },
      {
        _id: '432534543545234235452',
        image:
          'https://cbu01.alicdn.com/img/ibank/2019/064/626/11330626460_1285452834.jpg',
        name: 'backpack, laptop, school bag, European style',
        price: 1530,
        discount: 9,
      },
      {
        _id: '432534543545234235452',
        image: 'https://cbu01.alicdn.com/img/ibank/1895399478_1419397908.jpg',
        name: 'Cloth, long wallet, pencil case for elementary school students, roses',
        price: 180,
        discount: 2,
      },
      {
        _id: '432534543545234235452',
        image: 'https://cbu01.alicdn.com/img/ibank/9122853198_867075987.jpg',
        name: 'Sports backpack, shoulder bag, travel bag, wholesale',
        price: 920,
        discount: 6,
      },
    ],
  },
  {
    id: 2,
    category: "Men's",
    products: [
      {
        _id: '432534543545234235452',
        image:
          'https://cbu01.alicdn.com/img/ibank/O1CN01OmWGOk2J2lctiM0g6_!!1915629364-0-cib.jpg',
        name: 'Autumn trousers, loose straight fit',
        price: 1249,
        discount: 11,
      },
      {
        _id: '432534543545234235452',
        image:
          'https://cbu01.alicdn.com/img/ibank/O1CN019p4q5d1Sdhq2a60ih_!!2210046692270-0-cib.310x310.jpg',
        name: 'Breathable shirt suitable for men and women, classic suit jacket, uniform',
        price: 1200,
        discount: 9,
      },
      {
        _id: '432534543545234235452',
        image:
          'https://cbu01.alicdn.com/img/ibank/2020/028/011/17257110820_946739366.jpg',
        name: 'Summer socks, 2023, mid-length',
        price: 120,
        discount: 10,
      },
      {
        _id: '432534543545234235452',
        image:
          'https://cbu01.alicdn.com/img/ibank/O1CN012si0oW21NE4iiaV7w_!!2208681676972-0-cib.jpg',
        name: 'Set, classic suit jacket, trousers, wedding dress, 2023, Korean style',
        price: 120,
        discount: 10,
      },
    ],
  },
  {
    id: 3,
    category: "Women's",
    products: [
      {
        _id: '432534543545234235452',
        image: 'https://cbu01.alicdn.com/img/ibank/17713325510_1780468145.jpg',
        name: 'Spring fashionable shirt, trend of season, long sleeve, plus size',
        price: 1672,
        discount: 8,
      },
      {
        _id: '432534543545234235452',
        image:
          'https://cbu01.alicdn.com/img/ibank/O1CN01OaAn2J1Rb7vSYTbrA_!!3031402129-0-cib.jpg',
        name: 'Cardigan for leisure, sweater, knitted jacket with hood, hoodie, woolen shirt, wholesale, 2023',
        price: 1800,
        discount: 15,
      },
      {
        _id: '432534543545234235452',
        image:
          'https://cbu01.alicdn.com/img/ibank/2019/028/365/10930563820_1410104053.jpg',
        name: "Guangzhou clothing processing women's hair woolen coat coat to draw a small batch of OEM contractor customization",
        price: 2999,
        discount: 20,
      },
      {
        _id: '432534543545234235452',
        image:
          'https://cbu01.alicdn.com/img/ibank/O1CN01cd2cVB2HrwYw41bpA_!!2214355729205-0-cib.jpg',
        name: 'Retro autumn long skirt, high waist, mid-length, A-line',
        price: 999,
        discount: 9,
      },
    ],
  },
  {
    id: 4,
    category: 'Watches',
    products: [
      {
        _id: '432534543545234235452',
        image:
          'https://cbu01.alicdn.com/img/ibank/O1CN01TD1ts32Ma9BZPtFVJ_!!2207619389843-0-cib.jpg',
        name: "Watch, steel belt hip-hop style, men's quartz calendar, European style",
        price: 1599,
        discount: 5,
      },
      {
        _id: '432534543545234235452',
        image:
          'https://cbu01.alicdn.com/img/ibank/2018/934/354/9488453439_2074271497.jpg',
        name: "Trend brand magnetic women's watch, 2021 collection, internet celebrity, mirror effect",
        price: 2599,
        discount: 10,
      },
      {
        _id: '432534543545234235452',
        image:
          'https://cbu01.alicdn.com/img/ibank/O1CN01kUmL2e21ArRKSt0Kf_!!2212265946945-0-cib.jpg',
        name: "Apple, glossy children's electronic waterproof children's watch, mirror effect",
        price: 599,
        discount: 4,
      },
      {
        _id: '432534543545234235452',
        image:
          'https://cbu01.alicdn.com/img/ibank/O1CN01WDW0kT26NIAAEtyjL_!!2892057649-0-cib.jpg',
        name: "Quartz swiss watch, men's watch, glossy men's belt, Birthday gift, wholesale",
        price: 899,
        discount: 11,
      },
    ],
  },
  {
    id: 5,
    category: 'Jewelry',
    products: [
      {
        _id: '432534543545234235452',
        image:
          'https://cbu01.alicdn.com/img/ibank/O1CN01vwKpVv2ABAGwmt4Al_!!3186338164-0-cib.jpg',
        name: 'Earrings, long arrow, retro chain, European style',
        price: 499,
        discount: 5,
      },
      {
        _id: '432534543545234235452',
        image:
          'https://cbu01.alicdn.com/img/ibank/2018/454/061/9428160454_1881022009.jpg',
        name: 'Handheld storage system, jewelry, polyurethane box, simple and elegant design',
        price: 999,
        discount: 4,
      },
      {
        _id: '432534543545234235452',
        image:
          'https://cbu01.alicdn.com/img/ibank/2018/289/913/9252319982_717454862.jpg',
        name: 'Necklace and earrings for bride, set, jewelry, accessories, wedding accessories, wholesale',
        price: 550,
        discount: 3,
      },
      {
        _id: '432534543545234235452',
        image:
          'https://cbu01.alicdn.com/img/ibank/O1CN01wyhFTU2HbSUCUgMQP_!!2217263219169-0-cib.jpg',
        name: 'Advanced summer ring stainless steel jade, 18 carat white gold, high-quality style, light luxury style, does not fade',
        price: 899,
        discount: 10,
      },
    ],
  },
];

export default FeaturedProductsArr;
