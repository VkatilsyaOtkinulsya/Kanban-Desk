<script setup lang="ts">
import Tooltip from '@/components/ui/tooltip/Tooltip.vue'

interface Props {
  href: string
  style?: string
  label: string
  tooltipText: string
  isOpened: boolean
  isButton?: boolean
}

withDefaults(defineProps<Props>(), {
  isOpened: false,
  isButton: false,
})
</script>

<template>
  <a :href="href" class="footer__item" aria-describedby="link-tooltip" tabindex="0">
    <template v-if="isButton">
      <button class="logout__button">
        <div class="icon-wrapper">
          <slot name="icon"></slot>
        </div>
        <p v-show="isOpened">{{ label }}</p>
      </button>
      <Tooltip id="link-tooltip" :text="tooltipText" role="tooltip" position="right" />
    </template>
    <template v-else>
      <div class="icon-wrapper">
        <slot name="icon"></slot>
      </div>
      <p v-show="isOpened">{{ label }}</p>
      <Tooltip id="link-tooltip" :text="tooltipText" role="tooltip" position="right" />
    </template>
  </a>
</template>

<style scoped lang="scss">
.footer__item {
  display: flex;
  align-items: center;
  gap: 6px;
  height: 40px;
  min-width: 40px;
  padding: 0 6px;
  cursor: pointer;
  color: rgb(242, 242, 242);
  text-decoration: none;
  position: relative;

  &:hover {
    background: #333333;
    border-radius: 6px;
  }

  .icon-wrapper {
    display: flex;
    align-items: center;
    position: relative;

    svg {
      width: 20px;
      height: auto;
    }
  }

  p {
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
    white-space: nowrap;
    margin: 0;
  }

  &:not(.leftside-bar--collapsed) p {
    opacity: 1;
  }

  .logout__button {
    display: flex;
    align-items: center;
    gap: 6px;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    color: inherit;
  }
}

.leftside-bar--collapsed {
  .footer__item {
    justify-content: center;
    padding: 0;

    &:hover .tooltip,
    &:focus .tooltip {
      opacity: 1;
    }
  }
}
</style>
