<script setup lang="ts">
import { ref } from 'vue'

const isOpened = ref(false)
</script>

<template>
  <aside class="leftside-bar">
    <div class="leftside-bar-navigation">
      <div class="navigation__client">
        <a class="client__link">
          <div class="client__link-wrapper">
            <div class="client__link-icon">
              <img
                src="@/assets/images/client.jpg"
                alt="client"
                style="width: 28px; height: auto"
              />
            </div>
            <div class="client__link-name">Иван Романов</div>
          </div>
        </a>
        <div class="navigation__client-toggle">
          <span
            class="client__toggle-button"
            @click="isOpened = !isOpened"
            aria-describedby="toggle-tooltip"
            tabindex="0"
          >
            <img src="@/assets/toggle-icon.svg" alt="Toggle menu" />
          </span>
          <span id="toggle-tooltip" class="tooltip" role="tooltip">
            {{ isOpened ? 'Свернуть боковую панель' : 'Развернуть боковую панель' }}
          </span>
        </div>
      </div>
      <div class="navigation__sections">
        <div class="navigation__sections-list">
          <div class="section-item__home">Главная</div>
          <div class="section-item__activity">Активность</div>
          <div class="section-item__settings">Настройки</div>
        </div>
        div.contetn
      </div>
    </div>
    <div class="leftside-bar-footer">
      <div class="footer__logout">Выйти</div>
      <div class="footer__helper">Помощь и начало работы</div>
      <div class="footer__version">Версия 1.0.0</div>
    </div>
  </aside>
</template>

<style scoped>
.navigation__client {
  position: relative;

  .navigation__client-toggle {
    position: absolute;
    top: 5px;
    right: 5px;
    cursor: pointer;
    width: 30px;
    height: 30px;

    &:hover .tooltip,
    &:focus .tooltip {
      display: block;
    }

    .client__toggle-button {
      position: absolute;
      width: 100%;
      height: 100%;
    }
  }
}

.tooltip {
  display: none;
  position: absolute;
  top: 100%;
  transform: translateX(-50%);
  background: #333;
  color: #fff;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  z-index: 100;
  pointer-events: none;
}
</style>
