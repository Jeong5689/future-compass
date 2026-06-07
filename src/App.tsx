/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect, FormEvent } from "react";
import {
  Compass,
  Users,
  CheckCircle2,
  ArrowRight,
  GraduationCap,
  Star,
  BookOpen,
  TrendingUp,
  Sparkles,
  Brain,
  Calendar,
  Award,
  Send,
  ChevronRight,
  Plus,
  Trash2,
  FileDown,
  AlertCircle,
  X,
  UserCheck,
  MessageSquare,
  Loader2,
  Heart,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  Clock,
  Phone,
  Mail,
  Check,
  HelpCircle,
  Play
} from "lucide-react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TrustStats from "./components/TrustStats";

import {
  SERVICE_CARDS,
  PROGRAM_INFOS,
  SUCCESS_CASES,
  EDUCATION_PHILOSOPHY,
  REVIEWS,
  COLUMN_ITEMS,
  LECTURE_ITEMS,
  DIAGNOSTIC_MAPPING
} from "./data";

import {
  ChatMessage,
  AICareerReport,
  LearningGoal,
  PortfolioLog,
  ConsultationRequest
} from "./types";

export default function App() {
  const [activeTab, setActiveTab] = useState("hero");

  // AI Chatbot States
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "반갑습니다! Future Compass 프리미엄 인공지능 컨설팅 챗봇입니다. 학생의 학습 습관, 과목 선택, 미래 유망 진로 및 생기부 관리 방향 등 궁금한 사항을 자유롭게 알려주세요.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    },
  ]);
  const [userMsgInput, setUserMsgInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);

  // Client-Side AI Diagnostic Test
  const [diagStep, setDiagStep] = useState(1); // 1: Input form, 2: Loading AI, 3: AI Premium Report
  const [studentName, setStudentName] = useState("");
  const [studentGrade, setStudentGrade] = useState("고등학교 1학년");
  const [favoriteSubjects, setFavoriteSubjects] = useState("");
  const [strengths, setStrengths] = useState("");
  const [personality, setPersonality] = useState("NT"); // NT, NF, ST, SF
  const [worries, setWorries] = useState("");
  const [diagLoading, setDiagLoading] = useState(false);
  const [diagReport, setDiagReport] = useState<AICareerReport | null>(null);

  // Quick Interactive Diagnostic mapping (personality)
  const [showPersonalityPreview, setShowPersonalityPreview] = useState(false);

  // Success Case Selected Tab (초등, 중등, 고등, 성인)
  const [selectedCaseIdx, setSelectedCaseIdx] = useState(1); // Default to high school index

  // Reviews slider active state
  const [activeReviewIdx, setActiveReviewIdx] = useState(0);

  // Learning Goal Dashboard States
  const [goals, setGoals] = useState<LearningGoal[]>([
    { id: "1", title: "수학 수행평가 '실생활 미적분 활용' 주제보고서 작성", category: "math", targetDate: "2026-06-15", completed: false, progress: 40 },
    { id: "2", title: "진로 추천 도서 'AI 세상을 바꾸다' 독후감 1편 기록 완료", category: "career", targetDate: "2026-06-10", completed: true, progress: 100 },
    { id: "3", title: "영어 영작 단어 매일 30개씩 암구 루틴 정밀화", category: "english", targetDate: "2026-06-30", completed: false, progress: 75 },
  ]);
  const [newGoalTitle, setNewGoalTitle] = useState("");
  const [newGoalCategory, setNewGoalCategory] = useState<any>("career");
  const [newGoalDate, setNewGoalDate] = useState("2026-06-20");

  const [portfolios, setPortfolios] = useState<PortfolioLog[]>([
    { id: "p1", date: "2026-05-18", title: "진로 심층 탐색 리포트", category: "activity", description: "Future Compass AI 미래 적성 예측 보고서 '스마트 모빌리티 융합 공학자' 역량 분석과 고교 선택과목 로드맵 설계 완성." },
    { id: "p2", date: "2026-05-25", title: "메타 독서 정독 클럽", category: "book", description: "인공지능 윤리 가이드라인을 정평한 도서를 탐독하고, 수행평가 발표 자료(자율주행 기기 오작동에 대한 법적 책임 분산) 초안 작성." }
  ]);
  const [newPTitle, setNewPTitle] = useState("");
  const [newPCategory, setNewPCategory] = useState<any>("activity");
  const [newPDesc, setNewPDesc] = useState("");

  // Reservation States
  const [submittedReservations, setSubmittedReservations] = useState<ConsultationRequest[]>([
    {
      id: "demo-1",
      name: "한예원 (학부모)",
      phone: "010-1234-5678",
      email: "hanyewon@gmail.com",
      field: "고등부 입시전략 컨설팅",
      date: "2026-06-12",
      timeSlot: "15:00 - 16:30",
      message: "수학과 과학에 재능이 있는 여학생입니다. 이화여대 상위 계열 학종을 지원하려면 생활기록부를 어떻게 스토리라이팅해야 할지 궁금해요.",
      submittedAt: "2026-06-07 10:11"
    }
  ]);
  const [reserveName, setReserveName] = useState("");
  const [reservePhone, setReservePhone] = useState("");
  const [reserveEmail, setReserveEmail] = useState("");
  const [reserveField, setReserveField] = useState("학습코칭 및 습관개선");
  const [reserveDate, setReserveDate] = useState("2026-06-15");
  const [reserveTime, setReserveTime] = useState("14:00 - 15:30");
  const [reserveMessage, setReserveMessage] = useState("");
  const [reservationSuccess, setReservationSuccess] = useState(false);

  // Automatic scrolling to section headers
  const handleNavigation = (sectionId: string) => {
    setActiveTab(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // AI Chatbot trigger logic
  const handleChatSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!userMsgInput.trim()) return;

    const userMsg: ChatMessage = {
      role: "user",
      content: userMsgInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setUserMsgInput("");
    setChatLoading(true);

    try {
      const response = await fetch("/api/gemini/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...chatMessages, userMsg] })
      });

      const data = await response.json();
      const assistantMsg: ChatMessage = {
        role: "assistant",
        content: data.text || "죄송합니다. 임시 네트워크 지연이 생겼습니다.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error(err);
    } finally {
      setChatLoading(false);
    }
  };

  // AI Career Diagnostic test logic
  const handleRunDiagnostic = async (e: FormEvent) => {
    e.preventDefault();
    if (!studentName.trim()) {
      alert("학생 이름을 먼저 입력해 주세요.");
      return;
    }
    setDiagLoading(true);
    setDiagStep(2);

    try {
      const response = await fetch("/api/gemini/career-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: studentName,
          grade: studentGrade,
          favoriteSubjects,
          strengths,
          worries,
          personality,
        })
      });

      const data = await response.json();
      setDiagReport(data);
      setDiagStep(3);
    } catch (err) {
      console.error("Diagnostic error:", err);
      // Failover safely
      setDiagStep(3);
    } finally {
      setDiagLoading(false);
    }
  };

  // Preset diagnostic template builder
  const handleApplyPresetType = (presetKey: string) => {
    const data = DIAGNOSTIC_MAPPING[presetKey];
    if (data) {
      setStudentName("장한결");
      setStudentGrade("고등학교 2학년");
      setFavoriteSubjects("인공지능, 공업일반 및 기초 미적분");
      setStrengths("세밀한 데이터 관찰, 분석 및 시스템 구조 조망");
      setWorries("고교학점제 선택과목 위계가 어려움, 수학 심화 역량 기재법 필요");
      setPersonality(presetKey);
      setShowPersonalityPreview(true);
    }
  };

  // Handle Goal addition
  const handleAddGoal = (e: FormEvent) => {
    e.preventDefault();
    if (!newGoalTitle.trim()) return;

    const newGoal: LearningGoal = {
      id: Date.now().toString(),
      title: newGoalTitle,
      category: newGoalCategory,
      targetDate: newGoalDate,
      completed: false,
      progress: 0
    };

    setGoals((prev) => [...prev, newGoal]);
    setNewGoalTitle("");
  };

  // Handle Portfolio addition
  const handleAddPortfolio = (e: FormEvent) => {
    e.preventDefault();
    if (!newPTitle.trim() || !newPDesc.trim()) return;

    const newP: PortfolioLog = {
      id: Date.now().toString(),
      date: new Date().toISOString().split("T")[0],
      title: newPTitle,
      category: newPCategory,
      description: newPDesc
    };

    setPortfolios((prev) => [newP, ...prev]);
    setNewPTitle("");
    setNewPDesc("");
  };

  // Handle Reservation creation
  const handleReserveSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!reserveName.trim() || !reservePhone.trim()) {
      alert("이름과 전화번호를 작성해 주시기 바랍니다.");
      return;
    }

    const newRequest: ConsultationRequest = {
      id: "user-" + Date.now(),
      name: reserveName,
      phone: reservePhone,
      email: reserveEmail || "미입력",
      field: reserveField,
      date: reserveDate,
      timeSlot: reserveTime,
      message: reserveMessage || "간단 유선 입문 상담 희망",
      submittedAt: new Date().toISOString().replace("T", " ").substring(0, 16)
    };

    setSubmittedReservations((prev) => [newRequest, ...prev]);
    setReservationSuccess(true);

    // Reset fields
    setReserveName("");
    setReservePhone("");
    setReserveEmail("");
    setReserveMessage("");

    setTimeout(() => {
      setReservationSuccess(false);
    }, 5000);
  };

  // Print PDF Simulated triggers
  const handleExportPDF = () => {
    window.print();
  };

  return (
    <div className="bg-[#102542] text-slate-100 min-h-screen font-sans antialiased overflow-x-hidden selection:bg-[#D4AF37] selection:text-[#102542]">
      
      {/* Top Banner Accent */}
      <div className="bg-[#D4AF37] text-[#102542] text-xs font-semibold py-2 px-4 text-center tracking-wide block relative z-50">
        <span className="inline-flex items-center gap-1.5 animate-pulse">
          <Sparkles className="w-3.5 h-3.5" />
          [공지] 2026학년도 하반기 고교학점제 대응 프리미엄 컨설팅 멤버십 리뉴얼 런칭!
        </span>
      </div>

      {/* Navigation */}
      <Navbar onNavigate={handleNavigation} activeTab={activeTab} />

      {/* Main Sections Body */}
      <main className="space-y-0 text-slate-200">
        
        {/* Section 1: Hero Section */}
        <Hero onNavigate={handleNavigation} />

        {/* Section 2: Trust Indicating Stats */}
        <div id="intro">
          <TrustStats />
        </div>

        {/* Section 3: Consultant Highlight Profile Card */}
        <section className="bg-slate-950 py-24 border-b border-white/5 relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(63,169,245,0.05),transparent_60%)]" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              
              {/* Graphical Avatar / Avatar Portrait Column */}
              <div className="lg:col-span-5 relative">
                <div className="absolute -inset-4 bg-gradient-to-tr from-[#D4AF37] to-[#3FA9F5] rounded-3xl blur-2xl opacity-20" />
                <div className="relative bg-slate-900 border border-white/10 rounded-3xl p-8 overflow-hidden flex flex-col items-center">
                  
                  {/* Styled Avatar Placeholder */}
                  <div className="w-48 h-48 rounded-full bg-gradient-to-tr from-[#102542] via-[#3FA9F5] to-[#D4AF37] p-1.5 mb-6 relative">
                    <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center overflow-hidden border border-white/10">
                      <Compass className="w-24 h-24 text-[#D4AF37] animate-spin-slow opacity-80" />
                    </div>
                    <div className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-emerald-500 border-2 border-slate-900 flex items-center justify-center shadow-lg">
                      <span className="w-3 h-3 rounded-full bg-white animate-ping" />
                    </div>
                  </div>

                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-white">김미래 소장</h3>
                    <p className="text-sm text-[#D4AF37] font-semibold tracking-wider mt-1">Future Compass 대표 컨설턴트</p>
                    <div className="mt-4 flex flex-wrap gap-2 justify-center">
                      <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-slate-300">교육학 전공</span>
                      <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-slate-300">평생교육전문가</span>
                      <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-slate-300">진로 마스터 코치</span>
                    </div>
                  </div>

                  <div className="w-full mt-6 pt-6 border-t border-white/5 space-y-2.5 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#3FA9F5]" />
                      <span>서울 주요 대학 진학 지도 경력 15년 이상</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#3FA9F5]" />
                      <span>대기업 및 고교 진로특강 다수 (누적 500+회)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#3FA9F5]" />
                      <span>미래 융합 에듀테크 교육 콘텐츠 설계 전문가</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Text / Credentials Column */}
              <div className="lg:col-span-7 space-y-6">
                <span className="text-[#3FA9F5] font-mono text-xs uppercase tracking-[0.2em] font-bold">FOUNDER & CEO STATEMENT</span>
                <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
                  "교육은 단순한 합격을 넘어,<br />
                  학생 고유의 우주를 세우는 작업입니다."
                </h2>
                
                <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                  안녕하세요, Future Compass 대표 소장 김미래입니다. <br />
                  수많은 학생들이 성적표라는 닫힌 평면 속에서 자신의 한계를 먼저 배웁니다. 하지만 진정한 변화는 '전공 지표'가 아닌 **'자기이해의 불꽃'**이 켜질 때 시작됩니다.
                </p>

                <p className="text-slate-400 leading-relaxed text-sm">
                  Future Compass는 단순한 과목 쪽집게 학업 지도를 지양합니다. 첨단 인지 과학 도구와 인공지능 탐구 설계 지침, 전문 컨설턴트들의 정밀 대면 협업 매트릭스를 결합하여, 학생이 스스로 인생 방향을 탐구하도록 로드맵을 구축합니다.
                </p>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <h4 className="text-sm font-bold text-white mb-2">핵심 역량</h4>
                    <p className="text-xs text-slate-400">MBTI / 다중지능 매핑, 고교학점제 위계 분석, 수행평가 탐구 심화 설계</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <h4 className="text-sm font-bold text-white mb-2">주요 연구 분야</h4>
                    <p className="text-xs text-slate-400">학생부종합전형 세특 키워드 공정성 분석 및 개인화 에듀테크 포트폴리오 매칭 시스템</p>
                  </div>
                </div>

                <div className="pt-6">
                  <button 
                    onClick={() => handleNavigation("reserve")}
                    className="px-6 py-3 rounded-lg text-xs font-bold bg-[#D4AF37] hover:bg-amber-400 text-[#102542] tracking-wider transition-colors"
                  >
                    대표 컨설턴트 직통 무료 1:1 진단 요청
                  </button>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* Section 4: Core Services with sleek customizable cards */}
        <section id="services" className="bg-slate-900 py-24 relative border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-[#D4AF37] font-mono text-xs uppercase tracking-[0.25em] font-semibold">CORE COMPETENCIES</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">
                Future Compass의 4가지 핵심 가치 서비스
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-2">
                자가 성장과 실제 역량 각인을 위해 마련된 단계별 융합 프로그램 스킴
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {SERVICE_CARDS.map((card, idx) => {
                return (
                  <div 
                    key={card.title}
                    className={`rounded-2xl border border-white/10 bg-gradient-to-b ${card.color} p-6 flex flex-col justify-between hover:scale-[1.02] hover:border-white/20 transition-all duration-300 relative group`}
                  >
                    {/* Corner Accent Glow */}
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-white/10 to-transparent rounded-tr-2xl pointer-events-none" />
                    
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-[#102542] border border-white/10 flex items-center justify-center text-[#3FA9F5] mb-6">
                        {idx === 0 && <Compass className="w-6 h-6 text-[#3FA9F5]" />}
                        {idx === 1 && <BookOpen className="w-6 h-6 text-[#D4AF37]" />}
                        {idx === 2 && <Award className="w-6 h-6 text-[#3FA9F5]" />}
                        {idx === 3 && <TrendingUp className="w-6 h-6 text-[#D4AF37]" />}
                      </div>

                      <h3 className="text-lg font-bold text-white mb-4 group-hover:text-[#D4AF37] transition-colors">{card.title}</h3>
                      
                      <ul className="space-y-2.5">
                        {card.points.map((pt, pIdx) => (
                          <li key={pIdx} className="text-xs text-slate-300 flex items-start gap-2">
                            <span className="text-[#3FA9F5] mt-0.5">•</span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-[#D4AF37]">
                      <span className="font-semibold cursor-pointer" onClick={() => handleNavigation("reserve")}>더 알아보기</span>
                      <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* Section 5: Programs segmented by Age Profile */}
        <section id="programs" className="bg-slate-950 py-24 border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-[#3FA9F5] font-mono text-xs uppercase tracking-[0.25em] font-semibold">CUSTOM BLUEPRINTS</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-1">연령대별 체계적 프로그램 소개</h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-2">
                초등부터 성인까지, 각 성장 단계에 절대적으로 함양해야 할 테마와 전략
              </p>
            </div>

            <div className="grid lg:grid-cols-4 gap-8">
              {PROGRAM_INFOS.map((prog) => {
                return (
                  <div 
                    key={prog.level}
                    className="p-6 rounded-2xl bg-slate-900 border border-white/5 hover:border-slate-800 transition-all flex flex-col justify-between"
                  >
                    <div>
                      {/* Age Segment Header */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="px-3 py-1 rounded-full text-xs font-bold text-[#D4AF37] bg-white/5 border border-white/10">
                          {prog.level} 프로그램
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 tracking-wider">
                          {prog.duration}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-white mb-2">{prog.title}</h3>
                      <p className="text-xs text-slate-300 font-medium mb-6 italic">"{prog.focus}"</p>

                      <div className="w-full h-px bg-white/5 mb-6" />

                      <ul className="space-y-4">
                        {prog.items.map((it, idx) => (
                          <li key={idx} className="flex gap-2.5 items-start">
                            <div className="w-4 h-4 rounded-full bg-[#3FA9F5]/10 flex items-center justify-center text-[#3FA9F5] shrink-0 mt-0.5">
                              <span className="text-[10px] font-bold">{idx + 1}</span>
                            </div>
                            <span className="text-xs text-slate-400 leading-relaxed">{it}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-8">
                      <button 
                        onClick={() => handleNavigation("reserve")}
                        className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-white tracking-wide border border-white/10 hover:border-white/20 transition-all"
                      >
                        상세 프로그램 책자 신청
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* Section 6: Successful Student Cases (Before & After) */}
        <section id="success" className="bg-slate-900 py-24 relative border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-[#D4AF37] font-mono text-xs uppercase tracking-[0.25em] font-semibold">SUCCESS ARCHIVE</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-1">실증적인 Before → After 성공사례</h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-2">
                목표 상실과 불안을 딛고, 자신의 궤도를 찾아 도약한 대표 실외 지침
              </p>
            </div>

            {/* Quick Segment Tab controls */}
            <div className="flex justify-center gap-2 mb-12 flex-wrap">
              {SUCCESS_CASES.map((sc, idx) => (
                <button
                  key={sc.id}
                  onClick={() => setSelectedCaseIdx(idx)}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    selectedCaseIdx === idx
                      ? "bg-[#D4AF37] text-[#102542] shadow-lg shadow-[#D4AF37]/10"
                      : "bg-white/5 text-slate-300 hover:bg-white/10"
                  }`}
                >
                  [{sc.group}] {sc.badge}
                </button>
              ))}
            </div>

            {/* Active Display Panel */}
            <div className="bg-slate-950 border border-white/10 rounded-2xl p-6 sm:p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#3FA9F5]/5 rounded-bl-full pointer-events-none" />

              <div className="grid md:grid-cols-12 gap-8 items-center">
                
                <div className="md:col-span-8 space-y-6">
                  <div>
                    <span className="px-3 py-1 rounded-full bg-white/5 border border-[#3FA9F5]/30 text-xs text-[#3FA9F5] font-semibold">
                      {SUCCESS_CASES[selectedCaseIdx].badge} Case STUDY
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mt-3 leading-tight">
                      {SUCCESS_CASES[selectedCaseIdx].title}
                    </h3>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {/* Before Block */}
                    <div className="p-5 rounded-xl bg-red-950/20 border border-red-900/30">
                      <span className="text-[10px] uppercase font-mono font-bold text-red-400 tracking-wider block mb-2">● BEFORE (코칭 전 상황)</span>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {SUCCESS_CASES[selectedCaseIdx].before}
                      </p>
                    </div>

                    {/* After Block */}
                    <div className="p-5 rounded-xl bg-emerald-950/20 border border-emerald-900/30">
                      <span className="text-[10px] uppercase font-mono font-bold text-emerald-400 tracking-wider block mb-2">● AFTER (솔루션 적용 결과)</span>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {SUCCESS_CASES[selectedCaseIdx].after}
                      </p>
                    </div>
                  </div>

                  {/* Impact Summary Line */}
                  <div className="p-4 rounded-xl bg-[#102542]/40 border border-white/5 flex items-center gap-3">
                    <Award className="w-5 h-5 text-[#D4AF37] shrink-0" />
                    <div>
                      <span className="text-[10px] text-[#D4AF37] font-semibold tracking-wide uppercase block">최종 핵심 도약 지표</span>
                      <p className="text-xs sm:text-sm text-white font-medium">
                        {SUCCESS_CASES[selectedCaseIdx].impactResult}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Simulated Growth Chart Graph Card on right */}
                <div className="md:col-span-4 bg-white/5 border border-white/5 rounded-xl p-5 space-y-4">
                  <span className="text-[10px] text-slate-400 font-mono block">학생 적성 성장 도표 시뮬레이션</span>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-300">자기 주도 학습력</span>
                        <span className="text-[#D4AF37] font-bold font-mono">92%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-[#D4AF37] rounded-full" style={{ width: "92%" }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-300">내신 · 수행 진학 적합성</span>
                        <span className="text-[#3FA9F5] font-bold font-mono">88%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-[#3FA9F5] rounded-full" style={{ width: "88%" }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-300">목표 대학 전공 일치도</span>
                        <span className="text-white font-bold font-mono">95%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-slate-300 rounded-full" style={{ width: "95%" }} />
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 text-center">
                    <p className="text-[10px] text-slate-500 italic">"신속 입시 진단 기반 4개월 연속 이행 시 측정 통계치"</p>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </section>

        {/* Section 7: Core Educational Philosophy */}
        <section className="bg-slate-950 py-24 relative overflow-hidden border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              
              <div className="lg:col-span-4">
                <span className="text-[#3FA9F5] font-mono text-xs uppercase tracking-[0.2em] font-bold">PHILOSOPHY</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 leading-tight font-sans">
                  {EDUCATION_PHILOSOPHY.title}
                </h2>
                <div className="w-12 h-1 bg-[#D4AF37] my-6 rounded-full" />
                <p className="text-[#D4AF37] text-md font-medium leading-relaxed italic">
                  "{EDUCATION_PHILOSOPHY.quote}"
                </p>
                <p className="text-xs text-slate-400 mt-4 leading-relaxed">
                  등수는 단순히 현재의 지점일 뿐입니다. 우리 교육의 진정한 가치는 학생이 자기이해의 눈을 떠 평생 흐트러지지 않을 공부 루틴과 도전의 자세를 확립하는 데 있습니다.
                </p>
              </div>

              <div className="lg:col-span-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {EDUCATION_PHILOSOPHY.values.map((v, idx) => {
                  return (
                    <div 
                      key={v.title}
                      className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-[#D4AF37]/20 transition-all group"
                    >
                      <span className="text-xs font-mono text-slate-400 block mb-3">STEP 0{idx + 1}</span>
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#D4AF37] transition-colors">{v.title}</h3>
                      <p className="text-xs text-slate-400 leading-relaxed">{v.desc}</p>
                    </div>
                  );
                })}
              </div>

            </div>

          </div>
        </section>

        {/* Section 8: Reviews/Reviews Slider */}
        <section id="reviews" className="bg-slate-900 py-24 border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-[#D4AF37] font-mono text-xs uppercase tracking-[0.25em] font-semibold">TESTIMONIALS</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-1">학부모와 학생의 진심어린 동반 후기</h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-2">
                단순 광고가 아닌, 눈물과 기쁨으로 작성해 주신 변화의 편지들
              </p>
            </div>

            {/* Slider container */}
            <div className="max-w-4xl mx-auto">
              <div className="bg-slate-950 border border-white/10 rounded-2xl p-8 sm:p-12 relative shadow-2xl">
                
                {/* Highlight Quotes icon */}
                <div className="absolute top-6 left-6 text-slate-800 text-7xl font-serif pointer-events-none">“</div>
                
                <div className="relative z-10 space-y-6">
                  {/* Stars block */}
                  <div className="flex gap-1">
                    {[...Array(REVIEWS[activeReviewIdx].stars)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-[#D4AF37] fill-amber-400" />
                    ))}
                  </div>

                  <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-light">
                    "{REVIEWS[activeReviewIdx].text}"
                  </p>

                  <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-white text-sm">{REVIEWS[activeReviewIdx].author}</h4>
                      <p className="text-[10px] text-slate-400 mt-0.5">분야: {REVIEWS[activeReviewIdx].tag} | {REVIEWS[activeReviewIdx].role}</p>
                    </div>

                    {/* Navigation buttons inside the review card */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => setActiveReviewIdx((prev) => (prev === 0 ? REVIEWS.length - 1 : prev - 1))}
                        className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 text-slate-300"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setActiveReviewIdx((prev) => (prev === REVIEWS.length - 1 ? 0 : prev + 1))}
                        className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 text-slate-300"
                      >
                        <ChevronRightIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

              </div>

              {/* Bullet Indicators */}
              <div className="flex justify-center gap-2 mt-6">
                {REVIEWS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveReviewIdx(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      activeReviewIdx === idx ? "bg-[#D4AF37] w-6" : "bg-slate-700"
                    }`}
                  />
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* Section 11: Free AI Clinical / Diagnostic Test (Crucial differentiator!) */}
        <section id="diagnostic" className="bg-[#102542] py-24 relative overflow-hidden text-white border-b border-white/5">
          {/* Neon blue and gold backdrop glow */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#3FA9F5]/10 rounded-full filter blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full filter blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              
              {/* Introduction Column */}
              <div className="lg:col-span-5 space-y-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3FA9F5]/20 text-xs text-[#3FA9F5] border border-[#3FA9F5]/40 font-bold">
                  <Brain className="w-4 h-4" />
                  프리미엄 AI 진료 진단 솔루션
                </span>
                
                <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
                  학생 맞춤형 미래 직업 매칭 및 학습 전략 시뮬레이터
                </h2>

                <p className="text-slate-300 text-sm leading-relaxed">
                  재능이 무엇인지 찾기 어렵다면, Future Compass의 AI 매핑 테스트를 진행하세요. 
                  학생의 평소 관심 과목, 강점, 고민을 바탕으로 **Google Gemini 최신 모델(gemini-3.5-flash)**이 정형화된 미래 유망 직업 제안서와 학교 세특 활동 주제를 생성해 드립니다.
                </p>

                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-2.5 text-xs text-slate-400">
                    <Check className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span>진로 적성 MBTI 매트릭스 기반 맞춤 분석</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-slate-400">
                    <Check className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span>희망 대학 이공/인문 계열 정합 과목 추천 가도 연계</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-slate-400">
                    <Check className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span>행동주의 회복탄력성 극대화 개인 가이드 시방서 구성</span>
                  </div>
                </div>

                <div className="pt-4 p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
                  <span className="text-[10px] text-[#D4AF37] font-mono tracking-wider block">혹시 입력이 귀찮으신가요? 1초 샘플 템플릿 로드</span>
                  <div className="flex flex-wrap gap-2">
                    <button 
                      onClick={() => handleApplyPresetType("NT")}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-[11px] font-semibold font-mono rounded"
                    >
                      [NT 전략 아키텍트형 예시 로드]
                    </button>
                    <button 
                      onClick={() => handleApplyPresetType("NF")}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-[11px] font-semibold font-mono rounded"
                    >
                      [NF 영감 메신저형 예시 로드]
                    </button>
                  </div>
                </div>
              </div>

              {/* Form & Report Column */}
              <div className="lg:col-span-7">
                
                {diagStep === 1 && (
                  <form onSubmit={handleRunDiagnostic} className="bg-slate-900/90 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-4 shadow-2xl">
                    <h3 className="text-lg font-bold text-white border-b border-white/5 pb-3">진학 진로 데이터 입력폼</h3>
                    
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">학생 이름 *</label>
                        <input 
                          type="text" 
                          required
                          value={studentName}
                          onChange={(e) => setStudentName(e.target.value)}
                          placeholder="예: 장한결"
                          className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">학년 설정 *</label>
                        <select
                          value={studentGrade}
                          onChange={(e) => setStudentGrade(e.target.value)}
                          className="w-full bg-slate-950 border border-white/10 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                        >
                          <option>초등학교 고학년</option>
                          <option>중학교 1학년</option>
                          <option>중학교 2학년</option>
                          <option>중학교 3학년</option>
                          <option>고등학교 1학년</option>
                          <option>고등학교 2학년</option>
                          <option>고등학교 3학년</option>
                          <option>일반 성인 커리어 재수립</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">흥미 / 강점 과목 (주요 흥미 분야)</label>
                        <input 
                          type="text" 
                          value={favoriteSubjects}
                          onChange={(e) => setFavoriteSubjects(e.target.value)}
                          placeholder="예: 과학 탐구, 정보 기술, 미술"
                          className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">성향 유형 카테고리</label>
                        <select
                          value={personality}
                          onChange={(e) => setPersonality(e.target.value)}
                          className="w-full bg-slate-950 border border-white/10 rounded-lg p-2.5 text-sm text-white focus:outline-none"
                        >
                          <option value="NT">전략적 통찰형 (NT 고단수 아키텍처)</option>
                          <option value="NF">가치 추구형 (NF 휴머니티브 메신저)</option>
                          <option value="ST">정밀 해결형 (ST 기술 실용 전문가)</option>
                          <option value="SF">조화 봉사형 (SF 라이프 케어 디자이너)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">학생의 본질적 강점 및 취미</label>
                      <input 
                        type="text"
                        value={strengths}
                        onChange={(e) => setStrengths(e.target.value)}
                        placeholder="예: 퍼즐 풀기, 3D 가상 공간 짓기, 논리적 반박하기"
                        className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">해결하고 싶은 가장 큰 고민 (학업 불안, 진로 미정, 과목 성취 등)</label>
                      <textarea
                        rows={2}
                        value={worries}
                        onChange={(e) => setWorries(e.target.value)}
                        placeholder="예: 수행평가 주제를 찾기가 막막하고 학생부 양이 경쟁자들에 비해 미흡하게 기재될까 두렵습니다."
                        className="w-full bg-slate-950 border border-white/10 rounded-lg p-3 text-xs text-white focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 text-sm font-bold text-[#102542] rounded-xl bg-gradient-to-r from-[#D4AF37] to-amber-500 hover:from-amber-400 hover:to-amber-600 shadow-xl transition-all flex items-center justify-center gap-2"
                    >
                      <Compass className="w-4 h-4 animate-spin-slow" />
                      프리미엄 AI 진로 매핑 생성개시
                    </button>
                    <p className="text-[10px] text-slate-500 text-center">
                      * 본 진단은 Future Compass의 연구진들과 Google Core 인프라를 바탕으로 제공하는 프리미엄 서비스입니다.
                    </p>
                  </form>
                )}

                {diagStep === 2 && (
                  <div className="bg-slate-900 border border-white/10 rounded-2xl p-10 text-center space-y-6 shadow-2xl flex flex-col items-center justify-center min-h-[400px]">
                    <Loader2 className="w-16 h-16 text-[#D4AF37] animate-spin" />
                    <div className="space-y-2">
                      <h4 className="text-lg font-bold text-white">Future Compass AI 분석 가동 중...</h4>
                      <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                        입력해 주신 성향 프로파일({personality})과 학년 단계({studentGrade})에 적격인 위계 과목, 융합 미래 유망직 매칭 및 생기부 관리 추천 방침을 고차원 실시간 빌딩 중입니다.
                      </p>
                    </div>
                  </div>
                )}

                {diagStep === 3 && diagReport && (
                  <div className="bg-slate-900 border border-[#D4AF37]/30 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
                    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-4">
                      <div>
                        <span className="text-[10px] text-[#D4AF37] font-mono tracking-widest uppercase block">FUTURE COMPASS AI CORE DIRECTIVE</span>
                        <h3 className="text-lg font-bold text-white">{studentName} 학생을 위한 독점 진로 리포트</h3>
                      </div>
                      <button
                        onClick={() => setDiagStep(1)}
                        className="px-3 py-1 bg-white/5 hover:bg-white/10 text-xs rounded border border-white/10 text-slate-300"
                      >
                        다시 진단하기
                      </button>
                    </div>

                    {/* Theme Panel */}
                    <div className="p-4 bg-gradient-to-r from-[#102542] to-slate-900 border border-white/5 rounded-xl">
                      <span className="text-[10px] text-[#3FA9F5] font-mono block mb-1">■ 종합 분석 핵심 테마</span>
                      <p className="text-sm font-semibold text-white leading-relaxed">
                        {diagReport.careerTheme}
                      </p>
                    </div>

                    {/* Careers matched */}
                    <div className="space-y-4">
                      <span className="text-[10px] text-slate-400 font-mono block">■ AI가 강력 추천하는 2가지 미래 유망 직무</span>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {diagReport.recommendedCareers.map((c, i) => (
                          <div key={i} className="p-4 rounded-xl bg-slate-950 border border-white/5">
                            <span className="text-xs font-bold text-[#D4AF37] block mb-1">0{i+1}. {c.title}</span>
                            <p className="text-[11px] text-slate-300 leading-relaxed mb-2">{c.reason}</p>
                            <p className="text-[10px] text-slate-500 font-medium">시장전망: {c.futureOutlook}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Subject instructions */}
                    <div className="p-4 rounded-xl bg-slate-950 border border-white/5">
                      <span className="text-xs font-bold text-[#3FA9F5] block mb-1">학업 이수 및 생기부 세특 심화 주제 가이드</span>
                      <p className="text-[11px] text-slate-300 leading-relaxed">
                        {diagReport.subjectGuidelines}
                      </p>
                    </div>

                    {/* Actions list */}
                    <div className="space-y-2">
                      <span className="text-[10px] text-slate-400 font-mono block">■ 당장 실천해야 할 3개 행동 행동강령</span>
                      <div className="space-y-1.5">
                        {diagReport.actions.map((act, i) => (
                          <div key={i} className="flex gap-2 items-start text-[11px] text-slate-300">
                            <span className="text-[#D4AF37] shrink-0 mt-0.5">✔</span>
                            <span>{act}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/5 flex flex-wrap gap-3 items-center justify-between">
                      <div className="flex gap-1.5">
                        {diagReport.recommendedKeywords.map((kw, i) => (
                          <span key={i} className="px-2 py-0.5 bg-white/5 text-[9px] text-[#3FA9F5] rounded border border-white/5">
                            #{kw}
                          </span>
                        ))}
                      </div>
                      <button
                        onClick={handleExportPDF}
                        className="flex items-center gap-1.5 px-4 py-2 rounded bg-[#D4AF37] text-[#102542] text-xs font-bold"
                      >
                        <FileDown className="w-3.5 h-3.5" />
                        리포트 PDF로 출력/저장
                      </button>
                    </div>

                  </div>
                )}

              </div>

            </div>

          </div>
        </section>

        {/* Section 9: Educational Columns */}
        <section id="columns" className="bg-slate-950 py-24 border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-4">
              <div>
                <span className="text-[#3FA9F5] font-mono text-xs uppercase tracking-[0.2em] font-semibold">INSIGHTS & REPORTS</span>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mt-1">김미래 대표의 프리미엄 교육 칼럼</h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-2">입시 트렌드 기밀 분석 및 공부 습관 극대화 전도서</p>
              </div>
              <button 
                onClick={() => handleNavigation("reserve")}
                className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs font-semibold hover:bg-white/10"
              >
                칼럼 전체보기
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {COLUMN_ITEMS.map((col) => {
                return (
                  <article 
                    key={col.id}
                    className="group bg-slate-900 border border-white/5 hover:border-white/15 rounded-2xl p-6 flex flex-col justify-between transition-all"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs text-slate-400 mb-4 font-mono">
                        <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[#D4AF37]">
                          {col.category}
                        </span>
                        <span>{col.readTime} 소요</span>
                      </div>

                      <h3 className="text-base font-bold text-white mb-3 group-hover:text-[#3FA9F5] transition-colors leading-snug">
                        {col.title}
                      </h3>
                      <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 mb-6">
                        {col.summary}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[11px]">
                      <span className="text-slate-500">{col.date} 기재</span>
                      <button 
                        onClick={() => alert(`"${col.title}" 칼럼 전문은 Future Compass 유료 회원용 브리핑 리포트입니다. 하단의 상담 예약을 접수하시면 무료 연계 증정해 드립니다.`)}
                        className="font-bold text-[#D4AF37] hover:underline flex items-center gap-1 group"
                      >
                        칼럼 발췌문 보기
                        <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>

          </div>
        </section>

        {/* Section 10: Special Lectures & Workshops */}
        <section id="lectures" className="bg-slate-900 py-24 border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-[#D4AF37] font-mono text-xs uppercase tracking-[0.25em] font-semibold">OUTREACH & EVENTS</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-1">전국 초·중·고교 및 사내 맞춤형 특강</h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-2">공정하고 신뢰도 높은 진로 교육과 부모 아카데미 출강 기록</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {LECTURE_ITEMS.map((lec) => {
                return (
                  <div 
                    key={lec.id} 
                    className="p-6 rounded-2xl bg-slate-950 border border-white/5 flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      <span className="px-3 py-1 rounded bg-[#3FA9F5]/10 border border-[#3FA9F5]/30 text-xs text-[#3FA9F5] font-bold inline-block">
                        {lec.tag}
                      </span>
                      <h3 className="text-md font-bold text-white leading-tight">
                        {lec.title}
                      </h3>
                      <p className="text-slate-400 text-xs leading-relaxed">
                        {lec.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
                      <span>대상: {lec.audience}</span>
                      <button
                        onClick={() => {
                          setReserveMessage(`[${lec.tag}: ${lec.title}] 출강 의뢰 문의입니다.`);
                          handleNavigation("reserve");
                        }}
                        className="text-[#D4AF37] hover:underline font-semibold"
                      >
                        출강 문의
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* Brand Differentiation Feature: 1:1 Student Learning Goal Dashboard */}
        <section id="dashboard" className="bg-slate-950 py-24 border-b border-white/5 relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(212,175,55,0.03),transparent_60%)]" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-[#3FA9F5] font-mono text-xs uppercase tracking-[0.25em] font-semibold">STUDENT PORTFOLIO ENGINE</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-1">학습 성장 목표 및 포트폴리오 적재 대시보드</h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-2">
                컨설팅 이수 학생 전원에게 부여되는 목표 정량화 도구. 스스로 핵심 프로젝트를 기재해 보세요.
              </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-8">
              
              {/* Goals list and input */}
              <div className="lg:col-span-6 bg-slate-900 border border-white/10 rounded-2xl p-6 space-y-6 shadow-xl">
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="text-[#3FA9F5] w-5 h-5" />
                    <h3 className="text-md font-bold text-white">자가 주도식 학습 목표 관리</h3>
                  </div>
                  <span className="text-[10px] bg-white/5 text-slate-300 px-2 py-0.5 rounded font-mono">
                    진행 중인 목표 {goals.filter(g => !g.completed).length}개
                  </span>
                </div>

                {/* Goals Render */}
                <div className="space-y-3 max-h-[250px] overflow-y-auto pr-1">
                  {goals.map((g) => (
                    <div 
                      key={g.id} 
                      className={`p-3.5 rounded-xl border transition-all flex items-start gap-3 justify-between ${
                        g.completed 
                          ? "bg-[#102542]/20 border-emerald-900/30 opacity-70"
                          : "bg-slate-950 border-white/5 hover:border-white/10"
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <button
                          onClick={() => {
                            setGoals(goals.map(item => item.id === g.id ? { ...item, completed: !item.completed, progress: item.completed ? 0 : 100 } : item));
                          }}
                          className={`w-4 h-4 rounded mt-0.5 border flex items-center justify-center shrink-0 ${
                            g.completed 
                              ? "bg-emerald-500 border-emerald-500 text-slate-950" 
                              : "border-slate-600 hover:border-[#D4AF37]"
                          }`}
                        >
                          {g.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </button>
                        
                        <div>
                          <p className={`text-xs sm:text-sm font-semibold ${g.completed ? "line-through text-slate-500" : "text-white"}`}>
                            {g.title}
                          </p>
                          <div className="flex items-center gap-3 mt-1.5 text-[9px] text-slate-400">
                            <span className="px-1.5 py-0.2 bg-white/5 rounded text-[#3FA9F5] uppercase tracking-wider">{g.category}</span>
                            <span>기한: {g.targetDate}</span>
                            {g.progress < 100 && (
                              <span className="text-slate-500">진행도: {g.progress}%</span>
                            )}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => setGoals(goals.filter(item => item.id !== g.id))}
                        className="text-slate-500 hover:text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* New Goal Input Form */}
                <form onSubmit={handleAddGoal} className="space-y-3 pt-4 border-t border-white/5">
                  <span className="text-[10px] text-slate-300 font-bold block">새로운 실천 목표 추가</span>
                  <div className="grid sm:grid-cols-3 gap-2">
                    <input 
                      type="text" 
                      required
                      value={newGoalTitle}
                      onChange={(e) => setNewGoalTitle(e.target.value)}
                      placeholder="예: 독서록 1편 정평"
                      className="w-full bg-slate-950 border border-white/10 rounded-lg px-2 py-1.5 text-xs text-white"
                    />
                    <select
                      value={newGoalCategory}
                      onChange={(e) => setNewGoalCategory(e.target.value)}
                      className="bg-slate-950 border border-white/10 rounded-lg p-1 text-xs text-white"
                    >
                      <option value="career">진로탐색</option>
                      <option value="math">수학공부</option>
                      <option value="english">영어공부</option>
                      <option value="science">융합수행</option>
                    </select>
                    <input 
                      type="date"
                      value={newGoalDate}
                      onChange={(e) => setNewGoalDate(e.target.value)}
                      className="bg-slate-950 border border-white/10 rounded-lg p-1 text-xs text-white"
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="w-full py-2 bg-[#3FA9F5] hover:bg-blue-400 text-white font-bold rounded-lg text-xs"
                  >
                    + 신규 일과 추가 및 등록
                  </button>
                </form>

              </div>

              {/* Portfolio records */}
              <div className="lg:col-span-6 bg-slate-900 border border-white/10 rounded-2xl p-6 space-y-6 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Award className="text-[#D4AF37] w-5 h-5" />
                      <h3 className="text-md font-bold text-white">에듀-폴리오 성장 기록장</h3>
                    </div>
                    <span className="text-[10px] bg-white/5 text-slate-300 px-2 py-0.5 rounded font-mono">
                      총 기록 {portfolios.length}건
                    </span>
                  </div>

                  {/* Portfolios list render */}
                  <div className="space-y-3.5 max-h-[220px] overflow-y-auto pr-1">
                    {portfolios.map((p) => (
                      <div key={p.id} className="p-3 bg-slate-950 border border-white/5 rounded-xl rounded-l-none border-l-2 border-l-[#D4AF37]">
                        <div className="flex justify-between items-center mb-1">
                          <h4 className="text-xs font-bold text-white">{p.title}</h4>
                          <span className="text-[9px] text-[#D4AF37] font-mono">{p.date}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-relaxed">{p.description}</p>
                        
                        <div className="flex gap-2 mt-2 items-center justify-between">
                          <span className="text-[9px] text-slate-500 capitalize">구분: {p.category}</span>
                          <button
                            onClick={() => setPortfolios(portfolios.filter(item => item.id !== p.id))}
                            className="text-[9px] text-red-500 hover:underline"
                          >
                            지우기
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Form to submit card */}
                <form onSubmit={handleAddPortfolio} className="space-y-3 pt-4 border-t border-white/5 mt-4">
                  <span className="text-[10px] text-slate-300 font-bold block">새로운 성취 프로젝트 기록</span>
                  
                  <div className="grid sm:grid-cols-2 gap-2">
                    <input 
                      type="text" 
                      required
                      value={newPTitle}
                      onChange={(e) => setNewPTitle(e.target.value)}
                      placeholder="기록 타이틀 (예: 화학실험 연동 보고서)"
                      className="w-full bg-slate-950 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white"
                    />
                    <select
                      value={newPCategory}
                      onChange={(e) => setNewPCategory(e.target.value)}
                      className="bg-slate-950 border border-white/10 rounded-lg p-1 text-xs text-white"
                    >
                      <option value="activity">교내 탐구 활동</option>
                      <option value="book">진로 심층 독서</option>
                      <option value="award">수장 및 수상 실적</option>
                      <option value="essay">자기소개서 발판</option>
                    </select>
                  </div>

                  <textarea
                    rows={2}
                    required
                    value={newPDesc}
                    onChange={(e) => setNewPDesc(e.target.value)}
                    placeholder="핵심 성취 성과 및 자기평가를 간략히 기록해 주세요."
                    className="w-full bg-slate-950 border border-white/10 rounded-lg p-2.5 text-[11px] text-white focus:outline-none"
                  />

                  <button 
                    type="submit" 
                    className="w-full py-2 bg-[#D4AF37] hover:bg-amber-400 text-[#102542] font-bold rounded-lg text-xs"
                  >
                    + 생기부 연계 성장 데이터 적재
                  </button>
                </form>

              </div>

            </div>

          </div>
        </section>

        {/* Section 12: Premium Appointment Consultation Booking Form */}
        <section id="reserve" className="bg-[#102542] py-24 relative overflow-hidden text-white">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            
            <div className="grid lg:grid-cols-12 gap-12">
              
              {/* Marketing elements & real-time booking lists */}
              <div className="lg:col-span-5 space-y-6">
                <span className="text-[#D4AF37] font-mono text-xs uppercase tracking-[0.2em] font-bold">RESERVATION OFFICE</span>
                
                <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
                  미래의 올바른 나침반,<br />
                  지금 첫걸음을 시작하세요.
                </h2>

                <p className="text-slate-300 text-sm leading-relaxed">
                  학생 한 명 한 명의 고유한 결에 맞춰 심층 연구 분석을 수행하기 위해, Future Compass의 모든 1:1 진단은 **사전 예약 우선**으로 배정됩니다.
                  예약 폼을 등록해 주시면 담당 교육플래너가 신속히 유선 전화를 통해 시간 확인 및 예비 자가진단을 선지원해 드리겠습니다.
                </p>

                <div className="bg-slate-900 border border-white/5 rounded-xl p-5 space-y-4">
                  <span className="text-[10px] text-slate-400 font-mono tracking-widest block">■ 최근 예약 신청 접수 현황 (실시간 연동인식)</span>
                  
                  <div className="space-y-3 max-h-[160px] overflow-y-auto pr-1">
                    {submittedReservations.map((res) => (
                      <div key={res.id} className="p-3 bg-slate-950 border border-white/5 rounded-lg flex items-center justify-between text-xs">
                        <div>
                          <p className="font-bold text-white">{res.name} <span className="text-[10px] text-slate-400">({res.field})</span></p>
                          <p className="text-[9px] text-[#3FA9F5] mt-0.5">희망일정: {res.date} • {res.timeSlot}</p>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[9px] bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20">접수완료</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3.5 text-xs text-slate-300">
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-[#D4AF37]" />
                    <span>대표 연락번호: 02-1234-5678</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-[#3FA9F5]" />
                    <span>상담 문의메일: support@futurecompass.co.kr</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-[#D4AF37]" />
                    <span>운영시간: 평일 13:00 - 22:00, 주말 09:00 - 18:00</span>
                  </div>
                </div>
              </div>

              {/* Real submission inputs */}
              <div className="lg:col-span-7">
                
                <form onSubmit={handleReserveSubmit} className="bg-slate-900 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-4 shadow-2xl">
                  <h3 className="text-lg font-bold text-white border-b border-white/5 pb-3">무료 정밀 1:1 진로컨설팅 신청서</h3>
                  
                  {reservationSuccess && (
                    <div className="p-4 bg-emerald-950/40 border border-emerald-500/50 rounded-xl flex items-start gap-2 text-emerald-300 text-xs animate-fade-in">
                      <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />
                      <div>
                        <span className="font-bold">신청이 완벽히 임시 접수되었습니다!</span>
                        <p className="mt-0.5">24시간 내에 김미래 소장 연구팀에서 등록하신 이메일 및 유선 연락처를 통해 자가 진단 가이드 PDF를 우선 송부드리고 일정을 조율해 드립니다.</p>
                      </div>
                    </div>
                  )}

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">성명 (학생 또는 학부모) *</label>
                      <input 
                        type="text" 
                        required
                        value={reserveName}
                        onChange={(e) => setReserveName(e.target.value)}
                        placeholder="예: 최수현 소장"
                        className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">연락처 *</label>
                      <input 
                        type="tel" 
                        required
                        value={reservePhone}
                        onChange={(e) => setReservePhone(e.target.value)}
                        placeholder="예: 010-1234-5678"
                        className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">이메일 주소</label>
                      <input 
                        type="email" 
                        value={reserveEmail}
                        onChange={(e) => setReserveEmail(e.target.value)}
                        placeholder="예: customer@naver.com"
                        className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">주요 상담 희망 분야</label>
                      <select
                        value={reserveField}
                        onChange={(e) => setReserveField(e.target.value)}
                        className="w-full bg-slate-950 border border-white/10 rounded-lg p-2.5 text-sm text-white"
                      >
                        <option>학습코칭 및 습관개선</option>
                        <option>진로 설계 및 적성 분석</option>
                        <option>고등부 입시전략 컨설팅</option>
                        <option>학생부 관리 및 세특 심화 지도</option>
                        <option>성인 이직 및 커리어 컨설팅</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">희망 상담 일자</label>
                      <input 
                        type="date" 
                        value={reserveDate}
                        onChange={(e) => setReserveDate(e.target.value)}
                        className="w-full bg-slate-950 border border-white/10 rounded-lg p-2 text-sm text-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">상담 희망 시간대</label>
                      <select
                        value={reserveTime}
                        onChange={(e) => setReserveTime(e.target.value)}
                        className="w-full bg-slate-950 border border-white/10 rounded-lg p-2.5 text-sm text-white"
                      >
                        <option>10:00 - 11:30</option>
                        <option>14:00 - 15:30</option>
                        <option>16:00 - 17:30</option>
                        <option>19:00 - 20:30 (야간)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">추가 요청 사항 및 학생의 현재 고민</label>
                    <textarea
                      rows={3}
                      value={reserveMessage}
                      onChange={(e) => setReserveMessage(e.target.value)}
                      placeholder="예: 학생이 수학을 성실히 하지만 시험 시간 압박이 크고, 장래 직업을 정하지 못해 심적으로 힘들어합니다."
                      className="w-full bg-slate-950 border border-white/10 rounded-lg p-3 text-xs text-white focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <input type="checkbox" required defaultChecked id="agree" className="rounded bg-slate-950 text-[#D4AF37] border-white/15" />
                    <label htmlFor="agree" className="text-[10px] text-slate-400 cursor-pointer">
                      개인정보 수집 및 상담 예약을 위한 마케팅 이용 목적 전반에 동의합니다 *
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-[#D4AF37] hover:bg-amber-400 text-[#102542] text-sm font-bold rounded-xl shadow-lg transition-transform"
                  >
                    무료 대면/유선 상담 예약 확정하기
                  </button>
                </form>

              </div>

            </div>

          </div>
        </section>

      </main>

      {/* Floating 24h AI Chatbot Action */}
      <div className="fixed bottom-6 right-6 z-50">
        {!chatOpen ? (
          <button
            onClick={() => setChatOpen(true)}
            className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#3FA9F5] to-blue-600 text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all group relative border border-white/15"
          >
            <MessageSquare className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 border border-slate-950 text-[9px] font-bold text-white flex items-center justify-center">
              1
            </span>
            {/* Tooltip */}
            <span className="absolute right-16 top-3 bg-slate-900 border border-white/10 px-3 py-1.5 rounded-lg text-[11px] text-slate-200 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md">
              AI 24시 진로 솔루션 톡!
            </span>
          </button>
        ) : (
          <div className="w-[340px] sm:w-[380px] bg-slate-950 border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-slide-in">
            {/* Chat header */}
            <div className="bg-[#102542] px-4 py-3.5 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#3FA9F5]/20 flex items-center justify-center">
                  <Compass className="w-4 h-4 text-[#3FA9F5] animate-pulse" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white leading-tight">Future Compass AI 튜터</h4>
                  <p className="text-[9px] text-slate-400">실시간 맞춤 진로 가이딩 24h</p>
                </div>
              </div>
              <button 
                onClick={() => setChatOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* Chat Messages flow */}
            <div className="h-[300px] overflow-y-auto p-4 space-y-4 bg-slate-900/40">
              {chatMessages.map((msg, idx) => (
                <div 
                  key={idx}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                    msg.role === "user" 
                      ? "bg-[#3FA9F5] text-white rounded-tr-none"
                      : "bg-[#102542] text-slate-300 border border-white/5 rounded-tl-none"
                  }`}>
                    <p>{msg.content}</p>
                    <span className="block text-[8px] text-slate-500 text-right mt-1.5">{msg.timestamp}</span>
                  </div>
                </div>
              ))}

              {chatLoading && (
                <div className="flex justify-start">
                  <div className="bg-[#102542] text-slate-400 rounded-2xl p-3 text-xs italic flex items-center gap-1.5">
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-[#3FA9F5]" />
                    AI 답변 빌딩 중...
                  </div>
                </div>
              )}
            </div>

            {/* Enter chat form */}
            <form onSubmit={handleChatSubmit} className="p-3 bg-slate-950 border-t border-white/5 flex gap-2">
              <input 
                type="text"
                value={userMsgInput}
                onChange={(e) => setUserMsgInput(e.target.value)}
                placeholder="질문을 기재하세요 (예: 고교선택 과목 상담)"
                className="flex-grow bg-slate-900 border border-white/5 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#3FA9F5]"
              />
              <button 
                type="submit"
                className="w-9 h-9 rounded-xl bg-[#3FA9F5] hover:bg-blue-400 text-white flex items-center justify-center shadow-lg transform active:scale-95 transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Styled Footer */}
      <footer className="bg-slate-950 border-t border-white/5 py-12 text-slate-400 text-xs text-center relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pb-8 border-b border-white/5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#102542] to-[#D4AF37] flex items-center justify-center">
                <Compass className="w-4.5 h-4.5 text-white" />
              </div>
              <span className="text-base font-bold text-white font-sans tracking-widest uppercase">FUTURE <span className="text-[#D4AF37]">COMPASS</span></span>
            </div>
            
            {/* Social handles requested */}
            <div className="flex flex-wrap gap-4 text-slate-500">
              <span className="hover:text-slate-300 cursor-pointer">블로그</span>
              <span>•</span>
              <span className="hover:text-slate-300 cursor-pointer">유튜브</span>
              <span>•</span>
              <span className="hover:text-slate-300 cursor-pointer">인스타그램</span>
              <span>•</span>
              <span className="hover:text-slate-300 cursor-pointer">카카오톡 플친</span>
            </div>
          </div>

          <div className="space-y-4 max-w-2xl mx-auto">
            <p className="leading-relaxed">
              상호명: Future Compass (퓨처 컴파스 교육컨설팅) | 대표자: 김미래 소장 | 사업자등록번호: 120-77-54321
              <br />
              본사 소재지: 서울특별시 강남구 대치동 테헤란로 777 에듀타워 11층
              <br />
              고객만족팀: 02-1234-5678 | 개인정보 관리 책임자: 최민혁 팀장
            </p>
            <p className="text-[10px] text-slate-600">
              © 2026 Future Compass Premium Business platforms. All rights reserved. 본 웹사이트의 성향 진단 예측 분석 엔진 및 콘텐츠 전재는 무단 복제를 금합니다.
            </p>
          </div>

        </div>
      </footer>

    </div>
  );
}
