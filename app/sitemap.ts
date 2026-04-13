import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://firozkhan.site',
      lastModified: new Date(),
    },
    {
      url: 'https://firozkhan.site/projects',
      lastModified: new Date(),
    }
  ];
}
