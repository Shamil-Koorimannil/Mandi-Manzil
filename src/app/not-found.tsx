import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center pt-24 pb-16 px-4 bg-[#181718] text-center">
      <div className="max-w-md mx-auto space-y-6">
        <span className="text-xs font-semibold tracking-widest uppercase text-brand-yellow">
          404 &bull; Page Not Found
        </span>
        <h1 className="font-philosopher text-4xl sm:text-5xl font-bold text-white">
          A Lost Trail
        </h1>
        <p className="text-sm text-zinc-400 font-light leading-relaxed">
          The page you are looking for has been moved or does not exist. Allow us to direct you back to our feast.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link href="/" className="btn-primary w-full sm:w-auto">
            Return to Homepage
          </Link>
          <Link href="/menu" className="btn-secondary w-full sm:w-auto">
            Explore Menu
          </Link>
        </div>
      </div>
    </div>
  );
}
