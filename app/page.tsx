"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Car, Plane, Briefcase, MapPinned, Users, Bus, Phone, MessageCircle, ChevronRight, CheckCircle2, Star, Shield, Clock3, Building2, Image as ImageIcon, Mail, Menu, X, ExternalLink, MapPin, Instagram, Facebook } from "lucide-react";

const logoSrc = "data:image/png;base64,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mQ9n4mQ8p5lY9m5j9n4mQ8p4mQ9o5lY8l5j9m4mQ9n4mQ8p5lY9m5j9n4mQ8p4mQ9o5lY8l5j9m4mQ9n4mQ8p5lY9m5j9n4mQ8p4mQ9o5lY8l5j9m4mQ9n4mQ8p5lY9m5j9n4mQ8p4mQ9o5lY8l5j9m4mQ9n4mQ8p5lY9m5j9n4mQ8p4mQ9o5lY8l5j9m4mQ9n4mQ8p5lY9m5j9n4mQ8p4mQ9o5lY8l5j9m4mQ9n4mQ8p5lY9m5j9n4mQ8p4mQ9o5lY8l5j9m4mQ9n4mQ8p5lY9m5j9n4mQ8p4mQ9o5lY8l5j9m4mQ9n4mQ8p5lY9m5j9n4mQ8p4mQ9o5lY8l5j9m4mQ9n4mQ8p5lY9m5j9n4mQ8p4mQ9o5lY8l5j9m4mQ9n4mQ8p5lY9m5j9n4mQ8p4mQ9o5lY8l5j9m4mQ9n4mQ8p5lY9m5j9n4mQ8p4mQ9o5lY8l5j9m4mQ9n4mQ8p5lY9m5j9n4mQ8p4mQ9o5lY8l5j9m4mQ9n4mQ8p5lY9m5j9n4mQ8p4mQ9o5lY8l5j9m4mQ9n4mQ8p5lY9m5j9n4mQ8p4mQ9o5lY8l5j9m4mQ9n4mQ8p5lY9m5j9n4mQ8p4mQ9o5lY8l5j9m4mQ9n4mQ8p5lY9m5j9n4mQ8p4mQ9o5lY8l5j9m4mQ9n4mQ8p5lY9m5j9n4mQ8p4mQ9o5lY8l5j9m4mQ9n4mQ8p5lY9m5j9n4mQ8p4mQ9o5lY8l5j9m4mQ9n4mQ8p5lY9m5j9n4mQ8p4mQ9o5lY8l5j9m4mQ9n4mQ8p5lY9m5j9n4mQ8p4mQ9o5lY8l5j9m4mQ9n4mQ8p5lY9m5j9n4mQ8p4mQ9o5lY8l5j9m4mQ9n4mQ8p5lY9m5j9n4mQ8p4mQ9o5lY8l5j9m4mQ9n4mQ8p5lY9m5j9n4mQ8p4mQ9o5lY8l5j9m4mQ9n4mQ8p5lY9m5j9n4mQ8p4mQ9o5lY8l5j9m4mQ9n4mQ8p5lY9m5j9n4mQ8p4mQ9o5lY8l5j9m4mQ9n4mQ8p5lY9m5j9n4mQ8p4mQ9o5lY8l5j9m4mQ9n4mQ8p5lY9m5j9n4mQ8p4mQ9o5lY8l5j9m4mQ9n4mQ8p5lY9m5j9n4mQ8p4mQ9o5lY8l5j9m4mQ9n4mQ8p5lY9m5j9n4mQ8p4mQ9o5lY8l5j9m4mQ9n4mQ8p5lY9m5j9n4mQ8p4mQ9o5lY8l5j9m4mQ9n4mQ8p5lY9m5j9n4mQ8p4mQ9o5lY8l5j9m4mQ9n4mQ8p5lY9m5j9n4mQ8p4mQ9o5lY8l5j9m4mQ9n4mQ8p5lY9m5j9n4mQ8p4mQ9o5lY8l5j9m4mQ9n4mQ8p5lY9m5j9n4mQ8p4mQ9o5lY8l5j9m4mQ9n4mQ8p5lY9m5j9n4mQ8p4mQ9o5lY8l5j9m4mQ9n4mQ8p5lY9m5j9n4mQ8p4mQ9o5lY8l5j9m4mQ9n4mQ8p5lY9m5j9n4mQ8p4mQ9o5lY8l5j9m4mQ9n4mQ8p5lY9m5j9n4mQ8p4mQ9o5lY8l5j9m4mQ9n4mQ8p5lY9m5j9n4mQ8p4mQ9o5lY8l5j9m4mQ9n4mQ8p5lY9m5j9n4mQ8p4mQ9o5lY8l5j9m4mQ9n4mQ8p5lY9m5j9n4mQ8p4mQ9o5lY8l5j9m4mQ9n4mQ8p5lY9m5j9n4mQ8p4mQ9o5lY8l5j9m4mQ9n4mQ8p5lY9m5j9n4mQ8p4mQ9o5lY8l5j9m4mQ9n4mQ8p5lY9m5j9n4mQ8p4mQ9o5lY8l5j9m4mQ9n4mQ8p5lY9m5j9n4mQ8p4mQ9o5lY8l5j9m4mQ9n4mQ8p5lY9m5j9n4mQ8p4mQ9o5lY8l5j9m4mQ9n4mQ8p5lY9m5j9n4mQ8p4mQ9o5lY8l5j9m4mQ9n4mQ8p5lY9m5j9n4mQ8p4mQ9o5lY8l5j9m4mQ9n4mQ8p5lY9m5j9n4mQ8p4mQ9o5lY8l5j9m4mQ9n4mQ8p5lY9m5j9n4mQ8p4mQ9o5lY8l5j9m4mQ9n4mQ8p5lY9m5j9n4mQ8p4mQ9o5lY8l5j9m4mQ9n4mQ8p5lY9m5j9n4mQ8p4mQ9o5lY8l5j9m4mQ9n4mQ8p5lY9m5j9n4mQ8p4mQ9o5lY8l5j9m4mQ9n4mQ8p5lY9m5j9n4mQ8p4mQ9o5lY8l5j9m4mQ9n4mQ8p5lY9m5j9n4mQ8p4mQ9o5lY8l5j9m4mQ9n4mQ8p5lY9m5j9n4mQ8p4mQ9o5lY8l5j9m4mQ9n4mQ8p5lY9m5j9n4mQ8p4mQ9o5lY8l5j9m4mQ9n4mQ8p5lY9m5j9n4mQ8p4mQ9o5lY8l5j9m4mQ9n4mQ8p5lY9m5j9n4mQ8p4mQ9o5lY8l5j9m4mQ9n4mQ8p5lY9m5j9n4mQ8p4mQ9o5lY8l5j9m4mQ9n4mQ8p5lY9m5j9n4mQ8p4mQ9o5lY8l5j9m4mQ9n4mQ8p5lY9m5j9n4mQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgH/4A4V6zv7M0SYAAAAASUVORK5CYII=";

