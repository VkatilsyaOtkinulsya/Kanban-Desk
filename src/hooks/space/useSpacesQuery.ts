import { useQuery } from '@tanstack/vue-query';
import { SpacesService } from '@/services/spaces.service';
import { computed } from 'vue';
interface UseSpacesQuery {
  spaceid?: string;
}

export const useSpacesQuery = (spaceid?: UseSpacesQuery) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['spaces'],
    queryFn: () => SpacesService.getSpacesData(),
  });

  const space = computed(() => {
    return data.value?.find((space) => space.id === spaceid);
  });

  return {
    space,
    data,
    isLoading,
    error,
  };
};
