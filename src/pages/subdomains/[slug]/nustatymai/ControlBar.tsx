import Toggle from "@/components/ui/Toggle";
import Button from "@/components/ui/Button";
import { useSettings } from "@/contexts/SettingsContext";
import { SubdomainStatus, UserStatus } from "@/types/enums";
import { formatSubdomainUrl } from "@/utils/subdomain";
import { useSession } from "next-auth/react";
import { twMerge } from "tailwind-merge";

const ControlBar = () => {
  const {
    isEditing,
    isSaveLoading,
    isSubdomainStatusLoading,
    toggleIsEditing,
    handleSaveSettings,
    settings,
    handleSetActive,
    isSubdomainToggleDisabled,
  } = useSettings();
  const { data } = useSession();

  if (settings.userStatus === UserStatus.BLOCKED) return null;

  const isSubdomainActive = settings.subdomainStatus === SubdomainStatus.ACTIVE;

  return (
    <div className="bg-dark text-light sticky top-0 z-50 mt-2 flex flex-col items-start justify-between gap-4 px-5 py-4 shadow-md sm:flex-row sm:items-center lg:top-[5px] lg:mx-5 lg:mt-5 lg:rounded-lg">
      <div className={twMerge("flex h-[34px] flex-row gap-3 rounded-lg")}>
        <Toggle
          disabled={isSubdomainToggleDisabled}
          checked={isSubdomainActive}
          onChange={handleSetActive}
          label={`Svetainė ${isSubdomainActive ? "rodoma" : "paslėpta"}`}
          loading={isSubdomainStatusLoading}
        />
        {isSubdomainActive && !isSubdomainStatusLoading && (
          <Button
            variant="outline"
            color="light"
            href={formatSubdomainUrl(data?.user.subdomainSlug ?? "")}
            target="_blank"
          >
            Peržiūrėti
          </Button>
        )}
      </div>
      {!isEditing && <Button onClick={toggleIsEditing}>Redaguoti</Button>}
      {isEditing && (
        <div className="flex gap-3 md:flex-row-reverse">
          <Button
            variant="outline"
            onClick={toggleIsEditing}
            disabled={isSaveLoading}
          >
            Atšaukti
          </Button>
          <Button onClick={handleSaveSettings} loading={isSaveLoading}>
            Išsaugoti
          </Button>
        </div>
      )}
    </div>
  );
};

export default ControlBar;
