"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import * as React from "react";

import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "@radix-ui/react-icons";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef(({ className, ...props }, ref) => (
    <AccordionPrimitive.Item
        ref={ref}
        className={cn("border-b border-ink/10", className)}
        {...props}
    />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef(({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Header className="flex">
        <AccordionPrimitive.Trigger
            ref={ref}
            className={cn(
                "flex flex-1 items-center justify-between py-5 text-left font-medium transition-all hover:text-ink/70 [&[data-state=open]>svg]:rotate-180",
                className,
            )}
            {...props}
        >
            {children}
            <ChevronDownIcon
                width={18}
                height={18}
                className="shrink-0 text-muted transition-transform duration-200"
                aria-hidden="true"
            />
        </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef(({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Content
        ref={ref}
        className="overflow-hidden text-sm text-muted transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
        {...props}
    >
        <div className={cn("pb-5 pt-0", className)}>{children}</div>
    </AccordionPrimitive.Content>
));

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
