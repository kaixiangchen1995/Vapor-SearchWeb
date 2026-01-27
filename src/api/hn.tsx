import request from "../requests/hnRequest";
import type { HitsItemsList } from "./model/hnType";

/**
 * Get the story list from Hacks News
 * @param keyword query keywords
 * @param tags default story
 * @returns 
 */
export function getStories(keyword: string, tags: string = "story") {
  return request.get<any, HitsItemsList>("/search", {
    params: {
      query: keyword,
      tags,
    },
  });
}
