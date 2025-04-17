import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import JobDetail from "@/pages/JobDetail";
import { BrowserRouter } from "react-router-dom";
import { jobs } from "@/data/jobs";

const meta: Meta<typeof JobDetail> = {
  title: "Pages/JobDetail",
  component: JobDetail,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof JobDetail>;

// Default state with a remote job
export const RemoteJob: Story = {
  parameters: {
    reactRouter: {
      routePath: "/job/:id",
      routeParams: { id: jobs[0].id },
    },
  },
};

// On-site job
export const OnSiteJob: Story = {
  parameters: {
    reactRouter: {
      routePath: "/job/:id",
      routeParams: { id: jobs[1].id },
    },
  },
};

// Job with salary
export const JobWithSalary: Story = {
  parameters: {
    reactRouter: {
      routePath: "/job/:id",
      routeParams: { id: jobs[2].id },
    },
  },
};

// Loading state
export const Loading: Story = {
  parameters: {
    reactRouter: {
      routePath: "/job/:id",
      routeParams: { id: "loading" },
    },
  },
};

// Not found state
export const NotFound: Story = {
  parameters: {
    reactRouter: {
      routePath: "/job/:id",
      routeParams: { id: "not-found" },
    },
  },
};

// Mobile view
export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
    reactRouter: {
      routePath: "/job/:id",
      routeParams: { id: jobs[0].id },
    },
  },
};

// Tablet view
export const Tablet: Story = {
  parameters: {
    viewport: {
      defaultViewport: "tablet",
    },
    reactRouter: {
      routePath: "/job/:id",
      routeParams: { id: jobs[0].id },
    },
  },
};

// Desktop view
export const Desktop: Story = {
  parameters: {
    viewport: {
      defaultViewport: "desktop",
    },
    reactRouter: {
      routePath: "/job/:id",
      routeParams: { id: jobs[0].id },
    },
  },
};

// Dark mode
export const DarkMode: Story = {
  parameters: {
    themes: {
      defaultTheme: "dark",
    },
    reactRouter: {
      routePath: "/job/:id",
      routeParams: { id: jobs[0].id },
    },
  },
}; 