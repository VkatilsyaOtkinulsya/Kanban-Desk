<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  text: string
  position?: 'top' | 'bottom' | 'left' | 'right' | 'custom'
  customPosition?: { [key: string]: string | number }
}

const props = withDefaults(defineProps<Props>(), {
  position: 'bottom',
})

const tooltipStyle = computed(() => {
  if (props.position === 'custom' && props.customPosition) {
    return props.customPosition
  }

  const styles: { [key: string]: { [key: string]: string } } = {
    top: {
      top: '110%',
      left: '50%',
      transform: 'translateX(-50%)',
    },
    bottom: {
      bottom: '110%',
      left: '50%',
      transform: 'translateX(-50%)',
    },
    left: {
      right: '110%',
      top: '50%',
      transform: 'translateY(-50%)',
    },
    right: {
      left: '110%',
      top: '50%',
      transform: 'translateY(-50%)',
    },
  }

  return styles[props.position] || styles.bottom
})
</script>

<template>
  <span class="tooltip" role="tooltip" :style="tooltipStyle">{{ text }}</span>
</template>

<style scoped lang="scss">
.tooltip {
  position: absolute;
  top: 110%;
  transform: translateX(-50%);
  background: #333;
  color: #fff;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  z-index: 100;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.tooltip[position='top']::before {
  border-top-color: #333;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
}

.tooltip[position='bottom']::before {
  border-bottom-color: #333;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
}

.tooltip[position='left']::before {
  border-left-color: #333;
  right: -10px;
  top: 50%;
  transform: translateY(-50%);
}

.tooltip[position='right']::before {
  border-right-color: #333;
  left: -10px;
  top: 50%;
  transform: translateY(-50%);
}
</style>
