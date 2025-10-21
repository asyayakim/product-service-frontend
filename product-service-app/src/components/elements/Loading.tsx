export default function Loading() {
    return (
        <section id="hero"
            className="lex items-center justify-center min-h-screen bg-gray-50 py-12">
            <div className="flex items-center justify-center p-6 mx-auto text-center bg-white border ax-w-md hero-container rounded-xl">
                <div className="flex flex-col items-center justify-center space-y-4">
                    {/* <div className="w-10 h-10 border-4 border-gray-300 rounded-full border-t-blue-500 animate-spin"></div> */}
                    {/* <p className="text-lg font-medium text-gray-700">Loading products...</p> */}
                    <img
                        src="https://media1.tenor.com/m/RJVGObyOpd0AAAAC/downsign-loading.gif"
                        alt="Loading"
                        className="w-full max-w-xs rounded-md"
                        sizes="(max-width: 600px) 100vw, 600px"
                    />
                </div>
            </div>
        </section>
    );
}
