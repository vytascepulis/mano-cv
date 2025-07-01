import { createContext, useContext, useRef, useState } from "react";
import { SettingsData } from "@/types/types";
import { SettingsState, Context } from "@/contexts/SettingsContext/types";
import { initialSettings } from "@/contexts/SettingsContext/constants";
import { useToast } from "@/contexts/ToastContext";
import useFetch from "@/hooks/useFetch";
import { SubdomainStatus, WebsiteDesigns } from "@/types/enums";
import {
  buildFormData,
  buildSettings,
  validateSettingsState,
  webdesignToStr,
} from "@/utils/settings";
import { UpdateSubdomainStatusResponse } from "@/pages/api/types";
import { useSession } from "next-auth/react";
import { getDomainUrl } from "@/utils/subdomain";

interface Props {
  children: React.ReactNode;
  settingsData: SettingsData;
}

const SettingsContext = createContext<Context>({
  isSubdomainToggleDisabled: false,
  isEditing: false,
  isSaveLoading: false,
  isSubdomainStatusLoading: false,
  toggleIsEditing: () => {},
  handleSaveSettings: () => {},
  handleOnChange: () => {},
  handleOnDesignPreview: () => {},
  handleSetActive: () => {},
  settings: initialSettings,
});

const SettingsProvider = ({ children, settingsData }: Props) => {
  const { update } = useSession();
  const { fireToast } = useToast();
  const [isSubdomainToggleDisabled, setIsSubdomainToggleDisabled] =
    useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [settings, setSettings] = useState<SettingsState>(
    buildSettings(settingsData),
  );
  const defaultSettings = useRef<SettingsData>(settingsData);

  const { fetch: setActive, isLoading: isSubdomainStatusLoading } =
    useFetch<UpdateSubdomainStatusResponse>({
      endpoint: "subdomain/status",
      method: "PUT",
    });

  const { fetch: updateSettings, isLoading: isSaveLoading } =
    useFetch<SettingsData>({
      endpoint: "settings",
      method: "PUT",
    });

  const toggleIsEditing = () =>
    setIsEditing((prevState) => {
      if (prevState) {
        setSettings(buildSettings(defaultSettings.current));
      }

      return !prevState;
    });

  const handleSaveSettings: Context["handleSaveSettings"] = () => {
    const { isValid, errorMessage } = validateSettingsState(settings);

    if (!isValid) {
      fireToast({ type: "error", message: errorMessage! });
      return;
    }

    const formData = buildFormData(settings);
    formData.delete("image");

    if (settings.image.blob) {
      formData.append("imageBlob", settings.image.blob);
    }

    updateSettings({
      body: formData,
      onSuccess: async (data) => {
        fireToast({ type: "success", message: "Išsaugota sėkmingai" });
        setSettings(buildSettings(data));
        defaultSettings.current = data;
        setIsEditing(false);
        await update({ image: data.image });
      },
      onError: (err) => {
        fireToast({ type: "error", message: err.message });
      },
    });
  };

  const handleOnChange: Context["handleOnChange"] = (field, value) => {
    setSettings((prevState) => ({ ...prevState, [field]: value }));
  };

  const handleSetActive = (val: boolean) => {
    const { isValid, errorMessage } = validateSettingsState(settings);

    if (val && !isValid) {
      fireToast({ type: "error", message: errorMessage! });
      return;
    }

    setIsSubdomainToggleDisabled(true);

    setActive({
      body: {
        status: val ? SubdomainStatus.ACTIVE : SubdomainStatus.HIDDEN,
      },
      onSuccess: ({ status }) => {
        handleOnChange("subdomainStatus", status);
        setIsSubdomainToggleDisabled(false);

        defaultSettings.current = {
          ...defaultSettings.current,
          subdomainStatus: status,
        };

        fireToast({
          type: "success",
          message: val ? "Svetainė aktyvuota" : "Svetainė paslėpta",
        });
      },
      onError: (error) => {
        setIsSubdomainToggleDisabled(false);
        fireToast({ type: "error", message: error.message });
      },
    });
  };

  const handleOnDesignPreview: Context["handleOnDesignPreview"] = (
    slug: WebsiteDesigns,
  ) => {
    window.open(
      `${getDomainUrl()}/sablonai?stilius=${webdesignToStr(slug)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <SettingsContext.Provider
      value={{
        isSubdomainToggleDisabled,
        isEditing,
        isSaveLoading,
        isSubdomainStatusLoading,
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
