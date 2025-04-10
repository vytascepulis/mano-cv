import { useSession } from "next-auth/react";
import Button from "@/components/ui/Button";
import { formatSubdomainUrl } from "@/utils/subdomain";

const UserBtn = () => {
  const { data } = useSession();

  if (!data?.user.subdomainSlug) {
    return null;
  }

  return (
    <div className="flex flex-row items-center gap-4">
      <Button
        variant="link"
        href={formatSubdomainUrl(data.user.subdomainSlug)}
        target="_blank"
      >
        {data.user.subdomainSlug}.mano-cv.lt
      </Button>
      <button className="cursor-pointer">
        <img
          alt={data.user.name!}
          src={data.user.image!}
          className="h-[35px] rounded-full object-contain"
        />
      </button>
    </div>
  );
};

export default UserBtn;
