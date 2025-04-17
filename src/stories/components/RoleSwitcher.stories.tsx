import type { Meta, StoryObj } from '@storybook/react'
import { UserProvider } from '@/context/UserContext'
import RoleSwitcher from '../../components/RoleSwitcher'
import { UserRole } from '@/types/user'

const meta = {
  title: 'Components/RoleSwitcher',
  component: RoleSwitcher,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ minHeight: '200px', width: '300px', position: 'relative' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof RoleSwitcher>

export default meta
type Story = StoryObj<typeof meta>

const createUserContext = (role: UserRole, isLoggedIn: boolean) => ({
  user: {
    role,
    isLoggedIn,
  },
  setRole: () => {},
  login: () => {},
  logout: () => {},
})

export const AsJobSeeker: Story = {
  decorators: [
    (Story) => (
      <UserProvider>
        <Story />
      </UserProvider>
    ),
  ],
}

export const AsEmployer: Story = {
  decorators: [
    (Story) => (
      <UserProvider>
        <Story />
      </UserProvider>
    ),
  ],
  parameters: {
    userContext: createUserContext('EMPLOYER', true),
  },
}

export const LoggedOut: Story = {
  decorators: [
    (Story) => (
      <UserProvider>
        <Story />
      </UserProvider>
    ),
  ],
  parameters: {
    userContext: createUserContext('JOB_SEEKER', false),
  },
} 