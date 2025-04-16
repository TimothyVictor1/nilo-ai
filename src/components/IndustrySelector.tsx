
import React from 'react';
import { Check, Briefcase, Heart, Plane } from 'lucide-react';

export type IndustryType = 'hr' | 'healthcare' | 'airport' | 'general';

interface IndustrySelectorProps {
  selectedIndustry: IndustryType;
  onSelectIndustry: (industry: IndustryType) => void;
}

interface IndustryOption {
  id: IndustryType;
  name: string;
  icon: React.ReactNode;
  description: string;
}

const IndustrySelector: React.FC<IndustrySelectorProps> = ({ selectedIndustry, onSelectIndustry }) => {
  const industries: IndustryOption[] = [
    {
      id: 'hr',
      name: 'Human Resources',
      icon: <Briefcase className="h-8 w-8" />,
      description: 'Employee queries, onboarding, leave management'
    },
    {
      id: 'healthcare',
      name: 'Healthcare',
      icon: <Heart className="h-8 w-8" />,
      description: 'Appointment booking, FAQs, health-related queries'
    },
    {
      id: 'airport',
      name: 'Airport',
      icon: <Plane className="h-8 w-8" />,
      description: 'Flight status, gate information, directions'
    },
    {
      id: 'general',
      name: 'General Assistant',
      icon: <Check className="h-8 w-8" />,
      description: 'Informational and general assistance'
    }
  ];

  return (
    <div className="p-4 bg-white rounded-lg shadow-md border border-gray-200">
      <h2 className="text-lg font-semibold mb-4">Select Industry</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {industries.map((industry) => (
          <div
            key={industry.id}
            className={`p-4 rounded-lg cursor-pointer transition-all hover:shadow-md ${
              selectedIndustry === industry.id
                ? 'bg-assistant-primary text-white border-2 border-assistant-primary'
                : 'bg-white border-2 border-gray-200 hover:border-assistant-primary text-assistant-text'
            }`}
            onClick={() => onSelectIndustry(industry.id)}
          >
            <div className="flex flex-col items-center text-center">
              <div
                className={`p-3 rounded-full ${
                  selectedIndustry === industry.id
                    ? 'bg-white/20' 
                    : 'bg-assistant-accent/50'
                } mb-3`}
              >
                {industry.icon}
              </div>
              <h3 className="font-medium text-base">{industry.name}</h3>
              <p className={`text-xs mt-2 ${selectedIndustry === industry.id ? 'text-white/80' : 'text-gray-500'}`}>
                {industry.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IndustrySelector;
