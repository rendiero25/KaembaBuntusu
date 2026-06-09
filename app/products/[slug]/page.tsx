import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailContent } from "@/components/products/ProductDetailContent";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  getProductBySlug,
  isProductSlug,
  PRODUCT_SLUGS,
  SITE_URL,
} from "@/lib/constants";
import { getProductJsonLd, OG_IMAGE } from "@/lib/seo";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return PRODUCT_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  const title = `${product.name} Export`;
  const url = `${SITE_URL}/products/${product.slug}`;

  return {
    title,
    description: product.metaDescription,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${product.name} Export | CV. Kaemba Buntusu Indonesia`,
      description: product.metaDescription,
      url,
      type: "website",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} Export | CV. Kaemba Buntusu Indonesia`,
      description: product.metaDescription,
      images: [OG_IMAGE.url],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  if (!isProductSlug(slug)) {
    notFound();
  }

  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const productJsonLd = getProductJsonLd(slug);

  return (
    <>
      {productJsonLd ? <JsonLd data={productJsonLd} /> : null}
      <ProductDetailContent product={product} />
    </>
  );
}
