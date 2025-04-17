
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import JobPostingProgress from '@/components/employer/JobPostingProgress';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon, Plus, Trash2 } from 'lucide-react';

interface Question {
  id: string;
  text: string;
  type: 'text' | 'yesno' | 'multiple';
  required: boolean;
  options?: string[];
  dealBreaker: boolean;
}

const Screening: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([
    { 
      id: '1', 
      text: 'How many years of experience do you have in this field?', 
      type: 'text', 
      required: true,
      dealBreaker: false
    }
  ]);
  
  const [enableScreening, setEnableScreening] = useState(true);
  
  const addQuestion = () => {
    const newId = (questions.length + 1).toString();
    setQuestions([
      ...questions, 
      { id: newId, text: '', type: 'text', required: false, dealBreaker: false }
    ]);
  };
  
  const removeQuestion = (id: string) => {
    if (questions.length > 1) {
      setQuestions(questions.filter(q => q.id !== id));
    }
  };
  
  const updateQuestion = (id: string, field: keyof Question, value: any) => {
    setQuestions(questions.map(q => {
      if (q.id === id) {
        // If changing type to multiple choice, initialize options
        if (field === 'type' && value === 'multiple' && !q.options) {
          return { ...q, [field]: value, options: [''] };
        }
        return { ...q, [field]: value };
      }
      return q;
    }));
  };
  
  const addOption = (questionId: string) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId && q.options) {
        return { ...q, options: [...q.options, ''] };
      }
      return q;
    }));
  };
  
  const removeOption = (questionId: string, optionIndex: number) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId && q.options && q.options.length > 1) {
        const newOptions = [...q.options];
        newOptions.splice(optionIndex, 1);
        return { ...q, options: newOptions };
      }
      return q;
    }));
  };
  
  const updateOption = (questionId: string, optionIndex: number, value: string) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId && q.options) {
        const newOptions = [...q.options];
        newOptions[optionIndex] = value;
        return { ...q, options: newOptions };
      }
      return q;
    }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <Link to="/employer" className="text-job-primary hover:underline mb-6 inline-block">
            &larr; Back to Dashboard
          </Link>
          
          <JobPostingProgress currentStep={4} />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-semibold">Screening Questions</h2>
                    <p className="text-gray-500 text-sm">
                      Add questions to help identify qualified candidates
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="enable-screening">Enable Screening</Label>
                    <Switch 
                      id="enable-screening"
                      checked={enableScreening} 
                      onCheckedChange={setEnableScreening} 
                    />
                  </div>
                </div>
                
                {enableScreening ? (
                  <div className="space-y-8">
                    {questions.map((question) => (
                      <div key={question.id} className="border border-gray-200 rounded-lg p-5">
                        <div className="flex justify-between mb-4">
                          <h3 className="font-medium">Question {question.id}</h3>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeQuestion(question.id)}
                            disabled={questions.length === 1}
                            className="text-gray-500 hover:text-red-500 h-7 px-3"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Remove
                          </Button>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor={`question-${question.id}`}>
                              Question Text
                            </Label>
                            <Textarea
                              id={`question-${question.id}`}
                              value={question.text}
                              onChange={(e) => updateQuestion(question.id, 'text', e.target.value)}
                              placeholder="Enter your question here..."
                              className="mt-1"
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor={`question-type-${question.id}`}>
                                Answer Type
                              </Label>
                              <Select
                                value={question.type}
                                onValueChange={(value) => updateQuestion(question.id, 'type', value)}
                              >
                                <SelectTrigger id={`question-type-${question.id}`}>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="text">Text answer</SelectItem>
                                  <SelectItem value="yesno">Yes/No</SelectItem>
                                  <SelectItem value="multiple">Multiple choice</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div>
                              <div className="flex items-center space-x-2 mb-1">
                                <Checkbox
                                  id={`required-${question.id}`}
                                  checked={question.required}
                                  onCheckedChange={(checked) => 
                                    updateQuestion(question.id, 'required', Boolean(checked))
                                  }
                                />
                                <Label htmlFor={`required-${question.id}`}>
                                  Required question
                                </Label>
                              </div>
                              
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id={`dealbreaker-${question.id}`}
                                  checked={question.dealBreaker}
                                  onCheckedChange={(checked) => 
                                    updateQuestion(question.id, 'dealBreaker', Boolean(checked))
                                  }
                                />
                                <Label htmlFor={`dealbreaker-${question.id}`}>
                                  Deal breaker question
                                </Label>
                              </div>
                            </div>
                          </div>
                          
                          {/* Show options for multiple choice questions */}
                          {question.type === 'multiple' && question.options && (
                            <div className="mt-4">
                              <Label className="mb-2 block">Answer Options</Label>
                              <div className="space-y-2">
                                {question.options.map((option, optionIndex) => (
                                  <div key={optionIndex} className="flex gap-2">
                                    <Input
                                      value={option}
                                      onChange={(e) => updateOption(question.id, optionIndex, e.target.value)}
                                      placeholder={`Option ${optionIndex + 1}`}
                                    />
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => removeOption(question.id, optionIndex)}
                                      disabled={question.options?.length === 1}
                                      className="text-gray-500 hover:text-red-500"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                ))}
                                
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => addOption(question.id)}
                                  className="mt-2 border-dashed border-gray-300"
                                >
                                  <Plus className="mr-2 h-4 w-4" />
                                  Add Option
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                    
                    <Button
                      type="button"
                      variant="outline"
                      onClick={addQuestion}
                      className="w-full border-dashed border-gray-300 py-6"
                    >
                      <Plus className="mr-2 h-5 w-5" />
                      Add Another Question
                    </Button>
                  </div>
                ) : (
                  <div className="bg-gray-50 p-6 rounded-lg text-center">
                    <h3 className="font-medium text-gray-700 mb-2">Screening Questions Disabled</h3>
                    <p className="text-gray-500 mb-4">
                      Enable screening questions to help identify the most qualified candidates for your job.
                    </p>
                    <Button
                      onClick={() => setEnableScreening(true)}
                      className="bg-job-primary hover:bg-blue-700"
                    >
                      Enable Screening
                    </Button>
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-20">
                <h3 className="font-semibold mb-4">Screening Tips</h3>
                
                <Alert className="bg-blue-50 border-blue-200 mb-4">
                  <InfoIcon className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-700">
                    Effective screening questions help you quickly identify qualified candidates.
                  </AlertDescription>
                </Alert>
                
                <div className="space-y-4 mt-4">
                  <div>
                    <h4 className="font-medium">Sample Questions</h4>
                    <ul className="list-disc pl-5 mt-2 text-sm text-gray-600 space-y-1">
                      <li>How many years of experience do you have with [specific skill]?</li>
                      <li>Do you have experience with [relevant tool or technology]?</li>
                      <li>Are you available to work [specific hours or schedule]?</li>
                      <li>Do you have the legal right to work in [location]?</li>
                      <li>Are you willing to relocate for this position?</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">Best Practices</h4>
                    <ul className="list-disc pl-5 mt-2 text-sm text-gray-600 space-y-1">
                      <li>Keep questions brief and specific</li>
                      <li>Focus on must-have qualifications</li>
                      <li>Use deal-breaker questions for essential requirements</li>
                      <li>Avoid questions that could be discriminatory</li>
                      <li>Limit to 3-5 questions for better completion rates</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Screening;
