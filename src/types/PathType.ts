export const PATHS = {
  Root: '/',
  Login: '/login',
  Register: '/register',
  Dashboard: '/dashboard',
  Employees: '/employees',
  Companies: '/companies',
  Evaluations: '/evaluations',
  Search: '/search',
  Profile: '/profile',
  PublicProfile: '/profile/:id',
  Settings: '/settings',
  NotFound: '/404'
} as const;

export type PathType = typeof PATHS[keyof typeof PATHS]; 