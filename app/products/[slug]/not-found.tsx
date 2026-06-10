import { NotFoundContent } from "@/components/pages/NotFoundContent";

export default function ProductNotFound() {
  return (
    <NotFoundContent
      code="Product not found"
      title="This commodity is not listed."
      description="The product page you requested does not exist. Browse our export catalog or contact us directly."
      primaryHref="/products"
      primaryLabel="View Products"
    />
  );
}
