import { getPlaiceholder } from "plaiceholder";

/**
 * The tiny blurred image shown while a picture loads (docs/adr/0002).
 *
 * Computed once from the uploaded file, never at render time. Uses sharp
 * (through plaiceholder), which Cloudflare Workers can't run: a move there
 * swaps this body for the Cloudflare Images binding.
 */
export const generateBlurDataURL = async (image: Buffer) => {
  const { base64 } = await getPlaiceholder(image, { size: 10 });

  return base64;
};
