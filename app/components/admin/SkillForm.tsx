import React, { useState } from 'react';

interface Skill {
  _id?: string;
  name: string;
  level: number; // e.g., 1-5 or 1-100
  category?: string; // e.g., Frontend, Backend, DevOps
}

interface SkillFormProps {
  skill?: Skill;
  onSubmit: (skill: Skill) => void;
  onCancel?: () => void;
}

const SkillForm: React.FC<SkillFormProps> = ({ skill, onSubmit, onCancel }) => {
  const [name, setName] = useState(skill?.name || '');
  const [level, setLevel] = useState(skill?.level || 50); // Default level
  const [category, setCategory] = useState(skill?.category || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ _id: skill?._id, name, level, category });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="skillName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Skill Name
        </label>
        <input
          type="text"
          id="skillName"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      </div>

      <div>
        <label htmlFor="skillLevel" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Proficiency Level (0-100)
        </label>
        <input
          type="range"
          id="skillLevel"
          min="0"
          max="100"
          value={level}
          onChange={(e) => setLevel(parseInt(e.target.value, 10))}
          className="mt-1 block w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
        />
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">{level}%</div>
      </div>

      <div>
        <label htmlFor="skillCategory" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Category (e.g., Frontend, Backend)
        </label>
        <input
          type="text"
          id="skillCategory"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      </div>

      <div className="flex justify-end space-x-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 dark:border-gray-500 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {skill?._id ? 'Update' : 'Create'} Skill
        </button>
      </div>
    </form>
  );
};

export default SkillForm;
