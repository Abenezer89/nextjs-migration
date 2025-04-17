import type { Meta, StoryObj } from "@storybook/react"
import { Home, Settings, Users, Bell, Search } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

const meta = {
  title: "UI/Sidebar",
  component: Sidebar,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div className="h-screen">
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
} satisfies Meta<typeof Sidebar>

export default meta
type Story = StoryObj<typeof meta>

const DemoContent = () => (
  <>
    <SidebarHeader>
      <SidebarTrigger />
      <div className="flex items-center gap-2 px-2">
        <img src="/logo.svg" alt="Logo" className="h-6 w-6" />
        <span className="font-semibold">BlueJobs</span>
      </div>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton isActive tooltip="Home">
                <Home />
                <span>Home</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Search">
                <Search />
                <span>Search Jobs</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Notifications">
                <Bell />
                <span>Notifications</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      <SidebarGroup>
        <SidebarGroupLabel>Account</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Profile">
                <Users />
                <span>Profile</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Settings">
                <Settings />
                <span>Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>
      <div className="px-2 py-2">
        <span className="text-xs text-muted-foreground">© 2024 BlueJobs</span>
      </div>
    </SidebarFooter>
  </>
)

export const Default: Story = {
  render: () => (
    <SidebarProvider defaultOpen>
      <Sidebar>
        <DemoContent />
      </Sidebar>
      <SidebarInset>
        <div className="p-6">
          <h1 className="text-2xl font-bold">Main Content</h1>
          <p className="mt-2">This is the main content area.</p>
        </div>
      </SidebarInset>
    </SidebarProvider>
  ),
}

export const Collapsed: Story = {
  render: () => (
    <SidebarProvider defaultOpen={false}>
      <Sidebar>
        <DemoContent />
      </Sidebar>
      <SidebarInset>
        <div className="p-6">
          <h1 className="text-2xl font-bold">Main Content</h1>
          <p className="mt-2">This is the main content area.</p>
        </div>
      </SidebarInset>
    </SidebarProvider>
  ),
}

export const RightSide: Story = {
  render: () => (
    <SidebarProvider defaultOpen>
      <Sidebar side="right">
        <DemoContent />
      </Sidebar>
      <SidebarInset>
        <div className="p-6">
          <h1 className="text-2xl font-bold">Main Content</h1>
          <p className="mt-2">This is the main content area.</p>
        </div>
      </SidebarInset>
    </SidebarProvider>
  ),
}

export const Floating: Story = {
  render: () => (
    <SidebarProvider defaultOpen>
      <Sidebar variant="floating">
        <DemoContent />
      </Sidebar>
      <SidebarInset>
        <div className="p-6">
          <h1 className="text-2xl font-bold">Main Content</h1>
          <p className="mt-2">This is the main content area.</p>
        </div>
      </SidebarInset>
    </SidebarProvider>
  ),
}

export const Inset: Story = {
  render: () => (
    <SidebarProvider defaultOpen>
      <Sidebar variant="inset">
        <DemoContent />
      </Sidebar>
      <SidebarInset>
        <div className="p-6">
          <h1 className="text-2xl font-bold">Main Content</h1>
          <p className="mt-2">This is the main content area.</p>
        </div>
      </SidebarInset>
    </SidebarProvider>
  ),
}

export const IconCollapsible: Story = {
  render: () => (
    <SidebarProvider defaultOpen>
      <Sidebar collapsible="icon">
        <DemoContent />
      </Sidebar>
      <SidebarInset>
        <div className="p-6">
          <h1 className="text-2xl font-bold">Main Content</h1>
          <p className="mt-2">This is the main content area.</p>
        </div>
      </SidebarInset>
    </SidebarProvider>
  ),
}

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
  render: () => (
    <SidebarProvider defaultOpen>
      <Sidebar>
        <DemoContent />
      </Sidebar>
      <SidebarInset>
        <div className="p-6">
          <h1 className="text-2xl font-bold">Main Content</h1>
          <p className="mt-2">This is the main content area.</p>
        </div>
      </SidebarInset>
    </SidebarProvider>
  ),
} 