import { computed, watch } from 'vue';
import { useRoute } from 'vue-router';

export function useRouteParamStore<T>(
  paramName: string,
  store: { [key: string]: any },
  storeKey: string
) {
  const route = useRoute();

  const capitalizedKey =
    `current${String(storeKey).charAt(0).toUpperCase() + String(storeKey).slice(1)}` as const;

  watch(
    () => route.params[paramName],
    (newId) => {
      store[storeKey] = newId as string;
    },
    { immediate: true }
  );

  const data = computed(() => store[capitalizedKey]);

  return { data };
}
