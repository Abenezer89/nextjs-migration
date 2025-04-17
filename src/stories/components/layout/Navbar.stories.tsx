import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Navbar from "@/components/Navbar";
import { BrowserRouter } from "react-router-dom";

const meta: Meta<typeof Navbar> = {
  title: "Layout/Navbar",
  component: Navbar,
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
type Story = StoryObj<typeof Navbar>;

// Default state (not logged in) - shows public navigation
export const Public: Story = {
  args: {
    isLoggedIn: false,
    isEmployer: false,
  },
};

// Job Seeker logged in - shows public + job seeker navigation
export const JobSeekerLoggedIn: Story = {
  args: {
    isLoggedIn: true,
    isEmployer: false,
  },
};

// Employer logged in - shows public + employer navigation
export const EmployerLoggedIn: Story = {
  args: {
    isLoggedIn: true,
    isEmployer: true,
  },
};

// Mobile view - public navigation
export const MobilePublic: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
  args: {
    isLoggedIn: false,
    isEmployer: false,
  },
};

// Mobile view - job seeker
export const MobileJobSeeker: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
  args: {
    isLoggedIn: true,
    isEmployer: false,
  },
};

// Mobile view - employer
export const MobileEmployer: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
  args: {
    isLoggedIn: true,
    isEmployer: true,
  },
};

// Tablet view
export const Tablet: Story = {
  parameters: {
    viewport: {
      defaultViewport: "tablet",
    },
  },
  args: {
    isLoggedIn: false,
    isEmployer: false,
  },
};

// Desktop view
export const Desktop: Story = {
  parameters: {
    viewport: {
      defaultViewport: "desktop",
    },
  },
  args: {
    isLoggedIn: false,
    isEmployer: false,
  },
};

// Dark mode - public navigation
export const DarkModePublic: Story = {
  parameters: {
    themes: {
      defaultTheme: "dark",
    },
  },
  args: {
    isLoggedIn: false,
    isEmployer: false,
  },
};

// Dark mode - job seeker
export const DarkModeJobSeeker: Story = {
  parameters: {
    themes: {
      defaultTheme: "dark",
    },
  },
  args: {
    isLoggedIn: true,
    isEmployer: false,
  },
};

// Dark mode - employer
export const DarkModeEmployer: Story = {
  parameters: {
    themes: {
      defaultTheme: "dark",
    },
  },
  args: {
    isLoggedIn: true,
    isEmployer: true,
  },
}; 