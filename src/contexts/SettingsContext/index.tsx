import { createContext, useContext, useEffect, useRef, useState } from "react";
import { SettingsData } from "@/types/types";
import { SettingsState, Context } from "@/contexts/SettingsContext/types";
import { initialSettings } from "@/contexts/SettingsContext/constants";
import { buildSettings } from "@/pages/subdomains/[slug]/nustatymai/utils";

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
  handleOnDesignPreview: () => {},
  settings: initialSettings,
});

const SettingsProvider = ({ children, settingsData }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isWebsiteActive, setIsWebsiteActive] = useState(false);
  const [settings, setSettings] = useState<SettingsState>(
    buildSettings(settingsData),
  );
  const defaultSettings = useRef<SettingsData>(settingsData);

  const toggleIsEditing = () =>
    setIsEditing((prevState) => {
      if (prevState) {
        setSettings(buildSettings(defaultSettings.current));
      }

      return !prevState;
    });

  const handleSaveSettings: Context["handleSaveSettings"] = () => {
    console.log("save settings");
    // Update defaultSettings ref
  };

  const handleSetIsWebsiteActive: Context["handleSetIsWebsiteActive"] = (
    val,
  ) => {
    setIsWebsiteActive(val);
    console.log("set is website active: ", val);
  };

  const handleOnChange: Context["handleOnChange"] = (field, value) => {
    setSettings((prevState) => ({ ...prevState, [field]: value }));
  };

  const handleOnDesignPreview: Context["handleOnDesignPreview"] = (slug) => {
    console.log("handle on design preview: ", slug);
  };

  useEffect(() => {
    console.log("settings: ", settings);
  }, [settings]);

  return (
    <SettingsContext.Provider
      value={{
        isEditing,
        toggleIsEditing,
        handleSaveSettings,
        isWebsiteActive,
        handleSetIsWebsiteActive,
        handleOnChange,
        handleOnDesignPreview,
        settings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

const useSettings = () => useContext(SettingsContext);

export { SettingsProvider, useSettings };
