import type { Location } from "./location";

export type VacancyCard = {
  id: number;
  category: string;
  name: string;
  companyName: string;
  locations: Location[];
  employmentType: "FULL_TIME" | "PART_TIME" | "CONTRACT";
  salary: number | null;
  description: string;
  status: "PUBLISHED" | "OPEN";
  publishedDate: string;
  openDate: string;
  closeDate: string | null;
};