import { useState, useEffect } from "react";
import { TRUST_STATS } from "../data";
import { ShieldCheck, Award, GraduationCap, Users } from "lucide-react";

interface CounterProps {
  end: number;
  suffix: string;
}

function AnimatedCounter({ end, suffix }: CounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500; // ms
    const stepTime = Math.abs(Math.floor(duration / end));
    
    // Safety guard for extremely high speeds/steps
    const increment = Math.max(1, Math.floor(end / 40));
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, Math.min(35, stepTime));

    return () => clearInterval(timer);
  }, [end]);

  return (
    <span className="text-4xl sm:text-5xl font-mono font-bold text-white tracking-tight">
      {count.toLocaleString()}
      <span className="text-[#D4AF37] ml-0.5">{suffix}</span>
    </span>
  );
}

export default function TrustStats() {
  const iconMap: Record<number, any> = {
    0: Users,
    1: GraduationCap,
    2: Award,
    3: ShieldCheck,
  };

  return (
    <section className="bg-slate-900 border-y border-white/5 py-16 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#102542]/20 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-xs uppercase text-[#D4AF37] font-mono tracking-[0.25em] font-semibold">
            COMPASS NUMBERS
          </h2>
          <p className="text-2xl sm:text-3xl font-bold text-white mt-2">
            지표와 실적으로 증명하는 프리미엄 컨설팅의 품격
          </p>
          <div className="w-12 h-1 bg-[#D4AF37] mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {TRUST_STATS.map((stat, idx) => {
            const Icon = iconMap[idx] || ShieldCheck;
            return (
              <div 
                key={stat.label} 
                className="bg-white/5 border border-white/5 hover:border-white/10 rounded-2xl p-6 text-center transform hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#102542] to-slate-800 flex items-center justify-center mx-auto mb-4 border border-white/10">
                  <Icon className="w-5 h-5 text-[#3FA9F5]" />
                </div>
                
                <div className="mb-2">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold text-slate-100">{stat.label}</h4>
                  <p className="text-xs text-slate-400">{stat.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
