import { motion } from "motion/react";
import { Compass, GraduationCap, Sparkles, BookOpen } from "lucide-react";

interface HeroProps {
  onNavigate: (section: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <div id="hero" className="relative min-h-screen bg-[#102542] overflow-hidden flex items-center pt-20">
      {/* Dynamic Cosmic Gradient & Grid Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(63,169,245,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(212,175,55,0.08),transparent_50%)]" />
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{
          backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
          backgroundSize: "24px 24px"
        }}
      />

      {/* Floating Sparkly Stars */}
      <div className="absolute top-1/4 left-1/10 w-2 h-2 bg-white rounded-full opacity-30 animate-pulse" />
      <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-[#D4AF37] rounded-full opacity-20 animate-bounce" style={{ animationDuration: "6s" }} />
      <div className="absolute bottom-1/4 right-1/10 w-2.5 h-2.5 bg-[#3FA9F5] rounded-full opacity-45 animate-pulse" style={{ animationDuration: "3s" }} />

      {/* Giant Compass Silhouette Accent */}
      <div className="absolute -right-48 -bottom-48 w-[600px] h-[600px] rounded-full border border-white/5 flex items-center justify-center opacity-20 pointer-events-none">
        <div className="w-[450px] h-[450px] rounded-full border border-dashed border-white/5" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-12">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Column */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
            >
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-xs sm:text-sm text-slate-200 font-medium tracking-wide">
                당신의 가능성을 진로로 연결합니다
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-4"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.15] font-sans">
                당신의 미래를 설계하는<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3FA9F5] via-[#D4AF37] to-amber-400">
                  교육 파트너, Future Compass
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed">
                진로 · 학습 · 입시 · 자기성장<br className="sm:hidden" />
                <span className="hidden sm:inline"> | </span>
                학생 개개인의 잠재력을 발견하고 실질적인 성과로 연결합니다. 입시를 넘어 인생 설계까지, 든든한 등대가 되겠습니다.
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <button
                onClick={() => onNavigate("reserve")}
                className="px-8 py-4 rounded-xl font-bold text-sm text-[#102542] bg-[#D4AF37] hover:bg-amber-400 shadow-xl hover:shadow-[#D4AF37]/20 transition-all duration-300 transform hover:-translate-y-1"
              >
                무료 1:1 상담 예약하기
              </button>
              <button
                onClick={() => onNavigate("diagnostic")}
                className="px-8 py-4 rounded-xl font-bold text-sm text-white bg-white/10 hover:bg-white/15 border border-white/15 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                <Compass className="w-4 h-4 text-[#3FA9F5]" />
                무료 AI 진단 테스트
              </button>
            </motion.div>

            {/* Supporting Micro-Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 0.5 }}
              className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-3 border-t border-white/5 opacity-60"
            >
              <div className="flex items-center gap-2 text-white text-xs">
                <GraduationCap className="w-4 h-4 text-[#D4AF37]" />
                초·중·고·성인 전 계열 프로그램
              </div>
              <div className="flex items-center gap-2 text-white text-xs">
                <BookOpen className="w-4 h-4 text-[#3FA9F5]" />
                고교학점제 최적화 가이드
              </div>
            </motion.div>
          </div>

          {/* Interactive Hero Graphical Card / Preview Column */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative"
          >
            {/* Ambient Background Glow behind container */}
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-[#3FA9F5]/20 to-[#D4AF37]/20 blur-xl opacity-70" />

            <div className="relative rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md p-6 sm:p-8 text-white shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="text-xs font-mono text-slate-400 tracking-wider">FUTURE COMPASS BLUEPRINT</span>
              </div>

              {/* Graphical Content mapping the core education pathways */}
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-[#3FA9F5]/30 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#3FA9F5]/10 flex items-center justify-center text-[#3FA9F5]">
                      <Compass className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">진로 설계 (Career Design)</h4>
                      <p className="text-xs text-slate-300 mt-1">자가 적성 및 동기부여 탐구 코스 매핑</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-[#D4AF37]/30 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">학습 코칭 (Meta Learning)</h4>
                      <p className="text-xs text-slate-300 mt-1">학습유형 조율 및 시간 관리 혁신 가도</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-r from-blue-950/40 to-slate-900/40 border border-[#3FA9F5]/20">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#3FA9F5] uppercase tracking-wider">AI RECOMMENDATION</span>
                    <span className="w-2 h-2 rounded-full bg-[#3FA9F5] animate-ping" />
                  </div>
                  <p className="text-sm text-slate-200 mt-2 font-medium">
                    "학생의 고유 계열: 기술 융합형 전략 설계자"
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Future Compass AI 진단 모듈을 시작하여 맞춤 분석 리포트를 확인해 보세요.
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 text-center">
                <button
                  onClick={() => onNavigate("diagnostic")}
                  className="w-full py-3 rounded-lg text-xs font-bold text-center bg-[#3FA9F5] hover:bg-blue-400 text-white shadow-md transition-colors"
                >
                  직관적 융합 진단 검사 개시
                </button>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
