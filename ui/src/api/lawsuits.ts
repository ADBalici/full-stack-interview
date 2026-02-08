const API_BASE = 'http://localhost:3000';

export interface Hearing {
  date: string;
  time: string;
  panel: string;
  institution: string;
  resolution: string;
}

export interface Party {
  name: string;
  role: string;
}

export interface LawsuitResponse {
  caseNumber: string;
  department: string;
  institution: string;
  category: string;
  parties: Party[];
  hearings: Hearing[];
}

export async function fetchLawsuit(
  caseNumber: string,
): Promise<LawsuitResponse> {
  const response = await fetch(
    `${API_BASE}/lawsuits?caseNumber=${encodeURIComponent(caseNumber)}`,
  );

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `Request failed with status ${response.status}`);
  }

  return response.json();
}
