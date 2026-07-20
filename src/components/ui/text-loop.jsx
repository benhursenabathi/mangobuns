'use client';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, Children } from 'react';

/* ─────────────────────────────────────────────────────────
 * TEXT LOOP STORYBOARD
 *
 *    0ms   current word rests at y 0, fully sharp
 *    0ms   next word enters from 0.18em below
 *  320ms   next word settles; previous exits 0.18em above
 * ───────────────────────────────────────────────────────── */
const TEXT_LOOP_MOTION = {
    transition: { duration: 0.32, ease: [0.2, 0, 0, 1] },
    variants: {
        initial: { y: '0.18em', opacity: 0, filter: 'blur(3px)' },
        animate: { y: 0, opacity: 1, filter: 'blur(0px)' },
        exit: { y: '-0.18em', opacity: 0, filter: 'blur(3px)' },
    },
};

export function TextLoop({
    children,
    className,
    interval = 2,
    transition = TEXT_LOOP_MOTION.transition,
    variants,
    onIndexChange,
}) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const items = Children.toArray(children);

    useEffect(() => {
        const intervalMs = interval * 1000;

        const timer = setInterval(() => {
            setCurrentIndex((current) => {
                const next = (current + 1) % items.length;
                onIndexChange?.(next);
                return next;
            });
        }, intervalMs);
        return () => clearInterval(timer);
    }, [items.length, interval, onIndexChange]);

    return (
        <span className={cn('relative inline-block whitespace-nowrap', className)}>
            <AnimatePresence mode='popLayout' initial={false}>
                <motion.span
                    className="text-loop__item"
                    key={currentIndex}
                    initial='initial'
                    animate='animate'
                    exit='exit'
                    transition={transition}
                    variants={variants || TEXT_LOOP_MOTION.variants}
                >
                    {items[currentIndex]}
                </motion.span>
            </AnimatePresence>
        </span>
    );
}
