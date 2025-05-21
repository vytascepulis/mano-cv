import Toggle from "@/components/ui/Toggle";
import Button from "@/components/ui/Button";
import { useSettings } from "@/contexts/SettingsContext";
import { SubdomainStatus, UserStatus } from "@/types/enums";

const ControlBar = () => {
  const {
    isEditing,
    isSaveLoading,
    toggleIsEditing,
    handleSaveSettings,
    settings,
    handleSetActive,
    isSubdomainToggleDisabled,
  } = useSettings();

  if (settings.userStatus === UserStatus.BLOCKED) return null;

  return (
    <div className="bg-dark text-light sticky top-0 z-50 mt-2 flex flex-col items-start justify-between gap-4 px-5 py-4 shadow-md sm:flex-row sm:items-center lg:top-[5px] lg:mx-5 lg:mt-5 lg:rounded-lg">
      <Toggle
        disabled={isSubdomainToggleDisabled}
        checked={settings.subdomainStatus === SubdomainStatus.ACTIVE}
        onChange={handleSetActive}
        label={`Svetainė ${settings.subdomainStatus === SubdomainStatus.ACTIVE ? "rodoma" : "paslėpta"}`}
      />
      {!isEditing && <Button onClick={toggleIsEditing}>Redaguoti</Button>}
      {isEditing && (
        <div className="flex gap-3">
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
