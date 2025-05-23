'use client';

import dynamic from 'next/dynamic';
import { SkillsWrapperProps } from '@/types/components';
import { LoadingSpinner } from './ui/LoadingSpinner';

const SkillsClient = dynamic(() => import('./SkillsClient'), {
  ssr: false,
  loading: () => (
    <LoadingSpinner />
  ),
});

const SkillsWrapper = ({ categories, categoryIcons }: SkillsWrapperProps) => {
  return <SkillsClient categories={categories} categoryIcons={categoryIcons} />;
};

export default SkillsWrapper; 