import PistachioScroll from '@/components/PistachioScroll';
import ProductDetails from '@/components/ProductDetails';
import Footer from '@/components/Footer';

export default function Home() {
    return (
        <main className="bg-black min-h-screen">
            {/* Hero Scrollytelling Section */}
            <PistachioScroll />

            {/* Product Details & CTA */}
            <ProductDetails />

            {/* Footer */}
            <Footer />
        </main>
    );
}
