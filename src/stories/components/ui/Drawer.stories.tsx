import type { Meta, StoryObj } from "@storybook/react"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"

const meta: Meta<typeof Drawer> = {
  title: "UI/Drawer",
  component: Drawer,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof Drawer>

const DrawerDemo = () => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Are you sure?</DrawerTitle>
          <DrawerDescription>
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button variant="outline">Cancel</Button>
          <Button variant="destructive">Continue</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export const Default: Story = {
  render: () => <DrawerDemo />,
}

const DrawerWithLongContent = () => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Terms of Service</DrawerTitle>
          <DrawerDescription>
            Please read and accept our terms of service before continuing.
          </DrawerDescription>
        </DrawerHeader>
        <div className="max-h-[300px] overflow-y-auto p-4">
          <p className="text-sm text-muted-foreground">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
            ab illo inventore veritatis et quasi architecto beatae vitae dicta
            sunt explicabo.
          </p>
        </div>
        <DrawerFooter>
          <Button variant="outline">Decline</Button>
          <Button>Accept</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export const WithLongContent: Story = {
  render: () => <DrawerWithLongContent />,
}

const DrawerWithForm = () => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Create Account</DrawerTitle>
          <DrawerDescription>
            Fill in the form below to create your account.
          </DrawerDescription>
        </DrawerHeader>
        <form className="grid gap-4 p-4">
          <div className="grid gap-2">
            <label
              htmlFor="name"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Name
            </label>
            <input
              id="name"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <div className="grid gap-2">
            <label
              htmlFor="email"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        </form>
        <DrawerFooter>
          <Button variant="outline">Cancel</Button>
          <Button>Create Account</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export const WithForm: Story = {
  render: () => <DrawerWithForm />,
}

const DrawerWithCustomStyling = () => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent className="bg-blue-500 text-white">
        <DrawerHeader>
          <DrawerTitle className="text-white">Welcome!</DrawerTitle>
          <DrawerDescription className="text-white/70">
            This is a custom styled drawer.
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4">
          <p className="text-white/90">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        <DrawerFooter>
          <Button variant="outline" className="bg-white/10 text-white hover:bg-white/20">
            Cancel
          </Button>
          <Button className="bg-white text-blue-500 hover:bg-white/90">
            Continue
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export const WithCustomStyling: Story = {
  render: () => <DrawerWithCustomStyling />,
}

const DrawerWithIcon = () => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <div className="flex items-center gap-2">
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
              className="h-6 w-6 text-blue-500"
            >
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
            <DrawerTitle>Success!</DrawerTitle>
          </div>
          <DrawerDescription>
            Your changes have been saved successfully.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button>Close</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export const WithIcon: Story = {
  render: () => <DrawerWithIcon />,
}

const DrawerWithImage = () => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Image Preview</DrawerTitle>
          <DrawerDescription>
            This is a sample image preview in a drawer.
          </DrawerDescription>
        </DrawerHeader>
        <div className="relative aspect-video overflow-hidden p-4">
          <img
            src="https://picsum.photos/800/600"
            alt="Sample"
            className="rounded-lg object-cover"
          />
        </div>
        <DrawerFooter>
          <Button variant="outline">Close</Button>
          <Button>Download</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export const WithImage: Story = {
  render: () => <DrawerWithImage />,
}

const DrawerWithList = () => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Menu</DrawerTitle>
          <DrawerDescription>
            Select an option from the list below.
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4">
          <ul className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <li
                key={i}
                className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted"
              >
                <span>Option {i + 1}</span>
                <Button variant="ghost" size="icon">
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
                    className="h-4 w-4"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Button>
              </li>
            ))}
          </ul>
        </div>
        <DrawerFooter>
          <Button variant="outline">Close</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export const WithList: Story = {
  render: () => <DrawerWithList />,
}

export const Mobile: Story = {
  render: () => <DrawerDemo />,
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
}

export const DarkMode: Story = {
  render: () => <DrawerDemo />,
  parameters: {
    themes: {
      defaultTheme: "dark",
    },
  },
} 