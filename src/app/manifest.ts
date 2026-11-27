import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.shortName,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#f5f4f0",
    theme_color: "#0f0f0f",
    icons: [{ src: "/brand/iiiaes-emblem.jpg", sizes: "1254x1254", type: "image/jpeg", purpose: "any" }],
  };
}
