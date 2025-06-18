import axios from 'axios';
import type { ProjectsData, Space } from '@/types/contentTypes';
import { handleApiError } from '@/utils/error-handler';

export const SpacesService = {
  async getSpacesData(): Promise<Space[]> {
    try {
      const response = await axios.get(`
        https://jwt-tokens-firebase-add21-default-rtdb.europe-west1.firebasedatabase.app/spaces.json`);
      return response.data;
    } catch (err) {
      handleApiError(err, {
        context: 'Не удалось загрузить данные пространств',
      });
      throw err;
    }
  },

  async getProjects(path: string): Promise<ProjectsData> {
    try {
      const response = await axios.get(
        `https://jwt-tokens-firebase-add21-default-rtdb.europe-west1.firebasedatabase.app/spaces/${path}/projects.json`
      );
      return response.data;
    } catch (err) {
      handleApiError(err, {
        context: 'Не удалось загрузить данные пространств',
      });
      throw err;
    }
  },
};
