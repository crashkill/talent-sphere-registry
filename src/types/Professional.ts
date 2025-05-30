
export interface Professional {
  id: string; // UUID do Supabase
  email: string | null;
  hora_ultima_modificacao: string | null; // ISO date string
  nome_completo: string | null;
  regime: string | null;
  local_alocacao: string | null;
  proficiencia_cargo: string | null;
  java: string | null;
  javascript: string | null;
  python: string | null;
  typescript: string | null;
  php: string | null;
  dotnet: string | null;
  react: string | null;
  angular: string | null;
  ionic: string | null;
  flutter: string | null;
  mysql: string | null;
  postgres: string | null;
  oracle_db: string | null;
  sql_server: string | null;
  mongodb: string | null;
  aws: string | null;
  azure: string | null;
  gcp: string | null;
  outras_tecnologias: string | null;
  created_at: string | null; // ISO date string
}

export const AREAS = [
  'Desenvolvedor Frontend',
  'Desenvolvedor Backend', 
  'Desenvolvedor Fullstack',
  'DevOps',
  'QA/Tester',
  'Product Owner',
  'Scrum Master',
  'UI/UX Designer',
  'Data Scientist',
  'Mobile Developer'
];

export const MAIN_SKILLS = [
  'JavaScript',
  'TypeScript', 
  'Python',
  'Java',
  'C#',
  'PHP',
  'Go',
  'Rust',
  'Swift',
  'Kotlin',
  'React',
  'Vue.js',
  'Angular',
  'Node.js',
  '.NET',
  'Spring Boot'
];

export const OTHER_SKILLS = [
  'React',
  'Vue.js',
  'Angular',
  'Node.js',
  'Express',
  'Django',
  'Flask',
  'Spring Boot',
  'Laravel',
  'Docker',
  'Kubernetes',
  'AWS',
  'Azure',
  'GCP',
  'PostgreSQL',
  'MongoDB',
  'Redis',
  'GraphQL',
  'REST API',
  'Git',
  'Jenkins',
  'Terraform',
  'Figma',
  'Adobe XD'
];
