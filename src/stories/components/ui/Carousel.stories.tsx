import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import Autoplay from "embla-carousel-autoplay"

const meta = {
  title: "UI/Carousel",
  component: Carousel,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Carousel>

export default meta
type Story = StoryObj<typeof Carousel>

const items = [
  {
    title: "Slide 1",
    description: "This is the first slide of the carousel.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
  },
  {
    title: "Slide 2",
    description: "This is the second slide of the carousel.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
  },
  {
    title: "Slide 3",
    description: "This is the third slide of the carousel.",
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
  },
]

export const Default: Story = {
  render: () => (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {items.map((item, index) => (
          <CarouselItem key={index}>
            <Card>
              <CardContent className="flex aspect-square items-center justify-center p-6">
                <div className="text-center">
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
}

export const WithImages: Story = {
  render: () => (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {items.map((item, index) => (
          <CarouselItem key={index}>
            <Card>
              <CardContent className="flex aspect-square items-center justify-center p-6">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover rounded-md"
                />
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
}

export const Vertical: Story = {
  render: () => (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full max-w-xs"
      orientation="vertical"
    >
      <CarouselContent className="-mt-2 h-[200px]">
        {items.map((item, index) => (
          <CarouselItem key={index} className="pt-2 md:basis-1/2 lg:basis-1/3">
            <Card>
              <CardContent className="flex aspect-square items-center justify-center p-6">
                <div className="text-center">
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
}

export const AutoPlay: Story = {
  render: () => (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full max-w-xs"
    >
      <CarouselContent>
        {items.map((item, index) => (
          <CarouselItem key={index}>
            <Card>
              <CardContent className="flex aspect-square items-center justify-center p-6">
                <div className="text-center">
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
  parameters: {
    docs: {
      description: {
        story: "This carousel has auto-play enabled and loops continuously.",
      },
    },
  },
}

export const WithDots: Story = {
  render: () => (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full max-w-xs"
    >
      <CarouselContent>
        {items.map((item, index) => (
          <CarouselItem key={index}>
            <Card>
              <CardContent className="flex aspect-square items-center justify-center p-6">
                <div className="text-center">
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
      <div className="flex justify-center gap-2 mt-4">
        {items.map((_, index) => (
          <button
            key={index}
            className="w-2 h-2 rounded-full bg-primary"
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </Carousel>
  ),
}

export const WithThumbnails: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Carousel className="w-full max-w-xs">
        <CarouselContent>
          {items.map((item, index) => (
            <CarouselItem key={index}>
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover rounded-md"
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="flex gap-2">
        {items.map((item, index) => (
          <button
            key={index}
            className="w-20 h-20 rounded-md overflow-hidden"
            aria-label={`Go to slide ${index + 1}`}
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  ),
}

export const Mobile: Story = {
  render: () => (
    <Carousel className="w-full">
      <CarouselContent>
        {items.map((item, index) => (
          <CarouselItem key={index}>
            <Card>
              <CardContent className="flex aspect-square items-center justify-center p-6">
                <div className="text-center">
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-4" />
      <CarouselNext className="right-4" />
    </Carousel>
  ),
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
}

export const DarkMode: Story = {
  render: () => (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {items.map((item, index) => (
          <CarouselItem key={index}>
            <Card>
              <CardContent className="flex aspect-square items-center justify-center p-6">
                <div className="text-center">
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
  parameters: {
    themes: {
      defaultTheme: "dark",
    },
  },
} 