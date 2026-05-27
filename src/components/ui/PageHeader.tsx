import Image from "next/image";

type PageHeaderProps = {
  title: string;
  titleReading?: string;
  titleSmall?: string;
  titleSub?: string;
  titleIt?: string;
  subtitle?: string;
  imageSrc: string;
  imageAlt: string;
};

export function PageHeader({ title, titleReading, titleSmall, titleSub, titleIt, subtitle, imageSrc, imageAlt }: PageHeaderProps) {
  return (
    <section className="relative h-64 md:h-96 overflow-hidden">
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-ink/60" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pt-16">
        {titleIt ? (
          <p className="font-heading text-gold-light tracking-[0.2em] text-sm md:text-base mb-2">
            {titleIt}
          </p>
        ) : null}
        <h1 className="font-heading-jp text-cream text-3xl md:text-5xl font-light tracking-widest text-center">
          {titleSmall && (
            <span className="text-lg md:text-2xl font-light tracking-wide mr-2 opacity-80">
              {titleSmall}
            </span>
          )}
          {title}
          {titleReading && (
            <span className="hidden md:inline font-heading-jp text-sm font-light tracking-wide text-cream/70 ml-4 align-middle">
              {titleReading}
            </span>
          )}
          {titleSub && (
            <span className="text-lg md:text-2xl text-cream/70 font-light ml-3 tracking-wide">
              {titleSub}
            </span>
          )}
        </h1>
        {subtitle ? (
          <p className="text-cream/80 mt-3 text-[9px] md:text-sm md:whitespace-nowrap">{subtitle}</p>
        ) : null}
      </div>
    </section>
  );
}
