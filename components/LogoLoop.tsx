"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type Key,
  type ReactNode,
  type RefObject,
} from "react";

const CFG = { SMOOTH_TAU: 0.25, MIN_COPIES: 2, COPY_HEADROOM: 2 } as const;

type BaseItem = { title?: string; href?: string };
export type NodeLogoItem = BaseItem & { node: ReactNode; ariaLabel?: string };
export type ImageLogoItem = BaseItem & {
  src: string;
  srcSet?: string;
  sizes?: string;
  width?: number;
  height?: number;
  alt?: string;
};
export type LogoItem = NodeLogoItem | ImageLogoItem;

type Direction = "left" | "right" | "up" | "down";

type Props = {
  logos: LogoItem[];
  speed?: number;
  direction?: Direction;
  width?: number | string;
  logoHeight?: number;
  gap?: number;
  pauseOnHover?: boolean;
  hoverSpeed?: number;
  fadeOut?: boolean;
  fadeOutColor?: string;
  scaleOnHover?: boolean;
  renderItem?: (item: LogoItem, key: Key) => ReactNode;
  ariaLabel?: string;
  className?: string;
  style?: CSSProperties;
};

const toCssLength = (v: number | string | undefined) =>
  typeof v === "number" ? `${v}px` : v;

function useResizeCallback(
  cb: () => void,
  refs: RefObject<HTMLElement | null>[]
) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (typeof ResizeObserver === "undefined") {
      const onResize = () => cb();
      window.addEventListener("resize", onResize);
      cb();
      return () => window.removeEventListener("resize", onResize);
    }
    const observers = refs
      .map((ref) => {
        if (!ref.current) return null;
        const ro = new ResizeObserver(cb);
        ro.observe(ref.current);
        return ro;
      })
      .filter((ro): ro is ResizeObserver => ro !== null);
    cb();
    return () => observers.forEach((ro) => ro.disconnect());
  }, [cb, refs]);
}

