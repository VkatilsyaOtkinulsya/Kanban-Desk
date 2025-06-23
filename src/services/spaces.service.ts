import type { ProjectsData, Space } from '@/types/contentTypes';
import { handleApiError } from '@/utils/error-handler';
import axiosApiInstance from '@/api/api';

const DATABASE_URL = import.meta.env.VITE_DATABASE_URL;

export const SpacesService = {
  async getSpacesData(): Promise<Space[]> {
    try {
      const response = await axiosApiInstance.get(
        `
      ${DATABASE_URL}/spaces.json`,
        {
          params: {
            auth: JSON.parse(localStorage.getItem('userTokens') || '{}').token,
          },
        }
      );
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
