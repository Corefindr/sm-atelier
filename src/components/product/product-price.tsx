import { formatPrice } from "@/lib/format";
import { isOnSale } from "@/lib/pricing";
import { cn } from "@/lib/utils";

type ProductPriceProps = {
  price: number;
  salePrice: number | null;
  className?: string;
  currentClassName?: string;
};

export function ProductPrice({
  price,
  salePrice,
  className,
  currentClassName,
}: ProductPriceProps) {
  const onSale = isOnSale({ price, salePrice });

  return (
    <p className={cn("flex flex-wrap items-baseline gap-2", className)}>
      <span className={currentClassName}>
        {formatPrice(onSale && salePrice != null ? salePrice : price)}
      </span>
      {onSale ? (
        <span className="text-stone line-through">{formatPrice(price)}</span>
      ) : null}
    </p>
  );
}
