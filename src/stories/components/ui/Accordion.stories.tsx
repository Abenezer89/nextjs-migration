import type { Meta, StoryObj } from "@storybook/react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const meta = {
  title: "UI/Accordion",
  component: Accordion,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Accordion>

export default meta
type Story = StoryObj<typeof Accordion>

const DemoContent = () => (
  <Accordion type="single" collapsible className="w-full max-w-sm">
    <AccordionItem value="item-1">
      <AccordionTrigger>Is it accessible?</AccordionTrigger>
      <AccordionContent>
        Yes. It adheres to the WAI-ARIA design pattern.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-2">
      <AccordionTrigger>Is it styled?</AccordionTrigger>
      <AccordionContent>
        Yes. It comes with default styling that matches the other components.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-3">
      <AccordionTrigger>Is it animated?</AccordionTrigger>
      <AccordionContent>
        Yes. It uses Framer Motion for smooth animations.
      </AccordionContent>
    </AccordionItem>
  </Accordion>
)

export const Default: Story = {
  render: () => <DemoContent />,
}

export const Multiple: Story = {
  render: () => (
    <Accordion type="multiple" className="w-full max-w-sm">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styling that matches the other components.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It uses Framer Motion for smooth animations.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

export const CustomStyling: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-full max-w-sm">
      <AccordionItem value="item-1" className="border-none bg-muted/50 rounded-lg mb-2">
        <AccordionTrigger className="hover:no-underline">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary" />
            <span>Custom Styled Item</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="bg-muted/30 rounded-lg p-4">
          This accordion item has custom styling with a background color and rounded corners.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

export const WithIcons: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-full max-w-sm">
      <AccordionItem value="item-1">
        <AccordionTrigger className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-primary" />
          <span>Item with Icon</span>
        </AccordionTrigger>
        <AccordionContent>
          This accordion item has a custom icon indicator.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
  render: () => <DemoContent />,
}

export const DarkMode: Story = {
  parameters: {
    themes: {
      defaultTheme: "dark",
    },
  },
  render: () => <DemoContent />,
} 