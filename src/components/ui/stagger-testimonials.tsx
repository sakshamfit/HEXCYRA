import React from "react";
import { Star, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

export interface StaggerTestimonialItem {
  name: string;
  role: string;
  company?: string;
  quote: string;
  image: string;
  rating?: number;
}

const DEFAULT_TESTIMONIALS: StaggerTestimonialItem[] = [
  {
    name: "Alex Vance",
    role: "CEO at TechCorp",
    company: "TechCorp",
    quote: "My favorite solution in the market. We work 5x faster with HEXCYRA's modern infrastructure and engineering.",
    image: "/img/avatar-1.jpg",
    rating: 5,
  },
  {
    name: "Dan Miller",
    role: "CTO at SecureNet",
    company: "SecureNet",
    quote: "I'm confident our systems and data are safe. I can't say that about any other provider we tested.",
    image: "/img/avatar-2.jpg",
    rating: 5,
  },
  {
    name: "Stephanie Ross",
    role: "COO at InnovateCo",
    company: "InnovateCo",
    quote: "I know it's cliché, but we were completely lost before we partnered. Can't thank the HEXCYRA team enough!",
    image: "/img/avatar-3.jpg",
    rating: 5,
  },
  {
    name: "Marie Dubois",
    role: "CFO at FuturePlanning",
    company: "FuturePlanning",
    quote: "Their products make planning and scaling seamless. Delivered measurable ROI in the very first quarter.",
    image: "/img/avatar-4.jpg",
    rating: 5,
  },
  {
    name: "Andre Gomez",
    role: "Head of Design at CreativeSolutions",
    company: "CreativeSolutions",
    quote: "If I could give 11 stars, I'd give 12. Exceptional eye for detail, performance, and typography.",
    image: "/img/avatar-5.jpg",
    rating: 5,
  },
  {
    name: "Jeremy Scott",
    role: "Product Manager at TimeWise",
    company: "TimeWise",
    quote: "SO SO HAPPY WE FOUND YOU GUYS! Saved me over 100 hours of development and configuration already.",
    image: "/img/avatar-6.jpg",
    rating: 5,
  },
  {
    name: "Pamela Wright",
    role: "Marketing Director at BrandBuilders",
    company: "BrandBuilders",
    quote: "Took some convincing, but now that we're on their architecture, our conversions have tripled.",
    image: "/img/avatar-1.jpg",
    rating: 5,
  },
  {
    name: "Daniel Zhang",
    role: "Data Scientist at AnalyticsPro",
    company: "AnalyticsPro",
    quote: "The speed and performance improvements are staggering. Real-time data sync without any bottlenecks.",
    image: "/img/avatar-2.jpg",
    rating: 5,
  },
  {
    name: "Fernando Silva",
    role: "UX Lead at UserFirst",
    company: "UserFirst",
    quote: "It's just the best. Period. Fast, intuitive, and thoughtfully crafted from the ground up.",
    image: "/img/avatar-5.jpg",
    rating: 5,
  },
  {
    name: "Andy Campbell",
    role: "DevOps Lead at CloudMasters",
    company: "CloudMasters",
    quote: "Migrated our core systems with zero downtime and ironclad security. Absolutely brilliant work.",
    image: "/img/avatar-2.jpg",
    rating: 5,
  },
  {
    name: "Marina Petrova",
    role: "HR Director at TalentForge",
    company: "TalentForge",
    quote: "So simple and intuitive, we got our entire operations team trained and working in ten minutes.",
    image: "/img/avatar-3.jpg",
    rating: 5,
  },
  {
    name: "Olivia Chen",
    role: "Client Success at ScaleFlow",
    company: "ScaleFlow",
    quote: "Customer support and proactive engineering guidance are unparalleled. Always one step ahead.",
    image: "/img/avatar-6.jpg",
    rating: 5,
  },
];

interface TestimonialCardProps {
  item: StaggerTestimonialItem;
}

function TestimonialCard({ item }: TestimonialCardProps) {
  return (
    <div className="review-card group relative flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-400 hover:shadow-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-amber-400">
          {Array.from({ length: item.rating ?? 5 }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
          ))}
        </div>
        <Quote className="h-5 w-5 text-slate-300 transition-colors group-hover:text-fuchsia-500" />
      </div>

      <p className="mt-4 text-sm font-medium leading-relaxed text-slate-700">
        &ldquo;{item.quote}&rdquo;
      </p>

      <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-4">
        <img
          src={item.image}
          alt={item.name}
          width={40}
          height={40}
          loading="lazy"
          className="h-10 w-10 shrink-0 rounded-full object-cover ring-2 ring-slate-100"
        />
        <div className="min-w-0">
          <h4 className="truncate text-sm font-bold text-slate-900">
            {item.name}
          </h4>
          <p className="truncate text-xs font-medium text-slate-500">
            {item.role}
          </p>
        </div>
      </div>
    </div>
  );
}

