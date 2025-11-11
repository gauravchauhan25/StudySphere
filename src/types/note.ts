export interface Note {
  id: string;
  title: string;
  subject: string;
  semester: number;
  file_name: string;
  file_path: string;
  file_type: string;
  file_size: number;
  uploaded_by: string;
  created_at: string;
}

export const SUBJECTS_BY_SEMESTER: Record<number, string[]> = {
  1: ['Mathematics I', 'Physics', 'Chemistry', 'Engineering Drawing', 'Programming Fundamentals'],
  2: ['Mathematics II', 'Electronics', 'Mechanics', 'Environmental Science', 'Data Structures'],
  3: ['Mathematics III', 'Digital Logic', 'Computer Architecture', 'Database Systems', 'Operating Systems'],
  4: ['Algorithms', 'Software Engineering', 'Computer Networks', 'Theory of Computation', 'Web Development'],
  5: ['Artificial Intelligence', 'Machine Learning', 'Compiler Design', 'Mobile Computing', 'Cloud Computing'],
  6: ['Distributed Systems', 'Cybersecurity', 'IoT', 'Blockchain', 'Project Management']
};
