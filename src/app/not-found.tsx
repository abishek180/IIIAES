import Link from "next/link";
import { ButtonLink, Emblem } from "@/components/ui/primitives";

export default function NotFound() {
  return (
    <main id="main" className="grid min-h-dvh place-items-center p-2 sm:p-3">
      <div className="grid size-full place-items-center rounded-[28px] bg-ink-950 px-6 py-24 text-center text-white">
        <div>
          <Link href="/" aria-label="Home">
            <Emblem className="mx-auto size-16" />
          </Link>
          <p className="mt-10 font-display text-8xl font-medium tracking-[-0.06em] text-gold-400">404</p>
          <h1 className="mt-4 font-display text-3xl font-medium tracking-tight">This page could not be found.</h1>
          <p className="mx-auto mt-3 max-w-sm text-white/60">It may have moved, or the notice may have expired.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/">Back to home</ButtonLink>
            <ButtonLink href="/notices" variant="outline-light">
              Notices
            </ButtonLink>
          </div>
        </div>
      </div>
    </main>
  );
}
