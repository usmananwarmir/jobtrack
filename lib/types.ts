export type ApplicationStatus =
  | "Saved"
  | "Applied"
  | "HR Screen"
  | "Technical Interview"
  | "Final Interview"
  | "Offer"
  | "Rejected"
  | "Withdrawn";

export type UserRole = "user" | "admin";

export type ProviderName = "OpenAI" | "Anthropic" | "Google Gemini";

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: UserRole;
  createdAt: string;
}

export interface Session {
  userId: string;
  email: string;
  name: string;
  role: UserRole;
}

export interface JobApplication {
  id: string;
  userId: string;
  company: string;
  title: string;
  status: ApplicationStatus;
  datePosted?: string;
  deadline?: string;
  location?: string;
  sourceUrl?: string;
  salary?: string;
  cvVersion?: string;
  cvText?: string;
  description?: string;
  attachmentName?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AppDatabase {
  users: User[];
  applications: JobApplication[];
  providerKeys: Record<string, Partial<Record<ProviderName, string>>>;
}
