import TopHeader from "@/src/components/header/TopHeader";
import Footer from "@/src/components/footer/Footer";

export default function ClientsideLayout(props: LayoutProps<"/">) {
  return (
    <section className="flex flex-col min-h-screen">
      <TopHeader />
      <main className="flex-grow">
        {props.children}
      </main>
      <Footer />
    </section>
  )
}