import type { Meta, StoryObj } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'
import JobCard from '../../components/JobCard'

const meta = {
  title: 'Components/JobCard',
  component: JobCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <BrowserRouter>
        <div style={{ maxWidth: '600px', width: '100%' }}>
          <Story />
        </div>
      </BrowserRouter>
    ),
  ],
} satisfies Meta<typeof JobCard>

export default meta
type Story = StoryObj<typeof meta>

const sampleJob = {
  id: '1',
  title: 'Senior Frontend Developer',
  company: 'Tech Solutions Inc.',
  location: 'New York, NY',
  remote: true,
  description: 'We are looking for a Senior Frontend Developer to join our team. The ideal candidate will have strong experience with React, TypeScript, and modern frontend development practices. You will be responsible for building and maintaining our web applications, collaborating with the design team, and mentoring junior developers.',
  salary: '$120,000 - $150,000',
  jobType: 'Full-time',
  postedDate: '2 days ago',
  responsibilities: [
    'Build and maintain web applications using React and TypeScript',
    'Collaborate with designers and backend developers',
    'Mentor junior developers and conduct code reviews',
    'Implement best practices and coding standards'
  ],
  requirements: [
    '5+ years of experience with React',
    'Strong TypeScript skills',
    'Experience with modern frontend development practices',
    'Excellent communication skills'
  ],
  benefits: [
    'Competitive salary and equity',
    'Health, dental, and vision insurance',
    'Flexible remote work options',
    '401(k) matching'
  ],
  category: 'Engineering',
  experienceLevel: 'Senior',
  isFeatured: true
}

export const Default: Story = {
  args: {
    job: sampleJob,
    compact: false,
  },
}

export const Compact: Story = {
  args: {
    job: sampleJob,
    compact: true,
  },
}

export const WithoutSalary: Story = {
  args: {
    job: {
      ...sampleJob,
      salary: undefined,
    },
    compact: false,
  },
}

export const NonRemote: Story = {
  args: {
    job: {
      ...sampleJob,
      remote: false,
    },
    compact: false,
  },
} 