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
    alt: "Editorial still life of an ink satin opera glove in a quiet atelier",
  },
  materialReview: {
    src: materialReview,
    alt: "Editorial still life of ivory satin and lace materials for buyer review",
  },
  craft: {
    src: atelierCraft,
    alt: "Editorial close-up of satin glove construction at a worktable",
  },
  customManufacturing: {
    src: customManufacturingBg,
    alt: "Editorial atelier worktable with satin, lace and pattern tools",
  },
  materialDetail: {
    src: materialDetail,
    alt: "Editorial still life of ivory satin, black lace and a tailor's ruler",
  },
  gloveDetail: {
    src: gloveDetail,
    alt: "Editorial close-up of an ivory satin glove with a charcoal lace cuff",
  },
} as const;
