import Footer from "@/components/footer";
import Header from "@/components/header";
import MiddleContent from "@/components/middle-content";

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
                <MiddleContent />
            </main>
            <Footer />
        </div>
    );
}
