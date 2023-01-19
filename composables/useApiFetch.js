export const useApiFetch = async (request, opts) => {
  const config = useRuntimeConfig();

  return await $fetch(request, { baseURL: config.public.baseURL, ...opts });
};
