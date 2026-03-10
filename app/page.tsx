"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";

type Lang = "zh" | "en";
type PageKey = "home" | "services" | "fleet" | "about" | "booking" | "faq";

type ButtonProps = {
  children: ReactNode;
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

type ServiceItem = readonly [title: string, subtitle: string, desc: string];
type FleetItem = readonly [category: string, size: string, title: string, desc: string, note: string, image: string];
type FaqItem = readonly [question: string, answer: string];

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
      title1: "高端机场接送、商务出行与旅游包车服务",
      title2: "Premium Private Transport in Penang & Malaysia",
      desc:
        "Alpha Lux Transportation 专注机场接送、企业商务出行、私人旅游包车、点对点接送、婚礼用车与跨州接送。主打 Alphard 40Z，车队覆盖 5 座至 44 座，为个人客户、家庭旅客、企业团队与贵宾行程提供舒适、专业、体面的出行安排。",
      cta1: "WhatsApp 立即询价",
      cta2: "查看车队",
      cta3: "查看位置",
      card1t: "Alphard 40Z",
      card1d: "旗舰豪华 MPV",
      card2t: "5–44 座",
      card2d: "个人至大型团队",
      card3t: "Malaysia Wide",
      card3d: "机场 · 商务 · 旅游 · 跨州",
      featureTitle: "旗舰豪华接送体验",
      featureDesc: "适合 VIP 迎送、商务接待、婚礼用车与高端机场接送。",
      photo1: "机场与酒店接送",
      photo1d: "准时接送、行李友好、适合旅客与商务客户。",
      photo2: "商务与贵宾出行",
      photo2d: "为会议、接待与重要行程提供更体面的出行安排。",
    },
    services: {
      eyebrow: "我们的服务",
      title: "为不同出行场景提供舒适、可靠、专业的交通安排",
      desc: "无论是个人客户、家庭出游、企业商务接待，还是大型团队接送，我们都能根据人数、路线与场景安排合适车型。",
      list: [
        ["机场接送", "Airport Transfer", "提供机场、酒店、住宅与指定地点接送服务，适合旅客、商务客户与贵宾行程。"],
        ["商务出行", "Corporate Travel", "适合会议接待、企业客户、贵宾接送、展会活动与长期商务合作。"],
        ["旅游包车", "Private Tour Charter", "适合槟城与全马私人包车、多站行程、家庭旅行与定制路线安排。"],
        ["点对点接送", "Point-to-Point Transfer", "从任何出发地点到目的地，享受更轻松、更舒适、更直接的接送体验。"],
        ["婚礼用车", "Wedding Transport", "适合婚礼接送、贵宾用车、特别场合与高端形象出行。"],
        ["豪华 MPV 包车", "Luxury MPV Charter", "主打 Alphard 40Z 与高端 MPV，适合贵宾接待与商务用车。"],
        ["跨州接送", "Interstate Transfer", "支持槟城及全马跨州接送，适合旅游、商务与家庭长途出行。"],
        ["长期接送服务", "Long-Term Shuttle", "支持企业长期用车、员工班车与工厂工人巴士接送安排。"],
      ] as const satisfies readonly ServiceItem[],
      bestFor: "推荐客户类型",
      bf1t: "家庭与旅客",
      bf1d: "适合机场接送、旅游包车、酒店接送与景点路线。",
      bf2t: "企业与商务客户",
      bf2d: "适合会议接待、贵宾接送、展会活动与长期合作。",
      bf3t: "团队与活动接送",
      bf3d: "适合公司团队、婚礼、旅游团、学校与大型活动安排。",
      button: "咨询服务方案",
      bannerTitle: "准时接送，安心出行",
      bannerDesc: "提供机场、酒店、商务场所与指定地点接送服务，让每一段旅程更轻松顺畅。",
    },
    fleet: {
      eyebrow: "精选车队",
      title: "从豪华 Alphard 到团队巴士，一站式安排",
      desc: "根据人数、场景与预算安排合适车型，兼顾舒适度、品牌形象与行程效率。",
      button1: "查看完整车队",
      button2: "获取报价",
      items: [
        ["Luxury Flagship", "豪华 7 座", "Alphard 40Z / Vellfire", "主打 Alphard 40Z，适合 VIP 接待、高端商务、婚礼用车与豪华机场接送。", "4–6 位乘客 · 2 个大型行李", images.luxury],
        ["Family / Business MPV", "7 座", "Serena / Voxy / Nova", "适合家庭旅客、酒店接送、城市出行与舒适城际路线。", "4–5 位乘客 · 1 大 1 中行李", images.mpv],
        ["Executive Sedan / SUV", "5 座", "City / Altis / X70 / X-Trail / CRV / Hilux", "适合个人客户、小家庭与日常商务接待。", "3 位乘客 · 2 个中型行李", images.home1],
        ["Group Van", "10–18 座", "Staria / Starex / G10 / Van", "适合旅游包车、团队接送、活动安排与跨州出行。", "中小型团队接送", images.van],
        ["Coach / Bus", "24–44 座", "Tour Coach / Bus", "适合工厂工人接送、团体旅游、学校、公司班车与大型活动。", "大型团队接送", images.bus],
      ] as const satisfies readonly FleetItem[],
      gallery1: "豪华舒适乘坐体验",
      gallery1d: "甄选高端内饰与宽敞座椅，为机场接送、商务接待与贵宾出行提供更舒适的乘坐体验。",
      gallery2: "宽敞车内空间",
      gallery2d: "充足座位与行李空间，适合家庭旅客、商务客户与长途接送行程。",
      gallery3: "团体出行更轻松",
      gallery3d: "适合公司团队、旅游团、活动接送与大型出行安排，兼顾效率与舒适度。",
    },
    about: {
      eyebrow: "关于我们",
      title: "专业、舒适、可靠的私人接送服务",
      desc: "从个人客户到企业团队，我们坚持以准时、礼貌、舒适与专业为服务核心。",
      box1t: "专业形象",
      box1d: "注重车辆整洁、服务细节与整体品牌体验。",
      box2t: "准时可靠",
      box2d: "机场、商务与重要行程，更需要稳定的时间管理。",
      box3t: "舒适体验",
      box3d: "高端车型、宽敞空间与更安心的乘坐感受。",
      box4t: "灵活安排",
      box4d: "从个人接送到大型团队，都可快速安排合适车型。",
      imageTitle: "值得信赖的出行安排",
      imageDesc: "从个人接送到企业团队用车，我们坚持准时、专业、舒适的服务标准，提供更安心的出行体验。",
      profile: "公司简介",
      profileText:
        "Alpha Lux Transportation 致力于为客户提供高端、舒适、可靠的地面交通服务。我们专注于机场接送、企业商务出行、私人旅游包车、点对点接送、婚礼用车、豪华 MPV 包车、跨州接送，以及长期接送与团体巴士安排。无论是个人客户、家庭旅客、企业团队还是大型团体，我们都以专业态度、灵活配车和细致安排，为每一段旅程带来更安心、更体面的出行体验。",
    },
    booking: {
      eyebrow: "立即预订",
      title: "填写资料后直接 WhatsApp 下单或询价",
      desc: "提交资料后会直接跳转 WhatsApp，并自动带入订单信息，方便快速确认行程与报价。",
      name: "姓名",
      date: "用车日期",
      pickup: "上车地点",
      destination: "目的地",
      passengers: "人数",
      vehicle: "车型需求",
      hours: "行程类型 / 包车时数",
      notes: "备注",
      submit: "WhatsApp 立即发送",
      call: "直接致电",
      direct: "联系方式",
      location: "公司位置",
    },
    faq: {
      eyebrow: "常见问题",
      title: "预订前最常见的问题",
      desc: "如需更快报价，也可直接通过 WhatsApp 联系我们。",
      list: [
        ["你们提供哪些服务？", "我们提供机场接送、商务出行、旅游包车、点对点接送、婚礼用车、豪华 MPV 包车、跨州接送、长期接送与团体巴士服务。"],
        ["主打车型是什么？", "我们的主打车型是 Alphard 40Z，适合高端机场接送、VIP 接待、商务客户与婚礼用车。"],
        ["价格怎么计算？", "点对点服务会根据路线单独报价；包车一般可按时数、车型与路线安排提供报价。"],
        ["可以预订槟城以外的行程吗？", "可以。我们支持槟城及全马来西亚包车和跨州接送服务。"],
        ["如何下单？", "填写表单后点击按钮，系统会直接跳转 WhatsApp，把资料发送给我们确认。"],
      ] as const satisfies readonly FaqItem[],
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
      badge: "Premium chauffeur service in Penang & Malaysia",
      title1: "Luxury airport transfer, corporate travel",
      title2: "and private charter service",
      desc:
        "Alpha Lux Transportation specializes in airport transfer, corporate travel, private tour charter, point-to-point transfer, wedding transport and interstate journeys. With Alphard 40Z as our signature luxury vehicle and fleet options from 5 to 44 seats, we provide professional and comfortable transport for individuals, families, business clients and VIP travel.",
      cta1: "Get Quote via WhatsApp",
      cta2: "View Fleet",
      cta3: "View Location",
      card1t: "Alphard 40Z",
      card1d: "Flagship luxury MPV",
      card2t: "5–44 Seats",
      card2d: "Private to large group travel",
      card3t: "Malaysia Wide",
      card3d: "Airport · Corporate · Tour · Interstate",
      featureTitle: "Premium arrival experience",
      featureDesc: "Ideal for VIP reception, executive transfer, wedding transport and luxury airport pickup.",
      photo1: "Airport & Hotel Transfer",
      photo1d: "Punctual pickup with luggage-friendly and comfortable travel experience.",
      photo2: "Business & VIP Travel",
      photo2d: "A more polished and professional transport arrangement for important journeys.",
    },
    services: {
      eyebrow: "Our Services",
      title: "Professional, comfortable and reliable transport for different travel needs",
      desc: "Whether for personal transfer, family trips, corporate reception or group movement, we arrange the right vehicle based on route, group size and occasion.",
      list: [
        ["Airport Transfer", "Airport Transfer", "Pickup and drop-off for airport, hotel, home and designated locations, suitable for travelers, executives and VIP guests."],
        ["Corporate Travel", "Corporate Travel", "Ideal for meetings, business clients, VIP reception, exhibitions and long-term corporate use."],
        ["Private Tour Charter", "Private Tour Charter", "Suitable for Penang and Malaysia private charter, multi-stop itinerary, family travel and custom routes."],
        ["Point-to-Point Transfer", "Point-to-Point Transfer", "Enjoy direct, comfortable and convenient private transfer from any pickup point to your destination."],
        ["Wedding Transport", "Wedding Transport", "Suitable for wedding transport, VIP use and special occasions requiring a premium image."],
        ["Luxury MPV Charter", "Luxury MPV Charter", "Featuring Alphard 40Z and premium MPV options for executive, VIP and business travel."],
        ["Interstate Transfer", "Interstate Transfer", "Available for private interstate journeys across Penang and Malaysia for travel, family or business purposes."],
        ["Long-Term Shuttle", "Long-Term Shuttle", "Available for company transport, employee shuttle and factory worker bus arrangements."],
      ] as const satisfies readonly ServiceItem[],
      bestFor: "Best For",
      bf1t: "Families & Travelers",
      bf1d: "Airport transfer, tour charter, hotel transfer and sightseeing routes.",
      bf2t: "Corporate & Business Clients",
      bf2d: "Meetings, executive reception, exhibitions and long-term cooperation.",
      bf3t: "Teams & Events",
      bf3d: "Suitable for company teams, weddings, tour groups, schools and event transfers.",
      button: "Ask for Service Plan",
      bannerTitle: "Punctual pickup, smoother travel",
      bannerDesc: "Airport, hotel, business venue and designated location transfer designed for convenience, comfort and peace of mind.",
    },
    fleet: {
      eyebrow: "Featured Fleet",
      title: "From luxury Alphard to group coaches, all in one arrangement",
      desc: "We recommend suitable vehicle options based on passenger count, trip style and service level, with comfort and efficiency in mind.",
      button1: "View Full Fleet",
      button2: "Get Quote",
      items: [
        ["Luxury Flagship", "Luxury 7 Seater", "Alphard 40Z / Vellfire", "Our signature Alphard 40Z is ideal for VIP reception, executive travel, wedding use and luxury airport service.", "4–6 passengers · 2 large luggage", images.luxury],
        ["Family / Business MPV", "7 Seater", "Serena / Voxy / Nova", "Suitable for family travel, hotel transfer, city routes and comfortable intercity journeys.", "4–5 passengers · 1 large + 1 medium luggage", images.mpv],
        ["Executive Sedan / SUV", "5 Seater", "City / Altis / X70 / X-Trail / CRV / Hilux", "A practical choice for solo travelers, couples, small families and daily business use.", "3 passengers · 2 medium luggage", images.home1],
        ["Group Van", "10–18 Seater", "Staria / Starex / G10 / Van", "Suitable for tour groups, team transfer, events and interstate travel.", "Small to medium group transfer", images.van],
        ["Coach / Bus", "24–44 Seater", "Tour Coach / Bus", "Suitable for factory workers, group tours, schools, company shuttles and large events.", "Large group transfer", images.bus],
      ] as const satisfies readonly FleetItem[],
      gallery1: "Premium cabin comfort",
      gallery1d: "High-quality seating and refined interior ambience for airport transfer, executive reception and VIP travel.",
      gallery2: "Spacious interior layout",
      gallery2d: "Comfortable seating and practical luggage space for family travelers, business guests and longer journeys.",
      gallery3: "Better for group movement",
      gallery3d: "Suitable for company teams, tour groups, event transfer and larger travel arrangements with better efficiency and comfort.",
    },
    about: {
      eyebrow: "About Us",
      title: "Professional, comfortable and reliable private transport",
      desc: "From private customers to corporate teams, we focus on punctuality, courtesy, comfort and professional service standards.",
      box1t: "Professional Image",
      box1d: "Clean vehicles, refined service details and a stronger overall customer impression.",
      box2t: "Punctual & Reliable",
      box2d: "Airport transfers and business journeys need dependable time management.",
      box3t: "Comfortable Experience",
      box3d: "Premium vehicles, spacious seating and a more relaxed travel experience.",
      box4t: "Flexible Arrangement",
      box4d: "From solo trips to larger groups, suitable transport can be arranged quickly.",
      imageTitle: "A transport service you can trust",
      imageDesc: "From personal transfer to corporate team travel, we focus on punctual, professional and comfortable service for every journey.",
      profile: "Company Profile",
      profileText:
        "Alpha Lux Transportation is committed to providing premium, comfortable and reliable ground transport. We focus on airport transfer, corporate travel, private tour charter, point-to-point transport, wedding use, luxury MPV charter, interstate journeys, long-term shuttle arrangements and group bus service. Whether for individuals, families, business clients or larger groups, we aim to deliver a smoother and more professional travel experience for every trip.",
    },
    booking: {
      eyebrow: "Book Now",
      title: "Send your booking details directly via WhatsApp",
      desc: "After submitting the form, you will be redirected to WhatsApp with your travel details pre-filled for faster quotation and confirmation.",
      name: "Name",
      date: "Travel Date",
      pickup: "Pick Up",
      destination: "Destination",
      passengers: "Passengers",
      vehicle: "Vehicle Preference",
      hours: "Trip Type / Charter Hours",
      notes: "Notes",
      submit: "Send via WhatsApp",
      call: "Call Now",
      direct: "Contact Details",
      location: "Location",
    },
    faq: {
      eyebrow: "FAQ",
      title: "Most common questions before booking",
      desc: "For faster quotation, you may also contact us directly via WhatsApp.",
      list: [
        ["What services do you provide?", "We provide airport transfer, corporate travel, private tour charter, point-to-point transfer, wedding transport, luxury MPV charter, interstate transfer, long-term shuttle and group bus service."],
        ["What is your featured vehicle?", "Our featured vehicle is Alphard 40Z, suitable for luxury airport transfer, VIP reception, business travel and wedding transport."],
        ["How is the pricing calculated?", "Point-to-point service is quoted based on route. Charter trips are usually quoted based on hours, vehicle type and itinerary."],
        ["Can I book trips outside Penang?", "Yes. We provide private charter and interstate transfer across Penang and Malaysia."],
        ["How do I place an order?", "Fill in the form and click the button. The system will open WhatsApp with your details ready to send for confirmation."],
      ] as const satisfies readonly FaqItem[],
      next: "Next Step",
      nextTitle: "Ready to book your trip?",
      nextBtn: "WhatsApp Alpha Lux",
    },
    footer: {
      desc: "Premium airport transfer, corporate travel, private charter and group transportation across Penang and Malaysia.",
      contact: "Contact",
      featured: "Featured Vehicle",
      featuredValue: "Alphard 40Z · VIP Luxury MPV",
    },
  },
} as const;

