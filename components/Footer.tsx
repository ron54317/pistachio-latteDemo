'use client';

export default function Footer() {
    return (
        <footer className="relative bg-black text-white border-t border-green-900/10 py-20 px-6 overflow-hidden">
            {/* Subtle Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-green-600/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid md:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <h3 className="text-4xl font-bold tracking-tight mb-6 bg-gradient-to-r from-white to-green-50/80 bg-clip-text text-transparent">
                            Pistachio Latte
                        </h3>
                        <p className="text-green-50/40 leading-relaxed max-w-md font-light">
                            Redefining the coffee experience with bold innovation
                            and uncompromising quality.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-xs font-bold tracking-[0.2em] text-green-400 mb-6">
                            MENU
                        </h4>
                        <ul className="space-y-3 text-green-50/50 font-light">
                            <li><a href="#" className="hover:text-white transition-colors duration-200 inline-block hover:translate-x-1 transform transition-transform">All Drinks</a></li>
                            <li><a href="#" className="hover:text-white transition-colors duration-200 inline-block hover:translate-x-1 transform transition-transform">Seasonal</a></li>
                            <li><a href="#" className="hover:text-white transition-colors duration-200 inline-block hover:translate-x-1 transform transition-transform">Food</a></li>
                            <li><a href="#" className="hover:text-white transition-colors duration-200 inline-block hover:translate-x-1 transform transition-transform">Merchandise</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-xs font-bold tracking-[0.2em] text-green-400 mb-6">
                            CONNECT
                        </h4>
                        <ul className="space-y-3 text-green-50/50 font-light">
                            <li><a href="#" className="hover:text-white transition-colors duration-200 inline-block hover:translate-x-1 transform transition-transform">Locations</a></li>
                            <li><a href="#" className="hover:text-white transition-colors duration-200 inline-block hover:translate-x-1 transform transition-transform">Careers</a></li>
                            <li><a href="#" className="hover:text-white transition-colors duration-200 inline-block hover:translate-x-1 transform transition-transform">Contact Us</a></li>
                            <li><a href="#" className="hover:text-white transition-colors duration-200 inline-block hover:translate-x-1 transform transition-transform">Rewards</a></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-10 border-t border-green-900/10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-green-50/30">
                    <div className="font-light">
                        © 2026 Pistachio Latte. All rights reserved.
                    </div>
                    <div className="flex gap-8 font-light">
                        <a href="#" className="hover:text-green-400 transition-colors duration-200">Privacy Policy</a>
                        <a href="#" className="hover:text-green-400 transition-colors duration-200">Terms of Service</a>
                        <a href="#" className="hover:text-green-400 transition-colors duration-200">Accessibility</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
