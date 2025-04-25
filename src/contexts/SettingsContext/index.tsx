import { createContext, useContext, useEffect, useRef, useState } from "react";
import { SettingsData, SubdomainStatusMutationResponse } from "@/types/types";
import { SettingsState, Context } from "@/contexts/SettingsContext/types";
import { initialSettings } from "@/contexts/SettingsContext/constants";
import { isSettingsValid } from "@/utils/user";
import { useToast } from "@/contexts/ToastContext";
import useFetch from "@/hooks/useFetch";
import { SubdomainStatus } from "@/types/supabase.enums";
import { buildSettings } from "@/utils/settings";

interface Props {
  children: React.ReactNode;
  settingsData: SettingsData;
}

const SettingsContext = createContext<Context>({
  isSubdomainToggleDisabled: false,
  isEditing: false,
  toggleIsEditing: () => {},
  handleSaveSettings: () => {},
  handleOnChange: () => {},
  handleOnDesignPreview: () => {},
  handleSetActive: () => {},
  settings: initialSettings,
});

const SettingsProvider = ({ children, settingsData }: Props) => {
  const { fireToast, firePromiseToast } = useToast();
  const [isSubdomainToggleDisabled, setIsSubdomainToggleDisabled] =
    useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [settings, setSettings] = useState<SettingsState>(
    buildSettings(settingsData),
  );
  const defaultSettings = useRef<SettingsData>(settingsData);

  const { fetch: setActive } = useFetch<SubdomainStatusMutationResponse>({
    endpoint: "subdomain/status",
    method: "POST",
  });

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

  const handleOnChange: Context["handleOnChange"] = (field, value) => {
    setSettings((prevState) => ({ ...prevState, [field]: value }));
  };

  const handleSetActive = (val: boolean) => {
    if (val && !isSettingsValid(buildSettings(defaultSettings.current))) {
      fireToast({ type: "error", message: "Užpildyk būtinus CV laukelius" });
      return;
    }

    setIsSubdomainToggleDisabled(true);

    const promise = setActive({
      body: {
        status: val ? SubdomainStatus.ACTIVE : SubdomainStatus.HIDDEN,
      },
      onSuccess: ({ status }) => {
        handleOnChange("subdomainStatus", status as SubdomainStatus);
        setIsSubdomainToggleDisabled(false);
      },
      onError: () => {
        setIsSubdomainToggleDisabled(false);
      },
    });

    firePromiseToast({
      promise,
      successMessage: val ? "Svetainė aktyvuota" : "Svetainė paslėpta",
      errorMessage: "Kažkas nepavyko",
    });
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
        isSubdomainToggleDisabled,
        isEditing,
        toggleIsEditing,
        handleSaveSettings,
        handleOnChange,
        handleOnDesignPreview,
        handleSetActive,
        settings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

const useSettings = () => useContext(SettingsContext);

export { SettingsProvider, useSettings };
