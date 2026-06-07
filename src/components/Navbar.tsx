import { useState, useEffect } from "react";
import { Compass, Menu, X, ArrowUpRight } from "lucide-react";

interface NavbarProps {
  onNavigate: (section: string) => void;
  activeTab: string;
}

export default function Navbar({ onNavigate, activeTab }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "컨설턴트 소개", target: "intro" },
    { label: "핵심 서비스", target: "services" },
    { label: "교육 프로그램", target: "programs" },
    { label: "성공 사례", target: "success" },
    { label: "교육 칼럼", target: "columns" },
    { label: "AI 무료 진단", target: "diagnostic" },
    { label: "학습 대시보드", target: "dashboard" },
  ];

  const handleItemClick = (target: string) => {
    onNavigate(target);
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#102542]/95 backdrop-blur-md shadow-lg border-b border-white/5 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            onClick={() => handleItemClick("hero")}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#102542] via-[#3FA9F5] to-[#D4AF37] flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-transform duration-300">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold text-white tracking-wider font-sans block leading-none">
                FUTURE <span className="text-[#D4AF37]">COMPASS</span>
              </span>
              <span className="text-[10px] text-slate-300 font-mono tracking-widest uppercase block mt-1">
                Premium Education Consulting
              </span>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => (
              <a
                key={item.target}
                href={`#${item.target}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleItemClick(item.target);
                }}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300 relative ${
                  activeTab === item.target
                    ? "text-[#D4AF37]"
                    : "text-slate-200 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.label}
                {activeTab === item.target && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#D4AF37] rounded-full" />
                )}
              </a>
            ))}
          </div>

          {/* Consultation Reservation CTA */}
          <div className="hidden sm:block">
            <button
              onClick={() => handleItemClick("reserve")}
              className="flex items-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-[#D4AF37] to-amber-500 text-[#102542] text-sm font-semibold rounded-xl shadow-md hover:shadow-lg hover:from-amber-400 hover:to-amber-600 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              무료 상담 신청
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-slate-500"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-[#102542] border-b border-white/5 shadow-2xl animate-fade-in">
          <div className="px-2 pt-2 pb-4 space-y-1">
            {navItems.map((item) => (
              <a
                key={item.target}
                href={`#${item.target}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleItemClick(item.target);
                }}
                className={`w-full text-left block px-4 py-3 rounded-xl text-base font-medium transition-all ${
                  activeTab === item.target
                    ? "bg-[#D4AF37]/10 text-[#D4AF37] font-semibold"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                {item.label}
              </a>
            ))}
            <div className="pt-2 px-4 shadow-sm">
              <button
                onClick={() => handleItemClick("reserve")}
                className="w-full text-center py-3 bg-gradient-to-r from-[#D4AF37] to-amber-500 text-[#102542] rounded-xl font-bold shadow-lg"
              >
                무료 상담 신청하기
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
