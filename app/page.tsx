"use client";

import { useEffect, useState } from "react";

// Put these files in public/site/
const IMAGES = {
  logo: "/site/logo.png",
  hero: "/site/hero.webp",
  home1: "/site/home1.webp",
  home2: "/site/home2.webp",
  luxury: "/site/luxury.webp",
  luxury2: "/site/luxury2.webp",
  mpv: "/site/mpv.webp",
  van: "/site/van.webp",
  van2: "/site/van2.webp",
  bus: "/site/bus.webp",
  interior1: "/site/interior1.webp",
  interior2: "/site/interior2.webp",
  busInterior: "/site/bus_interior.webp",
};

type PageKey = "home" | "services" | "fleet" | "about" | "booking" | "faq";

type ButtonLinkProps = {
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

type PageSwitchProps = {
  setCurrentPage: (page: PageKey) => void;
};

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
  address:
    "3A-G-35, Straits Quay, Lorong Seri Tanjung Pinang, Seri Tanjung Pinang, 10470 Tanjung Tokong, Pulau Pinang",
};

const pages: { key: PageKey; label: string }[] = [
  { key: "home", label: "Home" },
  { key: "services", label: "Services" },
  { key: "fleet", label: "Fleet" },
  { key: "about", label: "About" },
  { key: "booking", label: "Booking" },
  { key: "faq", label: "FAQ" },
];

const services = [
  { title: "机场接送", en: "Airport Transfer", desc: "提供准时机场接送、酒店接驳、航班时段安排与 VIP 迎送服务。" },
  { title: "商务出行", en: "Corporate Travel", desc: "适合公司客户、会议接待、贵宾接送、展会活动与长期企业合作。" },
  { title: "旅游包车", en: "Private Tour Charter", desc: "槟城及全马包车，支持多站行程、家庭出游、景点安排与定制路线。" },
  { title: "点对点服务", en: "Point-to-Point", desc: "从住宅、酒店、景点、商场到任意目的地，享受舒适直接的接送体验。" },
  { title: "婚礼用车", en: "Wedding Transport", desc: "提供高端婚礼接送、贵宾用车与特别场合出行服务。" },
  { title: "豪华车租借", en: "Luxury Car Rental", desc: "主打高端舒适车型，适合贵宾接待、重要客户与商务形象出行。" },
  { title: "跨州接送", en: "Interstate Transfer", desc: "支持槟城及全马跨州接送，适合商务、旅游与家庭长途行程。" },
  { title: "长期接送服务", en: "Long-Term Shuttle Service", desc: "提供公司长期用车、员工通勤与工厂工人巴士接送等稳定安排。" },
];

const fleet = [
  {
    category: "Premium MPV",
    size: "豪华7座",
    title: "Alphard / Vellfire 40Z",
    desc: "主推 Alphard 40Z，适合 VIP 接待、高端商务与豪华包车。可载约 4–6 位乘客 + 2 个大型行李。",
    use: ["VIP包车", "商务接待", "婚礼用车"],
    image: IMAGES.luxury,
  },
  {
    category: "Premium MPV",
    size: "豪华7座",
    title: "Luxury MPV Interior",
    desc: "豪华座椅与高舒适度体验，适合长途接送、酒店接待与重要客户出行。",
    use: ["豪华座椅", "高端出行", "舒适包车"],
    image: IMAGES.interior1,
  },
  {
    category: "MPV / Family",
    size: "7座",
    title: "Serena / Voxy / Nova",
    desc: "适合家庭、机场接送与中短途行程。可载约 4–5 位乘客 + 1 个大型行李 + 1 个中型行李。",
    use: ["家庭旅游", "机场接送", "酒店接送"],
    image: IMAGES.mpv,
  },
  {
    category: "Group Van",
    size: "10–18座",
    title: "Staria / Starex / G10 / Van 12–18 Seater",
    desc: "适合团队接送、旅游包车、公司活动与跨州行程。",
    use: ["公司团队", "旅游包车", "活动接驳"],
    image: IMAGES.van,
  },
  {
    category: "Group Van",
    size: "10–18座",
    title: "Van Interior / Shuttle Setup",
    desc: "适合团队、酒店接驳与行程中段短途转运。",
    use: ["团队接驳", "机场团队", "旅游转运"],
    image: IMAGES.van2,
  },
  {
    category: "Coach / Bus",
    size: "24–44座",
    title: "Bus / Coach",
    desc: "适合大型团队、工厂工人接送、企业班车、学校与团体旅游。",
    use: ["工厂巴士", "大型活动", "团体旅游"],
    image: IMAGES.bus,
  },
  {
    category: "Coach / Bus",
    size: "内饰",
    title: "Bus Interior",
    desc: "整齐宽敞的车厢，适合团队出游与大型活动接送。",
    use: ["大团体", "旅游巴士", "舒适座位"],
    image: IMAGES.busInterior,
  },
];

