import styles from './CropImageModal.module.scss';
import Modal from 'react-modal';
import leftArrow from '../../../../Images/arrow-left.svg';
import minusMagnify from '../../../../Images/minus-magnifying-glass.svg';
import plusMagnify from '../../../../Images/plus-magnifying-glass.svg';
import Cropper from 'react-easy-crop';
import { useState, useCallback } from 'react';
import { Area } from 'react-easy-crop/types';
import getCroppedImg from './CropImage';

interface Props {
  isOpen: boolean;
  setIsOpen: (prop: boolean) => void;
  imageFileList: File[];
  setImageFileList: (prop: File[]) => void;
  imageUrlList: string[];
  setImageUrlList: (prop: string[]) => void;
  addImageCount: number;
}

interface crop {
  x: number;
  y: number;
}

interface AreaInterface extends Area {}

const CropImageModal = ({
  isOpen,
  setIsOpen,
  imageFileList,
  setImageFileList,
  imageUrlList,
  setImageUrlList,
  addImageCount,
}: Props) => {
  const [crop, setCrop] = useState<crop>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [croppedAreaPixels, setCroppedAreaPixels] =
    useState<AreaInterface | null>(null);

  const clearModal = () => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
  };

  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleBackButtonOnClick = () => {
    clearModal();
    setImageFileList([]);
    setImageUrlList([]);
    setIsOpen(false);
  };

  const handleApplyButtonOnClick = async () => {
    if (
      imageFileList !== [] &&
      imageUrlList !== [] &&
      croppedAreaPixels !== null
    ) {
      const croppedImageBlob = await getCroppedImg(
        imageUrlList[addImageCount - 1],
        croppedAreaPixels,
      );
      if (croppedImageBlob !== null) {
        const croppedImageFile = new File([croppedImageBlob], 'NewImage', {
          lastModified: new Date().getTime(),
          type: croppedImageBlob.type,
        });
        setImageFileList([
          ...imageFileList.slice(0, addImageCount - 1),
          croppedImageFile,
        ]);
        setImageUrlList([
          ...imageUrlList.slice(0, addImageCount - 1),
          URL.createObjectURL(croppedImageFile),
        ]);
        console.log([
          ...imageFileList.slice(0, addImageCount - 1),
          croppedImageFile,
        ]);
        console.log([
          ...imageUrlList.slice(0, addImageCount - 1),
          URL.createObjectURL(croppedImageFile),
        ]);
        setIsOpen(false);
        clearModal();
      }
    }
  };

  const handleZoomOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setZoom(Number(e.target.value));
  };

  return (
    <Modal
      isOpen={isOpen}
      className={styles.modalStyle}
      overlayClassName={styles.overlayStyle}
      shouldCloseOnOverlayClick={false}
      onRequestClose={() => {
        setIsOpen(false);
      }}
      onAfterClose={() => {
        clearModal();
      }}
      ariaHideApp={false}
    >
      <header className={styles.modalHeader}>
        <button className={styles.backButton} onClick={handleBackButtonOnClick}>
          <img
            className={styles.backButtonImage}
            src={leftArrow}
            alt="back Button Image"
          />
        </button>
        <div className={styles.headText}>Edit Media</div>
        <button
          className={styles.applyButton}
          onClick={handleApplyButtonOnClick}
        >
          Save
        </button>
      </header>
      <div className={styles.cropContainer}>
        <Cropper
          style={{
            cropAreaStyle: {
              border: '4px solid rgba(0, 0, 0, 0.7)',
            },
          }}
          image={
            imageUrlList === null ? undefined : imageUrlList[addImageCount - 1]
          }
          crop={crop}
          zoom={zoom}
          aspect={1 / 1}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          zoomWithScroll={false}
        />
      </div>
      <div className={styles.cropControllerConatiner}>
        <img src={minusMagnify} className={styles.magnifyImage} />
        <input
          className={styles.zoomController}
          type="range"
          value={zoom}
          min={1}
          max={3}
          step={0.1}
          onChange={handleZoomOnChange}
        />
        <div
          className={styles.fillTrackColor}
          style={{
            width: `${(zoom - 1) * (150 - 17 / 2)}px`,
          }}
        />
        <img src={plusMagnify} className={styles.magnifyImage} />
      </div>
    </Modal>
  );
};

export default CropImageModal;
