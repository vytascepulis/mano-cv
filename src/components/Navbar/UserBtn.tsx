import { useSession, signOut } from "next-auth/react";
import Button from "@/components/ui/Button";
import { formatSubdomainUrl } from "@/utils/subdomain";
import { useRef, useState } from "react";
import useClickOutside from "@/hooks/useClickOutside";
import {
  faArrowRightFromBracket,
  faGear,
  faGlobe,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { twMerge } from "tailwind-merge";
import { getGenericUserPhoto } from "@/utils/user";

interface MenuItem {
  id?: string;
  title: string;
  icon: IconDefinition;
  onClick?: () => void;
  href?: string;
  className?: string;
  target?: "_blank";
}

interface Props {
  hiddenIds?: MenuItem["id"][];
}

const MenuBtn = ({ item }: { item: MenuItem }) => {
  return (
    <a
      onClick={item.onClick}
      href={item.href}
      target={item.target}
      className={twMerge(
        item?.className,
        "text-dark flex w-full cursor-pointer items-center gap-2 px-4 py-3 font-semibold transition-colors hover:bg-violet-200",
      )}
    >
      <FontAwesomeIcon className="text-violet-900" icon={item.icon} size="lg" />
      {item.title}
    </a>
  );
};

const UserBtn = ({ hiddenIds = [] }: Props) => {
  const { data } = useSession();
  const refMenuElement = useRef<HTMLDivElement>(null);
  const refMenuButton = useRef<HTMLButtonElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleIsMenuOpen = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  useClickOutside({
    element: refMenuElement,
    callback: toggleIsMenuOpen,
    ignores: [refMenuButton],
  });

  if (!data?.user.subdomainSlug) {
    return null;
  }

  const menu: MenuItem[] = [
    {
      title: "Mano svetainė",
      icon: faGlobe,
      href: formatSubdomainUrl(data.user.subdomainSlug!),
      className: "block md:hidden",
      target: "_blank",
    },
    {
      id: "settings",
      title: "Nustatymai",
      icon: faGear,
      href: `${formatSubdomainUrl(data.user.subdomainSlug!)}/nustatymai`,
    },
    {
      title: "Atsijungti",
      icon: faArrowRightFromBracket,
      onClick: () => signOut(),
    },
  ];

  return (
    <div className="relative flex flex-row items-center gap-4">
      <Button
        className="hidden md:block"
        variant="link"
        href={formatSubdomainUrl(data.user.subdomainSlug)}
        target="_blank"
      >
        {data.user.subdomainSlug}
      </Button>
      <button
        className="outline-primary min-h-[35px] min-w-[35px] cursor-pointer overflow-hidden rounded-full outline-3"
        onClick={toggleIsMenuOpen}
        ref={refMenuButton}
      >
        <img
          alt={data.user.name!}
          src={data.user.image || getGenericUserPhoto()}
          className="h-[35px] object-contain"
        />
      </button>
      {isMenuOpen && (
        <div
          ref={refMenuElement}
          className="absolute top-[65px] right-0 z-[60] min-w-[180px] rounded-sm border-1 border-violet-200 bg-violet-100 shadow-sm lg:right-[-16px]"
        >
          {menu
            .filter((item) => !hiddenIds.includes(item.id))
            .map((item, idx) => (
              <MenuBtn item={item} key={idx} />
            ))}
        </div>
      )}
    </div>
  );
};

export default UserBtn;
