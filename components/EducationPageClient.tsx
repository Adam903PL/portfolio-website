'use client';

import EducationJourney from '@/components/Education';
import type { EducationMilestone, EducationStat } from '@/components/Education';
import {
  Bot,
  Code2,
  FileCode,
  Gamepad2,
  GraduationCap,
  Layers3,
  School,
  Sparkles,
} from 'lucide-react';

const iconMap = {
  robot: Bot,
  gamepad: Gamepad2,
  python: FileCode,
  school: School,
  code: Code2,
  'graduation-cap': GraduationCap,
};

const educationData: EducationMilestone[] = [
  {
    id: 'foundation',
    phase: 'Foundation',
    periodLabel: 'Early school years',
    status: 'Safe timeline',
    title: 'Primary Education Foundations',
    institution: 'Lublin, Poland',
    description:
      'The foundation stage covers the early school years without forcing exact date ranges that are not useful for the portfolio. The focus is on mathematics, problem solving, curiosity and the first contact with computers.',
    highlights: [
      'Built a base in mathematics, logic and general learning habits.',
      'Started treating computers as creative tools, not only entertainment.',
      'Kept the timeline intentionally neutral to avoid wrong date ranges.',
    ],
    skills: ['General Education', 'Math Foundations', 'Computer Basics'],
    level: 'Foundation',
    icon: 'school',
  },
  {
    id: 'robotics-start',
    phase: 'Robotics Start',
    periodLabel: 'Early programming phase',
    status: 'Self-learning',
    title: 'LEGO Mindstorms & Logic',
    institution: 'Self-learning with LEGO Mindstorms EV3',
    description:
      'Early programming started through robotics. Building small autonomous systems made logic, sequencing and debugging feel practical instead of abstract.',
    highlights: [
      'Programmed robots to react to sensors and simple rules.',
      'Learned that debugging is mostly careful observation and iteration.',
      'Connected code with physical behavior, automation and constraints.',
    ],
    skills: ['Robotics', 'Automation', 'Logic', 'LEGO EV3'],
    level: 'Exploration',
    icon: 'robot',
  },
  {
    id: 'creative-coding',
    phase: 'Creative Coding',
    periodLabel: '2021',
    status: 'Game logic',
    title: 'Scratch & Interactive Projects',
    institution: 'Self-learning',
    description:
      'Scratch became the bridge from visual logic to real programming thinking. The work centered on interactive scenes, small games, animation and event-driven behavior.',
    highlights: [
      'Created small games and animation experiments.',
      'Practiced event logic, conditions and simple state management.',
      'Moved from copying ideas to shaping original interactions.',
    ],
    skills: ['Scratch', 'Game Design', 'Animation', 'Logic'],
    level: 'Creative Practice',
    icon: 'gamepad',
  },
  {
    id: 'python-3d',
    phase: 'Python & 3D',
    periodLabel: '2022',
    status: 'Code fundamentals',
    title: 'Python Basics & Unreal Engine',
    institution: 'Self-learning',
    description:
      'This stage moved the path closer to text-based programming. Python built the fundamentals, while Unreal Engine made scripting, mechanics and 3D interaction more tangible.',
    highlights: [
      'Learned variables, functions, control flow and small scripts in Python.',
      'Explored simple 3D interactions and game mechanics.',
      'Started connecting programming fundamentals with larger tools.',
    ],
    skills: ['Python', 'Unreal Engine', 'Game Development', 'Scripting'],
    level: 'Technical Foundation',
    icon: 'python',
  },
  {
    id: 'current-program',
    phase: 'Current Program',
    periodLabel: '2023 - Present',
    status: 'Active',
    title: 'TechniSchools Full-Stack Development',
    institution: 'TechniSchools Lublin',
    description:
      'Current education focuses on practical full-stack development, IT systems and real application work. This is where the learning path connects with shipped projects, automation and modern web tooling.',
    highlights: [
      'Building production-style apps with React, Next.js and TypeScript.',
      'Working across databases, APIs, automation and frontend systems.',
      'Using portfolio projects, hackathons and AI tooling as real practice.',
    ],
    skills: [
      'TypeScript',
      'React',
      'Next.js',
      'SQL',
      'Python',
      'Kotlin',
      'React Native',
      'Automation',
    ],
    level: 'Current Focus',
    icon: 'graduation-cap',
  },
];

const stats: EducationStat[] = [
  {
    icon: Layers3,
    value: '5',
    label: 'Learning Phases',
    description: 'A cleaned timeline focused on the real progression.',
  },
  {
    icon: GraduationCap,
    value: '2023+',
    label: 'Current Track',
    description: 'TechniSchools full-stack development is the active stage.',
  },
  {
    icon: Sparkles,
    value: 'Full-stack',
    label: 'Main Direction',
    description: 'Frontend, backend, automation and practical product work.',
  },
];

export default function EducationPageClient() {
  return (
    <EducationJourney
      data={educationData}
      iconMap={iconMap}
      header={{
        subtitle: 'Education',
        title: 'Learning Path, Cleaned Up',
        description:
          'A more accurate, readable timeline: early stages are shown as safe learning phases, while confirmed years stay explicit.',
      }}
      stats={stats}
    />
  );
}
