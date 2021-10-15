import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { onChangeHandler } from '../../Authentication/authentication.utils';
import InputMask from 'react-input-mask';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { checkUserName, emptyChecker } from '../../../utils/utils';
import { updateAccountDataApi } from '../../../services/updateAccountDataApi';

type AccountInfoProps = {};

export const AccountInfo: React.FC<AccountInfoProps> = ({}) => {
  const handleChange = onChangeHandler;
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const voidFunc = () => {};
  const handleUpdateAccountInfo = async () => {
    if (!emptyChecker(name)) {
      setErrorMessage('Введите ФИО');
    }
    if (!emptyChecker(address)) {
      setErrorMessage('Введите адрес');
    }
    if (!errorMessage && name.trim() && address.trim() && phone) {
      const response = await updateAccountDataApi({
        name,
        phone,
        address,
      });

      if (response) {
        //fetchAccountData
      } else {
        setErrorMessage('Проблемы с сервером, попробуйте позже');
      }
    }
  };
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid xs={6} item>
          <TextField
            label="ФИО"
            placeholder="Введите ФИО"
            variant="outlined"
            fullWidth
            value={name}
            error={!!errorMessage && !name}
            onChange={(event) =>
              handleChange(
                event,
                setName,
                checkUserName,
                voidFunc,
                setErrorMessage
              )
            }
            sx={{ marginBottom: '20px' }}
          />
        </Grid>
        <Grid xs={6} item>
          <InputMask
            mask="+7 (999) 999 99 99"
            value={phone}
            disabled={false}
            maskChar=" "
            onChange={(event) =>
              handleChange(event, setPhone, voidFunc, voidFunc, setErrorMessage)
            }
          >
            {() => (
              <TextField
                label="Телефон"
                placeholder="+7 (***) ***-**-**"
                variant="outlined"
                fullWidth
              />
            )}
          </InputMask>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid xs={6} item>
          <TextField
            label="Адрес"
            value={address}
            error={!!errorMessage && !address}
            placeholder="Введите адрес"
            variant="outlined"
            fullWidth
            onChange={(event) =>
              handleChange(
                event,
                setAddress,
                emptyChecker,
                voidFunc,
                setErrorMessage
              )
            }
          />
        </Grid>
        <Grid xs={6} item sx={{ position: 'relative' }}>
          <Grid item sx={{ color: 'rgb(255, 0, 0)' }}>
            {errorMessage}
          </Grid>
          <Button
            variant="outlined"
            sx={{ position: 'absolute', right: 0, bottom: 0 }}
            onClick={handleUpdateAccountInfo}
          >
            Обновить личные данные
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
