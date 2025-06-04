<script setup lang="ts">
import NavItem from '@/components/ui/sidebar-item/NavItem.vue';
import Tooltip from '@/components/ui/tooltip/Tooltip.vue';
import FooterItem from '@/components/ui/sidebar-item/FooterItem.vue';
import Modal from '@/components/ui/modal/Modal.vue';
import { ref } from 'vue';

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
            <svg
              width="20"
              height="18"
              viewBox="0 0 20 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.3636 18H3.63636C3.39526 18 3.16403 17.9035 2.99354 17.7317C2.82305 17.5599 2.72727 17.3269 2.72727 17.0839V8.8389H0L9.3882 0.23852C9.5556 0.0850502 9.7737 0 10 0C10.2263 0 10.4444 0.0850502 10.6118 0.23852L20 8.8389H17.2727V17.0839C17.2727 17.3269 17.177 17.5599 17.0065 17.7317C16.836 17.9035 16.6047 18 16.3636 18ZM4.54545 16.1678H15.4545V7.1505L10 2.1541L4.54545 7.1505V16.1678Z"
                fill="currentColor"
              ></path>
            </svg>
          </NavItem>
          <NavItem href="/activity" label="Активность" tooltipText="Активность" :isOpened>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 612 612"
              width="20"
              height="20"
              fill="#cccccc"
            >
              <g>
                <g>
                  <g>
                    <path
                      d="M593.304,537.29H18.696C8.371,537.29,0,545.662,0,555.987c0,10.327,8.371,18.696,18.696,18.696h574.607 c10.325,0,18.696-8.37,18.696-18.696C612,545.663,603.629,537.29,593.304,537.29z"
                    />
                    <path
                      d="M593.304,324.232H454.736c-10.325,0-18.696,8.371-18.696,18.696v138.569c0,10.325,8.371,18.696,18.696,18.696h138.568 c10.325,0,18.696-8.371,18.696-18.696V342.928C612,332.603,603.629,324.232,593.304,324.232z M574.607,462.801H473.432V361.625 h101.175V462.801z"
                    />
                    <path
                      d="M18.696,500.194h138.568c10.325,0,18.696-8.371,18.696-18.696V234.776c0-10.325-8.371-18.696-18.696-18.696H18.696 C8.371,216.08,0,224.451,0,234.776v246.721C0,491.823,8.371,500.194,18.696,500.194z M37.393,253.473h101.175v209.328H37.393 V253.473z"
                    />
                    <path
                      d="M236.717,500.194h138.564c10.325,0,18.696-8.371,18.696-18.696V56.013c0-10.327-8.371-18.696-18.696-18.696H236.717 c-10.325,0-18.696,8.37-18.696,18.696v425.484C218.021,491.823,226.392,500.194,236.717,500.194z M255.413,74.71h101.172v388.092 H255.413L255.413,74.71L255.413,74.71z"
                    />
                  </g>
                </g>
              </g>
            </svg>
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-help-circle"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        </template>
      </FooterItem>
      <FooterItem href="#" label="Выйти" tooltipText="Выйти" :is-opened :isButton="true">
        <template #icon>
          <svg
            class="flex-none"
            width="20"
            height="20"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 2.75C2 1.784 2.784 1 3.75 1H6.25C6.44891 1 6.63968 1.07902 6.78033 1.21967C6.92098 1.36032 7 1.55109 7 1.75C7 1.94891 6.92098 2.13968 6.78033 2.28033C6.63968 2.42098 6.44891 2.5 6.25 2.5H3.75C3.6837 2.5 3.62011 2.52634 3.57322 2.57322C3.52634 2.62011 3.5 2.6837 3.5 2.75V13.25C3.5 13.388 3.612 13.5 3.75 13.5H6.25C6.44891 13.5 6.63968 13.579 6.78033 13.7197C6.92098 13.8603 7 14.0511 7 14.25C7 14.4489 6.92098 14.6397 6.78033 14.7803C6.63968 14.921 6.44891 15 6.25 15H3.75C3.28587 15 2.84075 14.8156 2.51256 14.4874C2.18437 14.1592 2 13.7141 2 13.25V2.75ZM12.44 7.25L10.47 5.28C10.3713 5.18833 10.2991 5.07173 10.2611 4.94248C10.2231 4.81323 10.2206 4.67612 10.254 4.54559C10.2874 4.41507 10.3553 4.29596 10.4507 4.20082C10.5461 4.10568 10.6654 4.03803 10.796 4.005C10.9264 3.97158 11.0633 3.97391 11.1925 4.01175C11.3217 4.04958 11.4383 4.12152 11.53 4.22L14.78 7.47C14.9205 7.61063 14.9993 7.80125 14.9993 8C14.9993 8.19875 14.9205 8.38937 14.78 8.53L11.53 11.78C11.4383 11.8787 11.3217 11.9509 11.1925 11.9889C11.0632 12.0269 10.9261 12.0294 10.7956 11.996C10.6651 11.9626 10.546 11.8947 10.4508 11.7993C10.3557 11.7039 10.288 11.5846 10.255 11.454C10.2216 11.3236 10.2239 11.1867 10.2617 11.0575C10.2996 10.9283 10.3715 10.8117 10.47 10.72L12.44 8.75H6.75C6.55109 8.75 6.36032 8.67098 6.21967 8.53033C6.07902 8.38968 6 8.19891 6 8C6 7.80109 6.07902 7.61032 6.21967 7.46967C6.36032 7.32902 6.55109 7.25 6.75 7.25H12.44Z"
              fill="currentColor"
            ></path>
          </svg>
        </template>
      </FooterItem>
    </div>
  </aside>
</template>

<style scoped lang="scss">
@use './LeftsideBar.module';
</style>