function useImageLoader(
  seqRef: RefObject<HTMLElement | null>,
  cb: () => void,
  deps: unknown[]
) {
  useEffect(() => {
    const imgs = Array.from(seqRef.current?.querySelectorAll("img") ?? []);
    if (imgs.length === 0) {
      cb();
      return;
    }
    let remaining = imgs.length;
    const onLoad = () => {
      remaining -= 1;
      if (remaining === 0) cb();
    };
    imgs.forEach((img) => {
      if (img.complete) onLoad();
      else {
        img.addEventListener("load", onLoad, { once: true });
        img.addEventListener("error", onLoad, { once: true });
      }
    });
    return () => {
      imgs.forEach((img) => {
        img.removeEventListener("load", onLoad);
        img.removeEventListener("error", onLoad);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

function useAnimationLoop(
  trackRef: RefObject<HTMLElement | null>,
  targetVelocity: number,
  seqWidth: number,
  seqHeight: number,
  isHovered: boolean,
  hoverSpeed: number | undefined,
  isVertical: boolean
) {
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);
  const offsetRef = useRef(0);
  const velRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Skip the loop entirely if the user prefers reduced motion.
    // The source leaves the RAF running and freezes the transform via CSS
    // !important; this stops the wasted work outright.
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const seqSize = isVertical ? seqHeight : seqWidth;

    if (seqSize > 0) {
      offsetRef.current = ((offsetRef.current % seqSize) + seqSize) % seqSize;
      track.style.transform = isVertical
        ? `translate3d(0, ${-offsetRef.current}px, 0)`
        : `translate3d(${-offsetRef.current}px, 0, 0)`;
    }

    if (reduced) return;

    const animate = (ts: number) => {
      if (lastTsRef.current === null) lastTsRef.current = ts;
      const dt = Math.max(0, ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;

      const target =
        isHovered && hoverSpeed !== undefined ? hoverSpeed : targetVelocity;
      const ease = 1 - Math.exp(-dt / CFG.SMOOTH_TAU);
      velRef.current += (target - velRef.current) * ease;

      if (seqSize > 0) {
        let next = offsetRef.current + velRef.current * dt;
        next = ((next % seqSize) + seqSize) % seqSize;
        offsetRef.current = next;
        track.style.transform = isVertical
          ? `translate3d(0, ${-next}px, 0)`
          : `translate3d(${-next}px, 0, 0)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTsRef.current = null;
    };
  }, [targetVelocity, seqWidth, seqHeight, isHovered, hoverSpeed, isVertical, trackRef]);
}

const isNode = (item: LogoItem): item is NodeLogoItem => "node" in item;

export default function LogoLoop({
  logos,
  speed = 120,
  direction = "left",
  width = "100%",
  logoHeight = 28,
  gap = 32,
  pauseOnHover,
  hoverSpeed,
  fadeOut = false,
  fadeOutColor,
  scaleOnHover = false,
  renderItem,
  ariaLabel = "Partner logos",
  className,
  style,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const seqRef = useRef<HTMLUListElement>(null);

  const [seqWidth, setSeqWidth] = useState(0);
  const [seqHeight, setSeqHeight] = useState(0);
  const [copyCount, setCopyCount] = useState<number>(CFG.MIN_COPIES);
  const [hovered, setHovered] = useState(false);

  const effectiveHoverSpeed = useMemo(() => {
    if (hoverSpeed !== undefined) return hoverSpeed;
    if (pauseOnHover === true) return 0;
    if (pauseOnHover === false) return undefined;
    return undefined;
  }, [hoverSpeed, pauseOnHover]);

  const isVertical = direction === "up" || direction === "down";

  const targetVelocity = useMemo(() => {
    const mag = Math.abs(speed);
    const dir = isVertical
      ? direction === "up"
        ? 1
        : -1
      : direction === "left"
      ? 1
      : -1;
    const sign = speed < 0 ? -1 : 1;
    return mag * dir * sign;
  }, [speed, direction, isVertical]);

  const updateDimensions = useCallback(() => {
    const containerWidth = containerRef.current?.clientWidth ?? 0;
    const rect = seqRef.current?.getBoundingClientRect?.();
    const w = rect?.width ?? 0;
    const h = rect?.height ?? 0;
    if (isVertical) {
      const parentH = containerRef.current?.parentElement?.clientHeight ?? 0;
      if (containerRef.current && parentH > 0) {
        const target = `${Math.ceil(parentH)}px`;
        if (containerRef.current.style.height !== target)
          containerRef.current.style.height = target;
      }
      if (h > 0) {
        setSeqHeight(Math.ceil(h));
        const viewport = containerRef.current?.clientHeight ?? parentH ?? h;
        const need = Math.ceil(viewport / h) + CFG.COPY_HEADROOM;
        setCopyCount(Math.max(CFG.MIN_COPIES, need));
      }
    } else if (w > 0) {
      setSeqWidth(Math.ceil(w));
      const need = Math.ceil(containerWidth / w) + CFG.COPY_HEADROOM;
      setCopyCount(Math.max(CFG.MIN_COPIES, need));
    }
  }, [isVertical]);

  useResizeCallback(updateDimensions, [containerRef, seqRef]);
  useImageLoader(seqRef, updateDimensions, [logos, gap, logoHeight, isVertical]);
  useAnimationLoop(
    trackRef,
    targetVelocity,
    seqWidth,
    seqHeight,
    hovered,
    effectiveHoverSpeed,
    isVertical
  );

  const cssVars = useMemo(
    () =>
      ({
        "--logoloop-gap": `${gap}px`,
        "--logoloop-logoHeight": `${logoHeight}px`,
        ...(fadeOutColor && { "--logoloop-fadeColor": fadeOutColor }),
      } as CSSProperties),
    [gap, logoHeight, fadeOutColor]
  );

  const rootClass = useMemo(
    () =>
      [
        "logoloop",
        isVertical ? "logoloop--vertical" : "logoloop--horizontal",
        fadeOut && "logoloop--fade",
        scaleOnHover && "logoloop--scale-hover",
        className,
      ]
        .filter(Boolean)
        .join(" "),
    [isVertical, fadeOut, scaleOnHover, className]
  );

  const onEnter = useCallback(() => {
    if (effectiveHoverSpeed !== undefined) setHovered(true);
  }, [effectiveHoverSpeed]);
  const onLeave = useCallback(() => {
    if (effectiveHoverSpeed !== undefined) setHovered(false);
  }, [effectiveHoverSpeed]);

  const renderOne = useCallback(
    (item: LogoItem, key: Key) => {
      if (renderItem) {
        return (
          <li className="logoloop__item" key={key} role="listitem">
            {renderItem(item, key)}
          </li>
        );
      }
      const content = isNode(item) ? (
        <span
          className="logoloop__node"
          aria-hidden={!!item.href && !item.ariaLabel}
        >
          {item.node}
        </span>
      ) : (
        <img
          src={item.src}
          srcSet={item.srcSet}
          sizes={item.sizes}
          width={item.width}
          height={item.height}
          alt={item.alt ?? ""}
          title={item.title}
          loading="lazy"
          decoding="async"
          draggable={false}
        />
      );
      const label = isNode(item) ? item.ariaLabel ?? item.title : item.alt ?? item.title;
      const inner = item.href ? (
        <a
          className="logoloop__link"
          href={item.href}
          aria-label={label || "logo link"}
          target="_blank"
          rel="noreferrer noopener"
        >
          {content}
        </a>
      ) : (
        content
      );
      return (
        <li className="logoloop__item" key={key} role="listitem">
          {inner}
        </li>
      );
    },
    [renderItem]
  );

  const lists = useMemo(
    () =>
      Array.from({ length: copyCount }, (_, ci) => (
        <ul
          className="logoloop__list"
          key={`copy-${ci}`}
          role="list"
          aria-hidden={ci > 0}
          ref={ci === 0 ? seqRef : undefined}
        >
          {logos.map((it, i) => renderOne(it, `${ci}-${i}`))}
        </ul>
      )),
    [copyCount, logos, renderOne]
  );

  const containerStyle = useMemo<CSSProperties>(
    () => ({
      width: isVertical
        ? toCssLength(width) === "100%"
          ? undefined
          : toCssLength(width)
        : toCssLength(width) ?? "100%",
      ...cssVars,
      ...style,
    }),
    [width, cssVars, style, isVertical]
  );

  return (
    <div
      ref={containerRef}
      className={rootClass}
      style={containerStyle}
      role="region"
      aria-label={ariaLabel}
    >
      <div
        className="logoloop__track"
        ref={trackRef}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      >
        {lists}
      </div>
    </div>
  );
}
