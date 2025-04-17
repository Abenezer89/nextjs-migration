
import React, { useState } from 'react';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const JobSeekerSettings = () => {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "(555) 123-4567",
    location: "San Francisco, CA",
    title: "Senior Software Engineer",
    about: "Experienced software engineer with 8+ years of experience in full-stack development. Passionate about creating scalable and efficient applications.",
    skills: "JavaScript, React, Node.js, TypeScript, Python, AWS",
    experience: "8 years",
    education: "Bachelor of Science in Computer Science"
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailJobAlerts: true,
    emailMessages: true,
    emailUpdates: false,
    pushNotifications: true,
    smsAlerts: false
  });

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: "public",
    allowRecruiters: true,
    showSalary: false,
    dataSharing: false
  });

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNotificationToggle = (setting: keyof typeof notificationSettings) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handlePrivacyChange = (setting: string, value: any) => {
    setPrivacySettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const handleResumeUpload = () => {
    setUploading(true);
    // Simulate upload
    setTimeout(() => {
      setUploading(false);
      toast({
        title: "Resume uploaded",
        description: "Your resume has been updated successfully."
      });
    }, 1500);
  };

  const handleProfileSave = () => {
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved successfully."
    });
  };

  const handleSettingsSave = () => {
    toast({
      title: "Settings updated",
      description: "Your settings have been saved successfully."
    });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Account Settings</h1>
      
      <Tabs defaultValue="profile" className="max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
        </TabsList>
        
        {/* Profile Tab */}
        <TabsContent value="profile">
          <div className="grid gap-6">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input 
                      id="firstName" 
                      name="firstName" 
                      value={profileData.firstName}
                      onChange={handleProfileChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input 
                      id="lastName" 
                      name="lastName" 
                      value={profileData.lastName}
                      onChange={handleProfileChange}
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email"
                      value={profileData.email}
                      onChange={handleProfileChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input 
                      id="phone" 
                      name="phone" 
                      value={profileData.phone}
                      onChange={handleProfileChange}
                    />
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="location">Location</Label>
                  <Input 
                    id="location" 
                    name="location" 
                    value={profileData.location}
                    onChange={handleProfileChange}
                    placeholder="City, State"
                  />
                </div>
              </CardContent>
            </Card>
            
            {/* Professional Profile */}
            <Card>
              <CardHeader>
                <CardTitle>Professional Profile</CardTitle>
                <CardDescription>Highlight your professional experience and skills.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Professional Title</Label>
                  <Input 
                    id="title" 
                    name="title" 
                    value={profileData.title}
                    onChange={handleProfileChange}
                    placeholder="e.g., Senior Software Engineer"
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="about">About Me</Label>
                  <Textarea 
                    id="about" 
                    name="about" 
                    rows={4}
                    value={profileData.about}
                    onChange={handleProfileChange}
                    placeholder="Brief description of your professional background"
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="skills">Skills</Label>
                  <Textarea 
                    id="skills" 
                    name="skills" 
                    rows={2}
                    value={profileData.skills}
                    onChange={handleProfileChange}
                    placeholder="List your key skills, separated by commas"
                  />
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="experience">Years of Experience</Label>
                    <Input 
                      id="experience" 
                      name="experience" 
                      value={profileData.experience}
                      onChange={handleProfileChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="education">Highest Education</Label>
                    <Input 
                      id="education" 
                      name="education" 
                      value={profileData.education}
                      onChange={handleProfileChange}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Resume */}
            <Card>
              <CardHeader>
                <CardTitle>Resume</CardTitle>
                <CardDescription>Upload your latest resume.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                  <div className="bg-muted p-4 rounded-md flex-grow">
                    <p className="text-sm font-medium">Current Resume: JohnDoe_Resume_2023.pdf</p>
                    <p className="text-xs text-muted-foreground">Uploaded 3 months ago</p>
                  </div>
                  <Button onClick={handleResumeUpload} disabled={uploading}>
                    {uploading ? "Uploading..." : "Upload New Resume"}
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-end mt-4">
              <Button onClick={handleProfileSave}>Save Changes</Button>
            </div>
          </div>
        </TabsContent>
        
        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Manage how you receive notifications.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Job Alerts</p>
                  <p className="text-sm text-muted-foreground">Receive emails about new job matches.</p>
                </div>
                <Switch
                  checked={notificationSettings.emailJobAlerts}
                  onCheckedChange={() => handleNotificationToggle('emailJobAlerts')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Messages</p>
                  <p className="text-sm text-muted-foreground">Receive emails when employers message you.</p>
                </div>
                <Switch
                  checked={notificationSettings.emailMessages}
                  onCheckedChange={() => handleNotificationToggle('emailMessages')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Updates & Newsletters</p>
                  <p className="text-sm text-muted-foreground">Receive emails about platform updates and career tips.</p>
                </div>
                <Switch
                  checked={notificationSettings.emailUpdates}
                  onCheckedChange={() => handleNotificationToggle('emailUpdates')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Push Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive browser notifications for important updates.</p>
                </div>
                <Switch
                  checked={notificationSettings.pushNotifications}
                  onCheckedChange={() => handleNotificationToggle('pushNotifications')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">SMS Alerts</p>
                  <p className="text-sm text-muted-foreground">Receive text messages for critical updates.</p>
                </div>
                <Switch
                  checked={notificationSettings.smsAlerts}
                  onCheckedChange={() => handleNotificationToggle('smsAlerts')}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSettingsSave}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Privacy Tab */}
        <TabsContent value="privacy">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>Control your profile visibility and data usage.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="profileVisibility">Profile Visibility</Label>
                <Select 
                  defaultValue={privacySettings.profileVisibility}
                  onValueChange={(value) => handlePrivacyChange("profileVisibility", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select profile visibility" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public - Visible to all employers</SelectItem>
                    <SelectItem value="limited">Limited - Only visible to employers I apply to</SelectItem>
                    <SelectItem value="private">Private - Hidden from all employers</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground mt-1">
                  Choose who can see your profile in search results.
                </p>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Allow Recruiter Contact</p>
                  <p className="text-sm text-muted-foreground">Let recruiters contact you about relevant opportunities.</p>
                </div>
                <Switch
                  checked={privacySettings.allowRecruiters}
                  onCheckedChange={(checked) => handlePrivacyChange('allowRecruiters', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Show Salary Expectations</p>
                  <p className="text-sm text-muted-foreground">Display your salary expectations to potential employers.</p>
                </div>
                <Switch
                  checked={privacySettings.showSalary}
                  onCheckedChange={(checked) => handlePrivacyChange('showSalary', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Data Sharing for Service Improvement</p>
                  <p className="text-sm text-muted-foreground">Allow anonymous usage data to be used for improving our services.</p>
                </div>
                <Switch
                  checked={privacySettings.dataSharing}
                  onCheckedChange={(checked) => handlePrivacyChange('dataSharing', checked)}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Delete Account</Button>
              <Button onClick={handleSettingsSave}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default JobSeekerSettings;
