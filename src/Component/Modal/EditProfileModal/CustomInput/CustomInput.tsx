import { useState } from 'react';
import styles from './CustomInput.module.scss';

interface Props {
  value: string;
  setValue: (val: string) => void;
  maxLength: number;
  titleName?: string;
  height?: string;
  margin?: string;
  warn?: boolean;
}

const CustomInput = ({
  value,
  setValue,
  maxLength,
  titleName = 'None',
  height = '60px',
  margin = '0px 0px 0px 0px',
  warn = false,
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

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (value.length >= maxLength) {
      setValue(e.target.value.slice(0, maxLength));
    } else {
      setValue(e.target.value);
    }

    if (e.target.value.length === 0) {
      setIsWarning(true);
    } else {
      setIsWarning(false);
    }
  };

  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const [isWarning, setIsWarning] = useState(false);

  return (
    <div className={styles.inputWrapper} style={customStyle}>
      <input
        className={warn && isWarning ? styles.inputBoxWarning : styles.inputBox}
        onChange={handleOnchange}
        value={value}
        onFocus={handleInputOnfocus}
        onBlur={handleInputOnblur}
        maxLength={maxLength}
      />
      <div
        className={
          isInputFocused
            ? warn && isWarning
              ? styles.inputTitleOnfocusWarning
              : styles.inputTitleOnfocus
            : value === ''
            ? styles.inputTitle
            : styles.inputTitleFilled
        }
      >
        {titleName}
      </div>
      <div
        className={
          isInputFocused || (warn && isWarning)
            ? styles.lengthText
            : styles.lengthTextOnblur
        }
      >
        {value.length} / {maxLength}
      </div>
      {warn ? (
        <div
          className={
            isWarning ? styles.warningText : styles.warningTextInvisible
          }
        >
          Name can't be blank
        </div>
      ) : null}
    </div>
  );
};

export default CustomInput;
