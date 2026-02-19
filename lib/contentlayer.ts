export const contentDirectories = {
  pages: "content/pages",
  caseStudies: "content/case-studies",
  blog: "content/blog",
} as const;

export function getContentDirectory(
  contentType: keyof typeof contentDirectories,
): (typeof contentDirectories)[keyof typeof contentDirectories] {
  return contentDirectories[contentType];
}
