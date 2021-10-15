export const onChangeHandler = (
  event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  setter: React.Dispatch<React.SetStateAction<any>>,
  validator: Function,
  errorSetter: React.Dispatch<React.SetStateAction<boolean>>,
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>
) => {
  setErrorMessage('');
  if (validator(event.target.value)) errorSetter(false);
  setter(event.target.value);
};
