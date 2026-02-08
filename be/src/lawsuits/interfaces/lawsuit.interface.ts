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
