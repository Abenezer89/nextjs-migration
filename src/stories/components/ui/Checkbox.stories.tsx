import type { Meta, StoryObj } from "@storybook/react"
import { Checkbox } from "@/components/ui/checkbox"

const meta: Meta<typeof Checkbox> = {
  title: "UI/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof Checkbox>

export const Default: Story = {
  args: {
    id: "terms",
  },
}

export const Checked: Story = {
  args: {
    id: "terms",
    checked: true,
  },
}

export const Disabled: Story = {
  args: {
    id: "terms",
    disabled: true,
  },
}

export const DisabledChecked: Story = {
  args: {
    id: "terms",
    disabled: true,
    checked: true,
  },
}

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Accept terms and conditions
      </label>
    </div>
  ),
}

export const WithDescription: Story = {
  render: () => (
    <div className="flex items-start space-x-2">
      <Checkbox id="terms" />
      <div className="grid gap-1.5 leading-none">
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Accept terms and conditions
        </label>
        <p className="text-sm text-muted-foreground">
          You agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  ),
}

export const WithCustomColors: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox
        id="custom"
        className="data-[state=checked]:bg-blue-500 data-[state=checked]:text-white"
      />
      <label
        htmlFor="custom"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Custom colored checkbox
      </label>
    </div>
  ),
}

export const WithCustomSize: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox
        id="large"
        className="h-6 w-6 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
      />
      <label
        htmlFor="large"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Large checkbox
      </label>
    </div>
  ),
}

export const Mobile: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="mobile" />
      <label
        htmlFor="mobile"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Mobile optimized
      </label>
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
    <div className="flex items-center space-x-2">
      <Checkbox id="dark" />
      <label
        htmlFor="dark"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Dark mode checkbox
      </label>
    </div>
  ),
  parameters: {
    themes: {
      defaultTheme: "dark",
    },
  },
} 