"use client";

import { useEffect, useMemo, useState } from "react";

type Lang = "zh" | "en";
type PageKey = "home" | "services" | "fleet" | "about" | "booking" | "faq";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  primary?: boolean;
  external?: boolean;
};

type SectionTitleProps = {
  eyebrow: string;
  title: string;
  desc?: string;
};

const company = {
  name: "Alpha Lux Transportation",
  whatsapp: "+601188880513",
  whatsappLink: "https://wa.me/601188880513",
  phone: "+601188880513",
  phoneLink: "tel:+601188880513",
  email: "alphaluxtt@gmail.com",
  emailLink: "mailto:alphaluxtt@gmail.com",
  instagram: "https://www.instagram.com/alphalux.tt/",
  facebook: "https://web.facebook.com/alphaluxtt",
  mapLink: "https://maps.app.goo.gl/ajhHzNPLu2KRRKVn9",
  address:
    "3A-G-35, Straits Quay, Lorong Seri Tanjung Pinang, Seri Tanjung Pinang, 10470 Tanjung Tokong, Pulau Pinang",
};

/*
PHOTO FILE GUIDE
Put your photos inside /public using these exact names:
logo.png
hero.webp
home1.webp
home2.webp
luxury.webp
luxury2.webp
mpv.webp
van.webp
van2.webp
bus.webp
bus_interior.webp
interior1.webp
interior2.webp
about.webp
contact.webp
*/
const images = {
  logo: "/logo.png",
  hero: "/hero.webp",
  home1: "/home1.webp",
  home2: "/home2.webp",
  luxury: "/luxury.webp",
  luxury2: "/luxury2.webp",
  mpv: "/mpv.webp",
  van: "/van.webp",
  van2: "/van2.webp",
  bus: "/bus.webp",
  busInterior: "/bus_interior.webp",
  interior1: "/interior1.webp",
  interior2: "/interior2.webp",
  about: "/about.webp",
  contact: "/contact.webp",
};

const pages: { key: PageKey; label: string }[] = [
  { key: "home", label: "Home" },
  { key: "services", label: "Services" },
  { key: "fleet", label: "Fleet" },
  { key: "about", label: "About" },
  { key: "booking", label: "Book Now" },
  { key: "faq", label: "FAQ" },
];

