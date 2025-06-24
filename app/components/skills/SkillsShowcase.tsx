import React from 'react';
import { SKILL_CATEGORIES, SkillCategory } from '@/models/Skill';
import { getSkills } from '@/lib/skills';

// Define placeholder icons at the module level to avoid redeclaration
const WebIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>;
const DataIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h.01M12 7h.01M16 7h.01M21 12c0 4.418-4.03 8-9 8S3 16.418 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>;
const MlIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;

// Define an interface for the skill object, which should match the data from getSkills
interface ApiSkill {
  _id: string;
  name: string;
  proficiency: string;
  category: SkillCategory;
}

interface SkillCardProps {
  title: string;
  skills: ApiSkill[];
  icon?: React.ReactNode;
}

const SkillCard: React.FC<SkillCardProps> = ({ title, skills, icon }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <div className="flex items-center mb-4">
        {icon && <div className="mr-3 text-blue-500 dark:text-blue-400">{icon}</div>}
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
      </div>
      <ul className="space-y-2">
        {skills.length > 0 ? (
          skills.map((skill) => (
            <li key={skill._id} className="text-gray-700 dark:text-gray-300">
              {skill.name} <span className="text-sm text-gray-500 dark:text-gray-400">({skill.proficiency})</span>
            </li>
          ))
        ) : (
          <li className="text-gray-500 dark:text-gray-400">No skills listed for this category.</li>
        )}
      </ul>
    </div>
  );
};

// This is now an async Server Component
const SkillsShowcase = async () => {
  const allSkills: ApiSkill[] = await getSkills();

  const getSkillsByCategory = (category: SkillCategory): ApiSkill[] => {
    return allSkills.filter(skill => skill.category === category);
  };

  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-12">
          My Technical Skills
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <SkillCard title="Web Development" skills={getSkillsByCategory('Web Development')} icon={<WebIcon />} />
          <SkillCard title="Data Science" skills={getSkillsByCategory('Data Science')} icon={<DataIcon />} />
          <SkillCard title="Machine Learning" skills={getSkillsByCategory('Machine Learning')} icon={<MlIcon />} />
        </div>
      </div>
    </section>
  );
};

export default SkillsShowcase;
