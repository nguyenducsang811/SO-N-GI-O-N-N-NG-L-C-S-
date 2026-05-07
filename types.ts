export enum Textbook {
  KNTT = "Kết nối tri thức",
  CTST = "Chân trời sáng tạo",
  CD = "Cánh diều",
  KHAC = "Bộ sách khác"
}

export enum Subject {
  // Chung
  TOAN = "Toán",
  NGU_VAN = "Ngữ văn",
  NGOAI_NGU_1 = "Ngoại ngữ 1",
  NGOAI_NGU_2 = "Ngoại ngữ 2",
  TIENG_DT_THIEU_SO = "Tiếng dân tộc thiểu số",
  GD_THE_CHAT = "Giáo dục thể chất",
  NGHE_THUAT = "Nghệ thuật",
  TIN_HOC = "Tin học",
  CONG_NGHE = "Công nghệ",
  
  // Tiểu học
  TIENG_VIET = "Tiếng Việt",
  GD_LOI_SONG = "Giáo dục lối sống",
  DAO_DUC = "Đạo đức",
  TN_XH = "Tự nhiên và Xã hội",
  LS_DL = "Lịch sử và Địa lý",
  KHOA_HOC = "Khoa học",
  TIN_CONG_NGHE = "Tin học và Công nghệ",

  // THCS
  GDCD = "Giáo dục công dân",
  KHTN = "Khoa học tự nhiên",

  // THPT
  GD_QP_AN = "Giáo dục quốc phòng và an ninh",
  GD_KT_PL = "Giáo dục kinh tế và pháp luật",
  LICH_SU = "Lịch sử",
  DIA_LY = "Địa lý",
  VAT_LY = "Vật lý",
  HOA_HOC = "Hóa học",
  SINH_HOC = "Sinh học",

  KHAC = "Khác"
}

export interface ManualNLSEntry {
  id: string; // unique id for list management
  code: string; // e.g., "1.1"
  name: string; // e.g., "Duyệt, tìm kiếm..."
  description: string; // User typed content
}

export interface LessonInfo {
  textbook: Textbook;
  subject: Subject;
  grade: number;
  content: string; 
  textbookContent?: string;
  distributionContent?: string;
  manualNLS?: ManualNLSEntry[]; // New field for manual inputs
}

export interface ProcessingOptions {
  analyzeOnly: boolean;
  detailedReport: boolean;
  comparisonExport: boolean;
  redesignMode: boolean;
}

export interface GeminiResponse {
  rawText: string;
}