import type { Meta, StoryObj } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'
import JobPostingProgress from '../../../components/employer/JobPostingProgress'

const meta = {
  title: 'Components/Employer/JobPostingProgress',
  component: JobPostingProgress,
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
} satisfies Meta<typeof JobPostingProgress>

export default meta
type Story = StoryObj<typeof meta>

export const Step1: Story = {
  args: {
    currentStep: 1,
  },
}

export const Step2: Story = {
  args: {
    currentStep: 2,
  },
}

export const Step3: Story = {
  args: {
    currentStep: 3,
  },
}

export const Step4: Story = {
  args: {
    currentStep: 4,
  },
}

export const Step5: Story = {
  args: {
    currentStep: 5,
  },
}

export const WithJobId: Story = {
  args: {
    currentStep: 3,
    jobId: '123',
  },
}

export const CustomTotalSteps: Story = {
  args: {
    currentStep: 2,
    totalSteps: 4,
  },
}

export const Mobile: Story = {
  args: {
    currentStep: 3,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile2',
    },
  },
}

export const WithDarkBackground: Story = {
  args: {
    currentStep: 3,
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
} 