import * as actions from "@/actions";
import PrimaryButton from "@/components/PrimaryButton";

export default function SignOut() {
  return (
    <form action={actions.signOut}>
      <PrimaryButton variant="faded" type="submit">Sign Out</PrimaryButton>
    </form>
  );
}