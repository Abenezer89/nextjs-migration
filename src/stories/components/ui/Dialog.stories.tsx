import type { Meta, StoryObj } from "@storybook/react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

const meta: Meta<typeof Dialog> = {
  title: "UI/Dialog",
  component: Dialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof Dialog>

const DialogDemo = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button variant="destructive">Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export const Default: Story = {
  render: () => <DialogDemo />,
}

const DialogWithLongContent = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Terms of Service</DialogTitle>
          <DialogDescription>
            Please read and accept our terms of service before continuing.
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[300px] overflow-y-auto py-4">
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
        <DialogFooter>
          <Button variant="outline">Decline</Button>
          <Button>Accept</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export const WithLongContent: Story = {
  render: () => <DialogWithLongContent />,
}

const DialogWithForm = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Account</DialogTitle>
          <DialogDescription>
            Fill in the form below to create your account.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4 py-4">
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
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button>Create Account</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export const WithForm: Story = {
  render: () => <DialogWithForm />,
}

const DialogWithCustomStyling = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent className="bg-blue-500 text-white">
        <DialogHeader>
          <DialogTitle className="text-white">Welcome!</DialogTitle>
          <DialogDescription className="text-white/70">
            This is a custom styled dialog.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-white/90">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        <DialogFooter>
          <Button variant="outline" className="bg-white/10 text-white hover:bg-white/20">
            Cancel
          </Button>
          <Button className="bg-white text-blue-500 hover:bg-white/90">
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export const WithCustomStyling: Story = {
  render: () => <DialogWithCustomStyling />,
}

const DialogWithIcon = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
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
            <DialogTitle>Success!</DialogTitle>
          </div>
          <DialogDescription>
            Your changes have been saved successfully.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export const WithIcon: Story = {
  render: () => <DialogWithIcon />,
}

const DialogWithImage = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Image Preview</DialogTitle>
          <DialogDescription>
            This is a sample image preview in a dialog.
          </DialogDescription>
        </DialogHeader>
        <div className="relative aspect-video overflow-hidden rounded-lg">
          <img
            src="https://picsum.photos/800/600"
            alt="Sample"
            className="object-cover"
          />
        </div>
        <DialogFooter>
          <Button variant="outline">Close</Button>
          <Button>Download</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export const WithImage: Story = {
  render: () => <DialogWithImage />,
}

export const Mobile: Story = {
  render: () => <DialogDemo />,
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
}

export const DarkMode: Story = {
  render: () => <DialogDemo />,
  parameters: {
    themes: {
      defaultTheme: "dark",
    },
  },
} 