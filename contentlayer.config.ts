import { defineDocumentType, makeSource } from "contentlayer/source-files";

import { SectionsSchema } from "./lib/content/sections";

export const Page = defineDocumentType(() => ({
  name: "Page",
  filePathPattern: "pages/*.mdx",
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    description: { type: "string", required: true },
    slug: { type: "string", required: true },
    navLabel: { type: "string", required: false },
    published: { type: "boolean", required: false, default: true },
    sections: { type: "json", required: false },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (doc) => (doc.slug === "home" ? "/" : `/${doc.slug}`),
    },
    validatedSections: {
      type: "json",
      resolve: (doc) => SectionsSchema.parse(doc.sections ?? []),
    },
  },
}));

export const CaseStudy = defineDocumentType(() => ({
  name: "CaseStudy",
  filePathPattern: "case-studies/*.mdx",
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    description: { type: "string", required: true },
    industry: { type: "string", required: true },
    problem: { type: "string", required: true },
    solution: { type: "string", required: true },
    results: { type: "string", required: true },
    deliverables: { type: "list", of: { type: "string" }, required: true },
    stack: { type: "list", of: { type: "string" }, required: true },
    outcomeMetric: { type: "string", required: false },
    published: { type: "boolean", required: false, default: true },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.replace("case-studies/", ""),
    },
    url: {
      type: "string",
      resolve: (doc) => `/work/${doc._raw.flattenedPath.replace("case-studies/", "")}`,
    },
  },
}));

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Page, CaseStudy],
});
