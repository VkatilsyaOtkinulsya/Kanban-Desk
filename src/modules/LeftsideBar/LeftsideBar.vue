<script setup lang="ts"></script>

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
      </div>
      <div class="navigation__sections-list">
        <div class="section-item__home">Главная</div>
        <div class="section-item__activity">Активность</div>
        <div class="section-item__settings">Настройки</div>
      </div>
    </div>
    <div class="leftside-bar-footer">
      <div class="footer__logout">Выйти</div>
      <div class="footer__helper">Помощь и начало работы</div>
      <div class="footer__version">Версия 1.0.0</div>
    </div>
  </aside>
</template>

<style scoped></style>
