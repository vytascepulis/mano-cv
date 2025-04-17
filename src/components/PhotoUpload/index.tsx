import React, { useRef, useState } from "react";
import Button from "@/components/ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { getDomainUrl } from "@/utils/subdomain";
import CropModal from "@/components/PhotoUpload/CropModal";
import { fileToUrl } from "@/components/PhotoUpload/utils";

interface Props {
  initialPhoto: string;
  onUpload: (file: Blob | null) => void;
}

const genericUserPhoto = `${getDomainUrl()}/generic-user.png`;

const PhotoUpload = ({ initialPhoto, onUpload }: Props) => {
  const [uploadedSrc, setUploadedSrc] = useState<string | null>(null);
  const [finalSrc, setFinalSrc] = useState<string>(initialPhoto);
  const [cropModal, setCropModal] = useState(false);

  const refFileInput = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    refFileInput.current?.click();
  };

  const handleRemoveClick = () => {
    setFinalSrc(genericUserPhoto);
    setUploadedSrc(null);

    if (refFileInput.current) {
      refFileInput.current.value = "";
    }

    onUpload(null);
  };

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
    setFinalSrc(fileToUrl(file));
    setCropModal(false);
    onUpload(file);
  };

  return (
    <div className="card">
      <img
        src={finalSrc}
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
      <div className="align-center mt-3 flex justify-center gap-3">
        <Button onClick={handleUploadClick}>Įkelti</Button>
        <Button variant="link" onClick={handleRemoveClick} color="danger">
          <FontAwesomeIcon icon={faTrashCan} size="xl" />
        </Button>
      </div>
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
