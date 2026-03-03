import assert from "node:assert/strict";
import test from "node:test";
import { clampIndex, computeActiveSlideIndex } from "../../src/lib/project-carousel";

test("clampIndex clamps values to [0, max]", () => {
  assert.equal(clampIndex(-2, 3), 0);
  assert.equal(clampIndex(2, 3), 2);
  assert.equal(clampIndex(9, 3), 3);
});

test("computeActiveSlideIndex returns first index near left edge", () => {
  const index = computeActiveSlideIndex({
    scrollLeft: 1,
    maxScrollLeft: 900,
    slideOffsets: [0, 300, 600, 900],
    clientWidth: 300,
  });

  assert.equal(index, 0);
});

test("computeActiveSlideIndex returns last index near right edge", () => {
  const index = computeActiveSlideIndex({
    scrollLeft: 897,
    maxScrollLeft: 900,
    slideOffsets: [0, 300, 600, 900],
    clientWidth: 300,
  });

  assert.equal(index, 3);
});

test("computeActiveSlideIndex rounds to nearest slide", () => {
  const index = computeActiveSlideIndex({
    scrollLeft: 455,
    maxScrollLeft: 900,
    slideOffsets: [0, 300, 600, 900],
    clientWidth: 300,
  });

  assert.equal(index, 2);
});

test("computeActiveSlideIndex handles empty slides", () => {
  const index = computeActiveSlideIndex({
    scrollLeft: 100,
    maxScrollLeft: 900,
    slideOffsets: [],
    clientWidth: 300,
  });

  assert.equal(index, 0);
});
