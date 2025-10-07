            <span className="bg-primary-yellow/90 backdrop-blur-sm px-3 py-1 rounded-lg text-primary shadow-lg">
              GTR
            </span>{" "}
            BUSINESS IMMIGRATION
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => (
              <div key={item.name} className="relative group">
                <button className={`flex items-center hover:text-primary-yellow transition-all duration-300 text-sm font-medium tracking-wide hover:scale-105 ${
                  isDarkBackground ? 'text-white/90' : 'text-primary/90'
                }`}>
                  {item.name}
                  {item.hasDropdown && (
                    <ChevronDown className="ml-1 h-4 w-4 group-hover:rotate-180 transition-transform duration-200" />
                  )}
                </button>
              </div>
            ))}
          </nav>

          {/* Right Side Actions (Desktop) */}
          <div className="hidden lg:flex items-center space-x-6">
            <button className={`hover:text-primary-yellow transition-all duration-300 p-2 rounded-full hover:bg-white/10 ${
              isDarkBackground ? 'text-white/90' : 'text-primary/90'
            }`}>
              <Search className="h-5 w-5" />
            </button>
            <button className="bg-primary-yellow/90 backdrop-blur-sm hover:bg-primary-yellow text-primary px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 shadow-lg border border-white/20">
              BOOK AN APPOINTMENT →
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            className={`lg:hidden hover:text-primary-yellow transition-all duration-300 p-2 rounded-full hover:bg-white/10 ${
              isDarkBackground ? 'text-white/90' : 'text-primary/90'
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-black/20 backdrop-blur-xl shadow-2xl z-40 border-t border-white/10">
            <div className="px-4 py-6 space-y-4">
              {menuItems.map((item) => (
                <button
                  key={item.name}
                  className="block w-full text-left text-primary/90 hover:text-primary-yellow transition-all duration-300 text-sm font-medium tracking-wide py-3 px-2 rounded-lg hover:bg-white/10"
                >
                  {item.name}
                      <span className="bg-primary/90 backdrop-blur-sm px-3 py-1 rounded-lg text-primary shadow-lg">
              GTR
            </span>{" "}
            BUSINESS IMMIGRATION
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => (
              <div key={item.name} className="relative group">
                <button className={`flex items-center hover:text-primary transition-all duration-300 text-sm font-medium tracking-wide hover:scale-105 ${
                  isDarkBackground ? 'text-white/90' : 'text-primary/90'
                }`}>
                  {item.name}
                  {item.hasDropdown && (
                    <ChevronDown className="ml-1 h-4 w-4 group-hover:rotate-180 transition-transform duration-200" />
                  )}
                </button>
              </div>
            ))}
          </nav>

          {/* Right Side Actions (Desktop) */}
          <div className="hidden lg:flex items-center space-x-6">
            <button className={`hover:text-primary transition-all duration-300 p-2 rounded-full hover:bg-white/10 ${
              isDarkBackground ? 'text-white/90' : 'text-primary/90'
            }`}>
              <Search className="h-5 w-5" />
            </button>
            <button className="bg-primary/90 backdrop-blur-sm hover:bg-primary text-primary px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 shadow-lg border border-white/20">
              BOOK AN APPOINTMENT →
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            className={`lg:hidden hover:text-primary transition-all duration-300 p-2 rounded-full hover:bg-white/10 ${
              isDarkBackground ? 'text-white/90' : 'text-primary/90'
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-black/20 backdrop-blur-xl shadow-2xl z-40 border-t border-white/10">
            <div className="px-4 py-6 space-y-4">
              {menuItems.map((item) => (
                <button
                  key={item.name}
                  className="block w-full text-left text-primary/90 hover:text-primary transition-all duration-300 text-sm font-medium tracking-wide py-3 px-2 rounded-lg hover:bg-white/10"
                >
                  {item.name}
                </button>
              ))}
              <button className="w-full bg-primary/90 backdrop-blur-sm hover:bg-primary text-primary px-6 py-3 rounded-full font-medium transition-all duration-300 mt-4 shadow-lg border border-white/20">
