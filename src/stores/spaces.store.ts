import { defineStore } from 'pinia';
import { SpacesService } from '@/services/spaces.service';
import { Space } from '@/models/space.model';
import { Project } from '@/models/project.model';
import { handleApiError } from '@/lib/utils/error-handler';

export const useSpacesStore = defineStore('spaces', {
  state: () => ({
    spaces: [] as Space[],
    currentSpaceId: null as string | null,
  }),

  getters: {
    currentProjects(): Project[] {
      const space = this.spaces.find((s) => s.id === this.currentSpaceId);
      return space?.projects || [];
    },
  },

  actions: {
    async loadSpace() {
      try {
        this.spaces = await SpacesService.getSpacesData();
      } catch (err) {
        handleApiError(err, { context: 'Не удалось загрузить данные пространств' });
      }
    },

    async addProject(projectName: string) {
      const space = this.spaces.find((s) => s.id === this.currentSpaceId);
      if (!space) return;

      const newProject = new Project('123123', projectName, [], new Date());
      space.addProject(newProject);

      // await SpacesService.updateSpace(space.toJSON());
    },
  },
});
