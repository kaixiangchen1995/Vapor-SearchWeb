import request from "../requests/hnRequest";
import type { HitsItemsList } from "./model/hnType";

/**
 * Get the story list from Hacks News
 * @param keyword query keywords
 * @param tags default story
 * @returns Promise<HitsItemsList>
 */
export async function getStories(
  keyword: string,
  tags: string = "story",
): Promise<HitsItemsList> {
  const response = await request.get("/search", {
    params: {
      query: keyword,
      tags,
    },
  });
  return response.data.hits;
}
