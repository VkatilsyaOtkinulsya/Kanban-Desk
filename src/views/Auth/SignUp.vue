<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.store';
import Input from '@/components/ui/input/Input.vue';
import Button from '@/components/ui/button/Button.vue';
import { reactive } from 'vue';
import Loader from '@/components/ui/loader/Loader.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const authStore = useAuthStore();

const formData = reactive({
  email: '',
  password: '',
  firstName: '',
  lastName: '',
});

const handleSubmit = async () => {
  try {
    await authStore.register({
      email: formData.email,
      password: formData.password,
      firstName: formData.firstName,
      lastName: formData.lastName,
    });
    router.push('/signin');
  } catch (err) {
    if (err instanceof Error) {
      console.error('Error:', err.message);
    }
  }
};
</script>

<template>
  <div class="signup-page">
    <div class="signup__banner">
      <div class="banner__content">
        <div class="banner-logo"></div>
        <h2 class="banner-title">Добро пожаловать!</h2>
      </div>
    </div>
    <div class="form-wrapper">
      <h2 class="form-wrapper__title">Регистрация</h2>
      <form @submit.prevent="handleSubmit" class="auth-form">
        <p v-if="authStore.error" class="warn-message">{{ authStore.error }}</p>
        <Input
          v-model="formData.firstName"
          name="firstName"
          type="text"
          placeholder="Имя"
          class="auth-form__input"
          required
        />
        <Input
          v-model="formData.lastName"
          name="lastName"
          type="text"
          placeholder="Фамилия"
          class="auth-form__input"
          required
        />
        <Input
          v-model="formData.email"
          name="email"
          type="email"
          autocomplete="email"
          placeholder="Your Email"
          class="auth-form__input"
          required
        />
        <Input
          v-model="formData.password"
          name="password"
          type="password"
          placeholder="Password"
          class="auth-form__input"
          suggested="current-password"
          required
        />
        <Loader v-if="authStore.isLoading" color="#000" />
        <Button v-else type="submit" class="auth-form__button">Зарегистрироваться</Button>
        <span class="ans-text"
          >Вы уже зарегистрированы? <router-link to="/signin">Вход</router-link></span
        >
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use './Auth.module';

.signup__banner {
  width: 460px;
  height: 100%;
  background-color: #111012;
  box-sizing: border-box;

  .banner__content {
    padding: 150px 10px 0 80px;
    display: flex;
    flex-direction: column;

    .banner-logo {
    }
    .banner-title {
      font-family: 'Roboto', sans-serif;
      color: #fff;
    }
  }
}
</style>
