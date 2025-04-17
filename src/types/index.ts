
export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  remote: boolean;
  salary?: string;
  jobType: string;
  postedDate: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits?: string[];
  isFeatured?: boolean;
  category?: string;
  experienceLevel?: string;
}

export interface JobFilter {
  jobType?: string;
  remote?: boolean;
  location?: string;
  postedDate?: string;
  salary?: string;
  category?: string;
  experienceLevel?: string;
}
