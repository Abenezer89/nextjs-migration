import type { Meta, StoryObj } from "@storybook/react";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

const meta = {
  title: "UI/Calendar",
  component: Calendar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
      />
    );
  },
};

export const WithRange: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
        numberOfMonths={2}
      />
    );
  },
};

export const MultipleMonths: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
        numberOfMonths={3}
      />
    );
  },
};

export const WithDisabledDays: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
        disabled={(date) =>
          date.getDay() === 0 || date.getDay() === 6 || date < new Date()
        }
      />
    );
  },
};

export const WithMinMaxDate: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
        fromDate={new Date(2024, 0, 1)}
        toDate={new Date(2024, 11, 31)}
      />
    );
  },
};

export const WithCustomStyles: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
        classNames={{
          day: "h-10 w-10 text-base",
          day_selected: "bg-blue-500 text-white hover:bg-blue-600",
          day_today: "bg-gray-100 text-gray-900",
        }}
      />
    );
  },
};

export const WithWeekNumbers: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
        showWeekNumber
      />
    );
  },
};

export const WithOutsideDays: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
        showOutsideDays={true}
      />
    );
  },
};

export const WithoutOutsideDays: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
        showOutsideDays={false}
      />
    );
  },
};

export const Mobile: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
        numberOfMonths={1}
      />
    );
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};

export const DarkMode: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
      />
    );
  },
  parameters: {
    themes: {
      defaultTheme: "dark",
    },
  },
}; 