<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import Input from '@/components/ui/input/Input.vue';
import Button from '@/components/ui/button/Button.vue';
import { reactive } from 'vue';
import Loader from '@/components/ui/loader/Loader.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const formData = reactive({
  email: '',
  password: '',
});

const authStore = useAuthStore();

const signup = async () => {
  try {
    await authStore.auth(
      {
        email: formData.email,
        password: formData.password,
      },
      'signup'
    );
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
    <div class="form-wrapper">
      <h2 class="form-wrapper__title">Регистрация</h2>
      <form @submit.prevent="signup" class="auth-form">
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
          required
        />
        <Loader v-if="authStore.loader" />
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
</style>
