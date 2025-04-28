import { z } from 'zod';

export const SearchGroupSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().optional()
});

// export const includeFieldsGroupSchema = z.object({
//   groupsDevices: z.boolean().optional(),
//   accessRules: z.boolean().optional(),
//   usersGroups: z.boolean().optional(),
// })