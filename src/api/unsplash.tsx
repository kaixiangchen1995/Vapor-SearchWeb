import requestUnsplash from "../requests/unsplashRequest";
import type { ImgRes } from "./model/unsplashType";

/**
 * Get images from Unsplash
 * @param keyword search query
 * @param page page number
 * @returns Promise<ImgRes>
 */
export async function getImg(
  keyword: string,
  page: number = 1,
): Promise<ImgRes> {
  const response = await requestUnsplash.get("/photos", {
    params: {
      query: keyword,
      page,
      per_page: 30,
    },
  });
  return response.data;
}
