import type { Metadata } from "next";
import { PostList } from "@/components/post-list";
import { PageTitle } from "@/components/section";

export const metadata: Metadata = {
  title: "Writing",
  description: "Notes on designing AI products and shipping them with AI coding agents.",
};

export default function WritingPage() {
  return (
    <>
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
