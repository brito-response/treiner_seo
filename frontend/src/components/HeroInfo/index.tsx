export const HeroInfo = () => {
    return (
        <section className="max-w-6xl mx-auto px-6 py-24 text-center">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Conteúdo real para <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">devs cedosos</span>
            </h2>

            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
                Freelance, programação, produtividade e crescimento profissional sem enrolação.
            </p>

            <div className="flex justify-center gap-4">
                <button className="bg-black text-white px-6 py-3 rounded-xl font-medium hover:scale-105 transition">
                    Explorar artigos
                </button>

                <button className="border border-gray-300 px-6 py-3 rounded-xl font-medium hover:bg-gray-100 transition">
                    Sobre o blog
                </button>
            </div>
        </section>
    );
}