<script setup lang="ts">
import NavItem from '@/components/ui/sidebar-item/NavItem.vue';
import Tooltip from '@/components/ui/tooltip/Tooltip.vue';
import FooterItem from '@/components/ui/sidebar-item/FooterItem.vue';
import Modal from '@/components/ui/modal/Modal.vue';
import { ref } from 'vue';
import SpaceIcon from '@/components/icons/SpaceIcon.vue';
import MainIcon from '@/components/icons/MainIcon.vue';
import ActivityIcon from '@/components/icons/ActivityIcon.vue';
import HelpIcon from '@/components/icons/HelpIcon.vue';
import Loader from '@/components/ui/loader/Loader.vue';
import type { SpacesData } from '@/types/content';
import SpaceItem from '@/components/ui/sidebar-item/SpaceItem.vue';

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
            <svg
              data-v-d3930520=""
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              :style="{
                transform: isOpened ? 'rotate(0deg)' : 'rotate(180deg)',
              }"
            >
              <path
                data-v-d3930520=""
                d="M23.7523 18.0403C24.0859 18.3549 24.0821 18.8615 23.7437 19.1717L23.4478 19.4429C23.1114 19.7513 22.5705 19.7498 22.2362 19.4395L18.0628 15.5662C17.726 15.2537 17.726 14.7463 18.0628 14.4337L22.2362 10.5605C22.5705 10.2502 23.1114 10.2487 23.4478 10.5571L23.7437 10.8283C24.0821 11.1385 24.0859 11.6451 23.7523 11.9597L21.1238 14.4383C20.7935 14.7498 20.7935 15.2502 21.1238 15.5617L23.7523 18.0403ZM5 9.8C5 9.35817 5.38516 9 5.86029 9H18.1193C18.5945 9 18.9796 9.35817 18.9796 9.8V10.2C18.9796 10.6418 18.5945 11 18.1193 11H5.86028C5.38516 11 5 10.6418 5 10.2V9.8ZM5.86028 16C5.38516 16 5 15.6418 5 15.2V14.8C5 14.3582 5.38516 14 5.86029 14H14.8933C15.3684 14 15.7536 14.3582 15.7536 14.8V15.2C15.7536 15.6418 15.3684 16 14.8933 16H5.86028ZM5.86028 21C5.38516 21 5 20.6418 5 20.2V19.8C5 19.3582 5.38516 19 5.86029 19H18.1193C18.5945 19 18.9796 19.3582 18.9796 19.8V20.2C18.9796 20.6418 18.5945 21 18.1193 21H5.86028Z"
                fill="currentColor"
                fill-opacity="0.65"
              ></path>
            </svg>
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
        <template #icon> </template>
      </FooterItem>
    </div>
  </aside>
</template>

<style scoped lang="scss">
@use './LeftsideBar.module';
</style>
