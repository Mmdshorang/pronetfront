// stores/userStore.ts
import { GetUsersData, Profile } from '@/types/model/type';
import { create } from 'zustand';

interface UserStore extends GetUsersData {
  setUsers: (data: GetUsersData) => void;
  setProfiles: (profiles: Profile[]) => void;
  resetUsers: () => void;
}

const useUserStore = create<UserStore>((set) => ({
  users: [],
  total: 0,
  current_page: 1,
  per_page: 10,

  setUsers: (data) => set({ ...data }),

  setProfiles: (profiles) =>
    set({
      users: profiles,
      total: profiles.length,
      current_page: 1,
      per_page: 10,
    }),

  resetUsers: () =>
    set({
      users: [],
      total: 0,
      current_page: 1,
      per_page: 10,
    }),
}));

export default useUserStore;
