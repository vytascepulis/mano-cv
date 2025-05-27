import React, { useRef, useState } from "react";
import Button from "@/components/ui/Button";
import CropModal from "@/components/PhotoUpload/CropModal";
import { fileToImageState, fileToUrl } from "@/components/PhotoUpload/utils";
import { SettingsState } from "@/contexts/SettingsContext/types";
import { twMerge } from "tailwind-merge";
import { getGenericUserPhoto } from "@/utils/user";

interface Props {
  image: SettingsState["image"];
  onUpload: (data: SettingsState["image"]) => void;
  disabled?: boolean;
}

const PhotoUpload = ({ image, onUpload, disabled }: Props) => {
  const [uploadedSrc, setUploadedSrc] = useState<string | null>(null);
  const [cropModal, setCropModal] = useState(false);

  const refFileInput = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    refFileInput.current?.click();
  };

  // const handleRemoveClick = () => {
  //   onUpload(fileToImageState(null));
  //   setUploadedSrc(null);
  //
  //   if (refFileInput.current) {
  //     refFileInput.current.value = "";
  //   }
  // };

  const handleOnUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setUploadedSrc(fileToUrl(file));
      setCropModal(true);

      if (refFileInput.current) {
        refFileInput.current.value = "";
      }
    }
  };

  const handleOnCropSubmit = (file: Blob) => {
    onUpload(fileToImageState(file));
    setCropModal(false);
  };

  return (
    <div className={twMerge("card", "p-[4px]")}>
      <img
        src={image.url || getGenericUserPhoto()}
        alt="User's image"
        className="h-[200px] w-[200px] rounded-xs"
      />
      <input
        ref={refFileInput}
        className="hidden"
        type="file"
        onChange={handleOnUpload}
        accept="image/png, image/jpeg, image/jpg"
      />
      {!disabled && (
        <div className="align-center mt-[4px] flex justify-center gap-3">
          <Button onClick={handleUploadClick} disabled={disabled}>
            Įkelti naują
          </Button>
          {/*<Button*/}
          {/*  variant="link"*/}
          {/*  onClick={handleRemoveClick}*/}
          {/*  color="danger"*/}
          {/*  disabled={disabled}*/}
          {/*>*/}
          {/*  <FontAwesomeIcon icon={faTrashCan} size="xl" />*/}
          {/*</Button>*/}
        </div>
      )}
      {uploadedSrc && (
        <CropModal
          isOpen={cropModal}
          handleClose={() => setCropModal(false)}
          imgSrc={uploadedSrc}
          onSubmit={handleOnCropSubmit}
        />
      )}
    </div>
  );
};

export default PhotoUpload;
