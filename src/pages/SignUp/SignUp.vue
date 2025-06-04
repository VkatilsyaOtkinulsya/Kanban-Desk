<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import Input from '@/components/ui/input/Input.vue';
import Button from '@/components/ui/button/Button.vue';
import { reactive, ref } from 'vue';

const error = ref('');
const formData = reactive({
  email: '',
  password: '',
});

const authStore = useAuthStore();

const signup = async () => {
  error.value = '';
  try {
    const response = await authStore.signup({
      email: formData.email,
      password: formData.password,
    });
    console.log('Success:', response);
  } catch (err) {
    if (err instanceof Error) {
      console.error('Error:', err.message);
    }
  }
};
</script>

<template>
  <div class="form-wrapper">
    <h2 class="form-wrapper__title">Sign Up</h2>
    <form @submit.prevent="signup" class="auth-form">
      <p v-if="authStore.error" class="error">{{ authStore.error }}</p>
      <Input
        v-model="formData.email"
        type="email"
        placeholder="Your Email"
        class="auth-form__input"
      />
      <Input
        v-model="formData.password"
        type="password"
        placeholder="Password"
        class="auth-form__input"
      />
      <Button type="submit" class="auth-form__button">Sign up</Button>
      <span class="ans-text"
        >Are you already registered? <router-link to="/signin">Sign in</router-link></span
      >
    </form>
  </div>
</template>

<style scoped lang="scss">
.form-wrapper {
  display: flex;
  width: 50%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  gap: 15px;
  margin: 0 auto;

  .form-wrapper__title {
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
    font-size: 1.5rem;
  }

  .auth-form {
    display: flex;
    flex-direction: column;
    gap: 15px;

    .auth-form__input {
      width: auto;
      padding: 11px 14px;
      border: 1px solid rgb(229, 231, 235);
      border-radius: 6px;
      box-sizing: border-box;
    }

    .auth-form__button {
      padding: 11px 14px;
      border-radius: 57.5px;
    }
  }
}
</style>
