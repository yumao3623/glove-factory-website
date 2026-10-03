import armSleevesHero from "../assets/editorial/generated/collection-heroes/arm-sleeves-hero-v2.webp";
import bridalGlovesHero from "../assets/editorial/generated/collection-heroes/bridal-gloves-hero-v2.webp";
import costumeGlovesHero from "../assets/editorial/generated/collection-heroes/costume-gloves-hero-v2.webp";
import kidsDressGlovesHero from "../assets/editorial/generated/collection-heroes/kids-dress-gloves-hero-v2.webp";
import operaGlovesHero from "../assets/editorial/generated/collection-heroes/opera-gloves-hero-v2.webp";
import weddingVeilsHero from "../assets/editorial/generated/collection-heroes/wedding-veils-hero-v2.webp";

export const generatedCollectionHeroMedia = {
  "bridal-gloves": {
    src: bridalGlovesHero,
    alt: "Black floral lace bridal gloves arranged on a warm ivory studio surface",
  },
  "opera-gloves": {
    src: operaGlovesHero,
    alt: "Ivory satin opera gloves photographed against a deep navy studio background",
  },
  "costume-gloves": {
    src: costumeGlovesHero,
    alt: "Black lace performance gloves with satin bows and feathered cuffs on a neutral studio surface",
  },
  "kids-dress-gloves": {
    src: kidsDressGlovesHero,
    alt: "Black satin girls dress gloves with bow cuffs and button details on a warm ivory studio surface",
  },
  "wedding-veils": {
    src: weddingVeilsHero,
    alt: "Black lace-trim wedding veil displayed against a warm ivory studio background",
  },
  "arm-sleeves": {
    src: armSleevesHero,
    alt: "Pale lilac ruched fingerless arm sleeves with thumb loops on a soft blush studio surface",
  },
} as const;
