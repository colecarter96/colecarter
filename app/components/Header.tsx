const Header = () => {
    return (
        <header className="flex flex-col w-full">
            {/* Yellow top bar */}
            <div className="h-7 bg-[#895129] w-full" aria-hidden="true">
                <span className="sr-only">You Found Me!</span>
            </div>

            {/* Main header content */}
            <div className="w-full bg-white">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="flex items-center justify-between py-8">
                        {/* Left navigation */}
                        <div className="flex gap-8 font-['Playfair_Display'] font-medium text-lg tracking-wide">
                            <a href="#" className="hover:text-yellow-950">ABOUT</a>
                            <a href="#" className="hover:text-yellow-950">PROJECTS</a>
                        </div>

                        {/* Centered title */}
                        <h1 className="text-3xl font-bold font-['Playfair_Display'] tracking-wide">Cole Carter</h1>

                        {/* Right navigation */}
                        <div className="flex gap-8 font-['Playfair_Display'] font-medium text-lg tracking-wide">
                            <a href="#" className="hover:text-yellow-950">CONTACT</a>
                            <a href="#" className="hover:text-yellow-950">BLOG</a>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;