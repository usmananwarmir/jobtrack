export interface ExtractedJobFields {
  company: string;
  title: string;
  jobDescription: string;
  location: string;
  salary: string;
  datePosted: string;
  deadline: string;
}

function firstMatch(text: string, patterns: RegExp[]): string {
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match?.[1]) {
      return match[1].trim();
    }
  }
  return "";
}

export function extractJobFromText(rawPaste: string, jobUrl: string): ExtractedJobFields {
  const text = rawPaste.trim();
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const company =
    firstMatch(text, [/company[:\s]+(.+)/i, /employer[:\s]+(.+)/i]) ||
    lines[0]?.slice(0, 80) ||
    "Unknown company";

  const title =
    firstMatch(text, [/job title[:\s]+(.+)/i, /position[:\s]+(.+)/i, /role[:\s]+(.+)/i]) ||
    lines[1]?.slice(0, 120) ||
    "Unknown role";

  const location = firstMatch(text, [/location[:\s]+(.+)/i, /(remote|hybrid|on-site)/i]);
  const salary = firstMatch(text, [/salary[:\s]+(.+)/i, /(\$|€|£)[\d,.]+(?:\s*-\s*[\d,.]+)?/i]);
  const datePosted = firstMatch(text, [/posted[:\s]+(.+)/i, /date posted[:\s]+(.+)/i]);
  const deadline = firstMatch(text, [/deadline[:\s]+(.+)/i, /apply by[:\s]+(.+)/i]);

  const description = text.slice(0, 2000) || (jobUrl ? `Imported from ${jobUrl}` : "");

  return {
    company,
    title,
    jobDescription: description,
    location,
    salary,
    datePosted,
    deadline,
  };
}
