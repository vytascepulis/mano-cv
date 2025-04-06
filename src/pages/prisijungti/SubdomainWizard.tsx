import { useSession } from "next-auth/react";

const SubdomainWizard = () => {
  const { update } = useSession();
  return (
    <>
      init subdomain page{" "}
      <button onClick={() => update()}>update session</button>
    </>
  );
};

export default SubdomainWizard;
