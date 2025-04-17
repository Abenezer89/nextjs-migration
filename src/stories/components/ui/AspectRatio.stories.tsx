import type { Meta, StoryObj } from "@storybook/react"
import { AspectRatio } from "@/components/ui/aspect-ratio"

const meta = {
  title: "UI/AspectRatio",
  component: AspectRatio,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof AspectRatio>

export default meta
type Story = StoryObj<typeof AspectRatio>

export const Default: Story = {
  render: () => (
    <div className="w-[450px]">
      <AspectRatio ratio={16 / 9} className="bg-muted">
        <div className="flex h-full items-center justify-center text-muted-foreground">
          16:9 Aspect Ratio
        </div>
      </AspectRatio>
    </div>
  ),
}

export const Square: Story = {
  render: () => (
    <div className="w-[300px]">
      <AspectRatio ratio={1} className="bg-muted">
        <div className="flex h-full items-center justify-center text-muted-foreground">
          1:1 Aspect Ratio
        </div>
      </AspectRatio>
    </div>
  ),
}

export const Portrait: Story = {
  render: () => (
    <div className="w-[300px]">
      <AspectRatio ratio={3 / 4} className="bg-muted">
        <div className="flex h-full items-center justify-center text-muted-foreground">
          3:4 Aspect Ratio
        </div>
      </AspectRatio>
    </div>
  ),
}

export const Landscape: Story = {
  render: () => (
    <div className="w-[300px]">
      <AspectRatio ratio={4 / 3} className="bg-muted">
        <div className="flex h-full items-center justify-center text-muted-foreground">
          4:3 Aspect Ratio
        </div>
      </AspectRatio>
    </div>
  ),
}

export const WithImage: Story = {
  render: () => (
    <div className="w-[450px]">
      <AspectRatio ratio={16 / 9}>
        <img
          src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80&fm=webp&fit=crop"
          alt="Photo by Drew Beamer"
          className="rounded-md object-cover"
        />
      </AspectRatio>
    </div>
  ),
}

export const WithVideo: Story = {
  render: () => (
    <div className="w-[450px]">
      <AspectRatio ratio={16 / 9}>
        <iframe
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="rounded-md"
        />
      </AspectRatio>
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
    <div className="w-full">
      <AspectRatio ratio={16 / 9} className="bg-muted">
        <div className="flex h-full items-center justify-center text-muted-foreground">
          Mobile View
        </div>
      </AspectRatio>
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
    <div className="w-[450px]">
      <AspectRatio ratio={16 / 9} className="bg-muted">
        <div className="flex h-full items-center justify-center text-muted-foreground">
          Dark Mode
        </div>
      </AspectRatio>
    </div>
  ),
} 