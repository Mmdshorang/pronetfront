import { User, Skill, Achievement } from "@/types/server/user";
import { create } from "zustand";
import { persist } from "zustand/middleware";


interface UserInfoStore {
  isLoggedIn: boolean;
  user: User | null;
  token: string | null;
  addUser: (user: User, token: string) => void;
  clearUser: () => void;

  addSkill: (skill: Skill) => void;
  removeSkill: (skillId: number) => void;
  updateUserInfo: (updated: Partial<User>) => void; 
  addAchievement: (achievement: Achievement) => void;
  removeAchievement: (achievementId: number) => void;
}

export const useUserInfoStore = create<UserInfoStore>()(
  persist(
    (set, get) => ({
      isLoggedIn: false,
      user: null,
      token: null,

      addUser: (user, token) =>
        set(() => ({
          isLoggedIn: true,
          user,
          token,
        })),
        updateUserInfo: (updated) => {
          const { user } = get();
          if (!user) return;
        
          set(() => ({
            user: { ...user, ...updated }, // فقط مقادیر جدید رو merge می‌کنه
          }));
        },
      clearUser: () => {
        localStorage.clear();
        sessionStorage.clear();

        set(() => ({
          user: null,
          token: null,
          isLoggedIn: false,
        }));
      },

      addSkill: (skill) => {
        const { user } = get();
        if (!user) return;

        const updatedSkills = [...user.skills, skill];
        set(() => ({
          user: { ...user, skills: updatedSkills },
        }));
      },

      removeSkill: (skillId) => {
        const { user } = get();
        if (!user) return;

        const updatedSkills = user.skills.filter((s) => s.id !== skillId);
        set(() => ({
          user: { ...user, skills: updatedSkills },
        }));
      },

      addAchievement: (achievement) => {
        const { user } = get();
        if (!user) return;

        const updatedAchievements = [...user.achievements, achievement];
        set(() => ({
          user: { ...user, achievements: updatedAchievements },
        }));
      },

      removeAchievement: (achievementId) => {
        const { user } = get();
        if (!user) return;

        const updatedAchievements = user.achievements.filter((a) => a.id !== achievementId);
        set(() => ({
          user: { ...user, achievements: updatedAchievements },
        }));
      },
    }),
    {
      name: "User-storage",
      partialize: (state) => ({
        user: state.user,
        isLoggedIn: state.isLoggedIn,
        token: state.token,
      }),
    }
  )
);
