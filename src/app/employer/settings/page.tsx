'use client';

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
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const SettingsPage = () => {
  const { toast } = useToast();
  
  const [accountData, setAccountData] = useState({
    companyName: "Acme Corporation",
    email: "hr@acmecorp.example.com",
    firstName: "Jane",
    lastName: "Smith",
    phone: "(555) 987-6543",
    jobTitle: "HR Manager"
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailApplicants: true,
    emailMessages: true,
    emailUpdates: false,
    smsAlerts: false
  });

  const [subscriptionInfo, setSubscriptionInfo] = useState({
    currentPlan: "Professional",
    nextBillingDate: "May 15, 2023",
    autoRenew: true
  });

  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: "Jane Smith", email: "jane@acmecorp.example.com", role: "Admin", status: "Active" },
    { id: 2, name: "John Davis", email: "john@acmecorp.example.com", role: "Recruiter", status: "Active" },
    { id: 3, name: "Sarah Johnson", email: "sarah@acmecorp.example.com", role: "Hiring Manager", status: "Pending" }
  ]);

  const [newTeamMember, setNewTeamMember] = useState({
    name: "",
    email: "",
    role: "Recruiter"
  });

  const handleAccountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAccountData(prev => ({
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

  const handleSubscriptionToggle = (setting: string, value: any) => {
    setSubscriptionInfo(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const handleNewTeamMemberChange = (name: string, value: string) => {
    setNewTeamMember(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddTeamMember = () => {
    if (newTeamMember.name && newTeamMember.email) {
      const newMember = {
        id: teamMembers.length + 1,
        name: newTeamMember.name,
        email: newTeamMember.email,
        role: newTeamMember.role,
        status: "Pending"
      };
      
      setTeamMembers([...teamMembers, newMember]);
      setNewTeamMember({
        name: "",
        email: "",
        role: "Recruiter"
      });
      
      toast({
        title: "Team member added",
        description: `Invitation sent to ${newTeamMember.email}`
      });
    }
  };

  const handleSaveChanges = () => {
    toast({
      title: "Settings updated",
      description: "Your account settings have been saved successfully."
    });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Account Settings</h1>
      
      <Tabs defaultValue="account" className="max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
          <TabsTrigger value="team">Team Members</TabsTrigger>
        </TabsList>
        
        {/* Account Tab */}
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>Update your account details.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input 
                  id="companyName" 
                  name="companyName" 
                  value={accountData.companyName}
                  onChange={handleAccountChange}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email"
                  value={accountData.email}
                  onChange={handleAccountChange}
                />
                <p className="text-sm text-muted-foreground">
                  This is your main contact email for the account.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input 
                    id="firstName" 
                    name="firstName" 
                    value={accountData.firstName}
                    onChange={handleAccountChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input 
                    id="lastName" 
                    name="lastName" 
                    value={accountData.lastName}
                    onChange={handleAccountChange}
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    name="phone" 
                    value={accountData.phone}
                    onChange={handleAccountChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="jobTitle">Job Title</Label>
                  <Input 
                    id="jobTitle" 
                    name="jobTitle" 
                    value={accountData.jobTitle}
                    onChange={handleAccountChange}
                  />
                </div>
              </div>
              
              <div className="grid gap-2 mt-4">
                <h3 className="text-lg font-medium">Security</h3>
                <div className="flex justify-between items-center">
                  <Button variant="outline">Change Password</Button>
                  <Button variant="outline">Enable Two-Factor Authentication</Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSaveChanges}>Save Changes</Button>
            </CardFooter>
          </Card>
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
                  <p className="font-medium">New Applicant Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive emails when candidates apply to your jobs.</p>
                </div>
                <Switch
                  checked={notificationSettings.emailApplicants}
                  onCheckedChange={() => handleNotificationToggle('emailApplicants')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Message Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive emails when candidates respond to your messages.</p>
                </div>
                <Switch
                  checked={notificationSettings.emailMessages}
                  onCheckedChange={() => handleNotificationToggle('emailMessages')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Platform Updates & News</p>
                  <p className="text-sm text-muted-foreground">Receive emails about new features and recruiting tips.</p>
                </div>
                <Switch
                  checked={notificationSettings.emailUpdates}
                  onCheckedChange={() => handleNotificationToggle('emailUpdates')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">SMS Alerts</p>
                  <p className="text-sm text-muted-foreground">Receive text messages for urgent notifications.</p>
                </div>
                <Switch
                  checked={notificationSettings.smsAlerts}
                  onCheckedChange={() => handleNotificationToggle('smsAlerts')}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSaveChanges}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Subscription Tab */}
        <TabsContent value="subscription">
          <Card>
            <CardHeader>
              <CardTitle>Subscription Management</CardTitle>
              <CardDescription>Manage your subscription and billing information.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="bg-muted p-4 rounded-md">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold">Current Plan: {subscriptionInfo.currentPlan}</h3>
                  <Button size="sm" variant="outline">Change Plan</Button>
                </div>
                <p className="text-sm">Next billing date: {subscriptionInfo.nextBillingDate}</p>
              </div>
              
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Auto-renew Subscription</p>
                    <p className="text-sm text-muted-foreground">Automatically renew your subscription when it expires.</p>
                  </div>
                  <Switch
                    checked={subscriptionInfo.autoRenew}
                    onCheckedChange={(checked) => handleSubscriptionToggle('autoRenew', checked)}
                  />
                </div>
              </div>
              
              <div className="grid gap-2 mt-4">
                <h3 className="text-lg font-medium">Payment Method</h3>
                <div className="bg-muted p-4 rounded-md flex justify-between items-center">
                  <div>
                    <p className="font-medium">Visa ending in 4242</p>
                    <p className="text-sm text-muted-foreground">Expires 09/2025</p>
                  </div>
                  <Button variant="outline" size="sm">Update</Button>
                </div>
              </div>
              
              <div className="grid gap-2 mt-4">
                <h3 className="text-lg font-medium">Billing History</h3>
                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Invoice</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Apr 15, 2023</TableCell>
                        <TableCell>$99.00</TableCell>
                        <TableCell>Paid</TableCell>
                        <TableCell className="text-right">
                          <Button variant="link" size="sm">Download</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Mar 15, 2023</TableCell>
                        <TableCell>$99.00</TableCell>
                        <TableCell>Paid</TableCell>
                        <TableCell className="text-right">
                          <Button variant="link" size="sm">Download</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Feb 15, 2023</TableCell>
                        <TableCell>$99.00</TableCell>
                        <TableCell>Paid</TableCell>
                        <TableCell className="text-right">
                          <Button variant="link" size="sm">Download</Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" className="text-destructive hover:bg-destructive/10">Cancel Subscription</Button>
              <Button onClick={handleSaveChanges}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Team Members Tab */}
        <TabsContent value="team">
          <Card>
            <CardHeader>
              <CardTitle>Team Management</CardTitle>
              <CardDescription>Manage team members who have access to your account.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {teamMembers.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell>{member.name}</TableCell>
                        <TableCell>{member.email}</TableCell>
                        <TableCell>{member.role}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            member.status === 'Active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {member.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">Edit</Button>
                          <Button variant="ghost" size="sm" className="text-destructive">Remove</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full md:w-auto">Invite Team Member</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Invite Team Member</DialogTitle>
                    <DialogDescription>
                      Add a new team member to your account. They will receive an email invitation.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name" 
                        value={newTeamMember.name}
                        onChange={(e) => handleNewTeamMemberChange('name', e.target.value)}
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email"
                        value={newTeamMember.email}
                        onChange={(e) => handleNewTeamMemberChange('email', e.target.value)}
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="role">Role</Label>
                      <Select 
                        defaultValue={newTeamMember.role}
                        onValueChange={(value) => handleNewTeamMemberChange('role', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Admin">Admin (Full access)</SelectItem>
                          <SelectItem value="Recruiter">Recruiter (Manage jobs & candidates)</SelectItem>
                          <SelectItem value="Hiring Manager">Hiring Manager (View & provide feedback)</SelectItem>
                          <SelectItem value="Viewer">Viewer (View only)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <Button type="submit" onClick={handleAddTeamMember}>Send Invitation</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage; 