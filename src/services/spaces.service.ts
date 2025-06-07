import axios, { AxiosError } from 'axios';
import type { SpacesData } from '@/types/content.ts';
import { ref } from 'vue';

const error = ref<string>('');

export const SpacesService = {
  async getSpacesData(): Promise<SpacesData> {
    try {
      const response = await axios.get(`
        https://jwt-tokens-firebase-add21-default-rtdb.europe-west1.firebasedatabase.app/spaces.json`);
      return response.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        error.value = err.message;
      }
      throw err;
    }
  },
};
