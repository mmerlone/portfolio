'use client';

import dynamic from 'next/dynamic';
import { SkillsWrapperProps } from '@/types/components';

const SkillsClient = dynamic(() => import('./SkillsClient'), {
  ssr: false
});

const SkillsWrapper = ({ categories, categoryIcons }: SkillsWrapperProps) => {
  return <SkillsClient categories={categories} categoryIcons={categoryIcons} />;
};

export default SkillsWrapper; 