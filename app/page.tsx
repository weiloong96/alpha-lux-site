"use client";

import { useEffect, useMemo, useState } from "react";

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
  { key: "booking", label: "Book Now" },
  { key: "faq", label: "FAQ" },
];

const services = [
  {
    title: "机场接送",
    en: "Airport Transfer",
    desc: "提供准时机场接送、酒店接驳、航班时段安排与 VIP 迎送服务。",
  },
  {
    title: "商务出行",
    en: "Corporate Travel",
    desc: "适合公司客户、会议接待、贵宾接送、展会活动与长期企业合作。",
  },
  {
    title: "旅游包车",
    en: "Private Tour Charter",
    desc: "槟城及全马包车，支持多站行程、家庭出游、景点安排与定制路线。",
  },
  {
    title: "点对点服务",
    en: "Point-to-Point",
    desc: "从住宅、酒店、景点、商场到任意目的地，享受舒适直接的接送体验。",
  },
  {
    title: "婚礼用车",
    en: "Wedding Transport",
    desc: "提供高端婚礼接送、贵宾用车与特别场合出行服务。",
  },
  {
    title: "豪华车租借",
    en: "Luxury Car Rental",
    desc: "主打高端舒适车型，适合贵宾接待、重要客户与商务形象出行。",
  },
  {
    title: "跨州接送",
    en: "Interstate Transfer",
    desc: "支持槟城及全马跨州接送，适合商务、旅游与家庭长途行程。",
  },
  {
    title: "长期接送服务",
    en: "Long-Term Shuttle Service",
    desc: "提供公司长期用车、员工通勤与工厂工人巴士接送等稳定安排。",
  },
];

const fleet = [
  {
    category: "Luxury MPV",
    size: "豪华7座",
    title: "Alphard 40Z / Vellfire",
    desc: "主推 Alphard 40Z，适合 VIP 接待、高端商务、婚礼用车与机场接送。",
    image: "/luxury.webp",
    note: "4–6 位乘客 · 2 个大型行李",
  },
  {
    category: "Premium MPV",
    size: "7座",
    title: "Serena / Voxy / Nova",
    desc: "适合家庭旅游、机场接送与舒适城际出行。",
    image: "/mpv.webp",
    note: "4–5 位乘客 · 1 大 1 中行李",
  },
  {
    category: "Executive Sedan / SUV",
    size: "5座",
    title: "City / Altis / X70 / X-Trail / CRV / Hilux",
    desc: "适合个人客户、小家庭与商务接待。",
    image: "/home1.webp",
    note: "3 位乘客 · 2 个中型行李",
  },
  {
    category: "Group Van",
    size: "10–18座",
    title: "Staria / Starex / G10 / Van",
    desc: "适合旅游包车、公司活动、跨州接送与团队出行。",
    image: "/van.webp",
    note: "中小型团队接送",
  },
  {
    category: "Coach / Bus",
    size: "24–44座",
    title: "Tour Coach / Bus",
    desc: "适合工厂工人接送、团体旅游、学校、企业班车与大型活动。",
    image: "/bus.webp",
    note: "大型团队接送",
  },
];

const faqs = [
  {
    q: "你们提供哪些服务？",
    a: "我们提供机场接送、商务出行、旅游包车、点对点接送、婚礼用车、豪华车租借、跨州接送、公司长期接送及工厂工人巴士接送服务。",
  },
  {
    q: "主推车型是什么？",
    a: "我们的主推车型是 Alphard 40Z，适合高端机场接送、商务客户、婚礼用车与 VIP 贵宾行程。",
  },
  {
    q: "价格怎么计算？",
    a: "点对点服务会根据路线单独报价；小时包车最低 4 小时起。更长路线、跨州行程或团队接送可按需求定制报价。",
  },
  {
    q: "可以预订槟城以外的行程吗？",
    a: "可以。我们支持槟城及全马来西亚包车和跨州接送服务。",
  },
  {
    q: "如何下单？",
    a: "你可以直接填写网站下方的 Booking Form，提交后会自动跳转 WhatsApp，把资料发给我们确认。",
  },
];

