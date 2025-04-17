import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import SearchBar from '@/components/SearchBar'

const meta = {
  title: 'Components/SearchBar',
  component: SearchBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '800px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SearchBar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    onSearch: action('onSearch'),
  },
}

export const WithDarkBackground: Story = {
  args: {
    onSearch: action('onSearch'),
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
} 