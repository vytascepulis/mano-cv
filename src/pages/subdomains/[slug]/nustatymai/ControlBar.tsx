import Toggle from "@/components/ui/Toggle";
import Button from "@/components/ui/Button";
import { useSettings } from "@/contexts/SettingsContext";

const ControlBar = () => {
  const {
    isEditing,
    toggleIsEditing,
    handleSaveSettings,
    isWebsiteActive,
    handleSetIsWebsiteActive,
  } = useSettings();

  return (
    <div className="bg-dark text-light sticky top-[5px] z-50 flex flex-col items-start justify-between gap-4 rounded-lg px-5 py-4 shadow-md sm:flex-row sm:items-center">
      <Toggle
        initialValue={isWebsiteActive}
        onChange={handleSetIsWebsiteActive}
        label={`Svetainė ${isWebsiteActive ? "rodoma" : "paslėpta"}`}
      />
      {!isEditing && <Button onClick={toggleIsEditing}>Redaguoti</Button>}
      {isEditing && (
        <div className="flex gap-3">
          <Button variant="outline" onClick={toggleIsEditing}>
            Atšaukti
          </Button>
          <Button onClick={handleSaveSettings}>Išsaugoti</Button>
        </div>
      )}
    </div>
  );
};

export default ControlBar;
