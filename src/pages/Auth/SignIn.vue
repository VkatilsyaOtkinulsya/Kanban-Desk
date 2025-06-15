<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import Input from '@/components/ui/input/Input.vue';
import Button from '@/components/ui/button/Button.vue';
import { reactive } from 'vue';
import Loader from '@/components/ui/loader/Loader.vue';

const router = useRouter();

const formData = reactive({
  email: '',
  password: '',
});

const authStore = useAuthStore();

const signin = async () => {
  try {
    await authStore.auth(
      {
        email: formData.email,
        password: formData.password,
        firstName: '',
        lastName: '',
      },
      'signin'
    );
    router.push('/main');
  } catch (err) {
    if (err instanceof Error) {
      console.error('Error:', err.message);
    }
  }
};
</script>

<template>
  <div class="signup-page">
    <div class="form-wrapper">
      <h2 class="form-wrapper__title">Вход</h2>
      <form @submit.prevent="signin" class="auth-form">
        <p v-if="authStore.error" class="warn-message">{{ authStore.error }}</p>
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
        <Loader v-if="authStore.loader" />
        <Button v-else type="submit" class="auth-form__button">Войти</Button>
        <span class="ans-text"
          >Вы еще не зарегистрированы? <router-link to="/signup">Регистрация</router-link></span
        >
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use './Auth.module';
</style>
