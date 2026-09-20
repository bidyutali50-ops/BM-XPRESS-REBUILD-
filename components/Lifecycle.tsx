"use client";

import React, { useRef, useState, useEffect } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import {
  FileCode,
  Cpu,
  UserCheck,
  MapPin,
  PackageCheck,
  Navigation,
  ShieldCheck,
  Play,
  Pause,
  RotateCcw,
  Clock,
  Terminal,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

interface WorkflowStep {
  id: string;
  stepNumber: string;
  badge: string;
  title: string;
  subtitle: string;
  body: string;
  icon: React.ElementType;
  colorHex: string;
  telemetry: {
    timestamp: string;
    action: string;
    details: string;
    actor: string;
  };
}

const LIFECYCLE_WORKFLOW: readonly WorkflowStep[] = [
  {
    id: "order_lands",
    stepNumber: "01",
    badge: "API Ingress",
    title: "Order Lands API",
    subtitle: "Validation & Ingestion",
    body: "Your order arrives via REST API, OMS webhook, or file batch. It is instantly validated against pincode serviceability and SLA rules.",
    icon: FileCode,
    colorHex: "#98a2ac", // Queued
    telemetry: {
      timestamp: "14:32:01.042",
      action: "ORDER_RECEIVED_API",
      details: "AWB #BMX-99482 ingested. Pincode 700001 verified.",
      actor: "REST API Gateway",
    },
  },
  {
    id: "auto_allocate",
    stepNumber: "02",
    badge: "AI Dispatch",
    title: "Auto Allocate to Rider",
    subtitle: "Smart Algorithmic Matching",
    body: "BMX Dispatch AI algorithm analyzes live rider locations, hub workloads, and traffic matrix to auto-allocate the optimal rider.",
    icon: Cpu,
    colorHex: "#e8a33d", // Assigned
    telemetry: {
      timestamp: "14:32:04.180",
      action: "AI_RIDER_ALLOCATED",
      details: "Matched with Rajesh K. (Rider #BMX-409, 1.2km away).",
      actor: "BMX AI Routing Engine",
    },
  },
  {
    id: "rider_accepts",
    stepNumber: "03",
    badge: "Rider Lock",
    title: "Rider Accepts Trip",
    subtitle: "Order Commitment",
    body: "Rider receives dispatch prompt on rider app and accepts the trip, locking the SLA target timer and dispatch payload.",
    icon: UserCheck,
    colorHex: "#f59e0b", // Accepted
    telemetry: {
      timestamp: "14:32:18.910",
      action: "TRIP_ACCEPTED",
      details: "Rider accepted trip. ETA to pickup: 4 mins.",
      actor: "Rider Mobile App",
    },
  },
  {
    id: "going_pickup",
    stepNumber: "04",
    badge: "Pickup Navigation",
    title: "Going for Pickup Location",
    subtitle: "Hub / Store Navigation",
    body: "Rider navigates to the merchant store, warehouse, or dark store using live turn-by-turn map navigation.",
    icon: MapPin,
    colorHex: "#3b82f6", // En route
    telemetry: {
      timestamp: "14:33:02.400",
      action: "ENROUTE_PICKUP",
      details: "Rider 600m from Rajarhat Dark Store Hub.",
      actor: "GPS Fleet Tracking",
    },
  },
  {
    id: "pickup_done",
    stepNumber: "05",
    badge: "Store Scan",
    title: "Pickup Done",
    subtitle: "Barcode & Weight Check",
    body: "Package barcode is scanned, order weight verified, and digital pickup receipt proof is generated instantly.",
    icon: PackageCheck,
    colorHex: "#6366f1", // Picked Up
    telemetry: {
      timestamp: "14:36:12.720",
      action: "PICKUP_COMPLETED",
      details: "Barcode scanned. Handover proof signed at Store #402.",
      actor: "Merchant Handover Scan",
    },
  },
  {
    id: "out_delivery",
    stepNumber: "06",
    badge: "AI Route Optimizer",
    title: "Out for Delivery (AI Route)",
    subtitle: "Dynamic Multi-Stop Optimization",
    body: "Order moves along an AI-optimized route calculated for lowest latency, live traffic avoidance, and battery efficiency.",
    icon: Navigation,
    colorHex: "#3b6fe0", // Transit
    telemetry: {
      timestamp: "14:38:40.110",
      action: "IN_TRANSIT_OPTIMIZED",
      details: "AI Route calculated (Waypoint 2 of 4). Live ETA 14 mins.",
      actor: "AI Route Optimizer",
    },
  },
  {
    id: "delivered_otp",
    stepNumber: "07",
    badge: "POD Verification",
    title: "Reach Customer > OTP Delivered",
    subtitle: "Customer Doorstep Closure",
    body: "Rider arrives at doorstep. Delivery is verified via 4-digit OTP scan, geo-tagged proof, and instant customer notification.",
    icon: ShieldCheck,
    colorHex: "#2f9e6b", // Delivered
    telemetry: {
      timestamp: "14:52:08.550",
      action: "DELIVERED_OTP_VERIFIED",
      details: "OTP Verified (8921). Geo-coordinates match destination.",
      actor: "Doorstep OTP Scan",
    },
  },
] as const;

export default function Lifecycle() {
  const root = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  // Auto-play simulation cycle
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % LIFECYCLE_WORKFLOW.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // GSAP Scroll Animations
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          reduced: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          if (ctx.conditions?.reduced) {
            gsap.set(".wf-card, .wf-dot, .wf-progress-bar", { opacity: 1, y: 0, scale: 1 });
            return;
          }

          gsap
            .timeline({
              scrollTrigger: { trigger: root.current, start: "top 70%", once: true },
            })
            .from(".wf-progress-bar", { scaleX: 0, transformOrigin: "left", duration: 1.2, ease: "power2.inOut" })
            .from(".wf-dot", { scale: 0, duration: 0.35, stagger: 0.08, ease: "back.out(2)" }, "-=0.9")
            .from(".wf-card", { y: 25, opacity: 0, duration: 0.5, stagger: 0.08, ease: "power3.out" }, "-=0.8")
            .from(".simulator-box", { y: 20, opacity: 0, duration: 0.5, ease: "power2.out" }, "-=0.3");
        }
      );

      return () => mm.revert();
    },
    { scope: root }
  );

  const currentStep = LIFECYCLE_WORKFLOW[activeStep];

  return (
    <section id="lifecycle" ref={root} className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="u-eyebrow flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-accent animate-pulse" />
            End-To-End Order Flow
          </p>
          <h2 className="u-display mt-3 max-w-2xl text-[clamp(2rem,4.5vw,3.2rem)] leading-tight text-foreground">
            From API Lands to Doorstep OTP.
          </h2>
        </div>

        {/* SLA Guarantee pill */}
        <div className="inline-flex items-center gap-2.5 rounded-full border border-paper-2 bg-card/80 px-4 py-2 text-xs font-mono text-muted-foreground shadow-sm backdrop-blur-sm self-start md:self-auto">
          <Sparkles className="h-3.5 w-3.5 text-amber-500" />
          <span>7-Step AI Dispatch & Delivery Pipeline</span>
        </div>
      </div>

      {/* Main Interactive Workflow Track */}
      <div className="relative mt-14">
        {/* Connection Line track (Desktop) */}
        <div className="hidden lg:block absolute left-0 right-0 top-12 h-1 bg-paper-2/80 rounded-full z-0 overflow-hidden">
          <div
            className="wf-progress-bar h-full bg-gradient-to-r from-[#98a2ac] via-[#3b82f6] to-[#2f9e6b] transition-all duration-500 ease-out"
            style={{ width: `${((activeStep + 1) / LIFECYCLE_WORKFLOW.length) * 100}%` }}
          />
        </div>

        {/* Steps Horizontal Grid */}
        <ol className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 relative z-10">
          {LIFECYCLE_WORKFLOW.map((s, idx) => {
            const Icon = s.icon;
            const isActive = activeStep === idx;
            const isPassed = idx <= activeStep;

            return (
              <li
                key={s.id}
                onClick={() => {
                  setActiveStep(idx);
                  setIsPlaying(false);
                }}
                className={`wf-card group relative cursor-pointer rounded-2xl border p-4 transition-all duration-300 flex flex-col justify-between ${
                  isActive
                    ? "border-transparent ring-2 bg-card shadow-xl scale-[1.03]"
                    : isPassed
                    ? "border-paper-2 bg-card/70 hover:bg-card hover:border-primary/40"
                    : "border-paper-2/50 bg-card/30 opacity-70 hover:opacity-100 hover:bg-card"
                }`}
                style={{
                  boxShadow: isActive ? `0 10px 28px -6px ${s.colorHex}30` : undefined,
                  borderColor: isActive ? s.colorHex : undefined,
                }}
              >
                {/* Step Connector Dot (Desktop) */}
                <div className="hidden lg:flex items-center justify-center mb-4">
                  <div
                    className={`wf-dot flex items-center justify-center h-6 w-6 rounded-full border-2 transition-all duration-300 ${
                      isActive
                        ? "scale-110 shadow-lg text-white font-bold text-xs"
                        : isPassed
                        ? "bg-card text-foreground"
                        : "bg-paper-2 text-muted-foreground border-transparent"
                    }`}
                    style={{
                      borderColor: s.colorHex,
                      backgroundColor: isActive ? s.colorHex : undefined,
                    }}
                  >
                    {isActive ? (
                      <span className="h-1.5 w-1.5 rounded-full bg-white animate-ping" />
                    ) : (
                      <span className="text-[9px] font-mono">{s.stepNumber}</span>
                    )}
                  </div>
                </div>

                {/* Step Card Header */}
                <div>
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <span className="text-[10px] font-mono font-bold" style={{ color: s.colorHex }}>
                      {s.stepNumber}. {s.badge}
                    </span>
                    <div
                      className="p-1.5 rounded-lg transition-colors"
                      style={{
                        backgroundColor: `${s.colorHex}15`,
                        color: s.colorHex,
                      }}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>

                  <h3 className="text-xs font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                    {s.title}
                  </h3>
                  <p className="mt-1 text-[11px] text-muted-foreground leading-snug line-clamp-3">
                    {s.body}
                  </p>
                </div>

                {/* Status Indicator */}
                <div className="mt-3 pt-2 border-t border-border/30 flex items-center justify-between text-[10px] font-mono">
                  <span className="text-muted-foreground truncate">{s.subtitle}</span>
                  {isActive && (
                    <span className="flex h-1.5 w-1.5 rounded-full" style={{ backgroundColor: s.colorHex }} />
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Interactive Telemetry & AI Simulator Inspector Box */}
      <div className="simulator-box mt-8 rounded-2xl border border-paper-2 bg-card p-6 shadow-lg backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/50 pb-4">
          <div className="flex items-center gap-3">
            <div
              className="flex h-11 w-11 items-center justify-center rounded-xl font-bold text-white shadow-md transition-colors duration-500"
              style={{ backgroundColor: currentStep.colorHex }}
            >
              <currentStep.icon className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-foreground">Step {currentStep.stepNumber}: {currentStep.title}</h4>
                <span
                  className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full text-white"
                  style={{ backgroundColor: currentStep.colorHex }}
                >
                  {currentStep.badge}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                {currentStep.subtitle} — Real-time telemetry log
              </p>
            </div>
          </div>

          {/* Simulation Play/Pause Controls */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-secondary px-3 py-1.5 text-xs font-semibold text-foreground shadow-sm hover:bg-secondary/80 transition-all"
            >
              {isPlaying ? (
                <>
                  <Pause className="h-3.5 w-3.5 text-amber-500" /> Pause Auto Demo
                </>
              ) : (
                <>
                  <Play className="h-3.5 w-3.5 text-emerald-500" /> Play Workflow
                </>
              )}
            </button>
            <button
              onClick={() => {
                setActiveStep(0);
                setIsPlaying(true);
              }}
              className="inline-flex items-center gap-1 rounded-xl border border-border bg-secondary p-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-all"
              title="Reset Simulation"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Animated Telemetry Log Display */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-4 gap-3">
          <div className="rounded-xl border border-border/60 bg-background/60 p-3">
            <span className="text-[10px] font-mono uppercase text-muted-foreground">Event Timestamp</span>
            <p className="mt-1 font-mono text-xs font-bold text-foreground">{currentStep.telemetry.timestamp}</p>
          </div>
          <div className="rounded-xl border border-border/60 bg-background/60 p-3">
            <span className="text-[10px] font-mono uppercase text-muted-foreground">Event Action Payload</span>
            <p className="mt-1 font-mono text-xs font-bold" style={{ color: currentStep.colorHex }}>
              {currentStep.telemetry.action}
            </p>
          </div>
          <div className="rounded-xl border border-border/60 bg-background/60 p-3">
            <span className="text-[10px] font-mono uppercase text-muted-foreground">Execution Layer</span>
            <p className="mt-1 font-mono text-xs font-semibold text-foreground">{currentStep.telemetry.actor}</p>
          </div>
          <div className="rounded-xl border border-border/60 bg-background/60 p-3">
            <span className="text-[10px] font-mono uppercase text-muted-foreground">Telemetry Record</span>
            <p className="mt-1 text-xs text-muted-foreground truncate">{currentStep.telemetry.details}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
