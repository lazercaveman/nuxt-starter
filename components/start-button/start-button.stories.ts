import type { Meta, StoryObj } from '@storybook/vue3';
import StarterButton from './StarterButton.vue';

const meta: Meta<typeof StarterButton> = {
  title: 'Sample/StarterButton',
  component: StarterButton,
  args: {},
  argTypes: {},
} satisfies Meta<typeof StarterButton>;

export default meta;

type Story = StoryObj<typeof StarterButton>;

export const Default: Story = {
  args: {},
} as Story;
