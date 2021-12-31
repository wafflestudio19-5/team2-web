import { useState } from 'react';
import styles from './CustomTextarea.module.scss';

interface Props {
  value: string;
  setValue: (val: string) => void;
  maxLength: number;
  titleName?: string;
  height?: string;
  margin?: string;
}

const CustomTextarea = ({
  value,
  setValue,
  maxLength,
  titleName = 'None',
  height = '60px',
  margin = '0px 0px 0px 0px',
}: Props) => {
  const customStyle = {
    minHeight: height,
    height: height,
    margin: margin,
  };

  const handleInputOnfocus = () => {
    setIsInputFocused(true);
  };

  const handleInputOnblur = () => {
    setIsInputFocused(false);
  };

  const handleOnchange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (value.length >= maxLength) {
      setValue(e.target.value.slice(0, maxLength));
    } else {
      setValue(e.target.value);
    }
  };

  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);

  return (
    <div className={styles.inputWrapper} style={customStyle}>
      <textarea
        className={styles.inputBox}
        onChange={handleOnchange}
        value={value}
        onFocus={handleInputOnfocus}
        onBlur={handleInputOnblur}
        maxLength={maxLength}
      />
      <div
        className={
          isInputFocused
            ? styles.inputTitleOnfocus
            : value === ''
            ? styles.inputTitle
            : styles.inputTitleFilled
        }
      >
        {titleName}
      </div>
      <div
        className={isInputFocused ? styles.lengthText : styles.lengthTextOnblur}
      >
        {value.length} / {maxLength}
      </div>
    </div>
  );
};

export default CustomTextarea;