export interface StaggerTestimonialsProps {
  testimonials?: StaggerTestimonialItem[];
  className?: string;
  title?: string;
  accent?: string;
  subtitle?: string;
  kicker?: string;
}

export const StaggerTestimonials = ({
  testimonials = DEFAULT_TESTIMONIALS,
  className,
  title = "Trusted by leaders,",
  accent = "verified by results.",
  subtitle = "Real feedback from founders, executives, and engineering teams partnering with HEXCYRA.",
  kicker = "Client Feedback & Evidence",
}: StaggerTestimonialsProps) => {
  // Split into 3 columns for staggered vertical tracks
  const col1 = testimonials.filter((_, i) => i % 3 === 0);
  const col2 = testimonials.filter((_, i) => i % 3 === 1);
  const col3 = testimonials.filter((_, i) => i % 3 === 2);

  // Duplicate each column array so the vertical loop is seamless
  const list1 = [...col1, ...col1];
  const list2 = [...col2, ...col2];
  const list3 = [...col3, ...col3];

  return (
    <section className={cn("reviews-light relative w-full overflow-hidden py-20 md:py-28", className)}>
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="reveal max-w-3xl">
          {kicker && (
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-slate-600 shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-lime-500" />
              {kicker}
            </span>
          )}

          <h2 className="mt-6 font-display text-4xl font-extrabold leading-[1.12] tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
            {title}{" "}
            {accent && (
              <span className="bg-gradient-to-r from-fuchsia-500 to-indigo-500 bg-clip-text pr-3 pb-1 inline-block italic text-transparent">
                {accent}
              </span>
            )}
          </h2>

          {subtitle && (
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">
              {subtitle}
            </p>
          )}
        </div>

        {/* Staggered Vertical Marquee Container */}
        <div className="reveal relative mt-14 h-[600px] md:h-[680px] overflow-hidden">
          {/* Top & Bottom fade gradient masks */}
          <div className="testimonial-fade testimonial-fade-top pointer-events-none absolute inset-x-0 top-0 z-20 h-24" />
          <div className="testimonial-fade testimonial-fade-bottom pointer-events-none absolute inset-x-0 bottom-0 z-20 h-28" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-full">
            {/* Column 1 - scrolls up */}
            <div className="relative overflow-hidden h-full">
              <div
                className="animate-marquee-vertical pause-on-hover flex flex-col gap-6"
                style={{ "--marquee-duration": "38s" } as React.CSSProperties}
              >
                {list1.map((item, idx) => (
                  <TestimonialCard key={`col1-${idx}-${item.name}`} item={item} />
                ))}
              </div>
            </div>

            {/* Column 2 - scrolls reverse (downward) for stagger effect */}
            <div className="relative overflow-hidden h-full hidden md:block">
              <div
                className="animate-marquee-vertical-reverse pause-on-hover flex flex-col gap-6"
                style={{ "--marquee-duration": "44s" } as React.CSSProperties}
              >
                {list2.map((item, idx) => (
                  <TestimonialCard key={`col2-${idx}-${item.name}`} item={item} />
                ))}
              </div>
            </div>

            {/* Column 3 - scrolls up at slightly different duration */}
            <div className="relative overflow-hidden h-full hidden lg:block">
              <div
                className="animate-marquee-vertical pause-on-hover flex flex-col gap-6"
                style={{ "--marquee-duration": "48s" } as React.CSSProperties}
              >
                {list3.map((item, idx) => (
                  <TestimonialCard key={`col3-${idx}-${item.name}`} item={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StaggerTestimonials;
