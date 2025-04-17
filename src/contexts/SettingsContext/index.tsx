import { createContext, useContext, useState } from "react";
import { SettingsData } from "@/types/types";
import { SettingsState, Context } from "@/contexts/SettingsContext/types";
import { initialSettings } from "@/contexts/SettingsContext/constants";

interface Props {
  children: React.ReactNode;
  settingsData: SettingsData;
}

const SettingsContext = createContext<Context>({
  isEditing: false,
  toggleIsEditing: () => {},
  handleSaveSettings: () => {},
  isWebsiteActive: false,
  handleSetIsWebsiteActive: () => {},
  handleOnChange: () => {},
  settings: initialSettings,
});

const SettingsProvider = ({ children }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isWebsiteActive, setIsWebsiteActive] = useState(false);
  const [settings, setSettings] = useState<SettingsState>(initialSettings);

  const toggleIsEditing = () => setIsEditing((prevState) => !prevState);

  const handleSaveSettings = () => {
    console.log("save settings");
  };

  const handleSetIsWebsiteActive = (val: boolean) => {
    setIsWebsiteActive(val);
    console.log("set is website active: ", val);
  };

  const handleOnChange = <K extends keyof SettingsState>(
    field: K,
    value: SettingsState[K],
  ) => {
    setSettings((prevState) => ({ ...prevState, [field]: value }));
  };

  return (
    <SettingsContext.Provider
      value={{
        isEditing,
        toggleIsEditing,
        handleSaveSettings,
        isWebsiteActive,
        handleSetIsWebsiteActive,
        handleOnChange,
        settings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

const useSettings = () => useContext(SettingsContext);

export { SettingsProvider, useSettings };
