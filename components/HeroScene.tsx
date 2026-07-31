"use client";

/**
 * Isometric delivery-hub scene, hand-drawn in SVG using the BMX palette.
 * Same category convention as Zippee/Blinkit/Zepto illustrated heroes,
 * entirely original composition and assets.
 */
export default function HeroScene() {
  return (
    <svg
      viewBox="0 0 900 620"
      className="h-auto w-full"
      role="img"
      aria-label="Isometric illustration of a BM Xpress delivery hub with a truck, delivery bike, packages, and workers"
    >
      <defs>
        <linearGradient id="hs-ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(14,19,25,0.08)" />
          <stop offset="100%" stopColor="rgba(14,19,25,0)" />
        </linearGradient>
      </defs>

      {/* Ground shadow band */}
      <ellipse cx="480" cy="555" rx="380" ry="24" fill="url(#hs-ground)" />

      {/* ─── Truck (back-left, arriving) ─── */}
      <g>
        {/* Cargo body */}
        <rect x="50" y="230" width="120" height="90" fill="#f2f4f1" stroke="#0e1319" strokeWidth="2" />
        {/* Cargo top edge (perspective) */}
        <path d="M50 230 L70 220 L190 220 L170 230 Z" fill="#e3e7e1" stroke="#0e1319" strokeWidth="2" />
        {/* Cargo right edge (perspective) */}
        <path d="M170 230 L190 220 L190 310 L170 320 Z" fill="#e3e7e1" stroke="#0e1319" strokeWidth="2" />
        {/* Cab */}
        <path d="M170 260 L215 260 L215 320 L170 320 Z" fill="#3b6fe0" stroke="#0e1319" strokeWidth="2" />
        {/* Windshield */}
        <path d="M178 268 L207 268 L207 292 L178 292 Z" fill="#0e1319" fillOpacity="0.15" />
        <path d="M178 268 L207 268 L207 292 L178 292 Z" fill="none" stroke="#0e1319" strokeWidth="1.5" />
        {/* Cargo door lines */}
        <path d="M110 230 L110 320 M50 275 L170 275" stroke="#0e1319" strokeWidth="1" opacity="0.35" />
        {/* Truck wheels (static) */}
        <g>
          <ellipse cx="85" cy="325" rx="14" ry="4" fill="#0e1319" opacity="0.35" />
          <circle cx="85" cy="322" r="12" fill="#0e1319" />
          <circle cx="85" cy="322" r="5" fill="#f2f4f1" stroke="#0e1319" strokeWidth="1" />
        </g>
        <g>
          <ellipse cx="185" cy="325" rx="14" ry="4" fill="#0e1319" opacity="0.35" />
          <circle cx="185" cy="322" r="12" fill="#0e1319" />
          <circle cx="185" cy="322" r="5" fill="#f2f4f1" stroke="#0e1319" strokeWidth="1" />
        </g>
      </g>

      {/* ─── Warehouse (centre) ─── */}
      <g>
        {/* Right side face */}
        <path d="M600 240 L660 210 L660 460 L600 490 Z" fill="#e3e7e1" />
        {/* Front face */}
        <path d="M340 240 L600 240 L600 490 L340 490 Z" fill="#ffffff" stroke="#0e1319" strokeWidth="2" />
        <path d="M600 240 L660 210 L660 460 L600 490" fill="none" stroke="#0e1319" strokeWidth="2" />
        {/* Roof */}
        <path d="M340 240 L600 240 L660 210 L400 210 Z" fill="#2f9e6b" stroke="#0e1319" strokeWidth="2" />
        <path d="M400 210 L660 210" stroke="rgba(255,255,255,0.35)" strokeWidth="4" />

        {/* Brand plaque */}
        <rect x="360" y="260" width="160" height="42" rx="4" fill="#0e1319" />
        <text
          x="440"
          y="289"
          fill="#f2f4f1"
          fontSize="22"
          fontWeight="800"
          fontFamily="var(--font-display), sans-serif"
          letterSpacing="0.02em"
          textAnchor="middle"
        >
          BM XPRESS
        </text>

        {/* Window */}
        <rect
          x="365"
          y="325"
          width="80"
          height="60"
          fill="#3b6fe0"
          fillOpacity="0.18"
          stroke="#0e1319"
          strokeWidth="2"
        />
        <path d="M405 325 L405 385 M365 355 L445 355" stroke="#0e1319" strokeWidth="1.5" />

        {/* Loading bay door (green) */}
        <rect x="475" y="350" width="110" height="140" fill="#2f9e6b" stroke="#0e1319" strokeWidth="2" />
        {/* horizontal slats */}
        <g stroke="rgba(255,255,255,0.25)" strokeWidth="1.5">
          <line x1="475" y1="380" x2="585" y2="380" />
          <line x1="475" y1="410" x2="585" y2="410" />
          <line x1="475" y1="440" x2="585" y2="440" />
          <line x1="475" y1="470" x2="585" y2="470" />
        </g>
        <rect x="475" y="350" width="110" height="140" fill="none" stroke="#0e1319" strokeWidth="2" />
      </g>

      {/* ─── Package stack ─── */}
      <g className="hs-packages">
        <path d="M270 460 L340 460 L358 448 L288 448 Z" fill="#c9ad84" />
        <path d="M270 460 L270 500 L340 500 L340 460 Z" fill="#d4b689" stroke="#0e1319" strokeWidth="1.5" />
        <path d="M340 460 L358 448 L358 488 L340 500 Z" fill="#b39066" stroke="#0e1319" strokeWidth="1.5" />
        <path d="M270 460 L340 460 L358 448 L288 448 Z" fill="none" stroke="#0e1319" strokeWidth="1.5" />
        <line x1="305" y1="448" x2="305" y2="500" stroke="#0e1319" strokeWidth="1" opacity="0.35" />

        <path d="M285 425 L345 425 L361 413 L301 413 Z" fill="#c9ad84" />
        <path d="M285 425 L285 458 L345 458 L345 425 Z" fill="#d4b689" stroke="#0e1319" strokeWidth="1.5" />
        <path d="M345 425 L361 413 L361 446 L345 458 Z" fill="#b39066" stroke="#0e1319" strokeWidth="1.5" />
        <path d="M285 425 L345 425 L361 413 L301 413 Z" fill="none" stroke="#0e1319" strokeWidth="1.5" />

        <path d="M300 390 L350 390 L364 379 L314 379 Z" fill="#c9ad84" />
        <path d="M300 390 L300 423 L350 423 L350 390 Z" fill="#d4b689" stroke="#0e1319" strokeWidth="1.5" />
        <path d="M350 390 L364 379 L364 411 L350 423 Z" fill="#b39066" stroke="#0e1319" strokeWidth="1.5" />
        <path d="M300 390 L350 390 L364 379 L314 379 Z" fill="none" stroke="#0e1319" strokeWidth="1.5" />
        <rect x="322" y="379" width="10" height="44" fill="#2f9e6b" />
      </g>

      {/* ─── Worker (loading, near packages) ─── */}
      <g className="hs-worker">
        <circle cx="245" cy="425" r="11" fill="#e8a33d" stroke="#0e1319" strokeWidth="1.5" />
        <path
          d="M232 436 Q238 448 245 452 Q252 448 258 436 L262 490 L228 490 Z"
          fill="#e8a33d"
          stroke="#0e1319"
          strokeWidth="1.5"
        />
        <rect x="230" y="490" width="12" height="30" fill="#0e1319" />
        <rect x="248" y="490" width="12" height="30" fill="#0e1319" />
        <path d="M258 445 L275 460" stroke="#e8a33d" strokeWidth="8" strokeLinecap="round" />
        <path d="M258 445 L275 460" stroke="#0e1319" strokeWidth="1.5" fill="none" />
      </g>

      {/* ─── Customer (foreground right, receiving) ─── */}
      <g>
        <circle cx="770" cy="435" r="12" fill="#3b6fe0" stroke="#0e1319" strokeWidth="1.5" />
        <path
          d="M756 447 Q762 460 770 464 Q778 460 784 447 L788 510 L752 510 Z"
          fill="#3b6fe0"
          stroke="#0e1319"
          strokeWidth="1.5"
        />
        <rect x="754" y="510" width="13" height="30" fill="#0e1319" />
        <rect x="773" y="510" width="13" height="30" fill="#0e1319" />
        {/* arms outstretched — receiving */}
        <path d="M756 458 L735 468" stroke="#3b6fe0" strokeWidth="8" strokeLinecap="round" />
        <path d="M756 458 L735 468" stroke="#0e1319" strokeWidth="1.5" fill="none" />
        <path d="M784 458 L800 465" stroke="#3b6fe0" strokeWidth="8" strokeLinecap="round" />
        <path d="M784 458 L800 465" stroke="#0e1319" strokeWidth="1.5" fill="none" />
        {/* Small parcel in hands */}
        <rect x="720" y="460" width="22" height="18" rx="1" fill="#d4b689" stroke="#0e1319" strokeWidth="1.5" />
        <rect x="729" y="460" width="4" height="18" fill="#2f9e6b" />
      </g>

      {/* Delivery pulse: rides from bike toward customer */}
      <circle
        className="hs-pulse"
        cx="500"
        cy="480"
        r="6"
        fill="#3b6fe0"
        opacity="0"
        filter="drop-shadow(0 0 4px #3b6fe0)"
      />

      {/* ─── Motion lines (behind bike) ─── */}
      <g stroke="#3b6fe0" strokeWidth="3" strokeLinecap="round">
        <line className="hs-motion" x1="285" y1="440" x2="330" y2="440" opacity="0.5" />
        <line className="hs-motion" x1="305" y1="470" x2="360" y2="470" opacity="0.65" />
        <line className="hs-motion" x1="285" y1="500" x2="345" y2="500" opacity="0.5" />
      </g>

      {/* ─── Delivery bike (foreground, mid-scene) ─── */}
      <g>
        {/* Cargo box */}
        <path d="M355 430 L410 430 L415 465 L360 465 Z" fill="#3b6fe0" />
        <path d="M355 430 L355 490 L410 490 L410 430 Z" fill="#3b6fe0" />
        <path d="M410 430 L415 465 L415 490 L410 490 Z" fill="#2e5abf" />
        <path
          d="M355 430 L410 430 L415 465 L360 465 M355 430 L355 490 L410 490 L410 430 M410 490 L415 490 L415 465"
          fill="none"
          stroke="#0e1319"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path d="M372 460 L393 460" stroke="#f2f4f1" strokeWidth="1.5" opacity="0.7" />

        {/* Frame */}
        <path
          d="M410 500 L440 460 L490 460 L520 500"
          stroke="#0e1319"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Handlebar */}
        <path d="M517 462 L535 445" stroke="#0e1319" strokeWidth="4" strokeLinecap="round" />
        <circle cx="540" cy="443" r="4" fill="#e8a33d" />

        {/* Rider */}
        <circle cx="470" cy="430" r="14" fill="#e8a33d" stroke="#0e1319" strokeWidth="2" />
        <path
          d="M458 442 Q465 465 490 465 Q500 465 505 458"
          stroke="#e8a33d"
          strokeWidth="18"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M458 442 Q465 465 490 465 Q500 465 505 458"
          stroke="#0e1319"
          strokeWidth="2"
          fill="none"
        />

        {/* Rear wheel */}
        <g transform="translate(410 500)">
          <circle cx="0" cy="0" r="24" fill="#0e1319" />
          <circle cx="0" cy="0" r="14" fill="#f2f4f1" stroke="#0e1319" strokeWidth="1.5" />
          <g className="hs-wheel" style={{ transformOrigin: "0 0" }}>
            <line x1="-14" y1="0" x2="14" y2="0" stroke="#0e1319" strokeWidth="2" />
            <line x1="0" y1="-14" x2="0" y2="14" stroke="#0e1319" strokeWidth="2" />
          </g>
          <circle cx="0" cy="0" r="2.5" fill="#0e1319" />
        </g>

        {/* Front wheel */}
        <g transform="translate(520 500)">
          <circle cx="0" cy="0" r="24" fill="#0e1319" />
          <circle cx="0" cy="0" r="14" fill="#f2f4f1" stroke="#0e1319" strokeWidth="1.5" />
          <g className="hs-wheel" style={{ transformOrigin: "0 0" }}>
            <line x1="-14" y1="0" x2="14" y2="0" stroke="#0e1319" strokeWidth="2" />
            <line x1="0" y1="-14" x2="0" y2="14" stroke="#0e1319" strokeWidth="2" />
          </g>
          <circle cx="0" cy="0" r="2.5" fill="#0e1319" />
        </g>
      </g>
    </svg>
  );
}
