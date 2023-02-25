import { getContent } from "$lib/notion/notion";
import type { Load } from "@sveltejs/kit";
import { BYPASS_TOKEN } from "$env/static/private";

export const load: Load = ({ params }) => {
  const fetchContent = async (slug: string) => {
    const res = await getContent(slug);
    return res;
  };

  return {
    post: fetchContent(params.slug),
  };
};

export const config = {
  isr: {
    expiration: false,
    bypassToken: BYPASS_TOKEN,
  },
  runtime: "nodejs18.x",
};
