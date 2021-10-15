import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { onChangeHandler } from '../../Authentication/authentication.utils';
import InputMask from 'react-input-mask';
import TextField from '@mui/material/TextField';
import { checkUserName, emptyChecker } from '../../../utils/utils';

type AccountInfoProps = {};

export const AccountInfo: React.FC<AccountInfoProps> = ({}) => {
  const handleChange = onChangeHandler;
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [errorName, setErrorName] = useState<boolean>(false);
  const [errorAddress, setErrorAddress] = useState<boolean>(false);
  const [address, setAddress] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const voidFunc = () => {};
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid xs={6} item>
          <TextField
            label="ФИО"
            placeholder="Введите ФИО"
            variant="outlined"
            fullWidth
            error={errorName}
            onChange={(event) =>
              handleChange(
                event,
                setName,
                checkUserName,
                setErrorName,
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
            placeholder="Введите адрес"
            variant="outlined"
            fullWidth
            error={errorName}
            onChange={(event) =>
              handleChange(
                event,
                setAddress,
                emptyChecker,
                setErrorAddress,
                setErrorMessage
              )
            }
          />
        </Grid>
      </Grid>
    </Box>
  );
};
