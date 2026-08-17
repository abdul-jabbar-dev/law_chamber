import TopHeader from "@/src/components/header/TopHeader";
import Footer from "@/src/components/footer/Footer";

import { auth } from "@/auth";

export default async function ClientsideLayout(props: LayoutProps<"/">) {
  const session = await auth();

  return (
    <section className="flex flex-col min-h-screen">
      <TopHeader session={session} />
      <main className="flex-grow">
        {props.children}
      </main>
      <Footer />
    </section>
  )
}
