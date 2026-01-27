import requestUnsplash from "../requests/unsplashRequest";
import type { ImgRes } from "./model/unsplashType";

export function getImg(keyword: string, page: number = 1) {
  return requestUnsplash.get<any, ImgRes>("/photos", {
    params: {
      query: keyword,
      page,
      per_page: 30,
    },
  });
}
