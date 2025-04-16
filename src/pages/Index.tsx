
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import AvatarDisplay from '@/components/AvatarDisplay';
import ChatDisplay, { Message } from '@/components/ChatDisplay';
import InputControls from '@/components/InputControls';
import VoiceControls from '@/components/VoiceControls';
import IndustrySelector, { IndustryType } from '@/components/IndustrySelector';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryType>('general');
  const [avatarEmotion, setAvatarEmotion] = useState<'neutral' | 'happy' | 'thinking' | 'concerned'>('neutral');

  // Mock function for speech recognition
  const startListening = () => {
    setIsListening(true);
    console.log('Started listening...');
    // In a real app, we would initialize the WebSpeech API here
  };

  const stopListening = () => {
    setIsListening(false);
    console.log('Stopped listening');
    // In a real app, we would stop the WebSpeech API here
  };

  // Mock function for speech synthesis
  const speak = (text: string) => {
    if (muted) return;
    
    setIsSpeaking(true);
    console.log(`Speaking with volume ${volume}: ${text}`);
    
    // Simulate the speaking duration based on text length
    const duration = Math.min(2000 + text.length * 50, 10000);
    
    setTimeout(() => {
      setIsSpeaking(false);
    }, duration);
    
    // In a real app, we would use the Web Speech API here
  };

  // Handle user message submission
  const handleSendMessage = (content: string) => {
    const userMessage: Message = {
      id: uuidv4(),
      role: 'user',
      content,
      timestamp: new Date()
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setAvatarEmotion('thinking');
    
    // Simulate AI response
    setTimeout(() => {
      const response = generateMockResponse(content, selectedIndustry);
      const assistantMessage: Message = {
        id: uuidv4(),
        role: 'assistant',
        content: response.message,
        timestamp: new Date()
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
      setAvatarEmotion(response.emotion);
      speak(response.message);
    }, 1500);
  };

  // Generate mock responses based on industry and user input
  const generateMockResponse = (userMessage: string, industry: IndustryType): { message: string; emotion: 'neutral' | 'happy' | 'thinking' | 'concerned' } => {
    const lowerCaseMessage = userMessage.toLowerCase();
    let response = '';
    let emotion: 'neutral' | 'happy' | 'thinking' | 'concerned' = 'neutral';
    
    // Check for greetings first
    if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi') || lowerCaseMessage.includes('hey')) {
      emotion = 'happy';
      return {
        message: `Hello! I'm your ${industry.charAt(0).toUpperCase() + industry.slice(1)} Assistant. How can I help you today?`,
        emotion
      };
    }
    
    // Industry-specific responses
    switch (industry) {
      case 'hr':
        if (lowerCaseMessage.includes('vacation') || lowerCaseMessage.includes('leave') || lowerCaseMessage.includes('time off')) {
          response = "To request time off, you'll need to submit a leave request through our employee portal. Would you like me to guide you through the process?";
          emotion = 'happy';
        } else if (lowerCaseMessage.includes('salary') || lowerCaseMessage.includes('pay')) {
          response = "Salary information is confidential. To discuss your compensation, please schedule a meeting with your manager or HR representative.";
          emotion = 'concerned';
        } else if (lowerCaseMessage.includes('onboarding') || lowerCaseMessage.includes('new employee')) {
          response = "Our onboarding process typically takes one week. You'll complete paperwork, attend orientation, meet your team, and set up your workstation. Do you have specific questions about onboarding?";
          emotion = 'happy';
        } else {
          response = "I'm your HR assistant. I can help with leave requests, benefits information, company policies, and other HR-related questions. What specific information do you need?";
        }
        break;
        
      case 'healthcare':
        if (lowerCaseMessage.includes('appointment') || lowerCaseMessage.includes('book') || lowerCaseMessage.includes('schedule')) {
          response = "I can help you schedule an appointment. Our available times are weekdays from 9 AM to 5 PM. Which doctor would you like to see and what day works best for you?";
          emotion = 'happy';
        } else if (lowerCaseMessage.includes('emergency')) {
          response = "If you're experiencing a medical emergency, please call 911 immediately or go to your nearest emergency room. Your health and safety are our top priority.";
          emotion = 'concerned';
        } else if (lowerCaseMessage.includes('insurance') || lowerCaseMessage.includes('coverage')) {
          response = "We accept most major insurance plans. To verify your specific coverage, please provide your insurance provider and member ID, and I can check that for you.";
          emotion = 'thinking';
        } else {
          response = "I'm your healthcare assistant. I can help with scheduling appointments, answering general health questions, and providing information about our services. How can I assist you today?";
        }
        break;
        
      case 'airport':
        if (lowerCaseMessage.includes('flight') || lowerCaseMessage.includes('departure') || lowerCaseMessage.includes('arrival')) {
          response = "I can check flight information for you. Please provide your flight number, and I'll give you the latest status update, including departure/arrival times and gate information.";
          emotion = 'thinking';
        } else if (lowerCaseMessage.includes('baggage') || lowerCaseMessage.includes('luggage')) {
          response = "For baggage inquiries, please visit the baggage claim area on the lower level. If you've lost an item, you can report it at the Lost and Found office in Terminal B, or I can provide you with their contact information.";
          emotion = 'neutral';
        } else if (lowerCaseMessage.includes('security') || lowerCaseMessage.includes('tsa')) {
          response = "Security checkpoints are located at the entrance of each terminal. For a smoother experience, arrive at least 2 hours before domestic flights and 3 hours before international flights. Would you like tips for getting through security more quickly?";
          emotion = 'happy';
        } else {
          response = "I'm your airport assistant. I can help with flight information, directions within the airport, security wait times, and other travel-related questions. How can I assist you today?";
        }
        break;
        
      default: // General assistant
        if (lowerCaseMessage.includes('weather') || lowerCaseMessage.includes('forecast')) {
          response = "I don't have access to real-time weather data right now, but I'd be happy to provide general information or answer other questions you might have.";
          emotion = 'thinking';
        } else if (lowerCaseMessage.includes('help') || lowerCaseMessage.includes('assist')) {
          response = "I'm here to provide information and assistance across various topics. You can ask me about directions, general information, or switch to a specific industry mode for more specialized help.";
          emotion = 'happy';
        } else if (lowerCaseMessage.includes('thank')) {
          response = "You're welcome! I'm glad I could help. Is there anything else you'd like to know?";
          emotion = 'happy';
        } else {
          response = "I'm your general assistant. I can provide information on a wide range of topics or direct you to specialized assistance if needed. What would you like to know?";
        }
    }
    
    return { message: response, emotion };
  };

  // Initialize with a welcome message
  useEffect(() => {
    const welcomeMessage: Message = {
      id: uuidv4(),
      role: 'assistant',
      content: "Welcome to Aria Nexus Assistant! I'm here to help with any questions or information you need. Select an industry for more specialized assistance, or just start chatting.",
      timestamp: new Date()
    };
    
    setMessages([welcomeMessage]);
    speak(welcomeMessage.content);
    
    // Cleanup function
    return () => {
      // In a real app, cleanup would stop any active speech or listening
    };
  }, []);

  // Handle industry change
  const handleIndustryChange = (industry: IndustryType) => {
    setSelectedIndustry(industry);
    setAvatarEmotion('happy');
    
    const industryChangeMessage: Message = {
      id: uuidv4(),
      role: 'assistant',
      content: `I've switched to ${industry} assistant mode. How can I help you with your ${industry}-related questions?`,
      timestamp: new Date()
    };
    
    setMessages((prev) => [...prev, industryChangeMessage]);
    speak(industryChangeMessage.content);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-assistant-background to-assistant-accent/20 flex flex-col p-4 md:p-8">
      <header className="w-full mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-assistant-primary">
          Aria Nexus Assistant
        </h1>
        <p className="text-center text-assistant-text/70 mt-2">
          Your AI-powered virtual assistant for {selectedIndustry} support
        </p>
      </header>
      
      <main className="flex-1 flex flex-col gap-6 max-w-6xl mx-auto w-full">
        <IndustrySelector 
          selectedIndustry={selectedIndustry} 
          onSelectIndustry={handleIndustryChange} 
        />
        
        <div className="grid md:grid-cols-3 gap-6 flex-1">
          <div className="md:col-span-1 flex flex-col gap-4">
            <Card className="flex-1">
              <CardContent className="p-6 flex items-center justify-center">
                <AvatarDisplay speaking={isSpeaking} emotion={avatarEmotion} />
              </CardContent>
            </Card>
            
            <VoiceControls
              volume={volume}
              onVolumeChange={setVolume}
              muted={muted}
              onToggleMute={() => setMuted(!muted)}
            />
          </div>
          
          <div className="md:col-span-2 flex flex-col gap-4">
            <Tabs defaultValue="chat" className="flex-1 flex flex-col">
              <TabsList className="self-center mb-4">
                <TabsTrigger value="chat">Chat</TabsTrigger>
                <TabsTrigger value="info">Info</TabsTrigger>
              </TabsList>
              
              <TabsContent value="chat" className="flex-1 flex flex-col gap-4 h-[400px] md:h-[500px]">
                <ChatDisplay messages={messages} />
                <InputControls
                  onSendMessage={handleSendMessage}
                  isListening={isListening}
                  onStartListening={startListening}
                  onStopListening={stopListening}
                />
              </TabsContent>
              
              <TabsContent value="info" className="flex-1 h-[400px] md:h-[500px] overflow-auto">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">About {selectedIndustry.charAt(0).toUpperCase() + selectedIndustry.slice(1)} Assistant</h2>
                    
                    {selectedIndustry === 'hr' && (
                      <>
                        <p className="mb-4">The HR Assistant can help with:</p>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>Leave and vacation requests</li>
                          <li>Onboarding information</li>
                          <li>Company policies and procedures</li>
                          <li>Benefits and compensation inquiries</li>
                          <li>Training and development resources</li>
                        </ul>
                      </>
                    )}
                    
                    {selectedIndustry === 'healthcare' && (
                      <>
                        <p className="mb-4">The Healthcare Assistant can help with:</p>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>Appointment scheduling</li>
                          <li>Medical service information</li>
                          <li>Insurance and billing inquiries</li>
                          <li>Facility directions and hours</li>
                          <li>General health information</li>
                        </ul>
                      </>
                    )}
                    
                    {selectedIndustry === 'airport' && (
                      <>
                        <p className="mb-4">The Airport Assistant can help with:</p>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>Flight status and gate information</li>
                          <li>Airport navigation and directions</li>
                          <li>Security checkpoint information</li>
                          <li>Baggage claim and lost item assistance</li>
                          <li>Airport services and amenities</li>
                        </ul>
                      </>
                    )}
                    
                    {selectedIndustry === 'general' && (
                      <>
                        <p className="mb-4">The General Assistant can help with:</p>
                        <ul className="list-disc pl-6 space-y-2">
                          <li>General information and inquiries</li>
                          <li>Directions and guidance</li>
                          <li>Recommendations and suggestions</li>
                          <li>Basic explanations on various topics</li>
                          <li>Connecting you to specialized assistance</li>
                        </ul>
                      </>
                    )}
                    
                    <p className="mt-6 text-sm text-assistant-text/70">
                      This is a demonstration of an AI-powered virtual assistant. In a production environment, it would be connected to real systems and APIs to provide accurate, real-time information.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <footer className="mt-8 text-center text-assistant-text/50 text-sm">
        <p>Aria Nexus Assistant - AI-Powered Virtual Assistant Demo</p>
      </footer>
    </div>
  );
};

export default Index;
