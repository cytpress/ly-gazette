import { AnalysisResultJson } from "@/types/analysisTypes";

export type SortByType =
  | "relevance_desc"
  | "relevance_asc"
  | "date_desc"
  | "date_asc";

export interface GazetteItem {
  id: string;
  committee_names: string[];
  summary_title: string;
  overall_summary_sentence: string;
  meeting_date: string;
  analyzed_at: string;
  score?: number;
  highlighted_summary?: string;
}

export interface FetchGazettesListResult {
  itemsList: GazetteItem[];
  totalItemsCount: number;
}

export interface RankedSearchResultsItem {
  item_id: string;
  relevance_score: number;
  highlighted_summary: string;
}

export interface DetailedGazetteItem {
  analyzed_content_id: string;
  parsed_content_url: string;
  analysis_result: AnalysisResultJson;
  committee_names: string[];

  agenda_id: string;
  agenda_subject: string;
  agenda_meeting_date: string;
  agenda_start_page: number;
  agenda_end_page: number;
  agenda_official_page_url: string;
  agenda_official_pdf_url: string;

  parent_gazette_id: string;
  gazette_volume: number;
  gazette_issue: number;
  gazette_booklet: number;
  gazette_publish_date: string;
}

export interface TocEntry {
  id: string;
  text: string;
  children?: TocEntry[];
  type?: "entry" | "divider";
}
