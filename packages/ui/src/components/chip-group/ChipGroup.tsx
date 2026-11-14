import React, { useEffect, useLayoutEffect, useRef, type HTMLAttributes, type ReactNode } from 'react'
import * as S from './ChipGroup.style'

interface IChipGroup extends HTMLAttributes<HTMLDivElement> {
  /** Accessible name of the group, e.g. "Occasion" */
  label: string
  children: ReactNode
}

// Moves the indicator under the pressed chip. Writes styles directly: measuring happens after
// every render, and going through state would cost a second render each time.
function placeIndicator (row: HTMLElement, indicator: HTMLElement): void {
  const active = row.querySelector<HTMLElement>('[aria-pressed="true"]')
  if (!active) {
    indicator.dataset.visible = 'false'
    return
  }
  // Coming back from "nothing selected": appear in place instead of sliding in from the last spot
  indicator.dataset.instant = String(indicator.dataset.visible !== 'true')
  indicator.style.width = `${active.offsetWidth}px`
  indicator.style.height = `${active.offsetHeight}px`
  indicator.style.transform = `translate(${active.offsetLeft}px, ${active.offsetTop}px)`
  indicator.dataset.visible = 'true'
}

// Segmented-control pattern: labels stay put and one indicator slides and resizes to the
// pressed chip, instead of each chip morphing (which stretches text and shoves the row).
export const ChipGroup = ({ label, children, ...props }: IChipGroup) => {
  const rowRef = useRef<HTMLDivElement>(null)
  const indicatorRef = useRef<HTMLSpanElement>(null)

  useLayoutEffect(() => {
    if (rowRef.current && indicatorRef.current) placeIndicator(rowRef.current, indicatorRef.current)
  })

  // Re-measure when widths change without a render: web font swap, viewport resize
  useEffect(() => {
    const row = rowRef.current
    const indicator = indicatorRef.current
    if (!row || !indicator || typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver(() => placeIndicator(row, indicator))
    observer.observe(row)
    return () => observer.disconnect()
  }, [])

  return (
    <S.Row ref={rowRef} role='group' aria-label={label} {...props}>
      <S.Indicator ref={indicatorRef} aria-hidden='true' data-visible='false' />
      {children}
    </S.Row>
  )
}