const faqs = [
  { q: "你们提供哪些服务？", a: "我们提供机场接送、商务出行、旅游包车、点对点接送、婚礼用车、豪华车租借、跨州接送、公司长期接送及工厂工人巴士接送服务。" },
  { q: "主推车型是什么？", a: "我们的主推车型是 Alphard 40Z，适合高端机场接送、商务客户、婚礼用车与 VIP 贵宾行程。" },
  { q: "可以安排多少座位的车？", a: "我们可安排 5 座、7 座、豪华 7 座、10–18 座 Van 以及 24–44 座 Bus，满足个人到大型团队的不同需求。" },
  { q: "价格怎么计算？", a: "点对点服务会根据路线单独报价；小时包车最低 4 小时起。更长路线、跨州行程或团队接送可按需求定制报价。" },
  { q: "可以预订槟城以外的行程吗？", a: "可以。我们支持槟城及全马来西亚包车和跨州接送服务。" },
];

function ButtonLink({ children, href, onClick, primary = false, external = false }: ButtonLinkProps) {
  const className = primary
    ? "inline-flex items-center justify-center rounded-full bg-[#d4af67] px-6 py-3 text-sm font-semibold text-black transition hover:scale-[1.02]"
    : "inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10";

  if (href) {
    return (
      <a href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined} className={className}>
        {children}
      </a>
    );
  }

  return <button onClick={onClick} className={className}>{children}</button>;
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

