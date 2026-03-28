'use client';

import dynamic from 'next/dynamic';
import { type SkillsWrapperProps } from '@/types/components';
import { LoadingSpinner } from './ui/LoadingSpinner';

const SkillsClient = dynamic(() => import('./SkillsClient'), {
  ssr: false,
  loading: () => (
    <LoadingSpinner />
  ),
});

const SkillsWrapper = ({
  categories,
  categoryIcons,
}: SkillsWrapperProps): React.ReactElement => {
  return <SkillsClient categories={categories} categoryIcons={categoryIcons} />;
};

export default SkillsWrapper; 
