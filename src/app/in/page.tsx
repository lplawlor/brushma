/**
 * Landing page after login, containing User information and a form for playlist generation.
 */
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import GenerationForm from "@/components/GenerationForm";
import UserInfo from "@/components/UserInfo";

export default async function In() {
  const session = await auth();

  // Redirect to homepage if no user is logged in
  if (!session?.user) {
    redirect("/");
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center font-light">
      <UserInfo user={session.user} />
      <GenerationForm />
    </div>
  )
}
