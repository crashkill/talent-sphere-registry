
export interface Professional {
  id: string;
  name: string;
  email: string;
  phone: string;
  area: string;
  mainSkill: string;
  otherSkills: Array<{
    name: string;
    level: 'Júnior' | 'Pleno' | 'Sênior';
  }>;
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
