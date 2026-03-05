import * as yup from "yup";
import { PostStatus } from "@/utils/models/posts";


export const formSchema = yup.object({
  status: yup.mixed<PostStatus>().oneOf(Object.values(PostStatus)).nullable().defined(),
});

export type FormSchemaType = yup.Asserts<typeof formSchema>;