const company = {
  name: "Alpha Lux Transportation",
  domain: "alphaluxtt.com",
  whatsapp: "+601188880513",
  whatsappLink: "https://wa.me/601188880513",
  phone: "+601188880513",
  phoneLink: "tel:+601188880513",
  email: "alphaluxtt@gmail.com",
  emailLink: "mailto:alphaluxtt@gmail.com",
  instagram: "https://www.instagram.com/alphalux.tt/",
  facebook: "https://web.facebook.com/alphaluxtt",
  mapLink: "https://maps.app.goo.gl/ajhHzNPLu2KRRKVn9",
  address: "3A-G-35, Straits Quay, Lorong Seri Tanjung Pinang, Seri Tanjung Pinang, 10470 Tanjung Tokong, Pulau Pinang",
};

const pages = [
  { key: "home", label: "Home" },
  { key: "services", label: "Services" },
  { key: "fleet", label: "Fleet" },
  { key: "about", label: "About" },
  { key: "booking", label: "Booking" },
  { key: "faq", label: "FAQ" },
];

const services = [
  {
    icon: Plane,
    title: "机场接送",
    en: "Airport Transfer",
    desc: "提供准时机场接送、酒店接驳、航班时段安排与VIP迎送服务。",
  },
  {
    icon: Briefcase,
    title: "商务出行",
    en: "Corporate Travel",
    desc: "适合公司客户、会议接待、贵宾接送、展会活动与长期企业合作。",
  },
  {
    icon: MapPinned,
    title: "旅游包车",
    en: "Private Tour Charter",
    desc: "槟城及全马包车，支持多站行程、家庭出游、景点安排与定制路线。",
  },
  {
    icon: Car,
    title: "点对点服务",
    en: "Point-to-Point",
    desc: "从住宅、酒店、景点、商场到任意目的地，享受舒适直接的接送体验。",
  },
  {
    icon: Star,
    title: "婚礼用车",
    en: "Wedding Transport",
    desc: "提供高端婚礼接送、贵宾用车与特别场合出行服务。",
  },
  {
    icon: Car,
    title: "豪华车租借",
    en: "Luxury Car Rental",
    desc: "主打高端舒适车型，适合贵宾接待、重要客户与商务形象出行。",
  },
  {
    icon: Bus,
    title: "跨州接送",
    en: "Interstate Transfer",
    desc: "支持槟城及全马跨州接送，适合商务、旅游与家庭长途行程。",
  },
  {
    icon: Users,
    title: "长期接送服务",
    en: "Long-Term Shuttle Service",
    desc: "提供公司长期用车、员工通勤与工厂工人巴士接送等稳定安排。",
  },
];

