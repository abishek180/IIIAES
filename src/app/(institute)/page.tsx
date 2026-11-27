import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  ArrowUpRight,
  Bell,
  BookOpen,
  ClipboardList,
  Download,
  FlaskConical,
  GraduationCap,
  HeartPulse,
  Laptop,
  Layers,
  Lightbulb,
  MapPin,
  BadgeCheck,
  Presentation,
  Stethoscope,
  Users,
} from "lucide-react";
import {
  getAcademies,
  getCalendar,
  getCourses,
  getFeaturedCourses,
  getGallery,
  getHeadlineNotice,
  getHero,
  getNotices,
} from "@/lib/data";
import { AcademyCard, CalendarList, CourseCard, NoticeRow } from "@/components/cards";
import { HeroCarousel, HeroControls } from "@/components/hero-carousel";
import { FounderFeature } from "@/components/founder";
import { coFounder, founder } from "@/content/leadership";
import { AffiliationCta, ContactSection, GalleryGrid } from "@/components/sections";
import { ArrowLink, ButtonLink, Container, Em, Eyebrow, Photo, Section, SectionHeading } from "@/components/ui/primitives";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const headline = getHeadlineNotice();
  const notices = getNotices().slice(0, 5);
  const featured = getFeaturedCourses();
  const courses = getCourses();
  const academies = getAcademies();
  const calendar = getCalendar().slice(0, 5);
  const gallery = getGallery().slice(0, 6);
  const hero = getHero("institute");

  return (
    <>
      {/* 1–3. Announcement · Header (layout) · Hero — slides and copy come from the CMS (content/hero.ts) */}
      <div className="px-2 pt-2 sm:px-3 sm:pt-3">
        <HeroCarousel slides={hero.slides} interval={hero.interval} tone={hero.theme} className="rounded-[28px] bg-paper text-ink-950">
          <Container className="grid grid-cols-1 gap-10 pt-28 pb-24 sm:pt-36 sm:pb-28 lg:pt-44 lg:pb-32">
            <div className="max-w-3xl min-w-0">
              {headline && (
                <Link
                  href={`/notices/${headline.slug}`}
                  className="group animate-fade-up inline-flex max-w-full items-center gap-2.5 rounded-full bg-white/80 py-1 pr-1 pl-3 text-xs ring-1 ring-ink-950/[0.06] backdrop-blur transition-colors hover:bg-white sm:text-sm"
                >
                  <span className="relative flex size-2 shrink-0">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-gold-500 opacity-60" />
                    <span className="relative inline-flex size-2 rounded-full bg-gold-500" />
                  </span>
                  <span className="truncate text-ink-700">{headline.title}</span>
                  <span className="flex shrink-0 items-center gap-1 rounded-full bg-ink-950 px-2.5 py-1 font-semibold text-white">
                    View <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </span>
                </Link>
              )}

              <h1 className="mt-8 font-display text-[2.85rem] leading-[0.98] font-medium tracking-[-0.045em] text-balance sm:text-7xl lg:text-[5.4rem]">
                <span className="animate-fade-up stagger-1 block">{hero.title.lead}</span>{" "}
                <Em className="animate-fade-up stagger-2 block text-gold-600">
                  {hero.title.accent}
                  {hero.title.trail && ` ${hero.title.trail}`}
                </Em>
              </h1>
              <p className="animate-fade-up stagger-3 mt-6 max-w-xl text-base leading-relaxed text-ink-600 sm:text-lg">{hero.description}</p>
              <div className="animate-fade-up stagger-4 mt-9 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={hero.primary.href} variant="dark">
                  {hero.primary.label}
                </ButtonLink>
                <ButtonLink href={hero.secondary.href} newTab={hero.secondary.newTab} variant="light" className="ring-1 ring-ink-950/10">
                  {hero.secondary.label}
                </ButtonLink>
              </div>
              <Link href="/mukkam" className="group animate-fade-up stagger-4 mt-6 flex items-start gap-2 text-sm font-medium text-ink-600 transition-colors hover:text-ink-950 sm:inline-flex sm:items-center">
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold-600 sm:mt-0" aria-hidden />
                <span>
                  Studying in Kozhikode? Visit the <span className="text-ink-950 underline decoration-gold-500 underline-offset-4">Mukkam Academy</span>
                  <ArrowRight className="ml-1 inline size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </span>
              </Link>
            </div>
          </Container>

          {/* Hero facts + slide controls */}
          <Container className="pb-20">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <dl className="hidden grid-cols-4 gap-2 sm:grid lg:max-w-4xl lg:flex-1">
                {[
                  ["Programmes", "UG to certificate"],
                  ["Learning modes", "Offline · Online · Hybrid"],
                  ["Campus", "Mukkam, Kozhikode"],
                  ["Network", "Affiliated academies"],
                ].map(([k, v]) => (
                  <div key={k} className="rounded-2xl bg-white/70 px-4 py-3 ring-1 ring-ink-950/[0.05] backdrop-blur-md">
                    <dt className="text-[0.7rem] text-ink-500">{k}</dt>
                    <dd className="mt-0.5 text-sm font-medium text-ink-950">{v}</dd>
                  </div>
                ))}
              </dl>
              <HeroControls className="self-start lg:self-end" />
            </div>
          </Container>
        </HeroCarousel>
      </div>

      {/* Quick access — the four most common visitor goals, one tap away */}
      <Container className="relative z-10 -mt-14 sm:-mt-12">
        <nav aria-label="Quick access" className="grid grid-cols-2 gap-2 rounded-[28px] bg-white p-2 shadow-[0_30px_60px_-30px_rgba(15,15,15,0.35)] ring-1 ring-ink-950/[0.04] lg:grid-cols-4">
          {[
            { icon: BookOpen, title: "Courses", text: `${courses.length} programmes`, href: "/courses" },
            { icon: GraduationCap, title: "Admissions", text: "Eligibility & process", href: "/admissions" },
            { icon: Bell, title: "Notices", text: `${getNotices().length} current notices`, href: "/notices" },
            { icon: Download, title: "Downloads", text: "Prospectus & forms", href: "/downloads" },
          ].map((q) => (
            <Link key={q.href} href={q.href} className="group flex flex-col gap-6 rounded-[22px] p-4 transition-colors hover:bg-paper sm:flex-row sm:items-center sm:gap-4 sm:p-5">
              <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-paper text-ink-950 transition-colors group-hover:bg-gold-400" aria-hidden>
                <q.icon className="size-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center justify-between font-display font-semibold text-ink-950">
                  {q.title}
                  <ArrowUpRight className="size-4 text-ink-300 transition-all group-hover:rotate-45 group-hover:text-ink-950" aria-hidden />
                </span>
                <span className="mt-0.5 block text-xs text-ink-500 sm:text-[0.8rem]">{q.text}</span>
              </span>
            </Link>
          ))}
        </nav>
      </Container>

      {/* 4. Institutional introduction */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[14rem_1fr]">
            <Eyebrow>About the institute</Eyebrow>
            <div>
              <p className="font-display text-[1.65rem] leading-[1.2] font-medium tracking-[-0.025em] text-ink-950 text-pretty sm:text-[2.6rem]">
                IIIAES is dedicated to the study and practice of acupuncture science.{" "}
                <span className="text-ink-300">
                  We combine classical understanding with structured theory, hands-on practice and supervised clinical learning.
                </span>
              </p>
              <ArrowLink href="/about" className="mt-8">
                About the institute
              </ArrowLink>
            </div>
          </div>

          <dl className="mt-14 grid grid-cols-2 gap-3 sm:mt-20 lg:grid-cols-4">
            {[
              { k: "Programmes", v: courses.length, suffix: "" },
              { k: "Learning modes", v: 3, suffix: "" },
              { k: "Course levels", v: new Set(courses.map((c) => c.level)).size, suffix: "" },
              { k: "Academies", v: academies.length, suffix: "+" },
            ].map((s) => (
              <div key={s.k} className="rounded-3xl bg-white p-6 ring-1 ring-ink-950/[0.04] sm:p-7">
                <dt className="text-[0.7rem] font-semibold tracking-[0.14em] text-ink-400 uppercase">{s.k}</dt>
                <dd className="mt-6 font-display text-5xl leading-none font-medium tracking-[-0.05em] text-ink-950 sm:text-6xl">
                  {s.v}
                  {s.suffix && <sup className="ml-0.5 align-top text-2xl text-gold-600">{s.suffix}</sup>}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      {/* Leadership — Founder & Director */}
      <Section className="pt-0 sm:pt-0">
        <Container>
          <FounderFeature
            leader={founder}
            intro={`IIIAES was founded by ${founder.name} with one aim: to give acupuncture science the structure, rigour and practical depth of a modern academic discipline.`}
            partners={[coFounder]}
            link={{ label: "Leadership & our story", href: "/about#leadership" }}
          />
        </Container>
      </Section>

      {/* 5. Academic programmes */}
      <Section className="pt-0 sm:pt-0">
        <Container>
          <SectionHeading
            eyebrow="Programmes"
            title={
              <>
                Academic <Em>programmes</Em>
              </>
            }
            description="From short certificates to an undergraduate degree — each with clear eligibility, duration and learning mode."
            action={<ButtonLink href="/courses" variant="dark">All courses</ButtonLink>}
          />
        </Container>
        <div className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-5 px-5 pb-2 sm:scroll-px-8 sm:px-8 lg:mx-auto lg:grid lg:max-w-7xl lg:grid-cols-3 lg:overflow-visible">
          {featured.map((c) => (
            <CourseCard key={c.slug} course={c} className="w-[85%] shrink-0 snap-start sm:w-[22rem] lg:w-auto" />
          ))}
        </div>
        <Container>
          <p className="mt-6 text-sm text-ink-500">
            Not sure which programme fits you?{" "}
            <Link href="/admissions#eligibility" className="font-medium text-ink-950 underline decoration-gold-500 underline-offset-4">
              Compare eligibility
            </Link>
          </p>
        </Container>
      </Section>

      {/* 6. Why choose IIIAES */}
      <Section className="bg-white">
        <Container>
          <SectionHeading
            eyebrow="Why IIIAES"
            title={
              <>
                An education built on <Em>method.</Em>
              </>
            }
          />
          <ul className="mt-12 grid gap-px overflow-hidden rounded-3xl bg-line ring-1 ring-line sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Layers, title: "Structured curriculum", text: "Programmes progress logically from foundations to advanced clinical topics." },
              { icon: HeartPulse, title: "Hands-on practice", text: "Regular supervised practical sessions build confidence and correct technique." },
              { icon: Stethoscope, title: "Clinical exposure", text: "Supervised clinical training is built into programmes where applicable." },
              { icon: Laptop, title: "Flexible learning", text: "Choose offline, online or hybrid study, depending on the programme." },
              { icon: Users, title: "Dedicated faculty", text: "Learn from teachers who combine academic knowledge with practice." },
              // ⚠ Recognition claim supplied by the client — keep only with documented UGC approval (see SRS §11 content accuracy).
              { icon: BadgeCheck, title: "A national first", text: "India’s first acupuncture institute to receive UGC approval." },
            ].map((f) => (
              <li key={f.title} className="bg-white p-7 sm:p-8">
                <f.icon className="size-6 text-gold-600" strokeWidth={1.6} aria-hidden />
                <h3 className="mt-6 font-display text-lg font-medium tracking-tight text-ink-950">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{f.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* 7. Academic approach */}
      <div className="px-2 py-6 sm:px-3">
        <section className="overflow-hidden rounded-[28px] bg-ink-950 py-16 text-white sm:py-24">
          <Container>
            <SectionHeading
              tone="dark"
              eyebrow="Academic approach"
              title={
                <>
                  Learn it. Practise it. <Em tone="dark">Apply it.</Em>
                </>
              }
              description="Every programme follows the same three-stage approach, adapted to its level."
              action={<ButtonLink href="/academics" variant="outline-light">Our approach</ButtonLink>}
            />
            <ol className="mt-12 grid grid-cols-1 gap-3 lg:grid-cols-3">
              {[
                { n: "01", img: "/images/stock/classroom-teacher.jpg", title: "Theoretical education", text: "Principles of acupuncture, anatomy, physiology and diagnostic methods, taught in structured modules." },
                { n: "02", img: "/images/stock/acupuncture-treatment.jpg", title: "Practical learning", text: "Point location, techniques and procedures practised under faculty supervision." },
                { n: "03", img: "/images/stock/acupuncture-needles.jpg", title: "Clinical training", text: "Supervised clinical exposure and case work, where applicable to the programme." },
              ].map((s) => (
                <li key={s.n} className="rounded-3xl bg-white/[0.04] p-2 ring-1 ring-white/10">
                  <Photo src={s.img} label={s.title} tone="dark" className="aspect-[16/10]" />
                  <div className="p-5 sm:p-6">
                    <span className="font-display text-sm font-semibold text-gold-400">{s.n}</span>
                    <h3 className="mt-3 font-display text-2xl font-medium tracking-tight">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/55">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Container>
        </section>
      </div>

      {/* 8. Affiliated academies */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Affiliated academies"
            title={
              <>
                Study <Em>near you.</Em>
              </>
            }
            description="IIIAES programmes are delivered at the Mukkam campus and approved affiliated academies."
            action={<ButtonLink href="/academies" variant="outline-dark">Academy directory</ButtonLink>}
          />
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {academies.map((a) => (
              <AcademyCard key={a.slug} academy={a} courseCount={a.courses.length} />
            ))}
          </div>
        </Container>
      </Section>

      {/* 9–10. News & announcements + Academic calendar */}
      <Section className="pt-0 sm:pt-0">
        <Container>
          <SectionHeading
            eyebrow="Notice board"
            title={
              <>
                News & <Em>announcements</Em>
              </>
            }
            action={<ButtonLink href="/notices" variant="dark">All notices</ButtonLink>}
          />
          <div className="mt-10 grid grid-cols-1 gap-3 lg:grid-cols-[1.5fr_1fr]">
            <div className="rounded-3xl bg-white p-2 ring-1 ring-ink-950/[0.04]">
              <ul className="divide-y divide-line">
                {notices.map((n) => (
                  <li key={n.slug}>
                    <NoticeRow notice={n} />
                  </li>
                ))}
              </ul>
            </div>
            <div id="calendar" className="flex flex-col rounded-3xl bg-ink-950 p-3 text-white">
              <div className="flex items-center justify-between p-3 pb-4">
                <h3 className="font-display text-xl font-medium tracking-tight">Academic calendar</h3>
                <Link href="/academics#calendar" className="text-xs font-medium text-gold-300 hover:text-gold-200">
                  Full calendar
                </Link>
              </div>
              <CalendarList events={calendar} tone="dark" />
            </div>
          </div>
        </Container>
      </Section>

      {/* 11. Research & academic activities */}
      <Section className="bg-white">
        <Container>
          <SectionHeading
            eyebrow="Research & activities"
            title={
              <>
                Learning beyond the <Em>classroom.</Em>
              </>
            }
            action={<ButtonLink href="/research" variant="outline-dark">Research</ButtonLink>}
          />
          <div className="mt-10 grid gap-3 md:grid-cols-3">
            {[
              { icon: Presentation, title: "Workshops", text: "Practical workshops and demonstrations for students and practitioners.", href: "/notices" },
              { icon: FlaskConical, title: "Research activities", text: "Case studies, project work and academic research in acupuncture science.", href: "/research" },
              { icon: Lightbulb, title: "Educational initiatives", text: "Awareness programmes, seminars and community health education.", href: "/student-life" },
            ].map((c) => (
              <Link key={c.title} href={c.href} className="group rounded-3xl bg-paper p-7 transition-colors hover:bg-ink-950 hover:text-white sm:p-8">
                <c.icon className="size-6 text-gold-600 group-hover:text-gold-400" strokeWidth={1.6} aria-hidden />
                <h3 className="mt-10 font-display text-xl font-medium tracking-tight">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500 group-hover:text-white/60">{c.text}</p>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* 12. Gallery */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Gallery"
            title={
              <>
                Life at <Em>IIIAES</Em>
              </>
            }
            action={<ButtonLink href="/gallery" variant="outline-dark">View gallery</ButtonLink>}
          />
          <div className="mt-10">
            <GalleryGrid items={gallery} />
          </div>
        </Container>
      </Section>

      {/* 13. Affiliation CTA */}
      <AffiliationCta />

      {/* 14. Contact */}
      <ContactSection />

      {/* Utility: admissions help strip */}
      <Container className="pb-16">
        <div className="flex flex-col items-start gap-4 rounded-3xl bg-white p-6 ring-1 ring-ink-950/[0.04] sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="flex items-center gap-4">
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-gold-100 text-gold-700" aria-hidden>
              <ClipboardList className="size-5" />
            </span>
            <p className="font-medium text-ink-950">
              Ready to apply?<span className="block text-sm font-normal text-ink-500">Check eligibility and required documents first.</span>
            </p>
          </div>
          <ButtonLink href="/admissions#documents" variant="dark" size="sm">
            Admission checklist
          </ButtonLink>
        </div>
      </Container>
    </>
  );
}
