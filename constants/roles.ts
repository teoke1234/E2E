const ROLES = ['admin', 'userA', 'guest'] as const;

export type RoleType = typeof ROLES[number];