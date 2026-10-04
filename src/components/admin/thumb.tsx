import Image from "next/image";

export function Thumb({
  src,
  alt,
  className = "h-16 w-12",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  if (src.startsWith("data:")) {
    return (
      // Data URLs are local previews and cannot go through the image optimizer.
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt={alt} className={`${className} object-cover`} />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={96}
      height={128}
      className={`${className} object-cover`}
    />
  );
}
