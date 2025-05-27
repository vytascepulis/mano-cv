import { UserStatus } from "@/types/enums";
import { useSettings } from "@/contexts/SettingsContext";

const BlockedBar = () => {
  const { settings } = useSettings();

  if (settings.userStatus !== UserStatus.BLOCKED) return null;

  return (
    <div className="text-light top-0 z-50 mt-2 flex flex-col items-start justify-between gap-4 bg-red-400 px-5 py-4 font-bold shadow-md sm:flex-row sm:items-center lg:top-[5px] lg:mx-5 lg:mt-5 lg:rounded-lg">
      Vartotojas užblokuotas
    </div>
  );
};

export default BlockedBar;
