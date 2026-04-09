# Mini Store Frontend

Mini Store Frontend is a modern ecommerce UI built with Next.js App Router and TypeScript. It includes storefront pages, checkout flow, order tracking, invoice views, and an admin dashboard for managing products, categories, coupons, orders, galleries, and reviews.

## Features

- Customer storefront with home, products, product details, and category browsing
- Shopping cart and checkout flow with shipping, payment, and coupon support
- Order tracking and invoice pages
- Admin dashboard for product, category, coupon, carousel, gallery, review, and order management
- Reusable UI/component architecture with form schemas and shared helpers
- State management with Redux Toolkit
- Authentication integration through NextAuth
- Form validation using Zod + React Hook Form

## Technology Stack

### Core

- Next.js: 15.1.9
- React: 19.0.0
- React DOM: 19.0.0
- TypeScript: ^5

### UI and Styling

- Tailwind CSS: ^3.4.1
- Radix UI (multiple primitives): ^1.x and ^2.x packages
- Lucide React: ^0.469.0
- Embla Carousel: ^8.5.2
- Recharts: ^2.15.0

### State, Auth, Forms, and Validation

- Redux Toolkit: ^2.5.0
- React Redux: ^9.2.0
- NextAuth: ^4.24.11
- React Hook Form: ^7.54.2
- Zod: ^3.24.1

### Tooling

- ESLint: ^9
- Prettier: ^3.4.2
- PostCSS: ^8
- cross-env: ^7.0.3

## Project Structure

```text
mini-store-frontend/
├─ src/
│  ├─ app/
│  │  ├─ (home)/
│  │  │  ├─ checkout/
│  │  │  ├─ products/
│  │  │  └─ track-order/
│  │  ├─ (invoice)/
│  │  │  └─ invoice/
│  │  ├─ api/
│  │  │  └─ auth/
│  │  └─ dashboard/
│  │     ├─ carousel/
│  │     ├─ categories/
│  │     ├─ coupon/
│  │     ├─ customers/
│  │     ├─ galleries/
│  │     ├─ orders/
│  │     ├─ products/
│  │     └─ reviews/
│  ├─ api/
│  ├─ assets/
│  ├─ components/
│  │  ├─ cakes/
│  │  ├─ cakes_details/
│  │  ├─ carousel/
│  │  ├─ cart/
│  │  ├─ category/
│  │  ├─ checkout/
│  │  ├─ dashboard/
│  │  ├─ footer/
│  │  ├─ gallery/
│  │  ├─ header/
│  │  ├─ reviews/
│  │  ├─ shared/
│  │  └─ ui/
│  ├─ constant/
│  ├─ hooks/
│  ├─ lib/
│  ├─ schema/
│  └─ store/
├─ components.json
├─ tailwind.config.ts
└─ next.config.ts
```

## Component Tree (High-Level)

```text
App
├─ Layouts
│  ├─ Home Layout
│  ├─ Invoice Layout
│  └─ Dashboard Layout
├─ Shared UI
│  ├─ Header
│  ├─ Footer
│  ├─ Generic Form
│  ├─ Skeletons
│  └─ UI Primitives
├─ Storefront Modules
│  ├─ Cakes / Product Cards
│  ├─ Featured / Top Selling / Upcoming
│  ├─ Category Listings
│  ├─ Carousel
│  ├─ Gallery
│  └─ Reviews
├─ Commerce Flow
│  ├─ Cart
│  ├─ Checkout
│  │  ├─ Shipping Address
│  │  ├─ Payment Information
│  │  ├─ Coupon Code
│  │  └─ Transaction ID
│  └─ Order Tracking
└─ Dashboard Modules
	├─ Products
	├─ Categories
	├─ Coupons
	├─ Orders
	├─ Customers
	├─ Galleries
	├─ Carousel
	└─ Reviews
```

## Getting Started

### Prerequisites

- Node.js latest LTS
- Yarn

### Installation

```bash
yarn install
```

### Run in Development

```bash
yarn dev
```

The app starts with Next.js Turbopack in development mode.

### Build for Production

```bash
yarn build
```

### Run Production Server

```bash
yarn start
```

### Lint

```bash
yarn lint
```

## Available Scripts

- `yarn dev`: start local development server (with Turbopack)
- `yarn build`: create production build
- `yarn start`: run the production build
- `yarn lint`: run lint checks
- `yarn deploy`: build and deploy with Vercel CLI

## Notes

- Route groups are organized under `src/app/(home)` and `src/app/(invoice)`.
- Dashboard pages live under `src/app/dashboard`.
- Validation schemas are grouped under `src/schema`.
- Shared business helpers and actions are under `src/lib`.
