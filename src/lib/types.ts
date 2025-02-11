export interface OncologyDoc {
  id: string;
  section: string;
  title: string;
  index_path: string;
  parent_id: string | null;
  is_category: boolean;
  content: string | null;
  created_at: string;
  updated_at: string;
  children?: OncologyDoc[];
}
