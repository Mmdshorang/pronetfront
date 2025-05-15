// app/product/[slug]/page.tsx

import ProductCard from "./ProductCart";

// شبیه‌سازی دریافت محصول

// async function getProduct(slug: string) {
//   return {
//     id:1,
//     title: "ژل ماشین ظرفشویی",
//     description: "ژل ماشین ظرفشویی با کیفیت بالا و تخفیف ویژه",
//     image: "/images/products/gel.jpg",
//     price: 30000,
//     discountPrice: 22500,
//     discountPercent: 25,
//   };
// }

// export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
//   const product = await getProduct(params.slug);

//   return {
//     title: `${product.title} | فروشگاه شما`,
//     description: product.description,
//     openGraph: {
//       title: `${product.title} | فروشگاه شما`,
//       description: product.description,
//       images: [`https://yourdomain.com${product.image}`],
//     },
//     alternates: {
//       canonical: `https://yourdomain.com/product/${params.slug}`,
//     },
//   };
// }

export default async function ProductPage() {
//  const product = await getProduct(params.slug);
  return <ProductCard />;
}
