'use client';

import { motion } from 'framer-motion';

export default function ProductDetails() {
    return (
        <section className="relative bg-black text-white py-40 px-6 overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-green-600/10 rounded-full blur-[150px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Main Product Info */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-32"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="inline-block mb-6 px-6 py-2 border border-green-500/30 rounded-full bg-green-500/5 backdrop-blur-sm"
                    >
                        <span className="text-sm tracking-[0.2em] text-green-400 font-medium">SIGNATURE BLEND</span>
                    </motion.div>

                    <h2 className="text-7xl md:text-9xl font-bold tracking-[-0.02em] mb-8 bg-gradient-to-b from-white via-white to-white/60 bg-clip-text text-transparent">
                        The Ultimate<br />Pistachio Latte
                    </h2>
                    <p className="text-xl md:text-2xl text-green-50/60 max-w-3xl mx-auto font-light leading-relaxed">
                        After months of perfecting it, this latte hits just the right balance of
                        nutty pistachios, smooth coffee, and creamy oat milk. It's not just a
                        drink—it's a moment.
                    </p>
                </motion.div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-3 gap-8 mb-32">
                    {[
                        {
                            icon: "M5 13l4 4L19 7",
                            title: "Sicilian Pistachios",
                            description: "Roasted slowly in small batches, these pistachios from Mount Etna bring a rich, buttery flavor with a hint of natural sweetness.",
                            delay: 0.1
                        },
                        {
                            icon: "M13 10V3L4 14h7v7l9-11h-7z",
                            title: "Cold Brew Magic",
                            description: "Our 24-hour cold brew is extra smooth and mellow, letting the pistachio flavor really shine.",
                            delay: 0.2
                        },
                        {
                            icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
                            title: "Creamy Oat Milk",
                            description: "Made with barista-grade oat milk that's silky, rich, and completely dairy-free. Perfectly indulgent without compromise.",
                            delay: 0.3
                        }
                    ].map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: feature.delay }}
                            viewport={{ once: true }}
                            whileHover={{ y: -8, transition: { duration: 0.3 } }}
                            className="group relative p-8 rounded-2xl border border-green-500/10 bg-gradient-to-b from-green-500/5 to-transparent backdrop-blur-sm hover:border-green-500/30 transition-all duration-500"
                        >
                            {/* Gradient Overlay on Hover */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-600/0 via-green-600/0 to-green-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative">
                                <div className="w-14 h-14 mb-6 rounded-xl bg-gradient-to-br from-green-600 to-green-500 flex items-center justify-center shadow-lg shadow-green-600/20 group-hover:shadow-green-600/40 transition-shadow duration-500">
                                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold mb-4 tracking-tight text-white">{feature.title}</h3>
                                <p className="text-green-50/50 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    {/* Pricing */}
                    <div className="inline-block mb-12 relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 via-green-500/20 to-green-600/20 blur-2xl" />
                        <div className="relative bg-black/50 backdrop-blur-xl px-12 py-8 rounded-3xl border border-green-500/20">
                            <div className="text-xs tracking-[0.3em] text-green-400 mb-3 font-medium">SEASONAL SPECIAL</div>
                            <div className="text-6xl md:text-7xl font-bold tracking-tight bg-gradient-to-b from-white to-green-50/80 bg-clip-text text-transparent">
                                $7<span className="text-4xl">.50</span>
                            </div>
                            <div className="text-sm text-green-50/40 mt-3 tracking-wide">Hot or Iced</div>
                        </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-8">
                        <motion.button
                            whileHover={{ scale: 1.03, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            className="group relative px-14 py-6 bg-gradient-to-r from-white to-green-50 text-black font-bold text-base tracking-[0.1em] rounded-full overflow-hidden shadow-2xl shadow-white/10 hover:shadow-white/20 transition-all duration-300"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <span className="relative">ORDER NOW</span>
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.03, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            className="group relative px-14 py-6 border-2 border-white/80 text-white font-bold text-base tracking-[0.1em] rounded-full hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm"
                        >
                            <span className="relative">FIND A LOCATION</span>
                        </motion.button>
                    </div>

                    <p className="text-green-50/30 text-sm tracking-wide">
                        Available for a limited time at participating locations.
                    </p>
                </motion.div>
            </div>

            {/* Decorative Bottom Gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none" />
        </section>
    );
}
