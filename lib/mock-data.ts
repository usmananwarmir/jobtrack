import { JobApplication } from "./types";

export const sampleApplications: JobApplication[] = [
  {
    id: "app-1001",
    company: "Stripe",
    title: "Frontend Engineer",
    status: "Technical Interview",
    datePosted: "2026-05-02",
    deadline: "2026-06-04",
    location: "Remote (EU)",
    salary: "EUR 78k - 98k",
    cvVersion: "CV-FE-Stripe-v3",
    sourceUrl: "https://stripe.com/jobs/frontend-engineer",
  },
  {
    id: "app-1002",
    company: "Google",
    title: "Software Engineer, Early Career",
    status: "Applied",
    datePosted: "2026-05-07",
    deadline: "2026-06-20",
    location: "Berlin, Germany",
    salary: "EUR 90k+",
    cvVersion: "CV-Core-SE-v1",
    sourceUrl: "https://careers.google.com/jobs/123",
  },
  {
    id: "app-1003",
    company: "Vercel",
    title: "Developer Experience Engineer",
    status: "Saved",
    datePosted: "2026-05-21",
    location: "Remote",
    salary: "USD 120k - 145k",
    cvVersion: "CV-DX-v4",
    sourceUrl: "https://vercel.com/careers/dx",
  },
];
