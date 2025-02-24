'use server';

import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

export async function revalidateCakes(path?: string) {
  revalidateTag('cakes');
  redirect(path ? path : '/dashboard/products');
}
export async function revalidateFeaturedCakes() {
  revalidateTag('featuredcakes');
  redirect('/dashboard/products');
}
