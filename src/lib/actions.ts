'use server';

import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

export async function revalidateCakes() {
  revalidateTag('cakes');
  redirect('/dashboard/products');
}
