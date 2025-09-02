import { ref, computed } from "vue";

const globalLoading = ref(false);
const loadingStates = ref<Record<string, boolean>>({});

export function useLoading(key?: string) {
  if (!key) {
    return {
      loading: globalLoading,
      startLoading: () => {
        globalLoading.value = true;
      },
      stopLoading: () => {
        globalLoading.value = false;
      },
      setLoading: (value: boolean) => {
        globalLoading.value = value;
      },
    };
  }

  const loading = computed({
    get: () => loadingStates.value[key] || false,
    set: (value: boolean) => {
      loadingStates.value[key] = value;
    },
  });

  const startLoading = () => {
    loadingStates.value[key] = true;
  };

  const stopLoading = () => {
    loadingStates.value[key] = false;
  };

  const setLoading = (value: boolean) => {
    loadingStates.value[key] = value;
  };

  return {
    loading,
    startLoading,
    stopLoading,
    setLoading,
  };
}

export function useGlobalLoading() {
  const isAnyLoading = computed(() => {
    return (
      globalLoading.value ||
      Object.values(loadingStates.value).some((state) => state)
    );
  });

  return {
    isAnyLoading,
    globalLoading,
    loadingStates: computed(() => loadingStates.value),
  };
}
