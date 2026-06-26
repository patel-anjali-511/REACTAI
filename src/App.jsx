import Home from "./components/Home";

const App = () => {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-between py-12 px-4 relative overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-b from-blue-500/10 via-indigo-500/5 to-transparent blur-[120px] pointer-events-none -z-10"></div>
            
            {/* Subtle Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none -z-20"></div>

            {/* Header Section */}
            <div className="text-center max-w-3xl mb-12 relative">
                <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/25 px-3 py-1 rounded-full text-xs font-semibold text-blue-400 tracking-wide mb-4 animate-pulse">
                    <span>✨ Powered by AI Super-Resolution</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
                    <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                        AI Image Enhancer
                    </span>
                </h1>
                <p className="text-lg text-slate-400 leading-relaxed font-light">
                    Upload your image and let our advanced AI models upscale and restore details in seconds.
                </p>
            </div>

            {/* Main Component */}
            <main className="w-full flex-grow flex flex-col items-center justify-center relative z-10">
                <Home />
            </main>

            {/* Footer Section */}
            <footer className="text-sm text-slate-500 mt-12 flex flex-col items-center space-y-2 relative z-10">
                <div className="h-px w-24 bg-slate-800 mb-2"></div>
                <p>
                    Developed & Optimized for Production by{" "}
                    <span className="text-indigo-400 font-medium hover:text-indigo-300 transition-colors">
                        @anjaliAI
                    </span>
                </p>
                <p className="text-xs text-slate-600">
                    &copy; {new Date().getFullYear()} All rights reserved.
                </p>
            </footer>
        </div>
    );
};

export default App;
