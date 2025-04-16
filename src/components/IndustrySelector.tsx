
import React from 'react';
import { Check, Briefcase, Heart, Plane, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

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
  bgColor: string;
}

const IndustrySelector: React.FC<IndustrySelectorProps> = ({ selectedIndustry, onSelectIndustry }) => {
  const industries: IndustryOption[] = [
    {
      id: 'hr',
      name: 'Human Resources',
      icon: <Briefcase className="h-8 w-8" />,
      description: 'Employee queries, onboarding, leave management',
      bgColor: 'from-blue-500/20 to-indigo-500/30'
    },
    {
      id: 'healthcare',
      name: 'Healthcare',
      icon: <Heart className="h-8 w-8" />,
      description: 'Appointment booking, FAQs, health-related queries',
      bgColor: 'from-pink-500/20 to-rose-500/30'
    },
    {
      id: 'airport',
      name: 'Airport',
      icon: <Plane className="h-8 w-8" />,
      description: 'Flight status, gate information, directions',
      bgColor: 'from-sky-500/20 to-cyan-500/30'
    },
    {
      id: 'general',
      name: 'General Assistant',
      icon: <Globe className="h-8 w-8" />,
      description: 'Informational and general assistance',
      bgColor: 'from-emerald-500/20 to-teal-500/30'
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="p-6 rounded-xl shadow-lg backdrop-blur-md bg-white/5 border border-white/20">
      <h2 className="text-lg font-semibold mb-4 text-white">Select Your Assistant Type</h2>
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {industries.map((industry) => (
          <motion.div
            key={industry.id}
            variants={item}
            className={`p-4 rounded-lg cursor-pointer transition-all hover:shadow-lg ${
              selectedIndustry === industry.id
                ? `bg-gradient-to-br ${industry.bgColor} text-white border-2 border-white/30 shadow-lg scale-105`
                : 'bg-gradient-to-br from-white/5 to-white/10 border-2 border-white/10 hover:border-white/30 text-white'
            }`}
            onClick={() => onSelectIndustry(industry.id)}
            whileHover={{ 
              scale: selectedIndustry === industry.id ? 1.05 : 1.03,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex flex-col items-center text-center h-full">
              <div
                className={`p-3 rounded-full ${
                  selectedIndustry === industry.id
                    ? 'bg-white/20' 
                    : 'bg-white/10'
                } mb-3 backdrop-blur-sm`}
              >
                {industry.icon}
              </div>
              <h3 className="font-medium text-base">{industry.name}</h3>
              <p className={`text-xs mt-2 ${selectedIndustry === industry.id ? 'text-white/80' : 'text-white/60'}`}>
                {industry.description}
              </p>
              {selectedIndustry === industry.id && (
                <div className="mt-3 bg-white/20 px-2 py-1 rounded-full text-xs flex items-center">
                  <Check className="w-3 h-3 mr-1" /> Selected
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default IndustrySelector;
