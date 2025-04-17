
import React, { useState } from 'react';
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
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const EditCompanyProfile = () => {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: "Acme Corporation",
    industry: "technology",
    size: "medium",
    founded: "2010",
    website: "https://acme.example.com",
    headquarters: "San Francisco, CA",
    about: "Acme Corporation is a leading technology company specializing in innovative solutions for businesses of all sizes.",
    mission: "To provide cutting-edge technology solutions that empower businesses to reach their full potential.",
    culture: "We foster a collaborative and inclusive environment where creativity and innovation thrive."
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogoUpload = () => {
    setUploading(true);
    // Simulate upload
    setTimeout(() => {
      setUploading(false);
      toast({
        title: "Logo uploaded",
        description: "Your company logo has been updated successfully."
      });
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate saving
    setTimeout(() => {
      toast({
        title: "Profile updated",
        description: "Your company profile has been updated successfully."
      });
    }, 500);
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Edit Company Profile</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 mb-8">
          {/* Company Logo */}
          <Card>
            <CardHeader>
              <CardTitle>Company Logo</CardTitle>
              <CardDescription>Upload your company logo. Recommended size: 400x400px.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="w-24 h-24 bg-gray-200 rounded-md flex items-center justify-center">
                  <span className="text-gray-500">Logo</span>
                </div>
                <Button onClick={handleLogoUpload} disabled={uploading}>
                  {uploading ? "Uploading..." : "Upload New Logo"}
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Update your company's basic details.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Company Name</Label>
                <Input 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="industry">Industry</Label>
                <Select 
                  defaultValue={formData.industry}
                  onValueChange={(value) => handleSelectChange("industry", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="size">Company Size</Label>
                <Select 
                  defaultValue={formData.size}
                  onValueChange={(value) => handleSelectChange("size", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select company size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">1-50 employees</SelectItem>
                    <SelectItem value="medium">51-200 employees</SelectItem>
                    <SelectItem value="large">201-1000 employees</SelectItem>
                    <SelectItem value="enterprise">1000+ employees</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="founded">Founded Year</Label>
                <Input 
                  id="founded" 
                  name="founded" 
                  value={formData.founded}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="website">Website</Label>
                <Input 
                  id="website" 
                  name="website" 
                  value={formData.website}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="headquarters">Headquarters</Label>
                <Input 
                  id="headquarters" 
                  name="headquarters" 
                  value={formData.headquarters}
                  onChange={handleInputChange}
                />
              </div>
            </CardContent>
          </Card>
          
          {/* Company Description */}
          <Card>
            <CardHeader>
              <CardTitle>Company Description</CardTitle>
              <CardDescription>Tell job seekers about your company.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="about">About the Company</Label>
                <Textarea 
                  id="about" 
                  name="about" 
                  rows={4}
                  value={formData.about}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="mission">Mission Statement</Label>
                <Textarea 
                  id="mission" 
                  name="mission" 
                  rows={3}
                  value={formData.mission}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="culture">Company Culture</Label>
                <Textarea 
                  id="culture" 
                  name="culture" 
                  rows={3}
                  value={formData.culture}
                  onChange={handleInputChange}
                />
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex justify-end gap-4">
          <Button variant="outline" type="button">Cancel</Button>
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </div>
  );
};

export default EditCompanyProfile;
