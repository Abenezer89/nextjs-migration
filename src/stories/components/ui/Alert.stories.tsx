import type { Meta, StoryObj } from "@storybook/react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal, AlertCircle } from "lucide-react"

const meta = {
  title: "UI/Alert",
  component: Alert,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof Alert>

export const Default: Story = {
  render: () => (
    <Alert>
      <Terminal className="h-4 w-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components and dependencies to your app using the cli.
      </AlertDescription>
    </Alert>
  ),
}

export const Destructive: Story = {
  render: () => (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Your session has expired. Please log in again.
      </AlertDescription>
    </Alert>
  ),
}

export const WithoutIcon: Story = {
  render: () => (
    <Alert>
      <AlertTitle>Notice</AlertTitle>
      <AlertDescription>
        This alert doesn't have an icon but still maintains proper spacing.
      </AlertDescription>
    </Alert>
  ),
}

export const CustomIcon: Story = {
  render: () => (
    <Alert>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
      >
        <path d="M12 2v20M2 12h20" />
      </svg>
      <AlertTitle>Custom Icon</AlertTitle>
      <AlertDescription>
        This alert uses a custom SVG icon instead of the default ones.
      </AlertDescription>
    </Alert>
  ),
}

export const LongContent: Story = {
  render: () => (
    <Alert>
      <Terminal className="h-4 w-4" />
      <AlertTitle>Important Update</AlertTitle>
      <AlertDescription>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      </AlertDescription>
    </Alert>
  ),
}

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
  render: () => (
    <Alert>
      <Terminal className="h-4 w-4" />
      <AlertTitle>Mobile Alert</AlertTitle>
      <AlertDescription>
        This alert is optimized for mobile viewing.
      </AlertDescription>
    </Alert>
  ),
}

export const DarkMode: Story = {
  parameters: {
    themes: {
      defaultTheme: "dark",
    },
  },
  render: () => (
    <Alert>
      <Terminal className="h-4 w-4" />
      <AlertTitle>Dark Mode Alert</AlertTitle>
      <AlertDescription>
        This alert is styled for dark mode.
      </AlertDescription>
    </Alert>
  ),
} 