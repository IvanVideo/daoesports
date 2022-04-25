import React from 'react';
import mainApi from './api';
import { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';


function App() {
  const [values, setValues] = React.useState([]); // значения rest api курсов валют
  const [currency1, setCurrency1] = React.useState(1); // значение первого инпута
  const [currency2, setCurrency2] = React.useState(''); // значение второго инпута
  const [inputCurse1, setInputCurse1] = React.useState('USD'); // значение селекта валюты которую меняю
  const [inputCurse2, setInputCurse2] = React.useState('EUR'); // значение селекта валюты на которую меняю
  const { t } = useTranslation();

  // перевод текста 
  const handleClick = (lang) => {
    i18next.changeLanguage(lang)
  }

  // запрашиваем данные при первичном рендеренги, а так же пересчитываем валюту при каждом изменение инпута
  useEffect(() => {
    mainApi.getValues()
      .then((res) => {
        setValues(res.Valute);
      })
      .catch((err) => {
        console.log(err)
      })

    if (currency1 !== 1) {
      setCurrency2(currency1 * values[inputCurse1].Value / values[inputCurse2].Value)
    }
  }, [currency1, inputCurse1, inputCurse2])

  return (
    <div>
      <Container maxWidth="sm"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }} >
        <h1>{t('title')}</h1>
        <FormControl fullWidth>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              m: 1,
              p: 1,
              fontSize: '0.875rem',
              fontWeight: '700',
              paddingLeft: '20px',
              paddingRight: '20px',
            }}
          >
            <TextField
              id="standard-basic"
              label={t('input1')}
              value={currency1}
              variant="standard"
              helperText={t('input1-helper')}
              onChange={e => setCurrency1(e.target.value)}
            />
            <TextField
              id="outlined-select-currency"
              select
              label="Select"
              value={inputCurse1}
              onChange={e => setInputCurse1(e.target.value)}
              helperText={t('select')}
            >
              {
                Object.keys(values).map((item, index) => (
                  <MenuItem key={index} value={item}>{item}</MenuItem>
                ))
              }
            </TextField>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              m: 1,
              p: 1,
              fontSize: '0.875rem',
              fontWeight: '700',
              paddingLeft: '20px',
              paddingRight: '20px',
            }}
          >
            <TextField
              id="standard-basic"
              label={t('input2')}
              variant="standard"
              value={currency2}
              helperText={t('input2-helper')}
            />
            <TextField
              id="outlined-select-currency"
              select
              label="Select"
              value={inputCurse2}
              onChange={e => setInputCurse2(e.target.value)}
              helperText={t('select')}
            >
              {
                Object.keys(values).map((item, index) => (
                  <MenuItem key={index} value={item}>{item}</MenuItem>
                ))
              }
            </TextField>
          </Box>
        </FormControl>
        <Box
          sx={{
            display: 'flex',
          }}
        >
          <Button onClick={() => handleClick('ru')} variant="outlined">RU</Button>
          <Button onClick={() => handleClick('en')} variant="outlined">EN</Button>
        </Box>
      </Container>
    </div >
  );
}

export default App;