function Button({
  children,
  href,
  onClick,
  primary = false,
  external = false,
}: ButtonProps) {
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
      <div className="text-sm uppercase tracking-[0.35em] text-[#d4af67]">
        {eyebrow}
      </div>
      <h2 className="mt-4 text-3xl font-semibold sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {desc ? (
        <p className="mt-4 text-base leading-8 text-white/65">{desc}</p>
      ) : null}
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
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#d4af67] text-black">
        WA
      </span>
      <span className="hidden sm:inline">WhatsApp Us</span>
    </a>
  );
}

function HeroImage() {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#111216]">
      <img
        src="/hero.webp"
        alt="Alpha Lux Transportation Alphard 40Z"
        className="h-[420px] w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="inline-flex rounded-full border border-[#d4af67]/30 bg-black/30 px-4 py-2 text-xs uppercase tracking-[0.3em] text-[#d4af67] backdrop-blur">
          Signature Fleet
        </div>
        <div className="mt-4 text-3xl font-semibold">Alphard 40Z</div>
        <div className="mt-2 text-sm text-white/70">
          Luxury chauffeur experience for airport transfer, corporate travel and VIP bookings
        </div>
      </div>
    </div>
  );
}

function HomePage({ goTo }: { goTo: (page: PageKey) => void }) {
  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,103,0.18),transparent_28%),radial-gradient(circle_at_left,rgba(255,255,255,0.06),transparent_20%)]" />
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:py-24">
          <div>
            <div className="inline-flex rounded-full border border-[#d4af67]/25 bg-[#d4af67]/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-[#d4af67]">
              Premium Chauffeur & Charter Service
            </div>

            <h1 className="mt-6 max-w-5xl text-4xl font-semibold leading-tight sm:text-5xl lg:text-7xl">
              Alpha Lux Transportation
              <span className="mt-3 block text-white/70">
                高端机场接送、商务出行与旅游包车服务
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-white/68 sm:text-lg">
              提供机场接送、商务接待、旅游包车、点对点接送、婚礼用车、豪华车租借、跨州接送与长期接驳等一站式地面交通服务，车队覆盖
              5 座到 44 座，适合个人、家庭、企业客户与大型团队。
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button primary onClick={() => goTo("booking")}>
                立即下单
              </Button>
              <Button onClick={() => goTo("fleet")}>查看车队</Button>
              <Button href={company.mapLink} external>
                查看地址
              </Button>
            </div>

            <div className="mt-6 flex flex-wrap gap-3 text-sm text-white/70">
              <a
                href={company.instagram}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 transition hover:border-[#d4af67]/25"
              >
                Instagram
              </a>
              <a
                href={company.facebook}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 transition hover:border-[#d4af67]/25"
              >
                Facebook
              </a>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                ["5–44座", "车型灵活配置"],
                ["商务级体验", "准时、舒适、专业"],
                ["全马服务", "机场 / 旅游 / 跨州"],
              ].map(([title, text]) => (
                <div
                  key={title}
                  className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5"
                >
                  <div className="text-2xl font-semibold text-[#d4af67]">
                    {title}
                  </div>
                  <div className="mt-2 text-sm text-white/62">{text}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <HeroImage />
            <div className="grid gap-5 sm:grid-cols-2">
              <img
                src="/home1.webp"
                alt="Airport transfer"
                className="h-[220px] w-full rounded-[1.5rem] border border-white/10 object-cover"
              />
              <img
                src="/home2.webp"
                alt="Corporate transfer"
                className="h-[220px] w-full rounded-[1.5rem] border border-white/10 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <SectionTitle
          eyebrow="Our Services"
          title="核心服务一目了然"
          desc="网站首页把客户最常找的服务直接展示出来，让客户一进来就知道你们能做什么。"
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {services.map((item) => (
            <div
              key={item.title}
              className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#d4af67]/25 bg-[#d4af67]/10 text-[#d4af67]">
                ●
              </div>
              <div className="mt-5 text-xs uppercase tracking-[0.25em] text-[#d4af67]">
                {item.en}
              </div>
              <h3 className="mt-3 text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-white/62">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white/[0.03]">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
          <div>
            <SectionTitle
              eyebrow="Fleet Preview"
              title="从5座到44座，满足不同场景"
              desc="家庭出游、企业接待、团队活动、跨州出行，都能根据人数和需求灵活安排车型。"
            />
            <div className="mt-8 flex gap-4">
              <Button primary onClick={() => goTo("fleet")}>
                进入 Fleet 页面
              </Button>
              <Button onClick={() => goTo("booking")}>立即询价</Button>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {fleet.map((item) => (
              <div
                key={item.title}
                className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#111216]"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-[190px] w-full object-cover"
                />
                <div className="p-5">
                  <div className="text-xs uppercase tracking-[0.24em] text-[#d4af67]">
                    {item.category}
                  </div>
                  <div className="mt-2 text-2xl font-semibold">{item.size}</div>
                  <div className="mt-2 text-lg text-white/90">{item.title}</div>
                  <p className="mt-3 text-sm leading-7 text-white/62">
                    {item.desc}
                  </p>
                  <div className="mt-3 text-sm text-[#d4af67]">{item.note}</div>
                </div>
              </div>
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
      <SectionTitle
        eyebrow="Services"
        title="服务页面"
        desc="适合详细介绍每一种包车服务，帮助客户快速判断是否符合他们的出行需求。"
      />
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {services.map((item) => (
          <div
            key={item.title}
            className="rounded-[2rem] border border-white/10 bg-white/5 p-7"
          >
            <div className="text-xs uppercase tracking-[0.24em] text-[#d4af67]">
              {item.en}
            </div>
            <h3 className="mt-2 text-2xl font-semibold">{item.title}</h3>
            <p className="mt-3 text-sm leading-8 text-white/65">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function FleetPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
      <SectionTitle
        eyebrow="Fleet"
        title="车型页面"
        desc="车型页非常重要，因为客户通常会先看你们有哪些车、适合多少人、适合什么场景。"
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {fleet.map((item) => (
          <div
            key={item.title}
            className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5"
          >
            <img
              src={item.image}
              alt={item.title}
              className="h-[260px] w-full object-cover"
            />
            <div className="p-7">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs uppercase tracking-[0.25em] text-[#d4af67]">
                    {item.category}
                  </div>
                  <h3 className="mt-3 text-2xl font-semibold">{item.title}</h3>
                </div>
                <div className="rounded-full border border-[#d4af67]/25 bg-[#d4af67]/10 px-4 py-2 text-sm font-medium text-[#d4af67]">
                  {item.size}
                </div>
              </div>
              <p className="mt-4 text-sm leading-8 text-white/65">{item.desc}</p>
              <div className="mt-3 text-sm text-[#d4af67]">{item.note}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        <img
          src="/luxury2.webp"
          alt="Luxury interior"
          className="h-[230px] w-full rounded-[1.5rem] border border-white/10 object-cover"
        />
        <img
          src="/interior1.webp"
          alt="Interior 1"
          className="h-[230px] w-full rounded-[1.5rem] border border-white/10 object-cover"
        />
        <img
          src="/bus_interior.webp"
          alt="Bus interior"
          className="h-[230px] w-full rounded-[1.5rem] border border-white/10 object-cover"
        />
      </div>
    </div>
  );
}

function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
      <div className="grid gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-center">
        <div>
          <SectionTitle
            eyebrow="About Us"
            title="关于我们"
            desc="这一页用来建立信任感，告诉客户为什么选择 Alpha Lux Transportation。"
          />

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              { title: "专业可靠", text: "注重品牌形象、行程安排与客户体验。" },
              { title: "准时服务", text: "机场接送与商务行程更需要时间管理。" },
              { title: "高端体验", text: "舒适车型、礼貌服务与商务级接待感。" },
              { title: "灵活配车", text: "从个人到大型团队都能快速安排。" },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5"
              >
                <div className="text-lg font-semibold">{item.title}</div>
                <p className="mt-2 text-sm leading-7 text-white/63">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        <img
          src="/luxury.webp"
          alt="Alpha Lux About"
          className="h-[520px] w-full rounded-[2rem] border border-white/10 object-cover"
        />
      </div>

      <div className="mt-12 rounded-[2rem] border border-white/10 bg-[#111216] p-8">
        <div className="text-sm uppercase tracking-[0.32em] text-[#d4af67]">
          Company Profile
        </div>
        <p className="mt-4 max-w-4xl text-base leading-8 text-white/72">
          Alpha Lux Transportation 自 2023 年开始运营，致力于为客户提供高端、舒适、可靠的地面交通服务。我们专注于机场接送、企业商务出行、私人旅游包车、点对点接送、婚礼用车、豪华车租借、跨州接送，以及公司长期接送与工厂工人巴士服务。无论是个人客户、家庭旅客、企业团队还是大型团体，我们都以专业态度、灵活配车和细致安排，为每一段旅程带来更安心、更体面的出行体验。
        </p>
      </div>
    </div>
  );
}

function BookingPage() {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [passengers, setPassengers] = useState("");
  const [vehicle, setVehicle] = useState("Alphard 40Z");
  const [hours, setHours] = useState("");
  const [notes, setNotes] = useState("");

  const bookingMessage = useMemo(() => {
    return `Hello Alpha Lux Transportation,%0A%0AI want to book a transport service.%0A%0AName: ${encodeURIComponent(
      name
    )}%0ADate: ${encodeURIComponent(date)}%0APick Up: ${encodeURIComponent(
      pickup
    )}%0ADestination: ${encodeURIComponent(
      destination
    )}%0APassengers: ${encodeURIComponent(
      passengers
    )}%0AVehicle: ${encodeURIComponent(
      vehicle
    )}%0AHours / Trip Type: ${encodeURIComponent(
      hours
    )}%0AAdditional Notes: ${encodeURIComponent(notes)}`;
  }, [name, date, pickup, destination, passengers, vehicle, hours, notes]);

  const submitLink = `${company.whatsappLink}?text=${bookingMessage}`;

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
      <SectionTitle
        eyebrow="Book Now"
        title="直接下单 / 立即询价"
        desc="客户填写资料后，点击按钮就会直接跳转到 WhatsApp，把下单资料发给你。"
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-7">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <div className="mb-2 text-sm text-white/75">姓名 Name</div>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-[#111216] px-4 py-4 text-sm text-white outline-none"
                placeholder="Your name"
              />
            </div>

            <div>
              <div className="mb-2 text-sm text-white/75">用车日期 Date</div>
              <input
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-[#111216] px-4 py-4 text-sm text-white outline-none"
                placeholder="12 Apr 2026"
              />
            </div>

            <div>
              <div className="mb-2 text-sm text-white/75">上车地点 Pick Up</div>
              <input
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-[#111216] px-4 py-4 text-sm text-white outline-none"
                placeholder="Penang Airport"
              />
            </div>

            <div>
              <div className="mb-2 text-sm text-white/75">目的地 Destination</div>
              <input
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-[#111216] px-4 py-4 text-sm text-white outline-none"
                placeholder="Gurney / KL / Ipoh"
              />
            </div>

            <div>
              <div className="mb-2 text-sm text-white/75">人数 Passengers</div>
              <input
                value={passengers}
                onChange={(e) => setPassengers(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-[#111216] px-4 py-4 text-sm text-white outline-none"
                placeholder="2 / 4 / 10 / 30 pax"
              />
            </div>

            <div>
              <div className="mb-2 text-sm text-white/75">车型 Vehicle</div>
              <select
                value={vehicle}
                onChange={(e) => setVehicle(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-[#111216] px-4 py-4 text-sm text-white outline-none"
              >
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
            <div className="mb-2 text-sm text-white/75">
              小时 / 行程类型 Hours / Trip Type
            </div>
            <input
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-[#111216] px-4 py-4 text-sm text-white outline-none"
              placeholder="Point to Point / 4 Hours / Full Day / Interstate"
            />
          </div>

          <div className="mt-5">
            <div className="mb-2 text-sm text-white/75">备注 Notes</div>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[140px] w-full rounded-2xl border border-white/10 bg-[#111216] px-4 py-4 text-sm text-white outline-none"
              placeholder="例如：需要儿童座椅 / 多站点 / 往返服务 / 行李较多 / VIP 接待"
            />
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button primary href={submitLink} external>
              WhatsApp 立即下单
            </Button>
            <Button href={company.phoneLink}>直接致电</Button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[2rem] border border-white/10 bg-[#111216] p-7">
            <div className="text-sm uppercase tracking-[0.32em] text-[#d4af67]">
              Direct Contact
            </div>
            <div className="mt-5 space-y-4">
              {[
                {
                  title: "WhatsApp",
                  text: company.whatsapp,
                  href: company.whatsappLink,
                  external: true,
                },
                {
                  title: "Phone",
                  text: company.phone,
                  href: company.phoneLink,
                  external: false,
                },
                {
                  title: "Email",
                  text: company.email,
                  href: company.emailLink,
                  external: false,
                },
                {
                  title: "Instagram",
                  text: "@alphalux.tt",
                  href: company.instagram,
                  external: true,
                },
                {
                  title: "Facebook",
                  text: "Alpha Lux Tours and Transportation",
                  href: company.facebook,
                  external: true,
                },
              ].map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noreferrer" : undefined}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-[#d4af67]/25"
                >
                  <div>
                    <div className="font-medium">{item.title}</div>
                    <div className="mt-1 text-sm text-white/60">{item.text}</div>
                  </div>
                  <div className="text-white/30">↗</div>
                </a>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#111216]">
            <div className="border-b border-white/10 p-7">
              <div className="text-sm uppercase tracking-[0.32em] text-[#d4af67]">
                Location
              </div>
              <div className="mt-3 text-sm leading-7 text-white/72">
                {company.address}
              </div>
              <div className="mt-4">
                <Button href={company.mapLink} external>
                  Open in Google Maps
                </Button>
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

function FaqPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
      <SectionTitle
        eyebrow="FAQ"
        title="常见问题"
        desc="FAQ 页面可以减少客户来回询问，提高询价效率，也更适合 Google 搜索收录。"
      />

      <div className="mt-10 grid gap-5">
        {faqs.map((item) => (
          <div
            key={item.q}
            className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6"
          >
            <h3 className="text-lg font-semibold">{item.q}</h3>
            <p className="mt-3 text-sm leading-8 text-white/64">{item.a}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-[2rem] border border-white/10 bg-[#111216] p-8">
        <div className="text-sm uppercase tracking-[0.32em] text-[#d4af67]">
          Next Step
        </div>
        <h3 className="mt-3 text-2xl font-semibold">准备直接联系我下单</h3>
        <div className="mt-6">
          <Button primary href={company.whatsappLink} external>
            WhatsApp 联系 Alpha Lux
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  const [currentPage, setCurrentPage] = useState<PageKey>("home");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "") as PageKey;
    if (pages.some((page) => page.key === hash)) {
      setCurrentPage(hash);
    }
  }, []);

  useEffect(() => {
    window.location.hash = currentPage;
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const currentLabel = useMemo(
    () => pages.find((page) => page.key === currentPage)?.label || "Home",
    [currentPage]
  );

  const renderPage = () => {
    switch (currentPage) {
      case "services":
        return <ServicesPage />;
      case "fleet":
        return <FleetPage />;
      case "about":
        return <AboutPage />;
      case "booking":
        return <BookingPage />;
      case "faq":
        return <FaqPage />;
      default:
        return <HomePage goTo={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0b0d] text-white">
      <FloatingWhatsApp />

      <div className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <button
            onClick={() => setCurrentPage("home")}
            className="flex items-center gap-3 text-left"
          >
            <img
              src="/logo.png"
              alt="Alpha Lux logo"
              className="h-12 w-12 rounded-xl border border-white/10 object-cover"
            />
            <div>
              <div className="text-lg font-semibold tracking-[0.28em] text-[#d4af67]">
                ALPHA LUX
              </div>
              <div className="text-[11px] uppercase tracking-[0.35em] text-white/55">
                Transportation
              </div>
            </div>
          </button>

          <div className="hidden items-center gap-7 md:flex">
            {pages.map((page) => (
              <button
                key={page.key}
                onClick={() => setCurrentPage(page.key)}
                className={`text-sm transition ${
                  currentPage === page.key
                    ? "text-[#d4af67]"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {page.label}
              </button>
            ))}
          </div>

          <div className="hidden md:block">
            <Button primary onClick={() => setCurrentPage("booking")}>
              立即下单
            </Button>
          </div>

          <button
            className="md:hidden"
            onClick={() => setMobileOpen((value) => !value)}
          >
            {mobileOpen ? "✕" : "☰"}
          </button>
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
                  {page.label}
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
                  src="/logo.png"
                  alt="Alpha Lux logo"
                  className="h-10 w-10 rounded-lg border border-white/10 object-cover"
                />
                ALPHA LUX TRANSPORTATION
              </div>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/60">
                高端包车服务官网。当前页面：{currentLabel}。可直接提交资料，通过 WhatsApp 下单与询价。
              </p>
            </div>

            <div className="text-sm text-white/60">
              <div>Contact</div>
              <div className="mt-2 font-medium text-white">{company.phone}</div>
            </div>

            <div className="text-sm text-white/60">
              <div>Featured Fleet</div>
              <div className="mt-2 font-medium text-white">
                Alphard 40Z · 5 Seats – 44 Seats
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}