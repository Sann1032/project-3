export interface TaxStrategy {
  id: string;
  name: string;
  description: string;
  estimatedSavings: number;
  steps: TaxStep[];
  isActive: boolean;
  // Implementation fields
  implementationGuide?: string;
  requirements?: string[];
  risks?: string[];
  timeline?: {
    estimatedDuration: string;
    phases: TimelinePhase[];
  };
  // Training fields
  trainingResources?: {
    videos?: TrainingVideo[];
    documents?: TrainingDocument[];
    articles?: TrainingArticle[];
  };
  // Overview fields
  overview?: {
    summary: string;
    benefits: string[];
    applicability: string[];
    taxImplications: string[];
  };
  dateCreated: Date;
  lastModified: Date;
}

export interface TaxStep {
  id: string;
  description: string;
  completed: boolean;
  dueDate?: string;
  assignedTo?: string;
  notes?: string;
}

export interface TimelinePhase {
  id: string;
  name: string;
  duration: string;
  description: string;
  dependencies?: string[];
}

export interface TrainingVideo {
  id: string;
  title: string;
  url: string;
  duration: string;
  description: string;
}

export interface TrainingDocument {
  id: string;
  title: string;
  url: string;
  type: string;
  description: string;
}

export interface TrainingArticle {
  id: string;
  title: string;
  url: string;
  author: string;
  description: string;
}

export interface UserStrategy extends TaxStrategy {
  customNotes?: string;
  targetSavings?: number;
  implementationDate?: string;
  status?: 'Not Started' | 'In Progress' | 'Completed';
  dateCreated: Date;
  lastModified: Date;
  customSteps?: TaxStep[];
}

export interface StrategyProgress {
  totalSteps: number;
  completedSteps: number;
  percentComplete: number;
}