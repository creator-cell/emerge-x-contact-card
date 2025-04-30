export const StripeBg = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="relative flex flex-col top-10 md:top-0 h-[300px] md:h-[500px] justify-center items-center space-y-0">

            <div className="absolute inset-0 z-0 flex flex-col justify-center items-center">
                {new Array(4).fill(0).map((_, index) => {
                    const opacity = 0.2 + index * 0.2;
                    return (
                        <img
                            key={index}
                            className={`-mt-16 sm:-mt-24 min-w-full`}
                            style={{ opacity }}
                            src="/stripe.png"
                        />
                    );
                })}
            </div>


            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
};
