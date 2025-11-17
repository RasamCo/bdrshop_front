// /lib/validation/(category)/UpdateCategoryRequestSchema.ts
import { z } from "zod";

export const UpdateCategoryRequestSchema = z.object({
  id: z.string(),
  parentId: z.string().nullable().optional(),
  name: z.string().min(2, "نام دسته بندی را وارد کنید."),
  slug: z.string().min(2, "slug را وارد کنید."),
  description: z.string().min(10, "توضیحات الزامی است."),
  icon: z.string().optional(),
  isactive: z.boolean(),     // ⬅️ اضافه شد و اجباری است
});

export type UpdateCategoryFormType = z.infer<typeof UpdateCategoryRequestSchema>;
