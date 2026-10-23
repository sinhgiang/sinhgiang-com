import { PostList } from "@/components/post-list";
import { PageTitle } from "@/components/section";
import { JsonLd } from "@/components/json-ld";
import { writingJsonLd, pageMetadata } from "@/lib/seo";
import { pages } from "@/lib/site";

export const metadata = pageMetadata("writing");

export default function WritingPage() {
  return (
    <>
      <JsonLd data={writingJsonLd()} />
      <PageTitle title="Writing" intro={pages.writing.answer} />
      <div className="mt-10">
        <PostList />
      </div>
    </>
  );
}
