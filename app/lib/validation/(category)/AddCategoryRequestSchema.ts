import z from "zod";

export const AddCategoryRequestSchema = z.object({
  parentId: z.string().optional(),
  name: z.string().min(1, "نام دسته بندی را وارد کنید."),
  slug: z.string().min(1, " را وارد کنید slug. "),
  description: z.string().optional(),
  icon: z.string().optional(),
});
export type AddCategoryFormType  = z.infer<typeof AddCategoryRequestSchema>;
