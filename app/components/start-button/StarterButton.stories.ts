import type { Meta, StoryObj } from '@storybook/vue3';
import StarterButton from './StarterButton.vue';

const meta: Meta<typeof StarterButton> = {
  title: 'Components/StarterButton',
  component: StarterButton,
  parameters: {
    docs: {
      description: {
        component: 'A demo navigation bar showcasing route-based linking, Pinia state mutation, and a server API call.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof StarterButton>;

export const Default: Story = {};
