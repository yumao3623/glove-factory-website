import atelierCraft from "../assets/editorial/generated/atelier-craft.png";
import atelierHero from "../assets/editorial/generated/atelier-hero.png";
import materialReview from "../assets/editorial/generated/material-review.png";
import customManufacturingBg from "../assets/editorial/generated/custom-manufacturing-bg.png";
import gloveDetail from "../assets/editorial/generated/glove-detail.png";
import materialDetail from "../assets/editorial/generated/material-detail.png";

/** Original image-generation assets for the W12 premium visual pass. */
export const generatedEditorialMedia = {
  hero: {
    src: atelierHero,
    alt: "Ink satin opera glove being fitted in a quiet atelier",
  },
  materialReview: {
    src: materialReview,
    alt: "Ivory satin glove and lace materials arranged for buyer review",
  },
  craft: {
    src: atelierCraft,
    alt: "Glove maker top-stitching an ivory satin cuff at an atelier worktable",
  },
  customManufacturing: {
    src: customManufacturingBg,
    alt: "A continuous atelier worktable with satin, lace and pattern tools",
  },
  materialDetail: {
    src: materialDetail,
    alt: "Ivory satin, black lace and a tailor's ruler arranged on a stone worktable",
  },
  gloveDetail: {
    src: gloveDetail,
    alt: "Ivory satin glove with a charcoal lace cuff and mother-of-pearl button",
  },
} as const;
