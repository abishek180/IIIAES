import Link from "next/link";
import { ArrowUpRight, CalendarDays, Clock, Laptop, MapPin, MonitorPlay, Quote, School } from "lucide-react";
import { getAcademyOfferings, getGallery, getHero, getNotices } from "@/lib/data";
import { HeroCarousel } from "@/components/hero-carousel";
import { formatDate } from "@/lib/utils";
import { academyContact, academySite, activities, facilities, faculty, learningModes, whyStudy } from "@/content/academy";
import { CourseCard, NoticeRow, Steps } from "@/components/cards";
import { ContactForm } from "@/components/forms";
import { ContactSection, GalleryGrid } from "@/components/sections";
import { ArrowLink, ButtonLink, Chip, Container, Em, Emblem, Eyebrow, Photo, Section, SectionHeading } from "@/components/ui/primitives";

const b = academySite.basePath;
const modeIcon = { Offline: School, Online: MonitorPlay, Hybrid: Laptop } as const;

export default function AcademyHomePage() {
  const offerings = getAcademyOfferings();
  const notices = getNotices({ site: "academy" }).slice(0, 4);
  const { admission } = academySite;
  const hero = getHero("academy");

  return (
    <>
      {/* 1–2. Admission announcement (header strip) + Hero */}
      <div className="px-2 pt-2 sm:px-3 sm:pt-3">
        <HeroCarousel slides={hero.slides} interval={hero.interval} tone={hero.theme} className="rounded-[28px] bg-ink-950 text-white">
          <Container className="grid grid-cols-1 gap-10 pt-40 pb-10 sm:pt-48 lg:grid-cols-[1fr_24rem] lg:items-end lg:pt-56 lg:pb-14">
            <div className="animate-fade-up min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-medium backdrop-blur">
                  <MapPin className="size-3.5 text-gold-400" aria-hidden /> Mukkam, Kozhikode · Kerala
                </span>
              </div>
              <h1 className="mt-6 font-display text-[2.85rem] leading-[0.98] font-medium tracking-[-0.045em] text-balance sm:text-7xl lg:text-[5.2rem]">
                {hero.title.lead} <Em tone="dark">{hero.title.accent}</Em>
                {hero.title.trail && ` ${hero.title.trail}`}
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
                {hero.description}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={hero.primary.href}>{hero.primary.label}</ButtonLink>
                <ButtonLink href={hero.secondary.href} variant="outline-light">
                  {hero.secondary.label}
                </ButtonLink>
              </div>
            </div>

            {/* Admission status card */}
            <aside aria-label="Admission status" className="rounded-3xl bg-white p-2 text-ink-950 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.5)]">
              <div className="rounded-[20px] bg-paper p-5">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.12em] text-ink-500 uppercase">
                    <span className="relative flex size-2">
                      <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-500 opacity-60" />
                      <span className="relative inline-flex size-2 rounded-full bg-green-500" />
                    </span>
                    {admission.open ? "Admissions open" : "Admissions closed"}
                  </span>
                  <Chip tone="gold">{admission.batch}</Chip>
                </div>
                <dl className="mt-5 space-y-3 text-sm">
                  <div className="flex items-center justify-between gap-4">
                    <dt className="flex items-center gap-2 text-ink-500">
                      <Clock className="size-4" aria-hidden /> Apply by
                    </dt>
                    <dd className="font-semibold">{formatDate(admission.deadline)}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="flex items-center gap-2 text-ink-500">
                      <CalendarDays className="size-4" aria-hidden /> Classes begin
                    </dt>
                    <dd className="font-semibold">{formatDate(admission.classesStart)}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="flex items-center gap-2 text-ink-500">
                      <School className="size-4" aria-hidden /> Programmes
                    </dt>
                    <dd className="font-semibold">{offerings.length} available</dd>
                  </div>
                </dl>
              </div>
              <div className="grid grid-cols-2 gap-2 p-2 pt-3">
                <Link href={`${b}/admissions#apply`} className="flex h-11 items-center justify-center rounded-full bg-ink-950 text-sm font-semibold text-white hover:bg-ink-800">
                  Apply now
                </Link>
                <a href={academyContact.contact.whatsappHref} target="_blank" rel="noopener noreferrer" className="flex h-11 items-center justify-center rounded-full bg-paper text-sm font-semibold hover:bg-paper-2">
                  Ask on WhatsApp
                </a>
              </div>
            </aside>
          </Container>
        </HeroCarousel>
      </div>

      {/* 3. Academy overview */}
      <Section>
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-center lg:gap-16">
          <div>
            <Eyebrow>About the academy</Eyebrow>
            <p className="mt-6 font-display text-[1.65rem] leading-[1.2] font-medium tracking-[-0.025em] text-pretty text-ink-950 sm:text-[2.4rem]">
              A focused campus for learning acupuncture properly.{" "}
              <span className="text-ink-300">Small batches, plenty of practice and teachers who know every student by name.</span>
            </p>
            <ArrowLink href={`${b}/about`} className="mt-8">
              About the academy
            </ArrowLink>
          </div>
          <Link href="/" className="group flex items-center gap-5 rounded-3xl bg-ink-950 p-6 text-white sm:p-7">
            <Emblem className="size-20 shrink-0 sm:size-24" />
            <div className="min-w-0">
              <p className="text-xs font-semibold tracking-[0.14em] text-gold-400 uppercase">Part of IIIAES</p>
              <p className="mt-2 font-display text-lg leading-snug font-medium">International Institute of Indian Acupuncture Science</p>
              <p className="mt-2 inline-flex items-center gap-1 text-sm text-white/60 group-hover:text-white">
                Visit the institute <ArrowUpRight className="size-4" aria-hidden />
              </p>
            </div>
          </Link>
        </Container>
      </Section>

      {/* 4. Available programmes */}
      <Section className="pt-0 sm:pt-0">
        <Container>
          <SectionHeading
            eyebrow="Programmes at Mukkam"
            title={
              <>
                Find your <Em>course</Em>
              </>
            }
            description="Every course shows duration, eligibility, learning mode and the next batch."
            action={<ButtonLink href={`${b}/courses`} variant="dark">All courses</ButtonLink>}
          />
        </Container>
        <div className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-5 px-5 pb-2 sm:scroll-px-8 sm:px-8 lg:mx-auto lg:grid lg:max-w-7xl lg:grid-cols-4 lg:overflow-visible">
          {offerings.map(({ course, offering }) => (
            <CourseCard
              key={course.slug}
              course={{ ...course, modes: offering?.modes ?? course.modes }}
              href={`${b}/courses/${course.slug}`}
              extra={offering ? `Next: ${offering.nextBatch}` : undefined}
              className="w-[85%] shrink-0 snap-start sm:w-[20rem] lg:w-auto"
            />
          ))}
        </div>
      </Section>

      {/* 5. Learning modes */}
      <Section className="bg-white">
        <Container>
          <SectionHeading
            eyebrow="Learning modes"
            title={
              <>
                Study the way that <Em>fits you</Em>
              </>
            }
            action={<ButtonLink href={`${b}/learning-modes`} variant="outline-dark">Compare modes</ButtonLink>}
          />
          <div className="mt-10 grid gap-3 md:grid-cols-3">
            {learningModes.map((m) => {
              const Icon = modeIcon[m.mode];
              return (
                <div key={m.mode} className="flex flex-col rounded-3xl bg-paper p-7 sm:p-8">
                  <span className="grid size-12 place-items-center rounded-2xl bg-white text-ink-950" aria-hidden>
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-8 font-display text-2xl font-medium tracking-tight text-ink-950">{m.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">{m.summary}</p>
                  <ul className="mt-6 space-y-2 border-t border-line pt-5 text-sm text-ink-700">
                    {m.points.map((p) => (
                      <li key={p} className="flex gap-2.5">
                        <span className="mt-2 size-1 shrink-0 rounded-full bg-gold-500" aria-hidden />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* 6. Campus & facilities */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Campus & facilities"
            title={
              <>
                Spaces built for <Em>practice</Em>
              </>
            }
            action={<ButtonLink href={`${b}/campus`} variant="outline-dark">Tour the campus</ButtonLink>}
          />
          <ul className="mt-10 grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4 lg:grid-rows-2">
            {facilities.slice(0, 5).map((f, i) => (
              <li key={f.title} className={i === 0 ? "col-span-2 row-span-2" : ""}>
                <Link href={`${b}/campus`} className="group relative block h-full overflow-hidden rounded-2xl">
                  <Photo src={f.img} label={f.title} className={i === 0 ? "aspect-square h-full lg:aspect-auto" : "aspect-square"} sizes={i === 0 ? "(min-width:1024px) 50vw, 100vw" : "25vw"} />
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-950/80 to-transparent p-4 pt-12 text-sm font-semibold text-white sm:text-base">{f.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* 7. Why study here */}
      <div className="px-2 sm:px-3">
        <section className="rounded-[28px] bg-ink-950 py-16 text-white sm:py-24">
          <Container>
            <SectionHeading
              tone="dark"
              eyebrow="Why study here"
              title={
                <>
                  Reasons students <Em tone="dark">choose Mukkam</Em>
                </>
              }
            />
            <ol className="mt-12 grid gap-px overflow-hidden rounded-3xl bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
              {whyStudy.map((w, i) => (
                <li key={w.title} className="bg-ink-950 p-7 sm:p-8">
                  <span className="font-display text-5xl font-medium tracking-[-0.05em] text-gold-400">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-8 font-display text-xl font-medium tracking-tight">{w.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/55">{w.text}</p>
                </li>
              ))}
            </ol>
          </Container>
        </section>
      </div>

      {/* 8. Faculty */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Faculty"
            title={
              <>
                Learn from <Em>practitioners</Em>
              </>
            }
            description="Faculty profiles will be published here with qualifications and experience."
            action={<ButtonLink href={`${b}/faculty`} variant="outline-dark">Meet the faculty</ButtonLink>}
          />
          <ul className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {faculty.map((f, i) => (
              <li key={i} className="rounded-3xl bg-white p-2 ring-1 ring-ink-950/[0.04]">
                <Photo label="Faculty portrait" className="aspect-[4/5] rounded-[18px]" />
                <div className="p-3 pt-4">
                  <p className="font-display font-medium text-ink-950">{f.name}</p>
                  <p className="mt-0.5 text-xs text-ink-500">
                    {f.role} · {f.subjects}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* 9. Admission process */}
      <Section className="bg-white">
        <Container>
          <SectionHeading
            eyebrow="Admission process"
            title={
              <>
                Four steps to <Em>your seat</Em>
              </>
            }
            action={<ButtonLink href={`${b}/admissions`} variant="dark">Admission details</ButtonLink>}
          />
          <div className="mt-10 [&_li]:bg-paper [&_li]:ring-0">
            <Steps
              steps={[
                { title: "Choose a course", text: "Compare duration, eligibility and learning mode." },
                { title: "Apply online", text: "Fill the application form — it takes about five minutes." },
                { title: "Verification call", text: "Our admissions team calls you and checks your documents." },
                { title: "Confirm your seat", text: "Receive confirmation and your batch details." },
              ]}
            />
          </div>
        </Container>
      </Section>

      {/* 10. Admission enquiry */}
      <Section id="enquire">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Enquire"
              title={
                <>
                  Get a <Em>call back</Em>
                </>
              }
              description="Leave your number and course of interest. The admissions office will call you during working hours."
            />
            <p className="mt-8 text-sm text-ink-500">
              Ready to apply?{" "}
              <Link href={`${b}/admissions#apply`} className="font-semibold text-ink-950 underline decoration-gold-500 underline-offset-4">
                Fill the full application
              </Link>
            </p>
          </div>
          <ContactForm courses={offerings.map((o) => o.course.title)} />
        </Container>
      </Section>

      {/* 11. Latest announcements */}
      <Section className="bg-white">
        <Container>
          <SectionHeading
            eyebrow="News & updates"
            title={
              <>
                Latest <Em>announcements</Em>
              </>
            }
            action={<ButtonLink href={`${b}/news`} variant="dark">All updates</ButtonLink>}
          />
          <ul className="mt-10 grid gap-1 rounded-3xl bg-paper p-2 md:grid-cols-2">
            {notices.map((n) => (
              <li key={n.slug} className="rounded-2xl bg-white">
                <NoticeRow notice={n} compact basePath={`${b}/news`} />
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* 12. Student activities */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Student activities"
            title={
              <>
                More than <Em>lectures</Em>
              </>
            }
            action={<ButtonLink href={`${b}/student-life`} variant="outline-dark">Student life</ButtonLink>}
          />
          <div className="mt-10 grid gap-3 md:grid-cols-3">
            {activities.map((a) => (
              <div key={a.title} className="rounded-3xl bg-white p-2 ring-1 ring-ink-950/[0.04]">
                <Photo src={a.img} label={a.title} className="aspect-[4/3] rounded-[18px]" />
                <div className="p-4">
                  <h3 className="font-display text-xl font-medium tracking-tight text-ink-950">{a.title}</h3>
                  <p className="mt-1.5 text-sm text-ink-500">{a.text}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 13. Gallery */}
      <Section className="pt-0 sm:pt-0">
        <Container>
          <SectionHeading
            eyebrow="Gallery"
            title={
              <>
                Inside the <Em>academy</Em>
              </>
            }
            action={<ButtonLink href={`${b}/gallery`} variant="outline-dark">View gallery</ButtonLink>}
          />
          <div className="mt-10">
            <GalleryGrid items={getGallery().slice(0, 6)} />
          </div>
        </Container>
      </Section>

      {/* 14. Student testimonials — only authentic, approved feedback will be published */}
      <Section className="bg-white">
        <Container>
          <div className="grid grid-cols-1 gap-8 rounded-3xl bg-paper p-8 sm:p-12 lg:grid-cols-[auto_1fr_auto] lg:items-center">
            <Quote className="size-10 text-gold-500" aria-hidden />
            <div>
              <h2 className="font-display text-2xl font-medium tracking-tight text-ink-950 sm:text-3xl">Student stories are on their way.</h2>
              <p className="mt-2 max-w-xl text-ink-500">
                We only publish genuine feedback from our students, with their permission. Their stories will appear here soon.
              </p>
            </div>
            <ButtonLink href={`${b}/contact`} variant="outline-dark">
              Share your story
            </ButtonLink>
          </div>
        </Container>
      </Section>

      {/* 15. Location & contact */}
      <ContactSection info={academyContact} contactHref={`${b}/contact`} />
    </>
  );
}
