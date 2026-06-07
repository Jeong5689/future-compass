/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Consultant {
  name: string;
  role: string;
  credentials: string[];
  bio: string;
}

export interface Review {
  id: number;
  author: string;
  role: string; // 학부모, 학생, 성인 등
  stars: number;
  text: string;
  tag: string;
}

export interface SuccessCase {
  id: number;
  group: string; // 중등, 고등, 성인
  title: string;
  before: string;
  after: string;
  impactResult: string;
  badge: string;
}

export interface ServiceCard {
  title: string;
  iconName: string;
  points: string[];
  color: string;
}

export interface ProgramInfo {
  level: string; // 초등, 중등, 고등, 성인
  title: string;
  focus: string;
  duration: string;
  items: string[];
}

export interface ColumnItem {
  id: number;
  title: string;
  category: string;
  date: string;
  readTime: string;
  summary: string;
}

export interface LectureItem {
  id: number;
  title: string;
  audience: string; // 학교, 기업, 복지관 등
  description: string;
  tag: string;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

// Interactive Diagnosing
export interface DiagnosticResult {
  personalityTheme: string;
  dominantTraits: string[];
  careers: string[];
  tip: string;
}

// AI Career Report
export interface AICareerReport {
  careerTheme: string;
  recommendedCareers: Array<{
    title: string;
    reason: string;
    futureOutlook: string;
  }>;
  subjectGuidelines: string;
  growthPlan: string;
  recommendedKeywords: string[];
  actions: string[];
}

// Student Dashboard State
export interface LearningGoal {
  id: string;
  title: string;
  category: "math" | "english" | "science" | "career" | "reading";
  targetDate: string;
  completed: boolean;
  progress: number; // 0 - 100
}

export interface PortfolioLog {
  id: string;
  date: string;
  title: string;
  category: "activity" | "award" | "book" | "essay";
  description: string;
}

export interface ConsultationRequest {
  id: string;
  name: string;
  phone: string;
  email: string;
  field: string;
  date: string;
  timeSlot: string;
  message: string;
  submittedAt: string;
}
