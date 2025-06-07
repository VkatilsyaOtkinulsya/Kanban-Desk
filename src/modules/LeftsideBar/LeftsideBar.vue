<script setup lang="ts">
import NavItem from '@/components/ui/sidebar-item/NavItem.vue';
import Tooltip from '@/components/ui/tooltip/Tooltip.vue';
import FooterItem from '@/components/ui/sidebar-item/FooterItem.vue';
import Modal from '@/components/ui/modal/Modal.vue';
import Loader from '@/components/ui/loader/Loader.vue';
import SpaceItem from '@/components/ui/sidebar-item/SpaceItem.vue';
import {
  ActivityIcon,
  SpaceIcon,
  HelpIcon,
  SignoutIcon,
  MainIcon,
  ToggleIcon,
} from '@/components/icons/index.ts';
import { ref } from 'vue';

import type { SpacesData } from '@/types/content';

defineProps<{
  spaces: SpacesData;
  showLoader: Boolean;
}>();

const isOpened = ref(false);
const showModal = ref(false);

const toggleSidebar = () => {
  isOpened.value = !isOpened.value;
};
</script>

<template>
  <aside class="leftside-bar" :class="{ 'leftside-bar--collapsed': !isOpened }">
    <div class="leftside-bar-navigation">
      <a class="navigation__client">
        <div class="client__link-wrapper">
          <div class="client__link-icon">
            <img src="@/assets/images/client.jpg" alt="client" />
          </div>
          <div v-show="isOpened" class="client__link-name">Иван Романов</div>
        </div>
        <div class="navigation__client-toggle">
          <span
            class="client__toggle-button"
            @click="toggleSidebar"
            aria-describedby="toggle-tooltip"
            tabindex="0"
          >
            <ToggleIcon :isOpened />
          </span>
          <Tooltip
            id="toggle-tooltip"
            :text="isOpened ? 'Свернуть боковую панель' : 'Развернуть боковую панель'"
            role="tooltip"
            position="custom"
            :custom-position="{ left: isOpened ? '50%' : '210%' }"
          >
          </Tooltip>
        </div>
      </a>
      <div class="navigation__sections">
        <div class="navigation__sections-list">
          <NavItem href="/" label="Главная" tooltipText="Главная" :isOpened>
            <MainIcon />
          </NavItem>
          <NavItem href="/activity" label="Активность" tooltipText="Активность" :isOpened>
            <ActivityIcon />
          </NavItem>
        </div>
        <div class="content__wrapper">
          <div class="content__space-list">
            <div v-show="isOpened" class="space-list__title">Все пространства</div>
            <div class="space-list__add-space">
              <button
                id="add-space-button show-modal"
                @click="showModal = true"
                class="add-space__button"
              >
                <div class="add-icon"></div>
                <p v-show="isOpened">Добавить пространство</p>
              </button>
              <Teleport to="body">
                <Modal type="create" :show="showModal" @close="showModal = false"> </Modal>
              </Teleport>
            </div>
            <Loader v-if="showLoader" />
            <div v-else>
              <SpaceItem v-for="(space, key) in spaces" :key="key" :space :isOpened>
                <template #icon>
                  <SpaceIcon />
                </template>
                <template #label> {{ space.name }} </template>
              </SpaceItem>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="leftside-bar-footer">
      <FooterItem
        href="#"
        label="Помощь и начало работы"
        tooltipText="Помощь и начало работы"
        :is-opened
      >
        <template #icon>
          <HelpIcon />
        </template>
      </FooterItem>
      <FooterItem href="#" label="Выйти" tooltipText="Выйти" :is-opened :isButton="true">
        <template #icon>
          <SignoutIcon />
        </template>
      </FooterItem>
    </div>
  </aside>
</template>

<style scoped lang="scss">
@use './LeftsideBar.module';
</style>
