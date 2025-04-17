import type { Meta, StoryObj } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'
import FeaturedJobs from '../../components/FeaturedJobs'
import { Job } from '@/types'

const meta = {
  title: 'Components/FeaturedJobs',
  component: FeaturedJobs,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
} satisfies Meta<typeof FeaturedJobs>

export default meta
type Story = StoryObj<typeof meta>

const sampleJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'Tech Solutions Inc.',
    location: 'New York, NY',
    remote: true,
    description: 'We are looking for a Senior Frontend Developer to join our team.',
    salary: '$120,000 - $150,000',
    jobType: 'Full-time',
    postedDate: '2 days ago',
    responsibilities: ['Build web applications', 'Lead team projects'],
    requirements: ['5+ years React experience', 'TypeScript expertise'],
    benefits: ['Health insurance', 'Remote work'],
    isFeatured: true,
    category: 'Engineering',
    experienceLevel: 'Senior',
  },
  {
    id: '2',
    title: 'Product Designer',
    company: 'Creative Studio',
    location: 'San Francisco, CA',
    remote: true,
    description: 'Join our design team to create beautiful user experiences.',
    salary: '$100,000 - $130,000',
    jobType: 'Full-time',
    postedDate: '1 day ago',
    responsibilities: ['Design user interfaces', 'Conduct user research'],
    requirements: ['3+ years UI/UX experience', 'Figma expertise'],
    benefits: ['Health insurance', 'Flexible hours'],
    isFeatured: true,
    category: 'Design',
    experienceLevel: 'Mid-Level',
  },
  {
    id: '3',
    title: 'DevOps Engineer',
    company: 'Cloud Systems',
    location: 'Austin, TX',
    remote: true,
    description: 'Help us build and maintain our cloud infrastructure.',
    salary: '$130,000 - $160,000',
    jobType: 'Full-time',
    postedDate: '3 days ago',
    responsibilities: ['Manage cloud infrastructure', 'Implement CI/CD'],
    requirements: ['AWS certification', 'Kubernetes experience'],
    benefits: ['Health insurance', '401(k) matching'],
    isFeatured: true,
    category: 'DevOps',
    experienceLevel: 'Senior',
  },
  {
    id: '4',
    title: 'Backend Developer',
    company: 'Data Corp',
    location: 'Remote',
    remote: true,
    description: 'Build scalable backend services.',
    salary: '$110,000 - $140,000',
    jobType: 'Full-time',
    postedDate: '4 days ago',
    responsibilities: ['Design APIs', 'Optimize database performance'],
    requirements: ['Node.js expertise', 'SQL experience'],
    benefits: ['Health insurance', 'Stock options'],
    isFeatured: false,
    category: 'Engineering',
    experienceLevel: 'Mid-Level',
  },
]

export const WithThreeFeatures: Story = {
  args: {
    jobs: sampleJobs,
  },
}

export const WithOneFeature: Story = {
  args: {
    jobs: sampleJobs.slice(0, 1),
  },
}

export const WithNoFeatures: Story = {
  args: {
    jobs: sampleJobs.filter(job => !job.isFeatured),
  },
} 