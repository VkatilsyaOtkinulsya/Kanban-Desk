<script setup lang="ts">
import NavItem from '@/components/ui/sidebar-item/NavItem.vue';
import Tooltip from '@/components/ui/tooltip/Tooltip.vue';
import FooterItem from '@/components/ui/sidebar-item/FooterItem.vue';
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
import { defineAsyncComponent, ref } from 'vue';

import type { Space } from '@/types/contentTypes';

const Modal = defineAsyncComponent(() => import('@/components/ui/modal/Modal.vue'));

defineProps<{
  spaces: Space[];
  showLoader: Boolean;
  userName: string;
}>();

const isOpened = ref(true);
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
          <div v-if="isOpened" class="client__link-name">{{ userName }}</div>
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
          <NavItem href="/main" label="Главная" tooltipText="Главная" :isOpened>
            <MainIcon />
          </NavItem>
          <NavItem href="/activity" label="Активность" tooltipText="Активность" :isOpened>
            <ActivityIcon />
          </NavItem>
        </div>
        <div class="content__wrapper">
          <div class="content__space-list">
            <div v-if="isOpened" class="space-list__title">Все пространства</div>
            <div class="space-list__add-space">
              <button
                id="add-space-button show-modal"
                @click="showModal = true"
                class="add-space__button"
              >
                <div class="add-icon"></div>
                <p v-if="isOpened">Добавить пространство</p>
              </button>
              <Teleport to="body">
                <Modal type="create" :show="showModal" @close="showModal = false"> </Modal>
              </Teleport>
            </div>
            <Loader v-if="showLoader" color="#fff" />
            <div v-else>
              <router-link
                v-for="(space, index) in spaces"
                :key="space.id"
                :to="{ name: 'space-projects', params: { spaceId: index } }"
              >
                <SpaceItem :space :isOpened>
                  <template #icon>
                    <SpaceIcon />
                  </template>
                  <template #label> {{ space.name }} </template>
                </SpaceItem>
              </router-link>
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
      <router-link to="/signin">
        <FooterItem href="#" label="Выйти" tooltipText="Выйти" :is-opened :isButton="true">
          <template #icon>
            <SignoutIcon />
          </template>
        </FooterItem>
      </router-link>
    </div>
  </aside>
</template>

<style scoped lang="scss">
@use './LeftsideBar.module';
</style>
