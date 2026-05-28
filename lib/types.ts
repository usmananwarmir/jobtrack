export type ApplicationStatus =
  | "Saved"
  | "Applied"
  | "HR Screen"
  | "Technical Interview"
  | "Final Interview"
  | "Offer"
  | "Rejected"
  | "Withdrawn";

export interface JobApplication {
  id: string;
  company: string;
  title: string;
  status: ApplicationStatus;
  datePosted?: string;
  deadline?: string;
  location?: string;
  sourceUrl?: string;
  salary?: string;
  cvVersion?: string;
  description?: string;
}