const fleet = [
  {
    category: "Executive Sedan",
    size: "5座",
    title: "City / Altis / Proton X70 / Nissan X-Trail / CRV / Hilux",
    desc: "适合个人客户、小家庭与商务接待。可载约3位乘客 + 2个中型行李。",
    use: ["机场接送", "点对点服务", "商务出行"],
  },
  {
    category: "MPV / Family",
    size: "7座",
    title: "Serena / Voxy / Nova",
    desc: "适合家庭、机场接送与中短途行程。可载约4–5位乘客 + 1个大型行李 + 1个中型行李。",
    use: ["家庭旅游", "机场接送", "酒店接送"],
  },
  {
    category: "Premium MPV",
    size: "豪华7座",
    title: "Alphard / Vellfire 30Z / Alphard / Vellfire 40Z",
    desc: "主推 Alphard 40Z，适合VIP接待、高端商务与豪华包车。可载约4–6位乘客 + 2个大型行李。",
    use: ["VIP包车", "商务接待", "婚礼用车"],
  },
  {
    category: "Group Van",
    size: "10–18座",
    title: "Starex / Staria / G10 / Van 12–18 Seater",
    desc: "适合团队接送、旅游包车、公司活动与跨州行程。",
    use: ["公司团队", "旅游包车", "活动接驳"],
  },
  {
    category: "Coach / Bus",
    size: "24–44座",
    title: "Bus / Coach",
    desc: "适合大型团队、工厂工人接送、企业班车、学校与团体旅游。",
    use: ["工厂巴士", "大型活动", "团体旅游"],
  },
];

const faqs = [
  {
    q: "你们提供哪些服务？",
    a: "我们提供机场接送、商务出行、旅游包车、点对点接送、婚礼用车、豪华车租借、跨州接送、公司长期接送及工厂工人巴士接送服务。",
  },
  {
    q: "主推车型是什么？",
    a: "我们的主推车型是 Alphard 40Z，适合高端机场接送、商务客户、婚礼用车与VIP贵宾行程。",
  },
  {
    q: "可以安排多少座位的车？",
    a: "我们可安排5座、7座、豪华7座、10–18座Van以及24–44座Bus，满足个人到大型团队的不同需求。",
  },
  {
    q: "行李容量怎么安排？",
    a: "5座车一般可坐3位客人 + 2个中型行李；7座车一般可坐4–5位客人 + 1个大型行李和1个中型行李；豪华7座一般可坐4–6位客人 + 2个大型行李。",
  },
  {
    q: "价格怎么计算？",
    a: "点对点服务会根据路线单独报价；小时包车最低4小时起。更长路线、跨州行程或团队接送可按需求定制报价。",
  },
  {
    q: "可以预订槟城以外的行程吗？",
    a: "可以。我们支持槟城及全马来西亚包车和跨州接送服务。",
  },
  {
    q: "有安保随行服务吗？",
    a: "可按需求安排安保随行服务，具体内容将依据当地法律法规、实际路线和合法资质进行安排。",
  },
  {
    q: "网站可以加入真实车辆照片吗？",
    a: "可以。上传你的车队照片、司机形象照、机场接送照、旅游服务照和品牌Logo后，就能直接替换到官网设计里。",
  },
];

type SectionTitleProps = {
  eyebrow: string;
  title: string;
  desc?: string;
};

type ImagePlaceholderProps = {
  title: string;
  subtitle: string;
  tall?: boolean;
};

type ButtonLinkProps = {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  primary?: boolean;
  external?: boolean;
};

type PageProps = {
  setCurrentPage?: (page: string) => void;
};

