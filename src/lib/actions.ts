'use server';

import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

export async function revalidateCakes() {
  revalidateTag('cakes');
  redirect('/dashboard/products');
}
export async function revalidateFeaturedCakes() {
  revalidateTag('featuredcakes');
  redirect('/dashboard/products');
}
