import { PostList } from "@/components/post-list";
import { PageTitle } from "@/components/section";
import { JsonLd } from "@/components/json-ld";
import { writingJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("writing");

export default function WritingPage() {
  return (
    <>
      <JsonLd data={writingJsonLd()} />
      <PageTitle
        title="Writing"
        intro="Notes on designing AI products and shipping them with AI coding agents."
      />
      <div className="mt-10">
        <PostList />
      </div>
    </>
  );
}
