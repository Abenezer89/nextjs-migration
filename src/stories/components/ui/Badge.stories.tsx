import type { Meta, StoryObj } from "@storybook/react"
import { Badge } from "@/components/ui/badge"

const meta = {
  title: "UI/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof Badge>

export const Default: Story = {
  render: () => <Badge>Default</Badge>,
}

export const Secondary: Story = {
  render: () => <Badge variant="secondary">Secondary</Badge>,
}

export const Destructive: Story = {
  render: () => <Badge variant="destructive">Destructive</Badge>,
}

export const Outline: Story = {
  render: () => <Badge variant="outline">Outline</Badge>,
}

export const WithIcon: Story = {
  render: () => (
    <Badge className="flex items-center gap-1">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-3 w-3"
      >
        <path d="M12 2v20M2 12h20" />
      </svg>
      With Icon
    </Badge>
  ),
}

export const WithNumber: Story = {
  render: () => (
    <Badge className="flex items-center gap-1">
      <span>Notifications</span>
      <span className="rounded-full bg-background px-1.5 text-xs">3</span>
    </Badge>
  ),
}

export const DifferentSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Badge className="text-xs">Small</Badge>
      <Badge className="text-sm">Medium</Badge>
      <Badge className="text-base">Large</Badge>
    </div>
  ),
}

export const WithCustomColors: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Badge className="bg-purple-500 hover:bg-purple-600">Purple</Badge>
      <Badge className="bg-green-500 hover:bg-green-600">Green</Badge>
      <Badge className="bg-yellow-500 hover:bg-yellow-600">Yellow</Badge>
    </div>
  ),
}

export const WithBorder: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Badge className="border-2">Default Border</Badge>
      <Badge className="border-2 border-primary">Primary Border</Badge>
      <Badge className="border-2 border-destructive">Destructive Border</Badge>
    </div>
  ),
}

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge>Mobile</Badge>
      <Badge variant="secondary">View</Badge>
      <Badge variant="destructive">Example</Badge>
    </div>
  ),
}

export const DarkMode: Story = {
  parameters: {
    themes: {
      defaultTheme: "dark",
    },
  },
  render: () => (
    <div className="flex items-center gap-2">
      <Badge>Dark</Badge>
      <Badge variant="secondary">Mode</Badge>
      <Badge variant="destructive">Example</Badge>
    </div>
  ),
} 