import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '@/components/ui/button'

const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <Button>Click me</Button>,
}

export const Secondary: Story = {
  render: () => <Button variant="secondary">Secondary</Button>,
}

export const Destructive: Story = {
  render: () => <Button variant="destructive">Delete</Button>,
}

export const Outline: Story = {
  render: () => <Button variant="outline">Outline</Button>,
}

export const Ghost: Story = {
  render: () => <Button variant="ghost">Ghost</Button>,
}

export const Link: Story = {
  render: () => <Button variant="link">Link</Button>,
}

export const WithIcon: Story = {
  render: () => (
    <Button>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </svg>
      Next
    </Button>
  ),
}

export const IconOnly: Story = {
  render: () => (
    <Button size="icon" variant="outline">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    </Button>
  ),
}

export const DifferentSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon">👋</Button>
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button disabled>Default</Button>
      <Button disabled variant="secondary">Secondary</Button>
      <Button disabled variant="destructive">Destructive</Button>
      <Button disabled variant="outline">Outline</Button>
      <Button disabled variant="ghost">Ghost</Button>
      <Button disabled variant="link">Link</Button>
    </div>
  ),
}

export const Loading: Story = {
  render: () => (
    <Button disabled>
      <svg
        className="mr-2 h-4 w-4 animate-spin"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      Loading...
    </Button>
  ),
}

export const Mobile: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Button size="lg" className="w-full">
        Full Width Button
      </Button>
      <Button size="lg">Regular Button</Button>
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
}

export const DarkMode: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
  parameters: {
    themes: {
      defaultTheme: "dark",
    },
  },
} 