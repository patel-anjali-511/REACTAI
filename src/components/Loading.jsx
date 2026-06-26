const Loading = () => {
    return (
        <div className="flex flex-col justify-center items-center h-full space-y-4">
            <div className="relative flex items-center justify-center">
                {/* Outer Glow Ring */}
                <div className="absolute w-14 h-14 rounded-full border-4 border-blue-500/20 animate-ping"></div>
                {/* Inner Spinning Ring */}
                <div className="w-12 h-12 rounded-full border-4 border-blue-500 border-t-transparent animate-spin shadow-lg shadow-blue-500/30"></div>
            </div>
            <div className="text-sm font-medium text-slate-400 animate-pulse tracking-wide">
                AI is enhancing your image...
            </div>
        </div>
    );
};

export default Loading;
