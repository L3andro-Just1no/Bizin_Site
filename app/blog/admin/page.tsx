import { redirect } from "next/navigation";

export default function BlogAdminDisabledPage() {
  redirect("/blog");
}
