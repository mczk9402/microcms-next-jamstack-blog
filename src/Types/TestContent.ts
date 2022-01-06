export interface TestContent {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  body: string;
  category: {
    id: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    revisedAt: string;
    categoryName: string;
  };
  eyecatch: {
    url: string;
    height: number;
    width: number;
  };
  dev: {
    fieldId: string;
    dev: string;
    dev2: {
      url: string;
      height: number;
      width: number;
    };
    dev3: string;
  } | null;
}
