import React from 'react';
import { PersonalInfoForm } from './PersonalInfoForm';
import { FinancialInfoForm } from './FinancialInfoForm';
import { GoalsSection } from './GoalsSection';
import { useClientInfo } from '../../hooks/useClientInfo';
import { Brain } from 'lucide-react';
import { openAIService } from '../../services/ai/openAIService';
import { formatAIResponse } from '../../utils/aiResponseFormatter';

export const ClientInfoSection: React.FC = () => {
  const { clientInfo, updateClientInfo, addGoal } = useClientInfo();
  const [analysis, setAnalysis] = React.useState<string | null>(null);
  const [analyzing, setAnalyzing] = React.useState(false);

  const handlePersonalInfoChange = (personalInfo: typeof clientInfo.personalInfo) => {
    updateClientInfo({ personalInfo });
  };

  const handleFinancialInfoChange = (financialInfo: typeof clientInfo.financialInfo) => {
    updateClientInfo({ financialInfo });
  };

  const handleAnalyze = async () => {
    setAnalyzing(true);
    try {
      const prompt = `Please analyze this client's tax situation and provide recommendations:
      
Personal Information:
- Name: ${clientInfo.personalInfo.name}
- Filing Status: ${clientInfo.personalInfo.filingStatus}
- Dependents: ${clientInfo.personalInfo.dependents}

Financial Information:
- Annual Income: $${clientInfo.financialInfo.annualIncome}
- Employment Type: ${clientInfo.financialInfo.employmentType}
- Has Business Income: ${clientInfo.financialInfo.hasBusinessIncome}
- Has Investment Income: ${clientInfo.financialInfo.hasInvestmentIncome}
- Has Rental Income: ${clientInfo.financialInfo.hasRentalIncome}
- Retirement Contributions: $${clientInfo.financialInfo.retirementContributions}

Goals:
${clientInfo.goals.map(goal => `- ${goal.description} (${goal.priority} priority)`).join('\n')}

Please provide:
1. Tax optimization opportunities
2. Potential deductions and credits
3. Retirement planning suggestions
4. Risk areas to consider
5. Specific recommendations based on their situation`;

      const response = await openAIService.getAssistantResponse(null, prompt);
      setAnalysis(formatAIResponse(response.message));
    } catch (error) {
      console.error('Analysis failed:', error);
      setAnalysis('Failed to analyze data. Please try again.');
    } finally {
      setAnalyzing(false);
    }
  };

  // Ensure we always have valid objects/arrays even if they're empty
  const safeClientInfo = {
    ...clientInfo,
    personalInfo: clientInfo.personalInfo || {
      name: '',
      email: '',
      phone: '',
      filingStatus: 'Single',
      dependents: 0,
    },
    financialInfo: clientInfo.financialInfo || {
      annualIncome: 0,
      employmentType: 'W2 Employee',
      hasBusinessIncome: false,
      hasInvestmentIncome: false,
      hasRentalIncome: false,
      retirementContributions: 0,
    },
    goals: clientInfo.goals || [],
  };

  return (
    <div className="space-y-6">
      <PersonalInfoForm
        info={safeClientInfo.personalInfo}
        onChange={handlePersonalInfoChange}
      />
      <FinancialInfoForm
        info={safeClientInfo.financialInfo}
        onChange={handleFinancialInfoChange}
      />
      <GoalsSection
        goals={safeClientInfo.goals}
        onAddGoal={addGoal}
      />

      <div className="flex justify-center">
        <button
          onClick={handleAnalyze}
          disabled={analyzing}
          className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 relative"
        >
          {analyzing ? (
            <>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              </div>
              <span className="opacity-0">Analyze Tax Situation</span>
            </>
          ) : (
            <>
              <Brain className="w-5 h-5" />
              <span>Analyze Tax Situation</span>
            </>
          )}
        </button>
      </div>

      {analyzing && (
        <div className="flex flex-col items-center justify-center space-y-4 py-8">
          <div className="flex items-center space-x-4">
            <div className="animate-pulse flex space-x-4">
              <div className="h-12 w-12 rounded-full bg-blue-400"></div>
              <div className="space-y-3">
                <div className="h-4 w-48 bg-blue-400 rounded"></div>
                <div className="h-4 w-32 bg-blue-400 rounded"></div>
              </div>
            </div>
          </div>
          <p className="text-gray-600">Analyzing your tax situation...</p>
        </div>
      )}

      {analysis && (
        <div className="bg-white rounded-lg shadow-md p-6 animate-fade-in">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Tax Analysis</h3>
          <div 
            className="prose prose-blue max-w-none"
            dangerouslySetInnerHTML={{ __html: analysis }}
          />
        </div>
      )}
    </div>
  );
};