import React from "react";

import flipkartLogo from "../../assets/logo/98-985285_flipkart-transparent-flipkart-logo-png-clipart.png";
import jbmLogo from "../../assets/logo/JBM Group.png";
import meeshoLogo from "../../assets/logo/Meesho_logo.png";
import pgLogo from "../../assets/logo/P_G_logo.png";
import elasticrunLogo from "../../assets/logo/SoftBank_Vision-Fund_ElasticRun-1655842619.png";
import techMahindraLogo from "../../assets/logo/Tech_Mahindra-Logo.wine.png";
import troikaaLogo from "../../assets/logo/Troikaa_Logo_French.png";
import yazakiLogo from "../../assets/logo/Yazaki_company_logo.svg.webp";
import kdlLogo from "../../assets/logo/kdl-logo.png";
import mothersonLogo from "../../assets/logo/motherson-logo-png_seeklogo.png";
import paisaLogo from "../../assets/logo/paisa.png";
import shadowfaxLogo from "../../assets/logo/shadowfax.png";
import xpressbeesLogo from "../../assets/logo/xpressbees.png";

export interface CompanyLogo {
  id: string;
  name: string;
  logo: React.ReactNode;
}

const logoClass = "h-12 sm:h-14 w-auto object-contain max-w-[120px] sm:max-w-[160px] mix-blend-multiply";

export const EXACT_CLIENT_LOGOS: CompanyLogo[] = [
  {
    id: "motherson",
    name: "Motherson",
    logo: <img src={mothersonLogo} alt="Motherson" className={logoClass} />,
  },
  {
    id: "shadowfax",
    name: "Shadowfax",
    logo: <img src={shadowfaxLogo} alt="Shadowfax" className={logoClass} />,
  },
  {
    id: "flipkart",
    name: "Flipkart",
    logo: <img src={flipkartLogo} alt="Flipkart" className={logoClass} />,
  },
  {
    id: "meesho",
    name: "Meesho",
    logo: <img src={meeshoLogo} alt="Meesho" className={logoClass} />,
  },
  {
    id: "xpressbees",
    name: "XpressBees",
    logo: <img src={xpressbeesLogo} alt="XpressBees" className={logoClass} />,
  },
  {
    id: "pg",
    name: "P&G",
    logo: <img src={pgLogo} alt="P&G" className={logoClass} />,
  },
  {
    id: "troikaa",
    name: "Troikaa",
    logo: <img src={troikaaLogo} alt="Troikaa" className={logoClass} />,
  },
  {
    id: "5paisa",
    name: "5paisa",
    logo: <img src={paisaLogo} alt="5paisa" className={logoClass} />,
  },
  {
    id: "yazaki",
    name: "Yazaki",
    logo: <img src={yazakiLogo} alt="Yazaki" className={logoClass} />,
  },
  {
    id: "jbm",
    name: "JBM Group",
    logo: <img src={jbmLogo} alt="JBM Group" className={logoClass} />,
  },
  {
    id: "elasticrun",
    name: "ElasticRun",
    logo: <img src={elasticrunLogo} alt="ElasticRun" className={logoClass} />,
  },
  {
    id: "tech-mahindra",
    name: "Tech Mahindra",
    logo: <img src={techMahindraLogo} alt="Tech Mahindra" className={logoClass} />,
  },
  {
    id: "kd-logistics",
    name: "KD Logistics",
    logo: <img src={kdlLogo} alt="KD Logistics" className={logoClass} />,
  },
];

export function BrandLogoSection({ title = "Clients We Served" }: { title?: string }) {
  const logosList = [...EXACT_CLIENT_LOGOS, ...EXACT_CLIENT_LOGOS];

  return (
    <div className="w-full bg-white py-8 sm:py-10 border-y border-slate-100">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 text-center">
        {/* Title Matching Screenshot: "Clients We Served" */}
        <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-800 mb-8 sm:mb-10">
          {title}
        </h3>

        {/* Clean Logo Marquee with strictly the 13 client logos */}
        <div className="relative w-full overflow-hidden select-none">
          {/* Side Fades */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-16 sm:w-24 bg-gradient-to-r from-white via-white/90 to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-16 sm:w-24 bg-gradient-to-l from-white via-white/90 to-transparent" />

          <div className="flex w-max items-center gap-10 sm:gap-14 animate-marquee hover:[animation-play-state:paused]">
            {logosList.map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                title={item.name}
                className="flex shrink-0 items-center justify-center p-2 transition-all duration-300 hover:scale-110"
              >
                {item.logo}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
