import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export default function PagesLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="mx-auto flex min-h-screen max-w-2xl flex-col px-5 sm:px-6">
      <Header />
      <main className="flex-1 pb-16">{children}</main>
      <Footer />
    </div>
  );
}
