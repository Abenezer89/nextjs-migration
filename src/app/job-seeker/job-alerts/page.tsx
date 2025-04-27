'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { Bell, Plus, Trash2, Check, MapPin, Calendar, AlertCircle, Edit } from 'lucide-react';
import { Label } from "@/components/ui/label";

export default function JobAlertsPage() {
  const [alerts, setAlerts] = useState([
    {
      id: "1",
      name: "Software Engineering Jobs",
      keywords: "software engineer, developer, coding",
      location: "San Francisco, CA",
      frequency: "daily",
      active: true,
      lastSent: "2 days ago",
      resultsCount: 12
    },
    {
      id: "2",
      name: "Remote Product Manager Jobs",
      keywords: "product manager, product owner",
      location: "Remote",
      frequency: "weekly",
      active: true,
      lastSent: "5 days ago",
      resultsCount: 8
    },
    {
      id: "3",
      name: "Marketing Positions",
      keywords: "marketing, digital marketing, content",
      location: "New York, NY",
      frequency: "weekly",
      active: false,
      lastSent: "2 weeks ago",
      resultsCount: 0
    }
  ]);
  
  const [showNewAlert, setShowNewAlert] = useState(false);
  const [newAlert, setNewAlert] = useState({
    name: "",
    keywords: "",
    location: "",
    frequency: "daily"
  });

  const handleCreateAlert = () => {
    if (!newAlert.name || !newAlert.keywords) {
      toast({
        title: "Missing information",
        description: "Please provide a name and keywords for your job alert.",
        variant: "destructive"
      });
      return;
    }
    
    const newAlertEntry = {
      id: (alerts.length + 1).toString(),
      ...newAlert,
      active: true,
      lastSent: "Just now",
      resultsCount: 0
    };
    
    setAlerts([newAlertEntry, ...alerts]);
    setNewAlert({
      name: "",
      keywords: "",
      location: "",
      frequency: "daily"
    });
    setShowNewAlert(false);
    
    toast({
      title: "Alert created",
      description: "Your new job alert has been created successfully.",
      action: (
        <Button variant="outline" size="sm" className="gap-1" asChild>
          <Link href="/job-seeker/search">
            <Check className="h-4 w-4" /> View Jobs
          </Link>
        </Button>
      )
    });
  };

  const toggleAlertStatus = (id: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? {...alert, active: !alert.active} : alert
    ));
    
    const alertName = alerts.find(a => a.id === id)?.name;
    const newStatus = !alerts.find(a => a.id === id)?.active;
    
    toast({
      title: newStatus ? "Alert activated" : "Alert paused",
      description: newStatus 
        ? `You'll now receive updates for "${alertName}"`
        : `Updates for "${alertName}" have been paused`
    });
  };
  
  const deleteAlert = (id: string) => {
    const alertName = alerts.find(a => a.id === id)?.name;
    setAlerts(alerts.filter(alert => alert.id !== id));
    
    toast({
      title: "Alert deleted",
      description: `"${alertName}" has been deleted`
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-job-text flex items-center">
                <Bell className="mr-2 h-6 w-6 text-job-primary" />
                Job Alerts
              </h1>
              <p className="text-job-muted">Get notified about new jobs matching your preferences</p>
            </div>
            
            <Button 
              className="mt-4 md:mt-0 bg-job-primary hover:bg-blue-700"
              onClick={() => setShowNewAlert(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              Create New Alert
            </Button>
          </div>
          
          {showNewAlert && (
            <Card className="mb-8 border-2 border-job-primary animate-fade-in">
              <CardHeader>
                <CardTitle>Create New Job Alert</CardTitle>
                <CardDescription>Get notified when new jobs matching your criteria are posted</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="alert-name">Alert Name</Label>
                  <Input 
                    id="alert-name" 
                    placeholder="e.g. Software Engineering Jobs" 
                    value={newAlert.name}
                    onChange={(e) => setNewAlert({...newAlert, name: e.target.value})}
                  />
                </div>
                
                <div>
                  <Label htmlFor="keywords">Keywords</Label>
                  <Input 
                    id="keywords" 
                    placeholder="e.g. software engineer, developer, coding" 
                    value={newAlert.keywords}
                    onChange={(e) => setNewAlert({...newAlert, keywords: e.target.value})}
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Separate multiple keywords with commas
                  </p>
                </div>
                
                <div>
                  <Label htmlFor="location">Location (Optional)</Label>
                  <Input 
                    id="location" 
                    placeholder="e.g. San Francisco, CA or Remote" 
                    value={newAlert.location}
                    onChange={(e) => setNewAlert({...newAlert, location: e.target.value})}
                  />
                </div>
                
                <div>
                  <Label htmlFor="frequency">Alert Frequency</Label>
                  <Select 
                    value={newAlert.frequency} 
                    onValueChange={(value) => setNewAlert({...newAlert, frequency: value})}
                  >
                    <SelectTrigger id="frequency">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="biweekly">Bi-weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setShowNewAlert(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateAlert} className="bg-job-primary hover:bg-blue-700">
                  Create Alert
                </Button>
              </CardFooter>
            </Card>
          )}
          
          {alerts.length > 0 ? (
            <div className="space-y-4">
              {alerts.map((alert) => (
                <Card key={alert.id} className={`hover:shadow-md transition-shadow ${!alert.active ? 'opacity-75' : ''}`}>
                  <CardContent className="p-0">
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold flex items-center">
                            {alert.name}
                            {alert.active ? (
                              <Badge className="ml-2 bg-green-100 text-green-800 border-green-200">
                                Active
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="ml-2 bg-gray-100 text-gray-800 border-gray-200">
                                Paused
                              </Badge>
                            )}
                          </h3>
                          <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2 text-sm text-gray-600">
                            <div className="flex items-center">
                              <AlertCircle className="mr-1 h-4 w-4 text-job-primary" />
                              <span>Keywords: {alert.keywords}</span>
                            </div>
                            
                            {alert.location && (
                              <div className="flex items-center">
                                <MapPin className="mr-1 h-4 w-4 text-job-primary" />
                                <span>{alert.location}</span>
                              </div>
                            )}
                            
                            <div className="flex items-center">
                              <Calendar className="mr-1 h-4 w-4 text-job-primary" />
                              <span>{alert.frequency.charAt(0).toUpperCase() + alert.frequency.slice(1)} alerts</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center mt-4 md:mt-0">
                          {alert.resultsCount > 0 && (
                            <Link href="/job-seeker/search" className="text-job-primary mr-4 hover:underline">
                              {alert.resultsCount} new jobs
                            </Link>
                          )}
                          
                          <div className="flex items-center space-x-2">
                            <Switch 
                              checked={alert.active} 
                              onCheckedChange={() => toggleAlertStatus(alert.id)}
                              className="data-[state=checked]:bg-job-primary"
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-sm text-gray-500 flex flex-wrap items-center justify-between">
                        <span>Last updated: {alert.lastSent}</span>
                        
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-2 text-gray-500 hover:text-job-primary"
                            onClick={() => {
                              setNewAlert({
                                name: alert.name,
                                keywords: alert.keywords,
                                location: alert.location || "",
                                frequency: alert.frequency
                              });
                              setShowNewAlert(true);
                            }}
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-2 text-gray-500 hover:text-red-500"
                            onClick={() => deleteAlert(alert.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="text-center py-12">
              <CardContent>
                <Bell className="h-12 w-12 mb-4 text-gray-300 mx-auto" />
                <h3 className="text-xl font-semibold mb-2">No Job Alerts</h3>
                <p className="text-gray-500 mb-6">You haven't created any job alerts yet.</p>
                <Button 
                  className="bg-job-primary hover:bg-blue-700"
                  onClick={() => setShowNewAlert(true)}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create Your First Alert
                </Button>
              </CardContent>
            </Card>
          )}
          
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-blue-800 mb-2">Tips for Effective Job Alerts</h2>
            <ul className="list-disc pl-5 space-y-2 text-blue-700">
              <li>Use specific keywords related to your desired job title or skills</li>
              <li>Include alternative terms for your job title (e.g., "software engineer, developer, programmer")</li>
              <li>Specify location if you're looking for jobs in a particular area</li>
              <li>Set the frequency based on how actively you're job searching</li>
              <li>Review and update your alerts regularly to stay relevant</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
} 