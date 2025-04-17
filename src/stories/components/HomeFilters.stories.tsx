import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import HomeFilters from '../../components/HomeFilters'
import { JobFilter } from '@/types'

const meta = {
  title: 'Components/HomeFilters',
  component: HomeFilters,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof HomeFilters>

export default meta
type Story = StoryObj<typeof meta>

const emptyFilters: JobFilter = {}

const someFilters: JobFilter = {
  jobType: 'Full-time',
  remote: true,
  category: 'Technology',
  experienceLevel: 'Senior',
}

const allFilters: JobFilter = {
  jobType: 'Full-time',
  remote: true,
  location: 'New York',
  postedDate: 'Last 24 hours',
  salary: '$100k+',
  category: 'Technology',
  experienceLevel: 'Senior',
}

export const NoFilters: Story = {
  args: {
    onFilterChange: action('onFilterChange'),
    activeFilters: emptyFilters,
    clearFilters: action('clearFilters'),
  },
}

export const WithSomeFilters: Story = {
  args: {
    onFilterChange: action('onFilterChange'),
    activeFilters: someFilters,
    clearFilters: action('clearFilters'),
  },
}

export const WithAllFilters: Story = {
  args: {
    onFilterChange: action('onFilterChange'),
    activeFilters: allFilters,
    clearFilters: action('clearFilters'),
  },
}

export const MobileNoFilters: Story = {
  args: {
    onFilterChange: action('onFilterChange'),
    activeFilters: emptyFilters,
    clearFilters: action('clearFilters'),
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile2',
    },
  },
}

export const MobileWithFilters: Story = {
  args: {
    onFilterChange: action('onFilterChange'),
    activeFilters: someFilters,
    clearFilters: action('clearFilters'),
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile2',
    },
  },
}

export const WithDarkBackground: Story = {
  args: {
    onFilterChange: action('onFilterChange'),
    activeFilters: someFilters,
    clearFilters: action('clearFilters'),
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
} 