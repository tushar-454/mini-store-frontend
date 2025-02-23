import {
  CakeIcon,
  ChartNetwork,
  Feather,
  Flame,
  FolderKanban,
  GalleryHorizontal,
  Images,
  LayoutDashboard,
  LayoutList,
  Menu,
  Star,
  Truck,
  UsersRound,
} from 'lucide-react';

export type TNavItem = {
  name: string;
  link: string;
  icon: typeof Menu;
};

const nav_items: TNavItem[] = [
  {
    name: 'Products',
    link: '/products',
    icon: CakeIcon,
  },
  {
    name: 'Top Sell',
    link: '#top_sell',
    icon: ChartNetwork,
  },
  {
    name: 'Featured',
    link: '#featured',
    icon: Feather,
  },
  {
    name: 'Upcoming',
    link: '#upcoming',
    icon: Flame,
  },
  {
    name: 'Gallery',
    link: '#gallery',
    icon: Images,
  },
  {
    name: 'Track Order',
    link: '/track-order',
    icon: Truck,
  },
];

const dashboard_nav_items = {
  Inventory: [
    {
      name: 'Inventory',
      link: '/dashboard/inventory',
      icon: LayoutDashboard,
    },
  ],
  Orders: [
    {
      name: 'Orders',
      link: '/dashboard/orders',
      icon: Truck,
    },
  ],
  Products: [
    {
      name: 'Products',
      link: '/dashboard/products',
      icon: LayoutList,
    },
    {
      name: 'Create Product',
      link: '/dashboard/products/create',
      icon: LayoutList,
    },
  ],
  Coupon: [
    {
      name: 'Coupon',
      link: '/dashboard/coupon',
      icon: Feather,
    },
    {
      name: 'Create Coupon',
      link: '/dashboard/coupon/create',
      icon: Feather,
    },
  ],
  Categories: [
    {
      name: 'Categories',
      link: '/dashboard/categories',
      icon: FolderKanban,
    },
    {
      name: 'Create Category',
      link: '/dashboard/categories/create',
      icon: FolderKanban,
    },
  ],
  Gallery: [
    {
      name: 'Galleries',
      link: '/dashboard/galleries',
      icon: Images,
    },
    {
      name: 'Create Gallery',
      link: '/dashboard/galleries/create',
      icon: Images,
    },
  ],
  Carousel: [
    {
      name: 'Carousel',
      link: '/dashboard/carousel',
      icon: GalleryHorizontal,
    },
    {
      name: 'Create Carousel',
      link: '/dashboard/carousel/create',
      icon: GalleryHorizontal,
    },
  ],
  Customers: [
    {
      name: 'Customers',
      link: '/dashboard/customers',
      icon: UsersRound,
    },
  ],
  Reviews: [
    {
      name: 'Reviews',
      link: '/dashboard/reviews',
      icon: Star,
    },
  ],
};

export type DashboardNavKeys = keyof typeof dashboard_nav_items;

export { dashboard_nav_items, nav_items };
