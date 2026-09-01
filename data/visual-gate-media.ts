import bridal01 from "../_stitch_input_pack/02_CONTENT_PRODUCTS/CONTENT_bridal_01.jpg";
import bridal02 from "../_stitch_input_pack/02_CONTENT_PRODUCTS/CONTENT_bridal_02.jpg";
import bridal03 from "../_stitch_input_pack/02_CONTENT_PRODUCTS/CONTENT_bridal_03.jpg";
import bridal04 from "../_stitch_input_pack/02_CONTENT_PRODUCTS/CONTENT_bridal_04.jpg";
import costume01 from "../_stitch_input_pack/02_CONTENT_PRODUCTS/CONTENT_costume_01.jpg";
import costume02 from "../_stitch_input_pack/02_CONTENT_PRODUCTS/CONTENT_costume_02.jpg";
import kids01 from "../_stitch_input_pack/02_CONTENT_PRODUCTS/CONTENT_kids_01.jpg";
import kids02 from "../_stitch_input_pack/02_CONTENT_PRODUCTS/CONTENT_kids_02.jpg";
import opera01 from "../_stitch_input_pack/02_CONTENT_PRODUCTS/CONTENT_opera_01.jpg";
import opera02 from "../_stitch_input_pack/02_CONTENT_PRODUCTS/CONTENT_opera_02.jpg";
import opera03 from "../_stitch_input_pack/02_CONTENT_PRODUCTS/CONTENT_opera_03.jpg";
import veil01 from "../_stitch_input_pack/02_CONTENT_PRODUCTS/CONTENT_veil_01.jpg";
import veil02 from "../_stitch_input_pack/02_CONTENT_PRODUCTS/CONTENT_veil_02.jpg";
import veil03 from "../_stitch_input_pack/02_CONTENT_PRODUCTS/CONTENT_veil_03.jpg";
import factory01 from "../_stitch_input_pack/03_CONTENT_FACTORY/CONTENT_factory_01.png";
import factory02 from "../_stitch_input_pack/03_CONTENT_FACTORY/CONTENT_factory_02.png";

/**
 * Local Visual Gate media only. Every source remains
 * REQUIRES_PERMISSION_CONFIRMATION and must not be published without approval.
 */
export const visualGateMedia = {
  bridal01,
  bridal02,
  bridal03,
  bridal04,
  costume01,
  costume02,
  kids01,
  kids02,
  opera01,
  opera02,
  opera03,
  veil01,
  veil02,
  veil03,
  factory01,
  factory02,
} as const;

export type VisualGateMedia = (typeof visualGateMedia)[keyof typeof visualGateMedia];
