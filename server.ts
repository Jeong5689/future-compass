import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-loaded Gemini Client with graceful fallback
let _ai: any = null;
function getGeminiClient() {
  if (!process.env.GEMINI_API_KEY) {
    console.warn("⚠️ [Future Compass] GEMINI_API_KEY configuration is missing. Operating in Educational Mocking fallback mode.");
    return null;
  }
  if (!_ai) {
    _ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return _ai;
}

// 1. AI Education Chatbot API
app.post("/api/gemini/chatbot", async (req, res) => {
  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid messages array." });
  }

  const ai = getGeminiClient();
  if (!ai) {
    // Graceful fallback dialogue builder
    const lastUserMessage = messages[messages.length - 1]?.content || "";
    let reply = `[안내: AI 튜터 체험 모드] Future Compass 24시간 상담 챗봇입니다. 현재 데모 상태로 임시 시뮬레이션 답변을 드립니다.\n\n요청하신 "${lastUserMessage}"에 대해 안내해 드립니다. 저희 Future Compass는 진로 로드맵 설계, 과목 선택 가이드 및 명문대 입시 전략을 1:1 개인화하여 매칭해 드립니다. 전문 컨설팅 상담 예약을 희망하시면 페이지 하단의 상담 예약 폼을 작성해 주세요!`;
    return res.json({ text: reply });
  }

  try {
    // Format messages for gemini-3.5-flash
    // Format conversation context first
    const systemPrompt = `You are "Future Compass AI Consultant" (퓨처 컴파스 AI 컨설턴트), a friendly, highly professional Korean education and career consultant.
Your tone is encouraging, scientific, reliable, and premium.
You must speak in highly polite, supportive Korean ("~합니다", "~해 드립니다").
You help students (elementary, middle, high school) and adults with career guidance, test anxiety, study plans, admissions and college entrance strategies, portfolios, and essay guidelines.
Keep responses concise, clear, and highly structured with bullet points. Mention "Future Compass" casually when offering guidance. Do not use markdown titles above H3, use bold lettering instead.`;

    // Map messages to contents array
    const formattedContents = messages.map(msg => ({
      role: msg.role === "assistant" ? "model" as const : "user" as const,
      parts: [{ text: msg.content }]
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: formattedContents,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      }
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini Chatbot Error:", error);
    res.status(500).json({ error: "AI Assistant temporarily busy.", details: error.message });
  }
});

// 2. AI Career Analysis Blueprint API
app.post("/api/gemini/career-analysis", async (req, res) => {
  const { name, grade, favoriteSubjects, strengths, worries, personality } = req.body;

  const ai = getGeminiClient();
  if (!ai) {
    // Return high-quality premium diagnostic report simulation
    return res.json({
      careerTheme: "새로운 기술과의 융합을 주도하는 미래형 융합 인재",
      recommendedCareers: [
        {
          title: "스마트 모빌리티 설계사",
          reason: `${favoriteSubjects || "수학 및 물리 과학"}에 흥미가 깊고, 문제 해결력 수준이 높아 차세대 지능형 지상/공중 교통수단을 제어하고 스마트 도로 솔루션을 구축하는 직무에 최적의 융합성을 보여줍니다.`,
          futureOutlook: "환경 오염 방지 및 자율주행 기술 확장과 결합하여 전 세계 연평균 15% 성장세를 보이는 초유망 분야입니다."
        },
        {
          title: "교육 콘텐츠 AI 융합 기획가",
          reason: `평소 교육 및 콘텐츠 기획에 대한 애정이 있으며, 다른 사람을 돕는 이타적인 성향과 지적 호기심이 시너지를 발휘하여 가상 공간과 결합된 학습 엔진을 탄생시키는 기획자로 도약할 수 있습니다.`,
          futureOutlook: "에듀테크 및 초개인화 학습 프로그램 수요 증가로 대기업과 글로컬 대학 중심으로 수요 상승 중인 신산업입니다."
        }
      ],
      subjectGuidelines: `학년 단계(${grade})를 적극 고려할 때, 기초 수학/정보교과 중심의 심화 위계 과목(미적분, 기하, 소프트웨어학개론 등)을 전략적으로 선택하고 수행평가 탐구 주제로 '빅데이터 인공지능 기반 환경 예측'과 관련된 도서 요약 보고서를 기재하여 세부능력및특기사항(세특)을 강화하는 것을 지향해야 합니다.`,
      growthPlan: `매일 2시간 주도적 독서 습관 형성, 매주 토요일 탐구 주제 1회 리서치 및 보고서 작성 루틴화를 진행하세요. Future Compass의 [진로설계] 1:1 프리미엄 설계 컨설팅 과정에서 학생 맞춤형 생기부 세특 심화 주제가 제공됩니다.`,
      recommendedKeywords: ["지능형 융합", "문제해결력", "수행평가 혁신", "소프트웨어 리터러시", "전공 적합성"],
      actions: [
        "자물쇠 공부법(초기 몰입 25분 차단)을 활용해 시간 관리 루틴 정비하기",
        "희망 직무와 관련된 인공지능 윤리 관련 도서 2권 스팀 독서하고 핵심 질문 기록하기",
        "Future Compass 성향 진단을 바탕으로 입시 전문 컨설턴트와의 심층 대면 설계 상담 받기"
      ]
    });
  }

  try {
    const prompt = `Please analyze a ${grade} student named "${name || "학생"}". 
Personality/Traits: ${personality || "지적이며 주도적인 학습 태도"}
Favorite Subjects: ${favoriteSubjects || "선택하지 않음"}
Key Strengths / Hobbies: ${strengths || "선택하지 않음"}
Current Worries / Obstacles: ${worries || "진로 고민"}

Return a highly cohesive JSON document that provides a premium career blueprint matching Future Compass's standard of excellence.
You MUST respond strictly in the following JSON format structure. Do not include markdown codeblocks like \`\`\`json in your response, just the raw JSON object string.

{
  "careerTheme": "String (A magnificent, stylish premium theme sentence, e.g. '인간 중심적 가치와 빅데이터 기술을 융합하는 크리에이티브 마인드 디렉터')",
  "recommendedCareers": [
    {
      "title": "String (Futuristic/Modern Career Title, eg. '의료 AI 윤리 가치 평가원')",
      "reason": "String (A highly intelligent, specific reason detailed to their favorite subjects and strengths, matching the student's psychological profile in Korean)",
      "futureOutlook": "String (Growth rate, market potential, and long-term viability in Korean)"
    },
    {
      "title": "String (Another custom futuristic/highly fit Career Title)",
      "reason": "String (Reason details tailored specifically in Korean)",
      "futureOutlook": "String (Korean description)"
    }
  ],
  "subjectGuidelines": "String (Crucial, tactical academic recommendations, course selection guidelines for high school or middle school credit systems, and target competencies in Korean)",
  "growthPlan": "String (A step-by-step custom curriculum or training pathway recommendation utilizing Future Compass program offerings, written elegantly in Korean)",
  "recommendedKeywords": ["String", "String", "String", "String", "String"],
  "actions": ["String (3-4 highly concrete, actionable next steps for the student)"]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.8,
      }
    });

    const parsedData = JSON.parse(response.text.trim());
    res.json(parsedData);
  } catch (error: any) {
    console.error("Gemini Career Analysis Error:", error);
    res.status(500).json({ error: "Failed to generate AI career report. Returning fallback simulation data.", details: error.message });
  }
});

// 3. AI Interactive Quick Test recommending futuristic jobs
app.post("/api/gemini/futuristic-career", async (req, res) => {
  const { interestSector, values, personalityWord } = req.body;

  const ai = getGeminiClient();
  if (!ai) {
    return res.json({
      career1: {
        title: "우주 테라포밍 바이오 조율사",
        tagline: "우주 환경에서 극한 생명공학 작물을 유지 관리하는 농업 설계자",
        description: `관심분야인 ${interestSector || "기술환경"} 및 성향인 ${personalityWord || "창의성"}을 결합하여, 향후 화성이나 달 기지 생태계를 관리하고 미생물 유전자를 편집하는 우주 식량 안보의 핵심가치 리더로 활약합니다.`
      },
      career2: {
        title: "리얼월드 홀로그램 메타 해비타트 아키텍트",
        tagline: "증강현실과 인공지능을 활용해 오프라인 도시와 연동하는 실시간 3D 가상 복원 주거 공간 디렉터",
        description: `당신의 최우선 가치인 "${values || "공헌 및 도전"}" 실현을 위해, 노년층 및 교통 약자를 위한 디지털 무장애 주거 공간을 고도로 설계하는 핵심 미래 설계사입니다.`
      }
    });
  }

  try {
    const prompt = `Based on the following user inputs, generate exactly two highly fascinating, creative futuristic career blueprints.
User Interest Sector: ${interestSector}
Core Values Wanted: ${values}
Personality Trait: ${personalityWord}

You must return a raw JSON object with the following schema, with no markdown styling:
{
  "career1": {
    "title": "String (Futuristic job name in Korean, extremely cool and creative)",
    "tagline": "String (One-sentence punchy role summary in Korean)",
    "description": "String (Detailed description explaining how it merges their interest, values and personality in Korean)"
  },
  "career2": {
    "title": "String",
    "tagline": "String",
    "description": "String"
  }
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.85,
      }
    });

    const parsedData = JSON.parse(response.text.trim());
    res.json(parsedData);
  } catch (error: any) {
    console.error("Gemini Futuristic Career Error:", error);
    res.status(500).json({ error: "Failed to create futuristic careers. Returning fallback predictions.", details: error.message });
  }
});

async function startServer() {
  // Vite Integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Future Compass] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