function SectionTitle({ eyebrow, title, desc }: SectionTitleProps) {
  return (
    <div className="max-w-3xl">
      <div className="text-sm uppercase tracking-[0.35em] text-[#d4af67]">{eyebrow}</div>
      <h2 className="mt-4 text-3xl font-semibold sm:text-4xl lg:text-5xl">{title}</h2>
      {desc ? <p className="mt-4 text-base leading-8 text-white/65">{desc}</p> : null}
    </div>
  );
}

function ImagePlaceholder({ title, subtitle, tall = false }: ImagePlaceholderProps) {
  return (
    <div className={`relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-white/10 to-white/[0.03] ${tall ? "min-h-[340px]" : "min-h-[230px]"}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,103,0.18),transparent_26%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.07),transparent_20%)]" />
      <div className="relative flex h-full min-h-[inherit] flex-col justify-between p-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#d4af67]/25 bg-[#d4af67]/10 text-[#d4af67]">
          <ImageIcon className="h-5 w-5" />
        </div>
        <div>
          <div className="text-lg font-semibold">{title}</div>
          <div className="mt-2 text-sm leading-7 text-white/60">{subtitle}</div>
        </div>
      </div>
    </div>
  );
}

function ButtonLink({
  children,
  onClick,
  href,
  primary = false,
  external = false,
}: ButtonLinkProps) {
  const className = primary
    ? "inline-flex items-center justify-center rounded-full bg-[#d4af67] px-6 py-3 text-sm font-semibold text-black transition hover:scale-[1.02]"
    : "inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10";

  if (href) {
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
        className={className}
      >
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  );
}

function FloatingWhatsApp() {
  return (
    <a
      href={company.whatsappLink}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-[60] inline-flex items-center gap-3 rounded-full border border-[#d4af67]/20 bg-[#111216] px-5 py-3 text-sm font-semibold text-white shadow-2xl transition hover:scale-[1.02]"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#d4af67] text-black">
        <MessageCircle className="h-5 w-5" />
      </span>
      <span className="hidden sm:inline">WhatsApp Us</span>
    </a>
  );
}

export default function AlphaLuxTransportationWebsite() {
  const [currentPage, setCurrentPage] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (pages.some((p) => p.key === hash)) setCurrentPage(hash);
  }, []);

  useEffect(() => {
    window.location.hash = currentPage;
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMobileOpen(false);
  }, [currentPage]);

  const currentLabel = useMemo(() => pages.find((p) => p.key === currentPage)?.label || "Home", [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case "services":
        return <ServicesPage setCurrentPage={setCurrentPage} />;
      case "fleet":
        return <FleetPage setCurrentPage={setCurrentPage} />;
      case "about":
        return <AboutPage setCurrentPage={setCurrentPage} />;
      case "booking":
        return <BookingPage setCurrentPage={setCurrentPage} />;
      case "faq":
        return <FaqPage setCurrentPage={setCurrentPage} />;
      default:
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0b0d] text-white">
      <FloatingWhatsApp />
      <div className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <button onClick={() => setCurrentPage("home")} className="flex items-center gap-3 text-left">
            <img src={logoSrc} alt="Alpha Lux Transportation logo" className="h-12 w-12 rounded-xl border border-white/10 object-cover" />
            <div>
              <div className="text-lg font-semibold tracking-[0.28em] text-[#d4af67]">ALPHA LUX</div>
              <div className="text-[11px] uppercase tracking-[0.35em] text-white/55">Transportation</div>
            </div>
          </button>

          <div className="hidden items-center gap-7 md:flex">
            {pages.map((page) => (
              <button
                key={page.key}
                onClick={() => setCurrentPage(page.key)}
                className={`text-sm transition ${currentPage === page.key ? "text-[#d4af67]" : "text-white/70 hover:text-white"}`}
              >
                {page.label}
              </button>
            ))}
          </div>

          <div className="hidden md:block">
            <ButtonLink primary href={company.whatsappLink} external>立即询价</ButtonLink>
          </div>

          <button className="md:hidden" onClick={() => setMobileOpen((v) => !v)}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {mobileOpen ? (
          <div className="border-t border-white/10 bg-[#0d0d10] px-6 py-4 md:hidden">
            <div className="grid gap-3">
              {pages.map((page) => (
                <button
                  key={page.key}
                  onClick={() => setCurrentPage(page.key)}
                  className={`rounded-2xl px-4 py-3 text-left text-sm ${currentPage === page.key ? "bg-[#d4af67]/12 text-[#d4af67]" : "bg-white/5 text-white/75"}`}
                >
                  {page.label}
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      <div className="h-[76px]" />

      <motion.main
        key={currentPage}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.32 }}
      >
        {renderPage()}
      </motion.main>

      <footer className="border-t border-white/10 bg-[#09090b]">
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto_auto] lg:items-center">
            <div>
              <div className="flex items-center gap-3 text-base font-semibold tracking-[0.22em] text-[#d4af67]"><img src={logoSrc} alt="Alpha Lux logo" className="h-10 w-10 rounded-lg border border-white/10 object-cover" />ALPHA LUX TRANSPORTATION</div>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/60">
                高端包车服务官网示范版本。当前页面：{currentLabel}。已加入真实品牌资料、联系方式与服务内容；后续可继续接入真实图片、WhatsApp直连、Google Map、客户评价和中英双语内容。
              </p>
            </div>
            <div className="text-sm text-white/60">
              <div>Contact</div>
              <div className="mt-2 font-medium text-white">+601188880513</div>
            </div>
            <div className="text-sm text-white/60">
              <div>Featured Fleet</div>
              <div className="mt-2 font-medium text-white">Alphard 40Z · 5 Seats – 44 Seats</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function HomePage({ setCurrentPage }: PageProps) {
  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,103,0.18),transparent_28%),radial-gradient(circle_at_left,rgba(255,255,255,0.06),transparent_20%)]" />
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[1.12fr_0.88fr] lg:px-10 lg:py-24">
          <div>
            <div className="inline-flex rounded-full border border-[#d4af67]/25 bg-[#d4af67]/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-[#d4af67]">
              Premium Chauffeur & Charter Service
            </div>
            <h1 className="mt-6 max-w-5xl text-4xl font-semibold leading-tight sm:text-5xl lg:text-7xl">
              Alpha Lux Transportation
              <span className="mt-3 block text-white/70">高端机场接送、商务出行与旅游包车服务</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/68 sm:text-lg">
              提供机场接送、商务接待、旅游包车、点对点接送、婚礼用车、豪华车租借、跨州接送与长期接驳等一站式地面交通服务，车队覆盖 5 座到 44 座，适合个人、家庭、企业客户与大型团队。
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <ButtonLink primary href={company.whatsappLink} external>立即获取报价</ButtonLink>
              <ButtonLink onClick={() => setCurrentPage("fleet")}>查看车队</ButtonLink>
              <ButtonLink href={company.mapLink} external>查看地址</ButtonLink>
            </div>
            <div className="mt-6 flex flex-wrap gap-3 text-sm text-white/70">
              <a href={company.instagram} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 transition hover:border-[#d4af67]/25">
                <Instagram className="h-4 w-4 text-[#d4af67]" /> @alphalux.tt
              </a>
              <a href={company.facebook} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 transition hover:border-[#d4af67]/25">
                <Facebook className="h-4 w-4 text-[#d4af67]" /> Facebook Page
              </a>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                ["5–44座", "车型灵活配置"],
                ["商务级体验", "准时、舒适、专业"],
                ["全马服务", "机场 / 旅游 / 跨州"],
              ].map(([title, text]) => (
                <div key={title} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                  <div className="text-2xl font-semibold text-[#d4af67]">{title}</div>
                  <div className="mt-2 text-sm text-white/62">{text}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-[#1b1b1f] to-[#101013] p-6">
              <div className="text-sm uppercase tracking-[0.3em] text-[#d4af67]">Brand Identity</div>
              <div className="mt-5 rounded-[1.5rem] border border-white/10 bg-white/5 p-6">
                <img src={logoSrc} alt="Alpha Lux Transportation brand logo" className="mx-auto w-full max-w-[320px] rounded-2xl object-contain" />
              </div>
              <p className="mt-4 text-sm leading-7 text-white/62">当前先用品牌 Logo 做首页视觉。等你后面补上 Alphard 40Z、机场接送与商务接待图片后，这里会直接升级成真正的豪华包车官网主横幅。</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <a href={company.whatsappLink} target="_blank" rel="noreferrer" className="rounded-2xl border border-[#d4af67]/20 bg-[#d4af67]/10 px-4 py-4 text-sm text-white/80 transition hover:border-[#d4af67]/35">
                  <div className="font-medium text-white">WhatsApp</div>
                  <div className="mt-1 text-white/60">{company.whatsapp}</div>
                </a>
                <a href={company.emailLink} className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 text-sm text-white/80 transition hover:border-[#d4af67]/25">
                  <div className="font-medium text-white">Email</div>
                  <div className="mt-1 break-all text-white/60">{company.email}</div>
                </a>
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <ImagePlaceholder title="机场接送图片" subtitle="建议放机场举牌接送或车停靠机场照片。" />
              <ImagePlaceholder title="商务接待图片" subtitle="建议放西装司机、酒店门口、企业客户接送画面。" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <SectionTitle
          eyebrow="Our Services"
          title="核心服务一目了然"
          desc="网站首页建议把客户最常找的服务直接展示出来，让用户一进站就知道你们能做什么。"
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {services.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#d4af67]/25 bg-[#d4af67]/10 text-[#d4af67]">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="mt-5 text-xs uppercase tracking-[0.25em] text-[#d4af67]">{item.en}</div>
                <h3 className="mt-3 text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/62">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-white/[0.03]">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[0.92fr_1.08fr] lg:px-10">
          <div>
            <SectionTitle
              eyebrow="Fleet Preview"
              title="从5座到44座，满足不同场景"
              desc="家庭出游、企业接待、团队活动、跨州出行，都能根据人数和需求灵活安排车型。"
            />
            <div className="mt-8 flex gap-4">
              <ButtonLink primary onClick={() => setCurrentPage("fleet")}>进入 Fleet 页面</ButtonLink>
              <ButtonLink onClick={() => setCurrentPage("booking")}>咨询车型</ButtonLink>
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {fleet.map((item) => (
              <div key={item.title} className="rounded-[1.75rem] border border-white/10 bg-[#111216] p-6">
                <div className="text-xs uppercase tracking-[0.24em] text-[#d4af67]">{item.category}</div>
                <div className="mt-3 text-3xl font-semibold text-white">{item.size}</div>
                <div className="mt-2 text-lg font-medium text-white/92">{item.title}</div>
                <p className="mt-3 text-sm leading-7 text-white/62">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="rounded-[2rem] border border-[#d4af67]/20 bg-gradient-to-r from-[#d4af67]/12 to-white/[0.03] p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="text-sm uppercase tracking-[0.32em] text-[#d4af67]">Ready For Launch</div>
              <h3 className="mt-3 text-3xl font-semibold">这套网站已适合整理成 Vercel 正式上线版</h3>
              <p className="mt-4 max-w-3xl text-base leading-8 text-white/72">
                目前已具备完整首页、服务、车队、关于我们、联系和 FAQ 页面架构，也已经加入真实公司资料、社交链接与联系方式。后续只要补上车队真实照片，就能进一步升级成正式商业官网。
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <ButtonLink primary href={company.whatsappLink} external>WhatsApp 询价</ButtonLink>
              <ButtonLink onClick={() => setCurrentPage("booking")}>查看联系页</ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ServicesPage({ setCurrentPage }: PageProps) {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
      <SectionTitle
        eyebrow="Services"
        title="服务页面"
        desc="这个页面适合详细介绍每一种包车服务，帮助客户快速判断是否符合他们的出行需求。"
      />
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {services.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="rounded-[2rem] border border-white/10 bg-white/5 p-7">
              <div className="flex items-start gap-4">
                <div className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#d4af67]/25 bg-[#d4af67]/10 text-[#d4af67]">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-[0.24em] text-[#d4af67]">{item.en}</div>
                  <h3 className="mt-2 text-2xl font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-8 text-white/65">{item.desc}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {[
                      "准时安排",
                      "舒适体验",
                      "可定制路线",
                    ].map((tag) => (
                      <span key={tag} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-white/70">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <ImagePlaceholder title="服务页横幅图" subtitle="建议使用机场、酒店门口、客户上下车、旅游景点接送等真实照片。" tall />
        <div className="rounded-[2rem] border border-white/10 bg-[#111216] p-7">
          <div className="text-sm uppercase tracking-[0.32em] text-[#d4af67]">Best For</div>
          <div className="mt-4 grid gap-4">
            {[
              { icon: Users, title: "家庭与游客", text: "旅游包车、酒店接送、景点行程。" },
              { icon: Building2, title: "企业客户", text: "会议、展会、商务贵宾接待。" },
              { icon: Plane, title: "机场旅客", text: "准时接送、行李空间与舒适出行。" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="flex items-center gap-3">
                    <Icon className="h-4 w-4 text-[#d4af67]" />
                    <div className="font-medium">{item.title}</div>
                  </div>
                  <p className="mt-2 text-sm leading-7 text-white/62">{item.text}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-6">
            <ButtonLink primary href={company.whatsappLink} external>咨询服务方案</ButtonLink>
          </div>
        </div>
      </div>
    </div>
  );
}

function FleetPage({ setCurrentPage }) {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
      <SectionTitle
        eyebrow="Fleet"
        title="车型页面"
        desc="车型页非常重要，因为客户通常会先看你们有哪些车、适合多少人、适合什么场景。"
      />
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {fleet.map((item) => (
          <div key={item.title} className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5">
            <div className="p-7">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs uppercase tracking-[0.25em] text-[#d4af67]">{item.category}</div>
                  <h3 className="mt-3 text-2xl font-semibold">{item.title}</h3>
                </div>
                <div className="rounded-full border border-[#d4af67]/25 bg-[#d4af67]/10 px-4 py-2 text-sm font-medium text-[#d4af67]">{item.size}</div>
              </div>
              <p className="mt-4 text-sm leading-8 text-white/65">{item.desc}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {item.use.map((tag) => (
                  <span key={tag} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-white/70">{tag}</span>
                ))}
              </div>
            </div>
            <div className="border-t border-white/10 p-6">
              <ImagePlaceholder title={`${item.size} 车型图片区`} subtitle="这里可以放真实车辆外观图、内饰图或客户上下车场景。" />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-12 rounded-[2rem] border border-[#d4af67]/20 bg-gradient-to-r from-[#d4af67]/10 to-white/[0.03] p-8">
        <h3 className="text-2xl font-semibold">建议你优先上传这些车型图片</h3>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            "Alphard / 豪华MPV",
            "商务Van / 团队接送车",
            "巴士 / Coach",
            "内饰与座椅细节",
          ].map((item) => (
            <div key={item} className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-sm text-white/78">{item}</div>
          ))}
        </div>
        <div className="mt-6">
          <ButtonLink primary href={company.whatsappLink} external>WhatsApp 咨询车型</ButtonLink>
        </div>
      </div>
    </div>
  );
}

function AboutPage({ setCurrentPage }: PageProps) {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
      <div className="grid gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-center">
        <div>
          <SectionTitle
            eyebrow="About Us"
            title="关于我们页面"
            desc="这一页建议用来建立信任感，告诉客户为什么选择 Alpha Lux Transportation。"
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              { icon: Shield, title: "专业可靠", text: "注重品牌形象、行程安排与客户体验。" },
              { icon: Clock3, title: "准时服务", text: "机场接送与商务行程更需要时间管理。" },
              { icon: Star, title: "高端体验", text: "舒适车型、礼貌服务与商务级接待感。" },
              { icon: Users, title: "灵活配车", text: "从个人到大型团队都能快速安排。" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                  <Icon className="h-5 w-5 text-[#d4af67]" />
                  <div className="mt-4 text-lg font-semibold">{item.title}</div>
                  <p className="mt-2 text-sm leading-7 text-white/63">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
        <ImagePlaceholder title="关于我们 / 品牌形象图" subtitle="建议放公司Logo、司机专业形象照、车队合照或客户接待照片。" tall />
      </div>

      <div className="mt-12 rounded-[2rem] border border-white/10 bg-[#111216] p-8">
        <div className="text-sm uppercase tracking-[0.32em] text-[#d4af67]">Suggested Copy</div>
        <p className="mt-4 max-w-4xl text-base leading-8 text-white/72">
          Alpha Lux Transportation 自 2023 年开始运营，致力于为客户提供高端、舒适、可靠的地面交通服务。我们专注于机场接送、企业商务出行、私人旅游包车、点对点接送、婚礼用车、豪华车租借、跨州接送，以及公司长期接送与工厂工人巴士服务。无论是个人客户、家庭旅客、企业团队还是大型团体，我们都以专业态度、灵活配车和细致安排，为每一段旅程带来更安心、更体面的出行体验。
        </p>
        <div className="mt-6">
          <ButtonLink primary href={company.whatsappLink} external>联系 Alpha Lux</ButtonLink>
        </div>
      </div>
    </div>
  );
}

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
      <SectionTitle
        eyebrow="Booking / Contact"
        title="预订与联系页面"
        desc="这是更接近正式上线的联系页版本，已经加入可点击联系方式、社交媒体与地图位置。"
      />
      <div className="mt-10 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-7">
          <div className="grid gap-5 sm:grid-cols-2">
            {[
              ["用车日期", "例如：12 Apr 2026"],
              ["上车地点", "例如：Penang Airport"],
              ["目的地", "例如：Gurney / KL / Ipoh"],
              ["人数", "例如：2 / 6 / 12 / 30 pax"],
              ["车型需求", "例如：Alphard 40Z / Van / Bus"],
              ["联系电话", company.phone],
            ].map(([label, placeholder]) => (
              <div key={label}>
                <div className="mb-2 text-sm text-white/75">{label}</div>
                <div className="rounded-2xl border border-white/10 bg-[#111216] px-4 py-4 text-sm text-white/35">{placeholder}</div>
              </div>
            ))}
          </div>
          <div className="mt-5">
            <div className="mb-2 text-sm text-white/75">备注</div>
            <div className="min-h-[120px] rounded-2xl border border-white/10 bg-[#111216] px-4 py-4 text-sm text-white/35">
              例如：需要儿童座椅 / 多站点 / 往返服务 / 行李较多 / VIP接待
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink primary href={company.whatsappLink} external>WhatsApp 询价</ButtonLink>
            <ButtonLink href={company.phoneLink}>直接致电</ButtonLink>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[2rem] border border-white/10 bg-[#111216] p-7">
            <div className="text-sm uppercase tracking-[0.32em] text-[#d4af67]">Direct Contact</div>
            <div className="mt-5 space-y-4">
              {[
                { icon: MessageCircle, title: "WhatsApp", text: company.whatsapp, href: company.whatsappLink },
                { icon: Phone, title: "Phone", text: company.phone, href: company.phoneLink },
                { icon: Mail, title: "Email", text: company.email, href: company.emailLink },
                { icon: Instagram, title: "Instagram", text: "@alphalux.tt", href: company.instagram },
                { icon: Facebook, title: "Facebook", text: "Alpha Lux Tours and Transportation", href: company.facebook },
              ].map((item) => {
                const Icon = item.icon;
                const external = item.href.startsWith("http");
                return (
                  <a
                    key={item.title}
                    href={item.href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noreferrer" : undefined}
                    className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-[#d4af67]/25"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#d4af67]/25 bg-[#d4af67]/10 text-[#d4af67]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-medium">{item.title}</div>
                      <div className="mt-1 truncate text-sm text-white/60">{item.text}</div>
                    </div>
                    <ExternalLink className="h-4 w-4 text-white/35" />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#111216]">
            <div className="border-b border-white/10 p-7">
              <div className="text-sm uppercase tracking-[0.32em] text-[#d4af67]">Location</div>
              <div className="mt-3 flex items-start gap-3 text-sm leading-7 text-white/72">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-[#d4af67]" />
                <span>{company.address}</span>
              </div>
              <div className="mt-4">
                <ButtonLink href={company.mapLink} external>Open in Google Maps</ButtonLink>
              </div>
            </div>
            <iframe
              title="Alpha Lux Transportation Location"
              src="https://www.google.com/maps?q=3A-G-35%20Straits%20Quay%20Marina%20Mall%20Tanjung%20Tokong%20Penang&output=embed"
              className="h-[280px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function FaqPage({ setCurrentPage }: PageProps) {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
      <SectionTitle
        eyebrow="FAQ"
        title="常见问题页面"
        desc="FAQ 页面可以减少客户来回询问，提高询价效率，也更适合Google搜索收录。"
      />
      <div className="mt-10 grid gap-5">
        {faqs.map((item) => (
          <div key={item.q} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#d4af67]" />
              <div>
                <h3 className="text-lg font-semibold">{item.q}</h3>
                <p className="mt-3 text-sm leading-8 text-white/64">{item.a}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-[2rem] border border-white/10 bg-[#111216] p-8">
        <div className="text-sm uppercase tracking-[0.32em] text-[#d4af67]">Next Step</div>
        <h3 className="mt-3 text-2xl font-semibold">接下来最值得加的内容</h3>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            "真实车辆照片",
            "WhatsApp 直连按钮",
            "客户评价模块",
            "中英双语内容",
          ].map((item) => (
            <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 text-sm text-white/75">{item}</div>
          ))}
        </div>
        <ButtonLink primary href={company.whatsappLink} external>继续做正式版</ButtonLink>
      </div>
    </div>
  );
}
