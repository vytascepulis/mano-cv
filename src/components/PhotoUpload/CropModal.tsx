import Modal, { ModalProps } from "@/components/ui/Modal";
import ReactCrop, {
  centerCrop,
  Crop,
  makeAspectCrop,
  PixelCrop,
} from "react-image-crop";
import React, { useEffect, useRef, useState } from "react";

import "react-image-crop/dist/ReactCrop.css";
import Button from "@/components/ui/Button";
import { renderCroppedImage } from "@/components/PhotoUpload/utils";

interface Props extends ModalProps {
  onSubmit: (file: Blob) => void;
  imgSrc: string;
}

const CropModal = ({ isOpen, handleClose, onSubmit, imgSrc }: Props) => {
  const [crop, setCrop] = useState<Crop>();
  const [imgCrop, setImgCrop] = useState<PixelCrop>();
  const refImg = useRef<HTMLImageElement>(null);

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { width, height } = e.currentTarget;
    setCrop(centerAspectCrop(width, height, 1));
  }

  function centerAspectCrop(
    mediaWidth: number,
    mediaHeight: number,
    aspect: number,
  ) {
    return centerCrop(
      makeAspectCrop(
        {
          unit: "%",
          width: 90,
        },
        aspect,
        mediaWidth,
        mediaHeight,
      ),
      mediaWidth,
      mediaHeight,
    );
  }

  const handleCrop = async () => {
    try {
      const blob = await renderCroppedImage(refImg.current!, imgCrop!);
      onSubmit(blob);
    } catch (e) {
      console.error("Error rendering crop image", e);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setCrop(undefined);
      setImgCrop(undefined);
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} handleClose={handleClose}>
      <div className="flex flex-col items-center gap-3 p-2">
        <ReactCrop
          crop={crop}
          onChange={(_, percentCrop) => setCrop(percentCrop)}
          onComplete={setImgCrop}
          aspect={1}
          minHeight={50}
          keepSelection
        >
          <div className="flex max-h-[500px] w-full items-center justify-center">
            <img
              ref={refImg}
              src={imgSrc}
              alt="User's image"
              className="h-auto max-h-[500px] w-auto object-contain"
              onLoad={onImageLoad}
            />
          </div>
        </ReactCrop>
        <Button onClick={handleCrop}>Pasirinkti</Button>
      </div>
    </Modal>
  );
};

export default CropModal;
