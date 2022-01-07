import styles from './EditProfileModal.module.scss';
import xImage from '../../../Images/X.svg';
import xImageWhite from '../../../Images/Xwhite.svg';
import cameraImage from '../../../Images/cameraImg.svg';
import Modal from 'react-modal';
import React, { useState } from 'react';
import CustomInput from './CustomInput/CustomInput';
import CustomTextarea from './CustomTextarea/CustomTextarea';
import Select from 'react-select';
import { ActionMeta } from 'react-select';
import CropImageModal from './CropImageModal/CropImageModal';

interface Props {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

interface formatBirthDateProps {
  birthDateMonth: number | null;
  birthDateDay: number | null;
  birthDateYear: number | null;
}

interface MonthOption {
  value: number;
  label: string;
}

const monthToString: { [key: number]: string } = {
  1: 'January',
  2: 'February',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'August',
  9: 'September',
  10: 'Octobor',
  11: 'November',
  12: 'December',
};

const monthOptions = [
  { value: 1, label: 'January' },
  { value: 2, label: 'February' },
  { value: 3, label: 'March' },
  { value: 4, label: 'April' },
  { value: 5, label: 'May' },
  { value: 6, label: 'June' },
  { value: 7, label: 'July' },
  { value: 8, label: 'August' },
  { value: 9, label: 'September' },
  { value: 10, label: 'Octobor' },
  { value: 11, label: 'November' },
  { value: 12, label: 'December' },
];

const dayOptions = Array.from(Array(31).keys()).map((item: number) => {
  return { value: item + 1, label: (item + 1).toString() };
});

const yearOptions = Array.from(Array(122).keys())
  .map((item: number) => {
    return { value: item + 1901, label: (item + 1901).toString() };
  })
  .reverse();

const EditProfileModal = ({ isOpen, setIsOpen }: Props) => {
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const [backgroundImageFile, setBackgroundImageFile] = useState<File | null>(
    null,
  );
  const [backgroundImageUrl, setBackgroundImageUrl] = useState<string | null>(
    null,
  );
  const [isCropImageModalOpen, setIsCropImageModalOpen] =
    useState<boolean>(false);
  const [imageOnEdit, setImageOnEdit] = useState<string | null>(null);

  const [nameValue, setNameValue] = useState<string>('');
  const [bioValue, setBioValue] = useState<string>('');
  const [locationValue, setLocationValue] = useState<string>('');
  const [websiteValue, setWebsiteValue] = useState<string>('');

  const [birthDateMonth, setBirthDateMonth] = useState<number | null>(null);
  const [birthDateDay, setBirthDateDay] = useState<number | null>(null);
  const [birthDateYear, setBirthDateYear] = useState<number | null>(null);
  const [isBrithDateOnEdit, setIsBrithDateOnEdit] = useState<boolean>(false);

  const loadModalDate = () => {
    console.log('Loading Modal Data...');
  };

  const clearModal = () => {
    setProfileImageFile(null);
    setProfileImageUrl(null);
    setBackgroundImageFile(null);
    setBackgroundImageUrl(null);
    setNameValue('');
    setBioValue('');
    setLocationValue('');
    setWebsiteValue('');
    setBirthDateMonth(null);
    setBirthDateDay(null);
    setBirthDateYear(null);
    setIsBrithDateOnEdit(false);
  };

  const handleSaveOnClick = () => {
    console.log('Saving Modal Data...');

    document.body.style.overflow = 'scroll';
    clearModal();
    setIsOpen(false);
  };

  const handleExitButtonOnClick = () => {
    document.body.style.overflow = 'scroll';
    clearModal();
    setIsOpen(false);
  };

  const handleProfileImageSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null && e.target.files.length === 1) {
      setProfileImageFile(e.target.files[0]);
      setProfileImageUrl(URL.createObjectURL(e.target.files[0]));
      setImageOnEdit('profile');
      setIsCropImageModalOpen(true);
      e.target.value = '';
    }
  };

  const handleBackgroundImageSubmit = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.files !== null && e.target.files.length === 1) {
      setBackgroundImageFile(e.target.files[0]);
      setBackgroundImageUrl(URL.createObjectURL(e.target.files[0]));
      setImageOnEdit('background');
      setIsCropImageModalOpen(true);
      e.target.value = '';
    }
  };

  const handleBackgroundCancelOnClick = () => {
    setBackgroundImageFile(null);
    setBackgroundImageUrl(null);
  };

  const handleBirthDateEditOnClick = () => {
    setIsBrithDateOnEdit(true);
  };

  const handleBirthDateSaveOnClick = () => {
    setIsBrithDateOnEdit(false);
  };

  const handleMonthSelectOnChange = (
    option: MonthOption | null,
    actionMeta: ActionMeta<MonthOption>,
  ) => {
    if (option !== null) {
      setBirthDateMonth(option.value);
    }
  };

  const handleDaySelectOnChange = (
    option: MonthOption | null,
    actionMeta: ActionMeta<MonthOption>,
  ) => {
    if (option !== null) {
      setBirthDateDay(option.value);
    }
  };

  const handleYearSelectOnChange = (
    option: MonthOption | null,
    actionMeta: ActionMeta<MonthOption>,
  ) => {
    if (option !== null) {
      setBirthDateYear(option.value);
    }
  };

  const formatBirthDate = ({
    birthDateMonth,
    birthDateDay,
    birthDateYear,
  }: formatBirthDateProps): string => {
    if (
      birthDateMonth === null ||
      birthDateDay === null ||
      birthDateYear === null
    ) {
      return 'Add your date of birth';
    } else {
      return `${monthToString[birthDateMonth]} ${birthDateDay}, ${birthDateYear}`;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      className={styles.modalStyle}
      overlayClassName={styles.overlayStyle}
      shouldCloseOnOverlayClick={true}
      onRequestClose={() => {
        setIsOpen(false);
      }}
      onAfterOpen={() => {
        loadModalDate();
      }}
      onAfterClose={() => {
        clearModal();
      }}
      ariaHideApp={false}
    >
      <CropImageModal
        isOpen={isCropImageModalOpen}
        setIsOpen={setIsCropImageModalOpen}
        setImageFile={
          imageOnEdit === 'profile'
            ? setProfileImageFile
            : imageOnEdit === 'background'
            ? setBackgroundImageFile
            : () => {}
        }
        imageFileUrl={
          imageOnEdit === 'profile'
            ? profileImageUrl
            : imageOnEdit === 'background'
            ? backgroundImageUrl
            : null
        }
        setImageFileUrl={
          imageOnEdit === 'profile'
            ? setProfileImageUrl
            : imageOnEdit === 'background'
            ? setBackgroundImageUrl
            : () => {}
        }
        imageOnEdit={imageOnEdit}
      />
      <header className={styles.modalHeader}>
        <button className={styles.exitButton} onClick={handleExitButtonOnClick}>
          <img
            className={styles.exitButtonImg}
            src={xImage}
            alt="Exit Button Image"
          />
        </button>
        <div className={styles.headText}>Edit Profile</div>
        <button className={styles.saveButton} onClick={handleSaveOnClick}>
          Save
        </button>
      </header>
      <div className={styles.hideOverflow}>
        <div className={styles.contentWrapper}>
          <div className={styles.profileImgWrapper}>
            {profileImageUrl === null ? (
              <div className={styles.profileImgNull}></div>
            ) : (
              <img
                className={styles.profileImg}
                src={profileImageUrl}
                alt="profileImage"
              />
            )}
            <div className={styles.profileImgShade} />
            <div className={styles.profileImgButton}>
              <img
                className={styles.cameraImg}
                src={cameraImage}
                alt="cameraImage"
              />
              <input
                className={styles.profileImageInput}
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                onChange={handleProfileImageSubmit}
              />
            </div>
          </div>
          <div className={styles.backgroundImgWrapper}>
            {backgroundImageUrl === null ? (
              <>
                <div className={styles.backgroundImgNull} />
                <div className={styles.profileImgButton}>
                  <img
                    className={styles.cameraImg}
                    src={cameraImage}
                    alt="cameraImage"
                  />
                  <input
                    className={styles.profileImageInput}
                    type="file"
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={handleBackgroundImageSubmit}
                  />
                </div>
              </>
            ) : (
              <>
                <img
                  className={styles.backgroundImg}
                  src={backgroundImageUrl}
                  alt="background Image"
                />
                <div
                  className={styles.profileImgButton}
                  style={{ margin: '0px 100px 0px 0px' }}
                >
                  <img
                    className={styles.cameraImg}
                    src={cameraImage}
                    alt="cameraImage"
                  />
                  <input
                    className={styles.profileImageInput}
                    type="file"
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={handleBackgroundImageSubmit}
                  />
                </div>
                <button
                  className={styles.profileImgButton}
                  style={{ margin: '0px 0px 0px 100px', cursor: 'pointer' }}
                  onClick={handleBackgroundCancelOnClick}
                >
                  <img className={styles.xImg} src={xImageWhite} alt="xImage" />
                </button>
              </>
            )}
            <div className={styles.backgroundImgShade} />
          </div>
          <CustomInput
            value={nameValue}
            setValue={setNameValue}
            maxLength={50}
            titleName="Name"
            margin="100px 0px 0px 0px"
            warn={true}
          />
          <CustomTextarea
            value={bioValue}
            setValue={setBioValue}
            maxLength={160}
            titleName="Bio"
            margin="30px 0px 0px 0px"
            height="150px"
          />
          <CustomInput
            value={locationValue}
            setValue={setLocationValue}
            maxLength={30}
            titleName="Location"
            margin="30px 0px 0px 0px"
          />
          <CustomInput
            value={websiteValue}
            setValue={setWebsiteValue}
            maxLength={100}
            titleName="Website"
            margin="30px 0px 0px 0px"
          />
          {isBrithDateOnEdit ? (
            <div className={styles.birthDateWrapperOnEdit}>
              <div className={styles.birthDateHeader}>
                <div className={styles.birthDateEditHeaderText}>
                  Birth date ·
                </div>
                <button
                  className={styles.birthDateHeaderButton}
                  onClick={handleBirthDateSaveOnClick}
                >
                  Save
                </button>
              </div>
              <div className={styles.birthDateEditExplainText}>
                This should be your date of birth, whether this account is for
                your business, event, or even your cat.
              </div>
              <div className={styles.selectTitleWrapper}>
                <div className={styles.monthSelect}>Month</div>
                <div className={styles.daySelect}>Day</div>
                <div className={styles.yearSelect}>Year</div>
              </div>
              <div className={styles.selectWrapper}>
                <Select
                  options={monthOptions}
                  defaultValue={
                    birthDateMonth === null
                      ? null
                      : monthOptions[birthDateMonth - 1]
                  }
                  isLoading={false}
                  isClearable={false}
                  isSearchable={false}
                  onChange={handleMonthSelectOnChange}
                  menuPlacement="top"
                  name="month"
                  className={styles.monthSelect}
                />
                <Select
                  options={dayOptions}
                  defaultValue={
                    birthDateDay === null ? null : dayOptions[birthDateDay - 1]
                  }
                  isLoading={false}
                  isClearable={false}
                  isSearchable={false}
                  onChange={handleDaySelectOnChange}
                  menuPlacement="top"
                  name="day"
                  className={styles.daySelect}
                />
                <Select
                  options={yearOptions}
                  defaultValue={
                    birthDateYear === null
                      ? null
                      : yearOptions[2022 - birthDateYear]
                  }
                  isLoading={false}
                  isClearable={false}
                  isSearchable={false}
                  onChange={handleYearSelectOnChange}
                  menuPlacement="top"
                  name="year"
                  className={styles.yearSelect}
                />
              </div>
            </div>
          ) : (
            <div className={styles.birthDateWrapper}>
              <div className={styles.birthDateHeader}>
                <div className={styles.birthDateHeaderText}>Birth date ·</div>
                <button
                  className={styles.birthDateHeaderButton}
                  onClick={handleBirthDateEditOnClick}
                >
                  Edit
                </button>
              </div>
              <div className={styles.birthDateContent}>
                {formatBirthDate({
                  birthDateMonth,
                  birthDateDay,
                  birthDateYear,
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default EditProfileModal;
