import { TaxStrategy, UserStrategy, TaxStep, TimelinePhase, TrainingVideo, TrainingDocument, TrainingArticle } from '../types/strategy';

// Default values for different entity types
const DEFAULT_STEP: TaxStep = {
  id: '',
  description: '',
  completed: false,
  dueDate: null,
  assignedTo: null,
  notes: ''
};

const DEFAULT_PHASE: TimelinePhase = {
  id: '',
  name: '',
  duration: '',
  description: '',
  dependencies: []
};

const DEFAULT_VIDEO: TrainingVideo = {
  id: '',
  title: '',
  url: '',
  duration: '',
  description: ''
};

const DEFAULT_DOCUMENT: TrainingDocument = {
  id: '',
  title: '',
  url: '',
  type: '',
  description: ''
};

const DEFAULT_ARTICLE: TrainingArticle = {
  id: '',
  title: '',
  url: '',
  author: '',
  description: ''
};

const DEFAULT_STRATEGY: UserStrategy = {
  id: '',
  name: '',
  description: '',
  estimatedSavings: 0,
  steps: [],
  isActive: false,
  customSteps: [],
  timeline: {
    estimatedDuration: '',
    phases: []
  },
  customNotes: '',
  targetSavings: 0,
  implementationDate: null,
  status: 'Not Started',
  dateCreated: new Date(),
  lastModified: new Date(),
  requirements: [],
  risks: [],
  overview: {
    summary: '',
    benefits: [],
    applicability: [],
    taxImplications: []
  },
  trainingResources: {
    videos: [],
    documents: [],
    articles: []
  }
};

// Generate a unique ID with timestamp and random string
const generateUniqueId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const transformStrategyForFirestore = (data: Partial<UserStrategy>) => {
  const transformed = { ...DEFAULT_STRATEGY, ...data };

  // Ensure required base fields
  transformed.id = transformed.id || generateUniqueId();
  transformed.dateCreated = transformed.dateCreated || new Date();
  transformed.lastModified = transformed.lastModified || new Date();

  // Clean steps data
  transformed.steps = (transformed.steps || []).map(step => ({
    ...DEFAULT_STEP,
    ...step,
    id: step.id || generateUniqueId()
  }));

  transformed.customSteps = (transformed.customSteps || []).map(step => ({
    ...DEFAULT_STEP,
    ...step,
    id: step.id || generateUniqueId()
  }));

  // Clean timeline data
  transformed.timeline = {
    estimatedDuration: transformed.timeline?.estimatedDuration || '',
    phases: (transformed.timeline?.phases || []).map(phase => ({
      ...DEFAULT_PHASE,
      ...phase,
      id: phase.id || generateUniqueId()
    }))
  };

  // Clean training resources
  transformed.trainingResources = {
    videos: (transformed.trainingResources?.videos || []).map(video => ({
      ...DEFAULT_VIDEO,
      ...video,
      id: video.id || generateUniqueId()
    })),
    documents: (transformed.trainingResources?.documents || []).map(doc => ({
      ...DEFAULT_DOCUMENT,
      ...doc,
      id: doc.id || generateUniqueId()
    })),
    articles: (transformed.trainingResources?.articles || []).map(article => ({
      ...DEFAULT_ARTICLE,
      ...article,
      id: article.id || generateUniqueId()
    }))
  };

  // Clean overview data
  transformed.overview = {
    summary: transformed.overview?.summary || '',
    benefits: transformed.overview?.benefits || [],
    applicability: transformed.overview?.applicability || [],
    taxImplications: transformed.overview?.taxImplications || []
  };

  // Remove any undefined values
  Object.keys(transformed).forEach(key => {
    if (transformed[key] === undefined) {
      delete transformed[key];
    }
  });

  return transformed;
};

export const initializeStrategy = (strategy: Partial<TaxStrategy>): UserStrategy => {
  const baseStrategy = transformStrategyForFirestore(strategy);
  
  return {
    ...DEFAULT_STRATEGY,
    ...baseStrategy,
    id: baseStrategy.id || generateUniqueId(),
    isActive: false,
    customSteps: baseStrategy.steps?.map(step => ({
      ...DEFAULT_STEP,
      ...step,
      id: step.id || generateUniqueId()
    })) || [],
    dateCreated: baseStrategy.dateCreated || new Date(),
    lastModified: baseStrategy.lastModified || new Date()
  };
};