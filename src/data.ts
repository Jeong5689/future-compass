/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Review, SuccessCase, ServiceCard, ProgramInfo, ColumnItem, LectureItem, DiagnosticResult } from "./types";

export const TRUST_STATS = [
  { value: 3000, suffix: "+", label: "누적 컨설팅 학생 수", desc: "진로 및 학습 솔루션 제공" },
  { value: 1200, suffix: "+", label: "목표 대학 및 진학 성공", desc: "고등부 입시 및 진로 연결 실적" },
  { value: 500, suffix: "+", label: "학교 및 기업 강연/특강", desc: "평생교육 및 진로캠프 출강" },
  { value: 98, suffix: "%", label: "학부모 · 학생 만족도", desc: "사후 설문 기반 최상위 지표" }
];

export const SUCCESS_CASES: SuccessCase[] = [
  {
    id: 1,
    group: "중등",
    badge: "진로 미정 극복",
    title: "성적 압박 속 진로 설계로 자존감 및 주도성 회복",
    before: "장래 희망 미정으로 인한 만성 학습 의욕 저하 및 무기력",
    after: "정밀 다중지능 및 적성 역량 매핑 결과 '스마트 에코 아키텍트' 매칭",
    impactResult: "진로 목표 구체화에 따른 '학습 동기 회복' 및 성적 평균 12점 직격 상승"
  },
  {
    id: 2,
    group: "고등",
    badge: "입시 학종 대성공",
    title: "주요 과목 성적 보강 및 세특 심화 연계 생기부 분석",
    before: "활동 나열식 생활기록부, 3등급 중반대 학업성적",
    after: "바이오메디컬 융합 공학 스토리라인 설계 및 발표 탐구 연계 전략 지원",
    impactResult: "서울 주요 5대 대학 학종(학생부종합) 장학생 우선 선발 신화 달성"
  },
  {
    id: 3,
    group: "성인",
    badge: "커리어 대전환",
    title: "전공 비정합 직무 고민에서 주도적 커리어 컨설팅",
    before: "사무직 4년 차, 번아웃 및 직무 부적응",
    after: "강점 포트폴리오 재구성 및 에듀테크 콘텐츠 기획자로 리포지셔닝",
    impactResult: "맞춤형 포트폴리오 기반 메이저 에듀기업 신사업 기획본부 이직 성공"
  }
];

export const SERVICE_CARDS: ServiceCard[] = [
  {
    title: "진로 컨설팅",
    iconName: "Compass",
    points: [
      "진로 적성 정밀 분석 (인지/흥미)",
      "성향 기반 MBTI 자기이해 상담",
      "미래 융합 산업군 직업 정밀 매칭",
      "고교학점제 맞춤형 진로 과목 설계"
    ],
    color: "from-blue-900/30 via-slate-900/50 to-blue-950/20"
  },
  {
    title: "학습 코칭",
    iconName: "BookOpen",
    points: [
      "1:1 학습 행동주의 습관 진단",
      "시간 관리 매트릭스 및 학습계획 수립",
      "메타인지 극대화 학습 루틴 구축",
      "시험 불안감 조절 및 멘탈 에이징"
    ],
    color: "from-[#102542]/40 via-slate-900/40 to-yellow-950/20"
  },
  {
    title: "입시 컨설팅",
    iconName: "Award",
    points: [
      "최근 학생부종합 전형 패턴 다차원 분석",
      "합격 예측 전략 로드맵 설계",
      "학교별 수시 정밀 지원 최적화",
      "자사고 / 특목고 / 명문대 전형 선점"
    ],
    color: "from-blue-950/40 via-slate-900/40 to-blue-900/30"
  },
  {
    title: "자기계발",
    iconName: "TrendingUp",
    points: [
      "개인 서사 기반 진로 디자인 리더십",
      "학생 맞춤형 성취 위주 포트폴리오 관리",
      "체계적인 자아정체성 발견 및 성취 경험",
      "실천 중심 회복탄력성 액션코칭"
    ],
    color: "from-[#D4AF37]/10 via-[#102542]/40 to-blue-950/40"
  }
];

