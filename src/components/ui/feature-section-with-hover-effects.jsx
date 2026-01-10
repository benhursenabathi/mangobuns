import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  IconClick,
  IconShieldLock,
  IconDevices,
  IconInfinity,
} from "@tabler/icons-react";

gsap.registerPlugin(ScrollTrigger);

// Animation defaults - matching App.jsx
const FADE_DURATION = 0.25;
const FADE_EASE = "power2.out";

export function FeaturesSectionWithHoverEffects() {
  const containerRef = useRef(null);
  const featureRefs = useRef([]);

  const features = [
    {
      title: "One-Click Switching",
      description:
        "Switch your Magic accessories between Macs instantly. No cables, no unpairing, no hassle.",
      icon: <IconClick />,
    },
    {
      title: "Local & Private",
      description:
        "All communication stays on your local network. No cloud, no accounts, no data leaves your devices.",
      icon: <IconShieldLock />,
    },
    {
      title: "All Magic Devices",
      description:
        "Supports Magic Keyboard, Magic Trackpad, and Magic Mouse—including Touch ID keyboards.",
      icon: <IconDevices />,
    },
    {
      title: "Lifetime License",
      description:
        "One purchase, yours forever. Install on every Mac you own with no subscriptions or hidden fees.",
      icon: <IconInfinity />,
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered fade-in animation for each feature
      featureRefs.current.forEach((ref, index) => {
        if (!ref) return;

        gsap.fromTo(
          ref,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: FADE_DURATION,
            ease: FADE_EASE,
            scrollTrigger: {
              trigger: ref,
              start: "top 85%",
              end: "top 60%",
              toggleActions: "play none none reverse",
            },
            delay: index * 0.08, // Stagger effect
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-10 max-w-5xl mx-auto"
    >
      {features.map((feature, index) => (
        <Feature
          key={feature.title}
          {...feature}
          index={index}
          ref={(el) => (featureRefs.current[index] = el)}
        />
      ))}
    </div>
  );
}

import { forwardRef } from "react";

const Feature = forwardRef(({
  title,
  description,
  icon,
  index,
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col lg:border-r py-10 relative group/feature border-ink/10",
        (index === 0 || index === 4) && "lg:border-l border-ink/10",
        index < 4 && "lg:border-b border-ink/10"
      )}
      style={{ opacity: 0 }}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-ink/5 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-ink/5 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-muted">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-ink/20 group-hover/feature:bg-ink transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-ink">
          {title}
        </span>
      </div>
      <p className="text-sm text-muted max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
});

Feature.displayName = "Feature";
