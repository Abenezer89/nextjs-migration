import type { Meta, StoryObj } from "@storybook/react";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const meta = {
  title: "UI/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <Button>Action</Button>
      </CardFooter>
    </Card>
  ),
};

export const WithImage: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Product Card</CardTitle>
        <CardDescription>High-quality product description</CardDescription>
      </CardHeader>
      <CardContent>
        <img
          src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
          alt="Product"
          className="w-full h-48 object-cover rounded-md"
        />
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <span className="text-lg font-semibold">$99.99</span>
        <Button>Add to Cart</Button>
      </CardFooter>
    </Card>
  ),
};

export const WithLongContent: Story = {
  render: () => (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Blog Post</CardTitle>
        <CardDescription>Posted on January 1, 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
          velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
          occaecat cupidatat non proident, sunt in culpa qui officia deserunt
          mollit anim id est laborum.
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="outline">Read More</Button>
      </CardFooter>
    </Card>
  ),
};

export const WithGrid: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[1, 2, 3].map((i) => (
        <Card key={i}>
          <CardHeader>
            <CardTitle>Card {i}</CardTitle>
            <CardDescription>Description for card {i}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Content for card {i}</p>
          </CardContent>
          <CardFooter>
            <Button>Action {i}</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  ),
};

export const WithCustomStyles: Story = {
  render: () => (
    <Card className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
      <CardHeader>
        <CardTitle className="text-white">Premium Card</CardTitle>
        <CardDescription className="text-white/80">
          Special styled card example
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>This card has custom gradient background and text colors.</p>
      </CardContent>
      <CardFooter>
        <Button variant="secondary">Learn More</Button>
      </CardFooter>
    </Card>
  ),
};

export const WithHoverEffect: Story = {
  render: () => (
    <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
      <CardHeader>
        <CardTitle>Interactive Card</CardTitle>
        <CardDescription>Hover over me!</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This card has hover effects for better interactivity.</p>
      </CardContent>
      <CardFooter>
        <Button>Try it out</Button>
      </CardFooter>
    </Card>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
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
            <path d="M12 2v20M2 12h20" />
          </svg>
          Card with Icons
        </CardTitle>
        <CardDescription>Using icons in card components</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This card demonstrates the use of icons in different sections.</p>
      </CardContent>
      <CardFooter>
        <Button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
          Next
        </Button>
      </CardFooter>
    </Card>
  ),
};

export const Mobile: Story = {
  render: () => (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Mobile Card</CardTitle>
        <CardDescription>Optimized for mobile view</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This card is designed to work well on mobile devices.</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Full Width Button</Button>
      </CardFooter>
    </Card>
  ),
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};

export const DarkMode: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Dark Mode Card</CardTitle>
        <CardDescription>Styled for dark theme</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This card is optimized for dark mode viewing.</p>
      </CardContent>
      <CardFooter>
        <Button>Action</Button>
      </CardFooter>
    </Card>
  ),
  parameters: {
    themes: {
      defaultTheme: "dark",
    },
  },
}; 