export const PROGRAM_INFOS: ProgramInfo[] = [
  {
    level: "초등",
    title: "자기주도 학습 및 기본기 가동",
    focus: "공부 그릇 키우기 & 호기심 진로 기초",
    duration: "6개월 완성 (주 1회 세션)",
    items: [
      "인지 발달에 맞춘 독서/토론형 진로 탐색",
      "올바른 오답 노트 및 메타인지 기본기 다지기",
      "놀이식 학습 습관 체계 구축 및 체크리스트 가동"
    ]
  },
  {
    level: "중등",
    title: "진로 탐색 및 고교학점제 선점",
    focus: "진로 가치관 자가 확립 & 과목 설계",
    duration: "학기제 운영 (격주 1회 관리)",
    items: [
      "정밀 적성 진단 기반 계열 매칭 솔루션",
      "고교학점제 대비 선택 과목 선행 시뮬레이션",
      "상위권 공부법 이식을 통한 자기 주도 고교 전환 대비"
    ]
  },
  {
    level: "고등",
    title: "초일류 입시 전략 및 학생부 빌딩",
    focus: "종합 전형 세특 연계 & 마스터 합격선",
    duration: "연간 정기 멤버십 가용",
    items: [
      "학과 인재상 연계 고품격 주제 탐구 보고서 지도",
      "생기부 핵심 항목 키워드 맞춤 각인 설계",
      "최종 합격을 견인하는 시나리오 기반 압박 면접 코칭"
    ]
  },
  {
    level: "성인",
    title: "커리어 네비게이션 및 직무 재설계",
    focus: "직무 전문성 리브랜딩 & 포트폴리오",
    duration: "단기 4주 속성 코칭 및 밀착 상담",
    items: [
      "강점 혁신 기법을 통한 이직 타겟 분석",
      "스토리텔링 기반 고밀도 이력서/포트폴리오 클리닉",
      "면접 상황 커뮤니케이션 및 비언어적 애티튜드 코칭"
    ]
  }
];

export const EDUCATION_PHILOSOPHY = {
  title: "교육은 채우는 것이 아니라, 불을 밝히는 것입니다.",
  quote: "교육은 점수를 만드는 것이 아니라, 삶의 방향을 만드는 것입니다.",
  values: [
    {
      title: "자기이해",
      desc: "자신이 누구인지, 어떤 강점과 열정을 가지고 있는지 세밀하게 조망하는 단계입니다.",
      icon: "UserCheck"
    },
    {
      title: "성장",
      desc: "실수를 인정하고 매 순간 어제보다 나은 배움과 진보를 소중하게 축적합니다.",
      icon: "Spline"
    },
    {
      title: "도전",
      desc: "제한적 사고에서 벗어나 자신의 잠재적 한계에 부딪히며 과감히 시도합니다.",
      icon: "Zap"
    },
    {
      title: "실천",
      desc: "단순히 머리로 아는 것을 넘어 일상의 작은 규칙적인 행동을 유지합니다.",
      icon: "Footprints"
    },
    {
      title: "변화",
      desc: "발전적인 생각과 견고해진 루틴을 무기로 인생의 새로운 항로를 개척합니다.",
      icon: "RotateCw"
    }
  ]
};

export const REVIEWS: Review[] = [
  {
    id: 1,
    author: "김지헌 학부모님 (고2 자녀)",
    role: "학부모",
    stars: 5,
    tag: "입시전략",
    text: "학원에 쏟아붓는 돈에 비해 방향을 못 잡던 아이였는데, Future Compass를 통해 생기부 방향성을 세우고 나니 전 과목에 활기가 돕니다. 추천받은 수학 탐구 세특도 좋은 성적을 받았어요. 강력 추천합니다!"
  },
  {
    id: 2,
    author: "박서연 학생 (고3 진학자)",
    role: "학생",
    stars: 5,
    tag: "학습코칭",
    text: "공부법을 모르고 무작정 밤만 새던 제가 시간 매트릭스와 자물쇠 공부법을 배우고 나서 피로도가 절반으로 줄었어요! 목표로 하던 컴공과에 수시 최초합 통지서를 받았습니다!"
  },
  {
    id: 3,
    author: "최영민 고객님 (30대 직장인)",
    role: "성인",
    stars: 5,
    tag: "커리어 전환",
    text: "이 길이 맞나 밤마다 괴로웠던 저에게 커리어 분석과 비즈니스 포트폴리오 재기획은 기적이었습니다. Future Compass의 실증 컨설팅 조언 덕에 에듀테크 마케터 팀장으로 헤드헌팅되었습니다."
  }
];

