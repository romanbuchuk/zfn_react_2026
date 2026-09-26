import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createProject, listProjects } from './projectApi.js';

export const projectsQueryKey = ['projects'];

export function useProjects() {
  return useQuery({
    queryKey: projectsQueryKey,
    queryFn: ({ signal }) => listProjects({ signal }),
  });
}

export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProject,
    onSuccess: (createdProject) => {
      queryClient.setQueryData(projectsQueryKey, (current = []) => [
        createdProject,
        ...current,
      ]);
    },
  });
}
