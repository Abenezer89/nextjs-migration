import type { Meta, StoryObj } from '@storybook/react'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import Navbar from '../../components/Navbar'

const meta = {
  title: 'Components/Navbar',
  component: Navbar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
} satisfies Meta<typeof Navbar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile2',
    },
  },
}

export const WithDarkBackground: Story = {
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
}

export const WithActiveLink: Story = {
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/search']}>
        <Story />
      </MemoryRouter>
    ),
  ],
}

export const WithEmployerLink: Story = {
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/employer']}>
        <Story />
      </MemoryRouter>
    ),
  ],
} 