function ImageCard({ src, alt, title, subtitle, tall = false }: { src: string; alt: string; title: string; subtitle: string; tall?: boolean }) {
  return (
    <div className={`overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#111216] ${tall ? "min-h-[340px]" : "min-h-[230px]"}`}>
      <div className={`relative ${tall ? "h-[340px]" : "h-[230px]"}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5">
          <div className="text-lg font-semibold">{title}</div>
          <div className="mt-1 text-sm leading-6 text-white/70">{subtitle}</div>
        </div>
      </div>
    </div>
  );
}

function FloatingWhatsApp() {
  return (
    <a href={company.whatsappLink} target="_blank" rel="noreferrer" className="fixed bottom-5 right-5 z-[60] inline-flex items-center gap-3 rounded-full border border-[#d4af67]/20 bg-[#111216] px-5 py-3 text-sm font-semibold text-white shadow-2xl transition hover:scale-[1.02]">
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#d4af67] text-black">WA</span>
      <span className="hidden sm:inline">WhatsApp Us</span>
    </a>
  );
}

function HomePage({ setCurrentPage }: PageSwitchProps) {
  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,103,0.18),transparent_28%),radial-gradient(circle_at_left,rgba(255,255,255,0.06),transparent_20%)]" />
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[1.08fr_0.92fr] lg:px-10 lg:py-24">
          <div>
            <div className="inline-flex rounded-full border border-[#d4af67]/25 bg-[#d4af67]/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-[#d4af67]">Premium Chauffeur & Charter Service</div>
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
              <a href={company.instagram} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 transition hover:border-[#d4af67]/25">Instagram</a>
              <a href={company.facebook} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 transition hover:border-[#d4af67]/25">Facebook</a>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[["5–44座", "车型灵活配置"], ["商务级体验", "准时、舒适、专业"], ["全马服务", "机场 / 旅游 / 跨州"]].map(([title, text]) => (
                <div key={title} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                  <div className="text-2xl font-semibold text-[#d4af67]">{title}</div>
                  <div className="mt-2 text-sm text-white/62">{text}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#111216]">
              <div className="relative h-[420px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={IMAGES.hero} alt="Alpha Lux hero vehicle" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/20" />
                <div className="absolute left-5 top-5 flex items-center gap-3 rounded-2xl border border-white/10 bg-black/40 px-4 py-3 backdrop-blur">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={IMAGES.logo} alt="Alpha Lux logo" className="h-14 w-14 rounded-lg object-cover" />
                  <div>
                    <div className="font-semibold">Alpha Lux Transportation</div>
                    <div className="text-sm text-white/65">Luxury MPV & Chauffeur Service</div>
                  </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <div className="text-2xl font-semibold">Alphard 40Z Featured</div>
                  <div className="mt-1 text-sm leading-6 text-white/70">主推高端商务、酒店接待、婚礼与 VIP 包车服务。</div>
                </div>
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <ImageCard src={IMAGES.home1} alt="Airport transfer" title="机场接送" subtitle="适合机场接送、酒店接驳与举牌迎宾。" />
              <ImageCard src={IMAGES.home2} alt="Business transfer" title="商务接待" subtitle="高端商务接送与客户接待场景。" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <SectionTitle eyebrow="Our Services" title="核心服务一目了然" desc="网站首页建议把客户最常找的服务直接展示出来，让用户一进站就知道你们能做什么。" />
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {services.map((item) => (
            <div key={item.title} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#d4af67]/25 bg-[#d4af67]/10 text-[#d4af67]">●</div>
              <div className="mt-5 text-xs uppercase tracking-[0.25em] text-[#d4af67]">{item.en}</div>
              <h3 className="mt-3 text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-white/62">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white/[0.03]">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[0.92fr_1.08fr] lg:px-10">
          <div>
            <SectionTitle eyebrow="Fleet Preview" title="从5座到44座，满足不同场景" desc="家庭出游、企业接待、团队活动、跨州出行，都能根据人数和需求灵活安排车型。" />
            <div className="mt-8 flex gap-4">
              <ButtonLink primary onClick={() => setCurrentPage("fleet")}>进入 Fleet 页面</ButtonLink>
              <ButtonLink onClick={() => setCurrentPage("booking")}>咨询车型</ButtonLink>
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {fleet.slice(0,4).map((item) => (
              <ImageCard key={item.title} src={item.image} alt={item.title} title={item.size} subtitle={item.title} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function ServicesPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
      <SectionTitle eyebrow="Services" title="服务页面" desc="这个页面适合详细介绍每一种包车服务，帮助客户快速判断是否符合他们的出行需求。" />
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {services.map((item) => (
          <div key={item.title} className="rounded-[2rem] border border-white/10 bg-white/5 p-7">
            <div className="text-xs uppercase tracking-[0.24em] text-[#d4af67]">{item.en}</div>
            <h3 className="mt-2 text-2xl font-semibold">{item.title}</h3>
            <p className="mt-3 text-sm leading-8 text-white/65">{item.desc}</p>
          </div>
        ))}
      </div>
      <div className="mt-12 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <ImageCard src={IMAGES.luxury2} alt="Luxury service" title="Luxury Service" subtitle="酒店门口、商务接待、重要客户接送都更适合高端车型。" tall />
        <div className="rounded-[2rem] border border-white/10 bg-[#111216] p-7">
          <div className="text-sm uppercase tracking-[0.32em] text-[#d4af67]">Best For</div>
          <div className="mt-4 grid gap-4">
            {[['家庭与游客','旅游包车、酒店接送、景点行程。'],['企业客户','会议、展会、商务贵宾接待。'],['机场旅客','准时接送、行李空间与舒适出行。']].map(([title,text]) => (
              <div key={title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"><div className="font-medium">{title}</div><p className="mt-2 text-sm leading-7 text-white/62">{text}</p></div>
            ))}
          </div>
          <div className="mt-6"><ButtonLink primary href={company.whatsappLink} external>咨询服务方案</ButtonLink></div>
        </div>
      </div>
    </div>
  );
}

function FleetPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
      <SectionTitle eyebrow="Fleet" title="车型页面" desc="车型页非常重要，因为客户通常会先看你们有哪些车、适合多少人、适合什么场景。" />
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {fleet.map((item) => (
          <div key={item.title} className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5">
            <div className="relative h-[300px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <div className="text-xs uppercase tracking-[0.25em] text-[#d4af67]">{item.category}</div>
                <h3 className="mt-2 text-2xl font-semibold">{item.title}</h3>
              </div>
            </div>
            <div className="p-7">
              <div className="rounded-full border border-[#d4af67]/25 bg-[#d4af67]/10 px-4 py-2 text-sm font-medium text-[#d4af67] inline-block">{item.size}</div>
              <p className="mt-4 text-sm leading-8 text-white/65">{item.desc}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {item.use.map((tag) => <span key={tag} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-white/70">{tag}</span>)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
      <div className="grid gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-center">
        <div>
          <SectionTitle eyebrow="About Us" title="关于我们页面" desc="这一页建议用来建立信任感，告诉客户为什么选择 Alpha Lux Transportation。" />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[{ title: "专业可靠", text: "注重品牌形象、行程安排与客户体验。" },{ title: "准时服务", text: "机场接送与商务行程更需要时间管理。" },{ title: "高端体验", text: "舒适车型、礼貌服务与商务级接待感。" },{ title: "灵活配车", text: "从个人到大型团队都能快速安排。" }].map((item) => (
              <div key={item.title} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5"><div className="text-lg font-semibold">{item.title}</div><p className="mt-2 text-sm leading-7 text-white/63">{item.text}</p></div>
            ))}
          </div>
        </div>
        <ImageCard src={IMAGES.luxury2} alt="Brand image" title="Alpha Lux Brand Image" subtitle="高端酒店接待、商务形象与品牌信任感。" tall />
      </div>
      <div className="mt-12 rounded-[2rem] border border-white/10 bg-[#111216] p-8">
        <div className="text-sm uppercase tracking-[0.32em] text-[#d4af67]">Suggested Copy</div>
        <p className="mt-4 max-w-4xl text-base leading-8 text-white/72">Alpha Lux Transportation 自 2023 年开始运营，致力于为客户提供高端、舒适、可靠的地面交通服务。我们专注于机场接送、企业商务出行、私人旅游包车、点对点接送、婚礼用车、豪华车租借、跨州接送，以及公司长期接送与工厂工人巴士服务。无论是个人客户、家庭旅客、企业团队还是大型团体，我们都以专业态度、灵活配车和细致安排，为每一段旅程带来更安心、更体面的出行体验。</p>
        <div className="mt-6"><ButtonLink primary href={company.whatsappLink} external>联系 Alpha Lux</ButtonLink></div>
      </div>
    </div>
  );
}

function BookingPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
      <SectionTitle eyebrow="Booking / Contact" title="预订与联系页面" desc="这是更接近正式上线的联系页版本，已经加入可点击联系方式、社交媒体与地图位置。" />
      <div className="mt-10 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-7">
          <div className="relative mb-6 h-[240px] overflow-hidden rounded-[1.5rem] border border-white/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={IMAGES.home1} alt="Contact transfer" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5"><div className="text-xl font-semibold">Direct Booking</div><div className="mt-1 text-sm text-white/70">WhatsApp、电话和邮箱都可以直接联系你。</div></div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {[['用车日期','例如：12 Apr 2026'],['上车地点','例如：Penang Airport'],['目的地','例如：Gurney / KL / Ipoh'],['人数','例如：2 / 6 / 12 / 30 pax'],['车型需求','例如：Alphard 40Z / Van / Bus'],['联系电话',company.phone]].map(([label, placeholder]) => (
              <div key={label}><div className="mb-2 text-sm text-white/75">{label}</div><div className="rounded-2xl border border-white/10 bg-[#111216] px-4 py-4 text-sm text-white/35">{placeholder}</div></div>
            ))}
          </div>
          <div className="mt-5"><div className="mb-2 text-sm text-white/75">备注</div><div className="min-h-[120px] rounded-2xl border border-white/10 bg-[#111216] px-4 py-4 text-sm text-white/35">例如：需要儿童座椅 / 多站点 / 往返服务 / 行李较多 / VIP接待</div></div>
          <div className="mt-6 flex flex-wrap gap-3"><ButtonLink primary href={company.whatsappLink} external>WhatsApp 询价</ButtonLink><ButtonLink href={company.phoneLink}>直接致电</ButtonLink></div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[2rem] border border-white/10 bg-[#111216] p-7">
            <div className="text-sm uppercase tracking-[0.32em] text-[#d4af67]">Direct Contact</div>
            <div className="mt-5 space-y-4">
              {[{ title: 'WhatsApp', text: company.whatsapp, href: company.whatsappLink, external: true },{ title: 'Phone', text: company.phone, href: company.phoneLink, external: false },{ title: 'Email', text: company.email, href: company.emailLink, external: false },{ title: 'Instagram', text: '@alphalux.tt', href: company.instagram, external: true },{ title: 'Facebook', text: 'Alpha Lux Tours and Transportation', href: company.facebook, external: true }].map((item) => (
                <a key={item.title} href={item.href} target={item.external ? '_blank' : undefined} rel={item.external ? 'noreferrer' : undefined} className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-[#d4af67]/25">
                  <div><div className="font-medium">{item.title}</div><div className="mt-1 text-sm text-white/60">{item.text}</div></div><div className="text-white/30">↗</div>
                </a>
              ))}
            </div>
          </div>
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#111216]">
            <div className="border-b border-white/10 p-7">
              <div className="text-sm uppercase tracking-[0.32em] text-[#d4af67]">Location</div>
              <div className="mt-3 text-sm leading-7 text-white/72">{company.address}</div>
              <div className="mt-4"><ButtonLink href={company.mapLink} external>Open in Google Maps</ButtonLink></div>
            </div>
            <iframe title="Alpha Lux Transportation Location" src="https://www.google.com/maps?q=3A-G-35%20Straits%20Quay%20Marina%20Mall%20Tanjung%20Tokong%20Penang&output=embed" className="h-[280px] w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </div>
      </div>
    </div>
  );
}

function FaqPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
      <SectionTitle eyebrow="FAQ" title="常见问题页面" desc="FAQ 页面可以减少客户来回询问，提高询价效率，也更适合 Google 搜索收录。" />
      <div className="mt-10 grid gap-5">{faqs.map((item) => <div key={item.q} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6"><h3 className="text-lg font-semibold">{item.q}</h3><p className="mt-3 text-sm leading-8 text-white/64">{item.a}</p></div>)}</div>
      <div className="mt-12 rounded-[2rem] border border-white/10 bg-[#111216] p-8">
        <div className="text-sm uppercase tracking-[0.32em] text-[#d4af67]">Next Step</div>
        <h3 className="mt-3 text-2xl font-semibold">接下来最值得加的内容</h3>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">{['真实车辆照片','WhatsApp 直连按钮','客户评价模块','中英双语内容'].map((item) => <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 text-sm text-white/75">{item}</div>)}</div>
        <div className="mt-6"><ButtonLink primary href={company.whatsappLink} external>继续做正式版</ButtonLink></div>
      </div>
    </div>
  );
}

export default function Page() {
  const [currentPage, setCurrentPage] = useState<PageKey>("home");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "") as PageKey;
    if (pages.some((page) => page.key === hash)) setCurrentPage(hash);
  }, []);

  useEffect(() => {
    window.location.hash = currentPage;
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case "services": return <ServicesPage setCurrentPage={setCurrentPage} />;
      case "fleet": return <FleetPage setCurrentPage={setCurrentPage} />;
      case "about": return <AboutPage setCurrentPage={setCurrentPage} />;
      case "booking": return <BookingPage />;
      case "faq": return <FaqPage setCurrentPage={setCurrentPage} />;
      default: return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0b0d] text-white">
      <FloatingWhatsApp />
      <div className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <button onClick={() => setCurrentPage("home")} className="flex items-center gap-3 text-left">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={IMAGES.logo} alt="Alpha Lux logo" className="h-12 w-12 rounded-xl object-cover" />
            <div>
              <div className="text-lg font-semibold tracking-[0.28em] text-[#d4af67]">ALPHA LUX</div>
              <div className="text-[11px] uppercase tracking-[0.35em] text-white/55">Transportation</div>
            </div>
          </button>
          <div className="hidden items-center gap-7 md:flex">
            {pages.map((page) => <button key={page.key} onClick={() => setCurrentPage(page.key)} className={`text-sm transition ${currentPage === page.key ? 'text-[#d4af67]' : 'text-white/70 hover:text-white'}`}>{page.label}</button>)}
          </div>
          <div className="hidden md:block"><ButtonLink primary href={company.whatsappLink} external>立即询价</ButtonLink></div>
          <button className="md:hidden" onClick={() => setMobileOpen((v) => !v)}>{mobileOpen ? '✕' : '☰'}</button>
        </div>
        {mobileOpen ? (
          <div className="border-t border-white/10 bg-[#0d0d10] px-6 py-4 md:hidden">
            <div className="grid gap-3">{pages.map((page) => <button key={page.key} onClick={() => setCurrentPage(page.key)} className={`rounded-2xl px-4 py-3 text-left text-sm ${currentPage === page.key ? 'bg-[#d4af67]/12 text-[#d4af67]' : 'bg-white/5 text-white/75'}`}>{page.label}</button>)}</div>
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
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={IMAGES.logo} alt="Alpha Lux logo" className="h-10 w-10 rounded-lg object-cover" />
                ALPHA LUX TRANSPORTATION
              </div>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/60">高端包车服务官网示范版本。已加入真实品牌资料、联系方式与服务内容；后续可继续接入真实图片、WhatsApp 直连、Google Map、客户评价和中英双语内容。</p>
            </div>
            <div className="text-sm text-white/60"><div>Contact</div><div className="mt-2 font-medium text-white">{company.phone}</div></div>
            <div className="text-sm text-white/60"><div>Featured Fleet</div><div className="mt-2 font-medium text-white">Alphard 40Z · 5 Seats – 44 Seats</div></div>
          </div>
        </div>
      </footer>
    </div>
  );
}
