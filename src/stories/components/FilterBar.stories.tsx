import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import FilterBar from '../../components/FilterBar'
import { JobFilter } from '@/types'

const meta = {
  title: 'Components/FilterBar',
  component: FilterBar,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FilterBar>

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
  },
}

export const WithSomeFilters: Story = {
  args: {
    onFilterChange: action('onFilterChange'),
    activeFilters: someFilters,
  },
}

export const WithAllFilters: Story = {
  args: {
    onFilterChange: action('onFilterChange'),
    activeFilters: allFilters,
  },
}

export const Mobile: Story = {
  args: {
    onFilterChange: action('onFilterChange'),
    activeFilters: emptyFilters,
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
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
} 