type LangContent = (typeof content)[Lang];

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

function PhotoCard({
  src,
  alt,
  title,
  subtitle,
  tall = false,
}: {
  src: string;
  alt: string;
  title?: string;
  subtitle?: string;
  tall?: boolean;
}) {
  return (
    <div className={`group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#111216] ${tall ? "min-h-[340px]" : "min-h-[230px]"}`}>
      <img
        src={src}
        alt={alt}
        className={`h-full w-full object-cover transition duration-500 group-hover:scale-[1.03] ${tall ? "min-h-[340px]" : "min-h-[230px]"}`}
      />
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
              <PhotoCard src={images.home1} alt="Airport or hotel transfer" title={t.hero.photo1} subtitle={t.hero.photo1d} />
              <PhotoCard src={images.home2} alt="Business or VIP travel" title={t.hero.photo2} subtitle={t.hero.photo2d} />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <SectionTitle eyebrow={t.services.eyebrow} title={t.services.title} desc={t.services.desc} />
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {(t.services.list as readonly ServiceItem[]).map(([title, subtitle, desc]) => (
            <div key={title} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
              <div className="text-xs uppercase tracking-[0.25em] text-[#d4af67]">{subtitle}</div>
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
        {(t.services.list as readonly ServiceItem[]).map(([title, subtitle, desc]) => (
          <div key={title} className="rounded-[2rem] border border-white/10 bg-white/5 p-7">
            <div className="text-xs uppercase tracking-[0.24em] text-[#d4af67]">{subtitle}</div>
            <h3 className="mt-2 text-2xl font-semibold">{title}</h3>
            <p className="mt-3 text-sm leading-8 text-white/65">{desc}</p>
          </div>
        ))}
      </div>
      <div className="mt-12 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <PhotoCard src={images.contact} alt="Service banner" title={t.services.bannerTitle} subtitle={t.services.bannerDesc} tall />
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
        <PhotoCard src={images.luxury2} alt="Luxury cabin" title={t.fleet.gallery1} subtitle={t.fleet.gallery1d} />
        <PhotoCard src={images.interior1} alt="Interior space" title={t.fleet.gallery2} subtitle={t.fleet.gallery2d} />
        <PhotoCard src={images.busInterior} alt="Bus interior" title={t.fleet.gallery3} subtitle={t.fleet.gallery3d} />
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
        <PhotoCard src={images.about} alt="About Alpha Lux" title={t.about.imageTitle} subtitle={t.about.imageDesc} tall />
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
    return `Hello Alpha Lux Transportation,%0A%0AI want to book a transport service.%0A%0AName: ${encodeURIComponent(name)}%0ADate: ${encodeURIComponent(date)}%0APick Up: ${encodeURIComponent(pickup)}%0ADestination: ${encodeURIComponent(destination)}%0APassengers: ${encodeURIComponent(passengers)}%0AVehicle: ${encodeURIComponent(vehicle)}%0ATrip Type / Hours: ${encodeURIComponent(hours)}%0AAdditional Notes: ${encodeURIComponent(notes)}`;
  }, [name, date, pickup, destination, passengers, vehicle, hours, notes]);

  const submitLink = `${company.whatsappLink}?text=${bookingMessage}`;

  const contactRows = [
    ["WhatsApp", company.whatsapp, company.whatsappLink, true],
    ["Phone", company.phone, company.phoneLink, false],
    ["Email", company.email, company.emailLink, false],
    ["Instagram", "@alphalux.tt", company.instagram, true],
    ["Facebook", "Alpha Lux Tours and Transportation", company.facebook, true],
  ] as const;

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
      <SectionTitle eyebrow={t.booking.eyebrow} title={t.booking.title} desc={t.booking.desc} />
      <div className="mt-10 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-7">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <div className="mb-2 text-sm text-white/75">{t.booking.name}</div>
              <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-2xl border border-white/10 bg-[#111216] px-4 py-4 text-sm text-white outline-none" placeholder={lang === "zh" ? "请输入姓名" : "Your name"} />
            </div>
            <div>
              <div className="mb-2 text-sm text-white/75">{t.booking.date}</div>
              <input value={date} onChange={(e) => setDate(e.target.value)} className="w-full rounded-2xl border border-white/10 bg-[#111216] px-4 py-4 text-sm text-white outline-none" placeholder="12 Apr 2026" />
            </div>
            <div>
              <div className="mb-2 text-sm text-white/75">{t.booking.pickup}</div>
              <input value={pickup} onChange={(e) => setPickup(e.target.value)} className="w-full rounded-2xl border border-white/10 bg-[#111216] px-4 py-4 text-sm text-white outline-none" placeholder={lang === "zh" ? "例如：Penang Airport" : "Example: Penang Airport"} />
            </div>
            <div>
              <div className="mb-2 text-sm text-white/75">{t.booking.destination}</div>
              <input value={destination} onChange={(e) => setDestination(e.target.value)} className="w-full rounded-2xl border border-white/10 bg-[#111216] px-4 py-4 text-sm text-white outline-none" placeholder={lang === "zh" ? "例如：Gurney / KL / Ipoh" : "Example: Gurney / KL / Ipoh"} />
            </div>
            <div>
              <div className="mb-2 text-sm text-white/75">{t.booking.passengers}</div>
              <input value={passengers} onChange={(e) => setPassengers(e.target.value)} className="w-full rounded-2xl border border-white/10 bg-[#111216] px-4 py-4 text-sm text-white outline-none" placeholder={lang === "zh" ? "例如：2 / 4 / 10 / 30 pax" : "Example: 2 / 4 / 10 / 30 pax"} />
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
            <input value={hours} onChange={(e) => setHours(e.target.value)} className="w-full rounded-2xl border border-white/10 bg-[#111216] px-4 py-4 text-sm text-white outline-none" placeholder={lang === "zh" ? "例如：Point to Point / 4 Hours / Full Day / Interstate" : "Example: Point to Point / 4 Hours / Full Day / Interstate"} />
          </div>
          <div className="mt-5">
            <div className="mb-2 text-sm text-white/75">{t.booking.notes}</div>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="min-h-[140px] w-full rounded-2xl border border-white/10 bg-[#111216] px-4 py-4 text-sm text-white outline-none" placeholder={lang === "zh" ? "例如：儿童座椅、多站点、往返、额外行李、VIP 要求" : "Example: Child seat, multiple stops, return trip, extra luggage, VIP request"} />
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
              {contactRows.map(([title, text, href, external]) => (
                <a
                  key={String(title)}
                  href={href}
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
                <ButtonLink href={company.mapLink} external>{lang === "zh" ? "打开 Google Maps" : "Open in Google Maps"}</ButtonLink>
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
        {(t.faq.list as readonly FaqItem[]).map(([question, answer]) => (
          <div key={question} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
            <h3 className="text-lg font-semibold">{question}</h3>
            <p className="mt-3 text-sm leading-8 text-white/64">{answer}</p>
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
            <div className="mb-4 flex gap-3">
              <button onClick={() => setLang("zh")} className={`rounded-full px-3 py-2 text-xs ${lang === "zh" ? "bg-[#d4af67] text-black" : "bg-white/5 text-white/75"}`}>中文</button>
              <button onClick={() => setLang("en")} className={`rounded-full px-3 py-2 text-xs ${lang === "en" ? "bg-[#d4af67] text-black" : "bg-white/5 text-white/75"}`}>EN</button>
            </div>
            <div className="grid gap-3">
              {pages.map((page) => (
                <button
                  key={page.key}
                  onClick={() => setCurrentPage(page.key)}
                  className={`rounded-2xl px-4 py-3 text-left text-sm ${currentPage === page.key ? "bg-[#d4af67]/12 text-[#d4af67]" : "bg-white/5 text-white/75"}`}
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
                <img src={images.logo} alt="Alpha Lux logo" className="h-10 w-10 rounded-lg border border-white/10 object-cover" />
                ALPHA LUX TRANSPORTATION
              </div>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/60">{t.footer.desc}</p>
            </div>

            <div className="text-sm text-white/60">
              <div>{t.footer.contact}</div>
              <div className="mt-2 font-medium text-white">{company.phone}</div>
            </div>

            <div className="text-sm text-white/60">
              <div>{t.footer.featured}</div>
              <div className="mt-2 font-medium text-white">{t.footer.featuredValue}</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