const content = {
  zh: {
    nav: {
      home: "首页",
      services: "服务",
      fleet: "车队",
      about: "关于我们",
      booking: "立即预订",
      faq: "常见问题",
      bookNow: "立即预订",
    },
    hero: {
      badge: "槟城及全马高端包车服务",
      title1: "高端机场接送与商务包车服务",
      title2: "Premium Private Transport in Penang & Malaysia",
      desc:
        "Alpha Lux Transportation 专注机场接送、商务接待、旅游包车、点对点接送、婚礼用车与跨州出行。主推 Alphard 40Z，车队覆盖 5 座到 44 座，适合个人客户、家庭旅客、企业团队与贵宾行程。",
      cta1: "WhatsApp 询价",
      cta2: "查看车队",
      cta3: "查看位置",
      card1t: "Alphard 40Z",
      card1d: "旗舰豪华 MPV",
      card2t: "5–44 座",
      card2d: "个人到大型团队",
      card3t: "Malaysia Wide",
      card3d: "机场 · 旅游 · 跨州",
      featureTitle: "Alphard 40Z",
      featureDesc: "适合高端机场接送、VIP 接待、商务出行与婚礼用车。",
      photo1: "机场接送",
      photo1d: "可替换成机场、酒店接客或商务迎宾照片。",
      photo2: "商务接待",
      photo2d: "可替换成酒店门口、城市接送或贵宾出行照片。",
    },
    services: {
      eyebrow: "我们的服务",
      title: "为不同出行场景提供舒适可靠的安排",
      desc: "从个人接送到企业团队出行，都能根据需求灵活安排合适车型与路线。",
      list: [
        ["机场接送", "Airport Transfer", "提供准时机场接送、酒店接驳、航班时段安排与 VIP 迎送服务。"],
        ["商务出行", "Corporate Travel", "适合公司客户、会议接待、贵宾接送、展会活动与长期企业合作。"],
        ["旅游包车", "Private Tour Charter", "槟城及全马包车，支持多站行程、家庭出游、景点安排与定制路线。"],
        ["点对点服务", "Point-to-Point", "从住宅、酒店、景点、商场到任意目的地，享受舒适直接的接送体验。"],
        ["婚礼用车", "Wedding Transport", "提供高端婚礼接送、贵宾用车与特别场合出行服务。"],
        ["豪华车租借", "Luxury MPV Charter", "主打 Alphard 40Z 与高端舒适车型，适合贵宾接待与商务形象出行。"],
        ["跨州接送", "Interstate Transfer", "支持槟城及全马跨州接送，适合商务、旅游与家庭长途行程。"],
        ["长期接送服务", "Long-Term Shuttle", "提供公司长期用车、员工通勤与工厂工人巴士接送等稳定安排。"],
      ],
      bestFor: "适合客户",
      bf1t: "家庭与游客",
      bf1d: "旅游包车、酒店接送、景点行程。",
      bf2t: "企业客户",
      bf2d: "会议、展会、商务贵宾接待。",
      bf3t: "机场旅客",
      bf3d: "准时接送、行李空间与舒适出行。",
      button: "咨询服务方案",
    },
    fleet: {
      eyebrow: "精选车队",
      title: "从豪华 Alphard 到团体巴士，一站式安排",
      desc: "家庭旅客、商务客户、酒店接送、公司团队和大型活动，都能根据人数与场景安排合适车型。",
      button1: "查看完整车队",
      button2: "获取报价",
      items: [
        ["Luxury Flagship", "豪华 7 座", "Alphard 40Z / Vellfire", "主推 Alphard 40Z，适合 VIP 接待、高端商务、婚礼用车与豪华机场接送。", "4–6 位乘客 · 2 个大型行李", images.luxury],
        ["Family MPV", "7 座", "Serena / Voxy / Nova", "适合家庭旅游、酒店接送与舒适城际出行。", "4–5 位乘客 · 1 大 1 中行李", images.mpv],
        ["Executive Sedan / SUV", "5 座", "City / Altis / X70 / X-Trail / CRV / Hilux", "适合个人客户、小家庭与商务接待。", "3 位乘客 · 2 个中型行李", images.home1],
        ["Group Van", "10–18 座", "Staria / Starex / G10 / Van", "适合旅游包车、公司活动、团队接送与跨州出行。", "中小型团队接送", images.van],
        ["Coach / Bus", "24–44 座", "Tour Coach / Bus", "适合工厂工人接送、团体旅游、学校、企业班车与大型活动。", "大型团队接送", images.bus],
      ] as const,
      gallery1: "豪华内饰",
      gallery1d: "可替换成 VIP 座椅、车内细节或高端接待照片。",
      gallery2: "车内空间",
      gallery2d: "可替换成第二排、内装或舒适空间照片。",
      gallery3: "巴士内装",
      gallery3d: "可替换成巴士座位、团队出行与大巴内饰照片。",
    },
    about: {
      eyebrow: "关于我们",
      title: "专业、舒适、可靠的私人接送服务",
      desc: "我们致力于为客户提供更体面、更安心的出行体验。",
      box1t: "专业可靠",
      box1d: "注重品牌形象、行程安排与客户体验。",
      box2t: "准时服务",
      box2d: "机场接送与商务行程更需要时间管理。",
      box3t: "高端体验",
      box3d: "舒适车型、礼貌服务与商务级接待感。",
      box4t: "灵活配车",
      box4d: "从个人到大型团队都能快速安排。",
      imageTitle: "品牌与信任",
      imageDesc: "可替换成 Logo、司机形象照、车队合照或酒店门口接待照片。",
      profile: "公司简介",
      profileText:
        "Alpha Lux Transportation 自 2023 年开始运营，致力于为客户提供高端、舒适、可靠的地面交通服务。我们专注于机场接送、企业商务出行、私人旅游包车、点对点接送、婚礼用车、豪华车租借、跨州接送，以及公司长期接送与工厂工人巴士服务。无论是个人客户、家庭旅客、企业团队还是大型团体，我们都以专业态度、灵活配车和细致安排，为每一段旅程带来更安心、更体面的出行体验。",
    },
    booking: {
      eyebrow: "立即预订",
      title: "填写资料后直接 WhatsApp 下单",
      desc: "客户提交资料后会直接跳转 WhatsApp，把完整订单资料发送给你，方便你马上回复确认。",
      name: "姓名 Name",
      date: "用车日期 Date",
      pickup: "上车地点 Pick Up",
      destination: "目的地 Destination",
      passengers: "人数 Passengers",
      vehicle: "车型 Vehicle",
      hours: "小时 / 行程类型",
      notes: "备注 Notes",
      submit: "WhatsApp 立即下单",
      call: "直接致电",
      direct: "联系信息",
      location: "位置",
    },
    faq: {
      eyebrow: "常见问题",
      title: "预订前最常见的问题",
      desc: "如需更快报价，也可以直接 WhatsApp 联系我们。",
      list: [
        ["你们提供哪些服务？", "我们提供机场接送、商务出行、旅游包车、点对点接送、婚礼用车、豪华车租借、跨州接送、公司长期接送及工厂工人巴士接送服务。"],
        ["主推车型是什么？", "我们的主推车型是 Alphard 40Z，适合高端机场接送、商务客户、婚礼用车与 VIP 贵宾行程。"],
        ["价格怎么计算？", "点对点服务会根据路线单独报价；小时包车最低 4 小时起。更长路线、跨州行程或团队接送可按需求定制报价。"],
        ["可以预订槟城以外的行程吗？", "可以。我们支持槟城及全马来西亚包车和跨州接送服务。"],
        ["如何下单？", "填写 Booking Form 后点击按钮，系统会直接跳转 WhatsApp，把资料发送给我们确认。"],
      ] as const,
      next: "立即联系",
      nextTitle: "准备开始预订？",
      nextBtn: "WhatsApp 联系 Alpha Lux",
    },
    footer: {
      desc: "高端机场接送、商务出行、私人包车与团体接送服务，覆盖槟城及马来西亚各地。",
      contact: "联系方式",
      featured: "主打车型",
      featuredValue: "Alphard 40Z · VIP Luxury MPV",
    },
  },
  en: {
    nav: {
      home: "Home",
      services: "Services",
      fleet: "Fleet",
      about: "About",
      booking: "Book Now",
      faq: "FAQ",
      bookNow: "Book Now",
    },
    hero: {
      badge: "Penang & Malaysia Luxury Chauffeur",
      title1: "Luxury Chauffeur Experience",
      title2: "for Airport, Corporate & VIP Travel",
      desc:
        "Alpha Lux Transportation specializes in airport transfer, corporate travel, private tour charter, point-to-point transfer, wedding transport and interstate travel. Our fleet ranges from 5 seats to 44 seats, with Alphard 40Z as our signature luxury vehicle.",
      cta1: "Get Quote via WhatsApp",
      cta2: "View Luxury Fleet",
      cta3: "View Our Location",
      card1t: "Alphard 40Z",
      card1d: "VIP flagship vehicle",
      card2t: "5–44 Seats",
      card2d: "Private to group travel",
      card3t: "Malaysia Wide",
      card3d: "Airport · Tour · Interstate",
      featureTitle: "Alphard 40Z",
      featureDesc: "Ideal for luxury airport transfer, executive chauffeur service and VIP private charter.",
      photo1: "Airport Transfer",
      photo1d: "Replace this with your best airport or hotel pickup image.",
      photo2: "Corporate Travel",
      photo2d: "Replace this with your best business or premium arrival image.",
    },
    services: {
      eyebrow: "Our Services",
      title: "Comfortable and reliable transport for every travel need",
      desc: "From personal transfer to business and group transportation, we arrange the right vehicle for every journey.",
      list: [
        ["Airport Transfer", "Airport Transfer", "On-time airport transfer, hotel transfer, flight-based scheduling and VIP pickup service."],
        ["Corporate Travel", "Corporate Travel", "Professional chauffeur service for meetings, VIP guests, exhibitions and business clients."],
        ["Private Tour Charter", "Private Tour Charter", "Customized transport for Penang and across Malaysia, including multiple stops and family tours."],
        ["Point-to-Point", "Point-to-Point", "Direct private transfer from home, hotel, attraction or mall to any destination."],
        ["Wedding Transport", "Wedding Transport", "Luxury wedding transport and premium private car service for special events."],
        ["Luxury MPV Charter", "Luxury MPV Charter", "Featuring Alphard 40Z and premium MPV service for VIP and executive travel."],
        ["Interstate Transfer", "Interstate Transfer", "Private interstate transport across Penang and Malaysia for business, family or tourism."],
        ["Long-Term Shuttle", "Long-Term Shuttle", "Company transport, employee shuttle and factory worker bus service with long-term arrangements."],
      ],
      bestFor: "Best For",
      bf1t: "Families & Tourists",
      bf1d: "Tour charter, hotel transfer and sightseeing trips.",
      bf2t: "Corporate Clients",
      bf2d: "Meetings, exhibitions and executive guest transport.",
      bf3t: "Airport Travelers",
      bf3d: "On-time pickup, luggage space and comfortable transfer.",
      button: "Ask for Service Plan",
    },
    fleet: {
      eyebrow: "Fleet Preview",
      title: "From luxury Alphard to group coaches, all in one place",
      desc: "Whether for family travel, business guests, hotel transfer or large group movement, we provide suitable vehicle options.",
      button1: "View Full Fleet",
      button2: "Get Instant Quote",
      items: [
        ["Luxury Flagship", "Luxury 7 Seater", "Alphard 40Z / Vellfire", "Our signature Alphard 40Z is perfect for VIP reception, executive transfer, wedding use and premium airport service.", "4–6 passengers · 2 large luggage", images.luxury],
        ["Family MPV", "7 Seater", "Serena / Voxy / Nova", "Ideal for family travel, hotel pickup and comfortable intercity journeys.", "4–5 passengers · 1 large + 1 medium luggage", images.mpv],
        ["Executive Sedan / SUV", "5 Seater", "City / Altis / X70 / X-Trail / CRV / Hilux", "Suitable for solo travelers, couples, small families and business clients.", "3 passengers · 2 medium luggage", images.home1],
        ["Group Van", "10–18 Seater", "Staria / Starex / G10 / Van", "Ideal for tour groups, events, team movement and interstate trips.", "Small to medium group transport", images.van],
        ["Coach / Bus", "24–44 Seater", "Tour Coach / Bus", "Best for factory workers, group tours, schools, company shuttle and large events.", "Large group transport", images.bus],
      ] as const,
      gallery1: "Luxury Interior",
      gallery1d: "Replace this with your best VIP seat or premium cabin photo.",
      gallery2: "Cabin Comfort",
      gallery2d: "Replace this with your best second-row or interior space photo.",
      gallery3: "Coach Interior",
      gallery3d: "Replace this with your best bus cabin or team transport image.",
    },
    about: {
      eyebrow: "About Us",
      title: "Professional, comfortable and reliable private transport",
      desc: "We are committed to providing every customer with a smoother and more premium travel experience.",
      box1t: "Professional",
      box1d: "Strong focus on service image, planning and customer experience.",
      box2t: "Punctual",
      box2d: "Time management matters especially for airport and corporate trips.",
      box3t: "Premium",
      box3d: "Comfortable vehicles, polite service and executive-level travel feel.",
      box4t: "Flexible Fleet",
      box4d: "From personal trips to large groups, we can arrange quickly.",
      imageTitle: "Brand & Trust",
      imageDesc: "Replace this with your logo, driver image, fleet lineup or premium hotel entrance photo.",
      profile: "Company Profile",
      profileText:
        "Founded in 2023, Alpha Lux Transportation is committed to providing premium, comfortable and reliable ground transportation service. We focus on airport transfer, corporate travel, private tour charter, point-to-point transfer, wedding transport, luxury MPV charter, interstate transfer, long-term company shuttle and factory worker bus transport across Penang and Malaysia.",
    },
    booking: {
      eyebrow: "Book Now",
      title: "Send your booking details directly via WhatsApp",
      desc: "After filling in the form, the button will take the customer straight to WhatsApp with the booking details ready to send.",
      name: "Name",
      date: "Travel Date",
      pickup: "Pick Up",
      destination: "Destination",
      passengers: "Passengers",
      vehicle: "Vehicle",
      hours: "Hours / Trip Type",
      notes: "Notes",
      submit: "Book via WhatsApp",
      call: "Call Now",
      direct: "Direct Contact",
      location: "Location",
    },
    faq: {
      eyebrow: "FAQ",
      title: "Frequently Asked Questions",
      desc: "For faster quotation, contact us directly on WhatsApp.",
      list: [
        ["What services do you provide?", "We provide airport transfer, corporate travel, private tour charter, point-to-point transfer, wedding transport, luxury MPV charter, interstate transfer, long-term company transport and factory worker bus service."],
        ["What is your featured vehicle?", "Our featured vehicle is Alphard 40Z, ideal for premium airport transfer, VIP guests, business travel and weddings."],
        ["How is the price calculated?", "Point-to-point service is quoted based on route. Hourly charter starts from a minimum of 4 hours. Longer or interstate trips can be customized."],
        ["Can I book outstation or interstate trips?", "Yes. We provide private transport across Penang and Malaysia."],
        ["How do I place an order?", "Fill in the booking form and click the button to send your details directly to us via WhatsApp."],
      ] as const,
      next: "Next Step",
      nextTitle: "Ready to book?",
      nextBtn: "WhatsApp Alpha Lux",
    },
    footer: {
      desc: "Premium airport transfer, corporate chauffeur, private charter and group transportation across Penang and Malaysia.",
      contact: "Contact",
      featured: "Featured Vehicle",
      featuredValue: "Alphard 40Z · VIP Luxury MPV",
    },
  },
} as const;

