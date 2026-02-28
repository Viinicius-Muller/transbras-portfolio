"use client"

import React from "react"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export function FadeIn({
  children,
  className,
  delay = 0,
  direction = "up",
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right"
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  const directionOffset = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: 40 },
    right: { x: -40 },
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...directionOffset[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function Counter({
  target,
  suffix = "",
  prefix = "",
}: {
  target: number
  suffix?: string
  prefix?: string
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
    >
      {isInView ? (
        <CounterAnimation target={target} prefix={prefix} suffix={suffix} />
      ) : (
        `${prefix}0${suffix}`
      )}
    </motion.span>
  )
}

function CounterAnimation({
  target,
  prefix,
  suffix,
}: {
  target: number
  prefix: string
  suffix: string
}) {
  return (
    <motion.span>
      {prefix}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <AnimatedNumber target={target} />
      </motion.span>
      {suffix}
    </motion.span>
  )
}

function AnimatedNumber({ target }: { target: number }) {
  const nodeRef = useRef<HTMLSpanElement>(null)

  return (
    <motion.span
      ref={nodeRef}
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.span
        initial={0}
        animate={target}
        transition={{ duration: 2, ease: "easeOut" }}
        onUpdate={(latest) => {
          if (nodeRef.current) {
            nodeRef.current.textContent = Math.round(
              latest as number
            ).toLocaleString("en-US")
          }
        }}
      >
        <span ref={nodeRef}>0</span>
      </motion.span>
    </motion.span>
  )
}

export { motion }
