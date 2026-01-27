export interface ImgItem {
  id: string;
  alt_description: string | null;
  urls: Record<string, string>;
  links: Record<string, string>;
}

export type ImgRes = {
  total: number;
  total_pages: number;
  results: ImgItem[];
};
