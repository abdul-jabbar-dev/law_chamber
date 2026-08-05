import Hero from "@/src/components/home/Hero";
import About from "@/src/components/home/About";
import Services from "@/src/components/home/Services";
import Stats from "@/src/components/home/Stats";
import Testimonials from "@/src/components/home/Testimonials";
import LatestPosts from "@/src/components/home/LatestPosts";
import ChamberInfo from "@/src/components/home/ChamberInfo";
import CTA from "@/src/components/home/CTA";

const Page = () => {
    return (
        <main className="w-full flex flex-col">
            <Hero />
            <About />
            <Services />
            <Stats />
            <Testimonials />
            <LatestPosts />
            <ChamberInfo />
            <CTA />
        </main>
    );
};

export default Page;