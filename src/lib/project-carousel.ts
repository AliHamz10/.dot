export interface CarouselIndexInput {
  scrollLeft: number;
  maxScrollLeft: number;
  slideOffsets: number[];
  clientWidth: number;
  edgeTolerance?: number;
}

export function clampIndex(index: number, maxIndex: number): number {
  return Math.max(0, Math.min(maxIndex, index));
}

export function computeActiveSlideIndex({
  scrollLeft,
  maxScrollLeft,
  slideOffsets,
  clientWidth,
  edgeTolerance = 4,
}: CarouselIndexInput): number {
  if (slideOffsets.length === 0) {
    return 0;
  }

  if (scrollLeft <= edgeTolerance) {
    return 0;
  }

  if (scrollLeft >= maxScrollLeft - edgeTolerance) {
    return slideOffsets.length - 1;
  }

  const firstOffset = slideOffsets[0];
  const step =
    slideOffsets.length > 1 ? slideOffsets[1] - firstOffset : Math.max(clientWidth, 1);

  if (step <= 0) {
    return 0;
  }

  const rawIndex = Math.round((scrollLeft - firstOffset) / step);
  return clampIndex(rawIndex, slideOffsets.length - 1);
}
