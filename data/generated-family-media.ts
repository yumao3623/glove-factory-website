import armSleeves from "../assets/editorial/generated/families/arm-sleeves.png";
import bridalGloves from "../assets/editorial/generated/families/bridal-gloves.png";
import costumeGloves from "../assets/editorial/generated/families/costume-gloves.png";
import kidsDressGloves from "../assets/editorial/generated/families/kids-dress-gloves.png";
import operaGloves from "../assets/editorial/generated/families/opera-gloves.png";
import weddingVeils from "../assets/editorial/generated/families/wedding-veils.png";

export const generatedFamilyMedia = {
  "bridal-gloves": { src: bridalGloves, alt: "Ivory lace bridal gloves arranged as a studio fashion still life" },
  "opera-gloves": { src: operaGloves, alt: "Ink satin opera gloves arranged as a sculptural studio still life" },
  "costume-gloves": { src: costumeGloves, alt: "Black ruched satin stage gloves with feathered lace cuffs" },
  "kids-dress-gloves": { src: kidsDressGloves, alt: "Powder blue, lilac and pale rose satin girls dress gloves with bows" },
  "wedding-veils": { src: weddingVeils, alt: "Ivory cathedral bridal veil with a ribbon comb and scalloped edge" },
  "arm-sleeves": { src: armSleeves, alt: "Black ruched fingerless satin arm sleeves with a plum colourway" },
} as const;
