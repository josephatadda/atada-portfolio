export interface Project {
  slug: string;
  title: string;
  description: string;
  component: string; // Path to the component
}

export const projects: Project[] = [
  {
    slug: 'compstack',
    title: 'Compstack Redesign',
    description: 'Redesigning an HRMS platform for HR teams managing payroll, people operations, and reporting',
    component: 'Frame427321900-1/Frame427321900'
  }
  // Add more projects here as you create them
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug);
}
