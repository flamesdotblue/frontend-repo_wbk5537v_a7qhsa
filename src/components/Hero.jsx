import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section className="relative">
      <div className="h-[520px] w-full">
        <Spline
          scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white via-white/70 to-transparent dark:from-black dark:via-black/60"></div>

      <div className="absolute inset-0 flex items-end">
        <div className="mx-auto max-w-6xl px-4 pb-10 text-center">
          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight">
            Summarize notes. Auto-tag topics. Search instantly.
          </h1>
          <p className="mt-3 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Paste text and let AI create a crisp summary with relevant tags. Filter by tag or search by text.
          </p>
        </div>
      </div>
    </section>
  );
}
