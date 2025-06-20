import axios from 'axios';
import type { ProjectsData, Space } from '@/types/contentTypes';
import { handleApiError } from '@/utils/error-handler';

export const SpacesService = {
  async getSpacesData(): Promise<Space[]> {
    try {
      const response = await axios.get(`
        https://jwt-tokens-firebase-add21-default-rtdb.europe-west1.firebasedatabase.app/spaces.json`);
      const data = response.data;
      localStorage.setItem(
        'spaces',
        JSON.stringify({
          data,
        })
      );
      return response.data;
    } catch (err) {
      handleApiError(err, {
        context: 'Не удалось загрузить данные пространств',
      });
      throw err;
    }
  },

  getProjects(path: string): ProjectsData {
    try {
      const response = localStorage.getItem('spaces');
      if (!response) throw new Error('Не удалось загрузить данные пространств');

      const data = JSON.parse(response).data;
      const projects = data[+path].projects;

      return projects;
    } catch (err) {
      handleApiError(err, {
        context: 'Не удалось загрузить данные пространств',
      });
      throw err;
    }
  },
};
