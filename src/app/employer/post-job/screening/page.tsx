'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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

export default function ScreeningPage() {
  const router = useRouter();
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

  const handleNext = () => {
    // TODO: Save form data to global state or API
    router.push('/employer/post-job/review');
  };

  const handleBack = () => {
    router.push('/employer/post-job/compensation');
  };

  return (
    <main className="flex-grow bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <Link href="/employer" className="text-job-primary hover:underline mb-6 inline-block">
          &larr; Back to Dashboard
        </Link>
        
        <JobPostingProgress currentStep={4} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold">Screening Questions</h2>
                  <p className="text-gray-500">Add questions to help screen candidates</p>
                </div>
                <Switch 
                  checked={enableScreening} 
                  onCheckedChange={setEnableScreening}
                />
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
                          <Label htmlFor={`question-${question.id}`}>Question Text</Label>
                          <Input
                            id={`question-${question.id}`}
                            value={question.text}
                            onChange={(e) => updateQuestion(question.id, 'text', e.target.value)}
                            placeholder="Enter your question..."
                          />
                        </div>
                        
                        <div className="flex gap-4">
                          <div className="flex-1">
                            <Label htmlFor={`type-${question.id}`}>Answer Type</Label>
                            <Select
                              value={question.type}
                              onValueChange={(value) => updateQuestion(question.id, 'type', value)}
                            >
                              <SelectTrigger id={`type-${question.id}`}>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="text">Text</SelectItem>
                                <SelectItem value="yesno">Yes/No</SelectItem>
                                <SelectItem value="multiple">Multiple Choice</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="flex items-end gap-2">
                            <div className="flex items-center gap-2">
                              <Switch
                                checked={question.required}
                                onCheckedChange={(checked) => updateQuestion(question.id, 'required', checked)}
                                id={`required-${question.id}`}
                              />
                              <Label htmlFor={`required-${question.id}`}>Required</Label>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <Switch
                                checked={question.dealBreaker}
                                onCheckedChange={(checked) => updateQuestion(question.id, 'dealBreaker', checked)}
                                id={`dealBreaker-${question.id}`}
                              />
                              <Label htmlFor={`dealBreaker-${question.id}`}>Deal Breaker</Label>
                            </div>
                          </div>
                        </div>
                        
                        {question.type === 'multiple' && question.options && (
                          <div className="space-y-2">
                            <Label>Options</Label>
                            {question.options.map((option, index) => (
                              <div key={index} className="flex gap-2">
                                <Input
                                  value={option}
                                  onChange={(e) => updateOption(question.id, index, e.target.value)}
                                  placeholder={`Option ${index + 1}`}
                                />
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => removeOption(question.id, index)}
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
                              onClick={() => addOption(question.id)}
                              className="mt-2 border-dashed border-gray-300"
                            >
                              <Plus className="mr-2 h-4 w-4" />
                              Add Option
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addQuestion}
                    className="w-full border-dashed border-gray-300"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Question
                  </Button>
                </div>
              ) : (
                <Alert className="bg-gray-50">
                  <AlertDescription>
                    No screening questions will be asked to candidates.
                  </AlertDescription>
                </Alert>
              )}
            </div>

            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={handleBack}>
                Back: Compensation
              </Button>
              <Button onClick={handleNext}>
                Next: Review
              </Button>
            </div>
          </div>
          
          <div>
            <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-20">
              <h3 className="font-semibold mb-4">Tips for Screening Questions</h3>
              
              <Alert className="bg-blue-50 border-blue-200 mb-4">
                <InfoIcon className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-700">
                  Good screening questions help identify qualified candidates quickly.
                </AlertDescription>
              </Alert>
              
              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-medium text-job-text">Question Types</h4>
                  <ul className="list-disc pl-5 mt-2 text-gray-600 space-y-1">
                    <li>Text: For open-ended responses</li>
                    <li>Yes/No: For clear requirements</li>
                    <li>Multiple Choice: For specific options</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-job-text">Best Practices</h4>
                  <ul className="list-disc pl-5 mt-2 text-gray-600 space-y-1">
                    <li>Keep questions clear and concise</li>
                    <li>Focus on must-have requirements</li>
                    <li>Use deal breakers sparingly</li>
                    <li>Limit to 3-5 questions</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 