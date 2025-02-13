import z from 'zod';

export const ActivitySchema = z.object({
  activityName: z.string().min(3, "Activity name must be at least 3 characters long"),
  category: z.string().min(3, "Select a option or specify other"),
  about: z.string().min(10, "Activity description must be at least 10 characters long"),
  activityType: z.string().min(3, "Select a option"),
  locationType: z.string().min(3, "Select a option"),
  minMembers: z.number().int().positive().min(1, "Minimum members must be at least 1"),
  maxMembers: z.number().int().positive().max(10, "Maximum members must be at most 10 and at least 1"),
})