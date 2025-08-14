import type { SpaceType } from '@/types/space.types';
import type { ProjectType } from '@/types/project.types';
import { handleApiError } from '@/lib/utils/error-handler';
import axiosApiInstance from '@/api/api';
import { Space } from '@/models/space.model';
import { Project } from '@/models/project.model';

const DATABASE_URL = import.meta.env.VITE_DATABASE_URL;

export const SpacesService = {
  async getSpacesData(): Promise<Space[]> {
    try {
      const response = await axiosApiInstance.get<Space[]>(`${DATABASE_URL}/spaces.json`, {
        params: {
          auth: JSON.parse(localStorage.getItem('userTokens') || '{}').token,
        },
      });

      return response.data.map(
        (s: SpaceType) =>
          new Space(
            s.id,
            s.name,
            s.projects.map(
              (p: ProjectType) =>
                new Project(p.id, p.name, p.tasks, p.createdAt ? new Date(p.createdAt) : new Date())
            )
          )
      );
    } catch (err) {
      handleApiError(err, {
        context: 'Не удалось загрузить данные пространств',
      });
      throw err;
    }
  },
};