type ContentMap = typeof content;
type LangContent = ContentMap[Lang];

type FleetItem = readonly [string, string, string, string, string, string];
type FaqItem = readonly [string, string];
type ServiceItem = readonly [string, string, string];

function ButtonLink({ children, href, onClick, primary = false, external = false }: ButtonProps) {
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

function SectionTitle({ eyebrow, title, desc }: SectionTitleProps) {
  return (
    <div className="max-w-3xl">
      <div className="text-sm uppercase tracking-[0.35em] text-[#d4af67]">{eyebrow}</div>
      <h2 className="mt-4 text-3xl font-semibold sm:text-4xl lg:text-5xl">{title}</h2>
      {desc ? <p className="mt-4 text-base leading-8 text-white/65">{desc}</p> : null}
    </div>
  );
}

function PhotoCard({ src, alt, title, subtitle, tall = false }: { src: string; alt: string; title?: string; subtitle?: string; tall?: boolean }) {
  return (
    <div className={`group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#111216] ${tall ? "min-h-[340px]" : "min-h-[230px]"}`}>
      <img src={src} alt={alt} className={`h-full w-full object-cover transition duration-500 group-hover:scale-[1.03] ${tall ? "min-h-[340px]" : "min-h-[230px]"}`} />
      {(title || subtitle) && (
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-5">
          {title ? <div className="text-lg font-semibold">{title}</div> : null}
          {subtitle ? <div className="mt-2 text-sm leading-7 text-white/70">{subtitle}</div> : null}
        </div>
      )}
    </div>
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
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#d4af67] text-black">WA</span>
      <span className="hidden sm:inline">WhatsApp Us</span>
    </a>
  );
}

function HomePage({ lang, goTo }: { lang: Lang; goTo: (page: PageKey) => void }) {
  const t = content[lang];
  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,103,0.18),transparent_28%),radial-gradient(circle_at_left,rgba(255,255,255,0.06),transparent_20%)]" />
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:py-24">
          <div>
            <div className="inline-flex rounded-full border border-[#d4af67]/25 bg-[#d4af67]/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-[#d4af67]">{t.hero.badge}</div>
            <h1 className="mt-6 max-w-5xl text-4xl font-semibold leading-tight sm:text-5xl lg:text-7xl">
              {t.hero.title1}
              <span className="mt-3 block text-white">{t.hero.title2}</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/68 sm:text-lg">{t.hero.desc}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <ButtonLink primary onClick={() => goTo("booking")}>{t.hero.cta1}</ButtonLink>
              <ButtonLink onClick={() => goTo("fleet")}>{t.hero.cta2}</ButtonLink>
              <ButtonLink href={company.mapLink} external>{t.hero.cta3}</ButtonLink>
            </div>
            <div className="mt-6 flex flex-wrap gap-3 text-sm text-white/70">
              <a href={company.instagram} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 transition hover:border-[#d4af67]/25">Instagram</a>
              <a href={company.facebook} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 transition hover:border-[#d4af67]/25">Facebook</a>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                [t.hero.card1t, t.hero.card1d],
                [t.hero.card2t, t.hero.card2d],
                [t.hero.card3t, t.hero.card3d],
              ].map(([title, text]) => (
                <div key={title} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                  <div className="text-2xl font-semibold text-[#d4af67]">{title}</div>
                  <div className="mt-2 text-sm text-white/62">{text}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-5">
            <PhotoCard src={images.hero} alt="Hero vehicle" title={t.hero.featureTitle} subtitle={t.hero.featureDesc} tall />
            <div className="grid gap-5 sm:grid-cols-2">
              <PhotoCard src={images.home1} alt="Service photo 1" title={t.hero.photo1} subtitle={t.hero.photo1d} />
              <PhotoCard src={images.home2} alt="Service photo 2" title={t.hero.photo2} subtitle={t.hero.photo2d} />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <SectionTitle eyebrow={t.services.eyebrow} title={t.services.title} desc={t.services.desc} />
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {(t.services.list as readonly ServiceItem[]).map(([title, en, desc]) => (
            <div key={title} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
              <div className="text-xs uppercase tracking-[0.25em] text-[#d4af67]">{en}</div>
              <h3 className="mt-3 text-xl font-semibold">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-white/62">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white/[0.03]">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[0.88fr_1.12fr] lg:px-10">
          <div>
            <SectionTitle eyebrow={t.fleet.eyebrow} title={t.fleet.title} desc={t.fleet.desc} />
            <div className="mt-8 flex gap-4">
              <ButtonLink primary onClick={() => goTo("fleet")}>{t.fleet.button1}</ButtonLink>
              <ButtonLink onClick={() => goTo("booking")}>{t.fleet.button2}</ButtonLink>
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {(t.fleet.items as readonly FleetItem[]).map(([category, size, title, desc, note, image]) => (
              <div key={title} className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#111216]">
                <img src={image} alt={title} className="h-[190px] w-full object-cover" />
                <div className="p-5">
                  <div className="text-xs uppercase tracking-[0.24em] text-[#d4af67]">{category}</div>
                  <div className="mt-2 text-2xl font-semibold">{size}</div>
                  <div className="mt-2 text-lg text-white/90">{title}</div>
                  <p className="mt-3 text-sm leading-7 text-white/62">{desc}</p>
                  <div className="mt-3 text-sm text-[#d4af67]">{note}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function ServicesPage({ lang }: { lang: Lang }) {
  const t = content[lang];
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
      <SectionTitle eyebrow={t.services.eyebrow} title={t.services.title} desc={t.services.desc} />
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {(t.services.list as readonly ServiceItem[]).map(([title, en, desc]) => (
          <div key={title} className="rounded-[2rem] border border-white/10 bg-white/5 p-7">
            <div className="text-xs uppercase tracking-[0.24em] text-[#d4af67]">{en}</div>
            <h3 className="mt-2 text-2xl font-semibold">{title}</h3>
            <p className="mt-3 text-sm leading-8 text-white/65">{desc}</p>
          </div>
        ))}
      </div>
      <div className="mt-12 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <PhotoCard src={images.contact} alt="Service banner" title={t.hero.photo1} subtitle={t.hero.photo1d} tall />
        <div className="rounded-[2rem] border border-white/10 bg-[#111216] p-7">
          <div className="text-sm uppercase tracking-[0.32em] text-[#d4af67]">{t.services.bestFor}</div>
          <div className="mt-4 grid gap-4">
            {[
              [t.services.bf1t, t.services.bf1d],
              [t.services.bf2t, t.services.bf2d],
              [t.services.bf3t, t.services.bf3d],
            ].map(([title, text]) => (
              <div key={title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="font-medium">{title}</div>
                <p className="mt-2 text-sm leading-7 text-white/62">{text}</p>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <ButtonLink primary href={company.whatsappLink} external>{t.services.button}</ButtonLink>
          </div>
        </div>
      </div>
    </div>
  );
}

function FleetPage({ lang }: { lang: Lang }) {
  const t = content[lang];
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
      <SectionTitle eyebrow={t.fleet.eyebrow} title={t.fleet.title} desc={t.fleet.desc} />
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {(t.fleet.items as readonly FleetItem[]).map(([category, size, title, desc, note, image]) => (
          <div key={title} className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5">
            <img src={image} alt={title} className="h-[260px] w-full object-cover" />
            <div className="p-7">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs uppercase tracking-[0.25em] text-[#d4af67]">{category}</div>
                  <h3 className="mt-3 text-2xl font-semibold">{title}</h3>
                </div>
                <div className="rounded-full border border-[#d4af67]/25 bg-[#d4af67]/10 px-4 py-2 text-sm font-medium text-[#d4af67]">{size}</div>
              </div>
              <p className="mt-4 text-sm leading-8 text-white/65">{desc}</p>
              <div className="mt-3 text-sm text-[#d4af67]">{note}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        <PhotoCard src={images.luxury2} alt="Gallery 1" title={t.fleet.gallery1} subtitle={t.fleet.gallery1d} />
        <PhotoCard src={images.interior1} alt="Gallery 2" title={t.fleet.gallery2} subtitle={t.fleet.gallery2d} />
        <PhotoCard src={images.busInterior} alt="Gallery 3" title={t.fleet.gallery3} subtitle={t.fleet.gallery3d} />
      </div>
    </div>
  );
}

function AboutPage({ lang }: { lang: Lang }) {
  const t = content[lang];
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
      <div className="grid gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-center">
        <div>
          <SectionTitle eyebrow={t.about.eyebrow} title={t.about.title} desc={t.about.desc} />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              [t.about.box1t, t.about.box1d],
              [t.about.box2t, t.about.box2d],
              [t.about.box3t, t.about.box3d],
              [t.about.box4t, t.about.box4d],
            ].map(([title, text]) => (
              <div key={title} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                <div className="text-lg font-semibold">{title}</div>
                <p className="mt-2 text-sm leading-7 text-white/63">{text}</p>
              </div>
            ))}
          </div>
        </div>
        <PhotoCard src={images.about} alt="About image" title={t.about.imageTitle} subtitle={t.about.imageDesc} tall />
      </div>
      <div className="mt-12 rounded-[2rem] border border-white/10 bg-[#111216] p-8">
        <div className="text-sm uppercase tracking-[0.32em] text-[#d4af67]">{t.about.profile}</div>
        <p className="mt-4 max-w-4xl text-base leading-8 text-white/72">{t.about.profileText}</p>
      </div>
    </div>
  );
}

function BookingPage({ lang }: { lang: Lang }) {
  const t = content[lang];
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [passengers, setPassengers] = useState("");
  const [vehicle, setVehicle] = useState("Alphard 40Z");
  const [hours, setHours] = useState("");
  const [notes, setNotes] = useState("");

  const bookingMessage = useMemo(() => {
    return `Hello Alpha Lux Transportation,%0A%0AI want to book a transport service.%0A%0AName: ${encodeURIComponent(name)}%0ADate: ${encodeURIComponent(date)}%0APick Up: ${encodeURIComponent(pickup)}%0ADestination: ${encodeURIComponent(destination)}%0APassengers: ${encodeURIComponent(passengers)}%0AVehicle: ${encodeURIComponent(vehicle)}%0AHours / Trip Type: ${encodeURIComponent(hours)}%0AAdditional Notes: ${encodeURIComponent(notes)}`;
  }, [name, date, pickup, destination, passengers, vehicle, hours, notes]);

  const submitLink = `${company.whatsappLink}?text=${bookingMessage}`;

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
      <SectionTitle eyebrow={t.booking.eyebrow} title={t.booking.title} desc={t.booking.desc} />
      <div className="mt-10 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-7">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <div className="mb-2 text-sm text-white/75">{t.booking.name}</div>
              <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-2xl border border-white/10 bg-[#111216] px-4 py-4 text-sm text-white outline-none" placeholder="Your name" />
            </div>
            <div>
              <div className="mb-2 text-sm text-white/75">{t.booking.date}</div>
              <input value={date} onChange={(e) => setDate(e.target.value)} className="w-full rounded-2xl border border-white/10 bg-[#111216] px-4 py-4 text-sm text-white outline-none" placeholder="12 Apr 2026" />
            </div>
            <div>
              <div className="mb-2 text-sm text-white/75">{t.booking.pickup}</div>
              <input value={pickup} onChange={(e) => setPickup(e.target.value)} className="w-full rounded-2xl border border-white/10 bg-[#111216] px-4 py-4 text-sm text-white outline-none" placeholder="Penang Airport" />
            </div>
            <div>
              <div className="mb-2 text-sm text-white/75">{t.booking.destination}</div>
              <input value={destination} onChange={(e) => setDestination(e.target.value)} className="w-full rounded-2xl border border-white/10 bg-[#111216] px-4 py-4 text-sm text-white outline-none" placeholder="Gurney / KL / Ipoh" />
            </div>
            <div>
              <div className="mb-2 text-sm text-white/75">{t.booking.passengers}</div>
              <input value={passengers} onChange={(e) => setPassengers(e.target.value)} className="w-full rounded-2xl border border-white/10 bg-[#111216] px-4 py-4 text-sm text-white outline-none" placeholder="2 / 4 / 10 / 30 pax" />
            </div>
            <div>
              <div className="mb-2 text-sm text-white/75">{t.booking.vehicle}</div>
              <select value={vehicle} onChange={(e) => setVehicle(e.target.value)} className="w-full rounded-2xl border border-white/10 bg-[#111216] px-4 py-4 text-sm text-white outline-none">
                <option>Alphard 40Z</option>
                <option>Vellfire</option>
                <option>Serena / Voxy / Nova</option>
                <option>5 Seater Sedan / SUV</option>
                <option>Van 10–18 Seater</option>
                <option>Bus 24–44 Seater</option>
              </select>
            </div>
          </div>
          <div className="mt-5">
            <div className="mb-2 text-sm text-white/75">{t.booking.hours}</div>
            <input value={hours} onChange={(e) => setHours(e.target.value)} className="w-full rounded-2xl border border-white/10 bg-[#111216] px-4 py-4 text-sm text-white outline-none" placeholder="Point to Point / 4 Hours / Full Day / Interstate" />
          </div>
          <div className="mt-5">
            <div className="mb-2 text-sm text-white/75">{t.booking.notes}</div>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="min-h-[140px] w-full rounded-2xl border border-white/10 bg-[#111216] px-4 py-4 text-sm text-white outline-none" placeholder="Child seat / Multiple stops / Return trip / Extra luggage / VIP request" />
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink primary href={submitLink} external>{t.booking.submit}</ButtonLink>
            <ButtonLink href={company.phoneLink}>{t.booking.call}</ButtonLink>
          </div>
        </div>
        <div className="space-y-6">
          <div className="rounded-[2rem] border border-white/10 bg-[#111216] p-7">
            <div className="text-sm uppercase tracking-[0.32em] text-[#d4af67]">{t.booking.direct}</div>
            <div className="mt-5 space-y-4">
              {[
                ["WhatsApp", company.whatsapp, company.whatsappLink, true],
                ["Phone", company.phone, company.phoneLink, false],
                ["Email", company.email, company.emailLink, false],
                ["Instagram", "@alphalux.tt", company.instagram, true],
                ["Facebook", "Alpha Lux Tours and Transportation", company.facebook, true],
              ].map(([title, text, href, external]) => (
                <a
                  key={title}
                  href={href as string}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noreferrer" : undefined}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-[#d4af67]/25"
                >
                  <div>
                    <div className="font-medium">{title}</div>
                    <div className="mt-1 text-sm text-white/60">{text}</div>
                  </div>
                  <div className="text-white/30">↗</div>
                </a>
              ))}
            </div>
          </div>
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#111216]">
            <div className="border-b border-white/10 p-7">
              <div className="text-sm uppercase tracking-[0.32em] text-[#d4af67]">{t.booking.location}</div>
              <div className="mt-3 text-sm leading-7 text-white/72">{company.address}</div>
              <div className="mt-4">
                <ButtonLink href={company.mapLink} external>Open in Google Maps</ButtonLink>
              </div>
            </div>
            <iframe title="Alpha Lux Transportation Location" src="https://www.google.com/maps?q=3A-G-35%20Straits%20Quay%20Marina%20Mall%20Tanjung%20Tokong%20Penang&output=embed" className="h-[280px] w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </div>
      </div>
    </div>
  );
}

function FaqPage({ lang }: { lang: Lang }) {
  const t = content[lang];
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
      <SectionTitle eyebrow={t.faq.eyebrow} title={t.faq.title} desc={t.faq.desc} />
      <div className="mt-10 grid gap-5">
        {(t.faq.list as readonly FaqItem[]).map(([q, a]) => (
          <div key={q} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
            <h3 className="text-lg font-semibold">{q}</h3>
            <p className="mt-3 text-sm leading-8 text-white/64">{a}</p>
          </div>
        ))}
      </div>
      <div className="mt-12 rounded-[2rem] border border-white/10 bg-[#111216] p-8">
        <div className="text-sm uppercase tracking-[0.32em] text-[#d4af67]">{t.faq.next}</div>
        <h3 className="mt-3 text-2xl font-semibold">{t.faq.nextTitle}</h3>
        <div className="mt-6">
          <ButtonLink primary href={company.whatsappLink} external>{t.faq.nextBtn}</ButtonLink>
        </div>
      </div>
    </div>
  );
}

function getNavLabel(t: LangContent, key: PageKey) {
  switch (key) {
    case "home":
      return t.nav.home;
    case "services":
      return t.nav.services;
    case "fleet":
      return t.nav.fleet;
    case "about":
      return t.nav.about;
    case "booking":
      return t.nav.booking;
    case "faq":
      return t.nav.faq;
    default:
      return t.nav.home;
  }
}

export default function Page() {
  const [currentPage, setCurrentPage] = useState<PageKey>("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lang, setLang] = useState<Lang>("zh");
  const t = content[lang];

  useEffect(() => {
    const hash = window.location.hash.replace("#", "") as PageKey;
    if (["home", "services", "fleet", "about", "booking", "faq"].includes(hash)) {
      setCurrentPage(hash);
    }
  }, []);

  useEffect(() => {
    window.location.hash = currentPage;
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case "services":
        return <ServicesPage lang={lang} />;
      case "fleet":
        return <FleetPage lang={lang} />;
      case "about":
        return <AboutPage lang={lang} />;
      case "booking":
        return <BookingPage lang={lang} />;
      case "faq":
        return <FaqPage lang={lang} />;
      default:
        return <HomePage lang={lang} goTo={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0b0d] text-white">
      <FloatingWhatsApp />

      <div className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <button onClick={() => setCurrentPage("home")} className="flex items-center gap-3 text-left">
            <img src={images.logo} alt="Alpha Lux logo" className="h-12 w-12 rounded-xl border border-white/10 object-cover" />
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
                {getNavLabel(t, page.key)}
              </button>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <button onClick={() => setLang("zh")} className={`rounded-full px-3 py-2 text-xs ${lang === "zh" ? "bg-[#d4af67] text-black" : "bg-white/5 text-white/75"}`}>中文</button>
            <button onClick={() => setLang("en")} className={`rounded-full px-3 py-2 text-xs ${lang === "en" ? "bg-[#d4af67] text-black" : "bg-white/5 text-white/75"}`}>EN</button>
            <ButtonLink primary onClick={() => setCurrentPage("booking")}>{t.nav.bookNow}</ButtonLink>
          </div>

          <button className="md:hidden" onClick={() => setMobileOpen((value) => !value)}>{mobileOpen ? "✕" : "☰"}</button>
        </div>

        {mobileOpen ? (
          <div className="border-t border-white/10 bg-[#0d0d10] px-6 py-4 md:hidden">
                       <div className="grid gap-3">
              {pages.map((page) => (
                <button
                  key={page.key}
                  onClick={() => setCurrentPage(page.key)}
                  className={`rounded-2xl px-4 py-3 text-left text-sm ${
                    currentPage === page.key
                      ? "bg-[#d4af67]/12 text-[#d4af67]"
                      : "bg-white/5 text-white/75"
                  }`}
                >
                  {getNavLabel(t, page.key)}
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      <div className="h-[76px]" />
      <main>{renderPage()}</main>

      <footer className="border-t border-white/10 bg-[#09090b]">
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto_auto] lg:items-center">
            <div>
              <div className="flex items-center gap-3 text-base font-semibold tracking-[0.22em] text-[#d4af67]">
                <img
                  src={images.logo}
                  alt="Alpha Lux logo"
                  className="h-10 w-10 rounded-lg border border-white/10 object-cover"
                />
                ALPHA LUX TRANSPORTATION
              </div>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/60">
                {t.footer.desc}
              </p>
            </div>

            <div className="text-sm text-white/60">
              <div>{t.footer.contact}</div>
              <div className="mt-2 font-medium text-white">
                {company.phone}
              </div>
            </div>

            <div className="text-sm text-white/60">
              <div>{t.footer.featured}</div>
              <div className="mt-2 font-medium text-white">
                {t.footer.featuredValue}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}