export const COLUMN_ITEMS: ColumnItem[] = [
  {
    id: 1,
    title: "AI 시대가 요구하는 진짜 인재의 진로 설계 핵심 전략",
    category: "진로 가이드",
    date: "2026.05.20",
    readTime: "5분",
    summary: "암기 위주 지식이 무용한 시대, 학생이 스스로 질문을 설계하고 결합할 줄 아는 '융합 지능'을 기재하는 방법을 탐색합니다."
  },
  {
    id: 2,
    title: "성적이 저절로 오르는 메타인지 메카니즘 구축법",
    category: "학습코칭",
    date: "2026.05.24",
    readTime: "7분",
    summary: "수많은 모의고사 오답은 '내가 아는 것'과 '모르는 것'의 착각 차이에서 발생합니다. 아는 것을 입으로 설명하는 심화 훈련법 제안."
  },
  {
    id: 3,
    title: "고교학점제 시행안 정밀 분석: 우리 아이 필수 과목 선택",
    category: "입시 트렌드",
    date: "2026.06.01",
    readTime: "8분",
    summary: "어떤 과목을 이수해야 명문대 이공대 가산점을 받을 수 있을지 실제 이수 지표와 교육과정 위계를 완벽 정리했습니다."
  }
];

export const LECTURE_ITEMS: LectureItem[] = [
  {
    id: 1,
    title: "찾아가는 미래 진로 융합 콘서트 및 진로 특강",
    audience: "전국 초·중·고교 학부모 및 학생 대상",
    description: "생생한 직업 체험 시나리오와 혁신 기술 분석을 통해 학구열을 제고하고 올바른 고교학점제 대응 로드맵 공유",
    tag: "학교 특강"
  },
  {
    id: 2,
    title: "성공을 자극하는 청소년 자기주도 러닝 리더십 캠프",
    audience: "중·고등학생 연휴/방학 단기 집중 코스",
    description: "2박 3일간 협동 목표 성취 활동 및 성격유형 진단, 공부의 신 학습 습관 리마인드 1:1 진단 액션 캠프",
    tag: "진로 캠프"
  },
  {
    id: 3,
    title: "임직원 동반 성장 자녀 교육 세미나 및 라이프 밸런스",
    audience: "기업체 패밀리 복지 강좌 및 공공기관 강연",
    description: "직장을 바쁘게 달리는 임직원 학부모를 위한 성찰 및 십대 자녀와의 건강한 비폭력 소통 공조 교육학 강의",
    tag: "부모 교육"
  }
];

// Fun personality traits for career diagnostic tests
export const DIAGNOSTIC_MAPPING: Record<string, DiagnosticResult> = {
  ST: {
    personalityTheme: "체계적 분석력을 바탕으로 문제를 혁신하는 '실질 해결사'형",
    dominantTraits: ["정밀성", "논리 지배", "효율성 중시"],
    careers: ["에코 스마트 모빌리티 공학자", "클라우드 데이터 윤리 분석가", "시스템 자동화 매칭 총괄"],
    tip: "논리력과 실제 구현 능력이 우수한 편이나, 유연하고 감성 지향적인 대안적 협업 시뮬레이션을 늘릴 때 독보적인 팀 리더십을 갖추게 됩니다."
  },
  SF: {
    personalityTheme: "타인의 가치를 존중하며 행복을 설계하는 '휴먼 서포터'형",
    dominantTraits: ["타인 배려", "실용 실천력", "따뜻한 공감"],
    careers: ["실버 세대 바이오 헬스 케어 기획가", "융합 에듀테크 콘텐츠 개발자", "심리 매핑 라이프 디렉터"],
    tip: "조력 활동과 관계 중심적 사고에 보람을 느낍니다. 자신만의 확실한 이익 기준을 수치화해 결정하는 '독립 과감성'을 기를 때 중심을 잡을 수 있습니다."
  },
  NT: {
    personalityTheme: "거시적 구조를 통찰하여 미래 방향을 제안하는 '전략 디렉터'형",
    dominantTraits: ["비전 제시", "추상 통찰", "시스템 아키텍처"],
    careers: ["우주 생태계 테라포머 설계가", "AI 법률 지식 코디네이터", "차세대 에너지 전략 비즈니스 기획자"],
    tip: "지적 지평을 넓히고 거대한 아이디어를 실험하는 것을 좋아합니다. 일상적이고 평온한 단순 기계적 디테일을 지루해하므로 매일의 실물 플래너를 루틴화하세요."
  },
  NF: {
    personalityTheme: "고차원적 가치를 발견하고 인간 성장을 격려하는 '영감 메신저'형",
    dominantTraits: ["상상력", "공공선 추구", "비언어 소통 촉진"],
    careers: ["우주 관광 스토리텔링 작가", "가상현실 윤리 분쟁 해결 조율사", "사회 혁신 에듀 컨설턴트"],
    tip: "사회에 깊은 울림과 가치를 더하길 원하는 고귀한 이상가입니다. 작은 비평에 흔들리지 않도록 객관적 피드백과 회복탄력성 수련을 곁들여야 합니다."
  }
};
