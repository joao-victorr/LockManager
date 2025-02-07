// import { z } from 'zod';

// export type Group = {
//   id: string;
//   name: string;
// }



import { z } from 'zod';

export const GroupSchema = z.object({
  id: z.string(),
  name: z.string(),
});

// Inferindo o tipo Group
export type Group = z.infer<typeof GroupSchema>;