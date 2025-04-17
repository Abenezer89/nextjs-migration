import type { Meta, StoryObj } from "@storybook/react"
import { BarChart, LineChart, AreaChart, PieChart, Bar, Line, Area, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import type { ChartConfig } from "@/components/ui/chart"

const meta = {
  title: "UI/Chart",
  component: ChartContainer,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ChartContainer>

export default meta
type Story = StoryObj<typeof ChartContainer>

const data = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 600 },
  { name: "Apr", value: 800 },
  { name: "May", value: 500 },
  { name: "Jun", value: 700 },
]

const pieData = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
]

const chartConfig: ChartConfig = {
  value: {
    label: "Value",
    color: "hsl(var(--primary))",
  },
}

const LineChartContent = () => (
  <LineChart data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip content={<ChartTooltipContent />} />
    <Legend />
    <Line
      type="monotone"
      dataKey="value"
      stroke="hsl(var(--primary))"
      strokeWidth={2}
    />
  </LineChart>
)

const BarChartContent = () => (
  <BarChart data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip content={<ChartTooltipContent />} />
    <Legend />
    <Bar dataKey="value" fill="hsl(var(--primary))" />
  </BarChart>
)

const AreaChartContent = () => (
  <AreaChart data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip content={<ChartTooltipContent />} />
    <Legend />
    <Area
      type="monotone"
      dataKey="value"
      stroke="hsl(var(--primary))"
      fill="hsl(var(--primary))"
      fillOpacity={0.2}
    />
  </AreaChart>
)

const PieChartContent = () => (
  <PieChart>
    <Pie
      data={pieData}
      dataKey="value"
      nameKey="name"
      cx="50%"
      cy="50%"
      outerRadius={80}
      fill="hsl(var(--primary))"
      label
    >
      {pieData.map((entry, index) => (
        <Cell
          key={`cell-${index}`}
          fill={`var(--color-${entry.name.toLowerCase()})`}
        />
      ))}
    </Pie>
    <Tooltip content={<ChartTooltipContent />} />
    <Legend />
  </PieChart>
)

export const LineChartExample: Story = {
  args: {
    config: chartConfig,
    children: <LineChartContent />,
  },
  render: (args) => (
    <div className="w-[600px]">
      <ChartContainer {...args} />
    </div>
  ),
}

export const BarChartExample: Story = {
  args: {
    config: chartConfig,
    children: <BarChartContent />,
  },
  render: (args) => (
    <div className="w-[600px]">
      <ChartContainer {...args} />
    </div>
  ),
}

export const AreaChartExample: Story = {
  args: {
    config: chartConfig,
    children: <AreaChartContent />,
  },
  render: (args) => (
    <div className="w-[600px]">
      <ChartContainer {...args} />
    </div>
  ),
}

export const PieChartExample: Story = {
  args: {
    config: chartConfig,
    children: <PieChartContent />,
  },
  render: (args) => (
    <div className="w-[400px]">
      <ChartContainer {...args} />
    </div>
  ),
}

export const DarkMode: Story = {
  args: {
    config: chartConfig,
    children: <LineChartContent />,
  },
  parameters: {
    backgrounds: { default: "dark" },
    className: "dark",
  },
  render: (args) => (
    <div className="w-[600px] dark">
      <ChartContainer {...args} />
    </div>
  ),
} 