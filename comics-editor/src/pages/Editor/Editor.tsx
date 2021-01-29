import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Checkbox from '@material-ui/core/Checkbox';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ReactQuill from 'react-quill';
import { setEditorValues } from '../../redux/ducks/editor';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { uploadImage } from '../../services/uploadImage';
import { uploadMarkdown } from '../../services/uploadMarkdown';
import 'react-quill/dist/quill.snow.css';
import './Editor.scss';

//@ts-ignore
const Quill = ReactQuill.Quill;
var Font = Quill.import('formats/font');
Font.whitelist = ['Nunito', 'Roboto', 'Raleway', 'Montserrat', 'Lato', 'Rubik'];
Quill.register(Font, true);

export const Editor = () => {
  let location = useLocation();
  const [isDesktop, setIsDesktop] = useState<boolean>(true);
  const { storedValues } = useSelector((state: any) => state.editorReducer);
  const [values, setValues] = useState<any>(storedValues ? storedValues : []);
  const [counter, setCounter] = useState<number>(0);
  const [counterImage, setCounterImage] = useState<number>(0);
  const [currentInput, setCurrentInput] = useState<number>(0);
  const [imageLink, setImageLink] = useState<string>('~~upload smth~~');
  const dispatch = useDispatch();

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],
      [{ font: Font.whitelist }],
      [{ align: [] }],
      ['link', 'image', 'video'],
    ],
  };

  const formats = [
    'header',
    'font',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'background',
    'code',
    'script',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'color',
    'video',
    'align',
    'clean',
  ];

  const handleChange = () => {
    setIsDesktop((isDesktop) => !isDesktop);
  };

  const handleInputImageChange = (event: any) => {
    const newValues = [...values];
    const before = newValues.slice(0, currentInput);
    const after = newValues.slice(currentInput + 1, newValues.length);

    const result = event.target.value;

    setValues([
      ...before,
      { ...newValues[currentInput], value: result },
      ...after,
    ]);
  };

  const handleInputChange = (
    content: any,
    delta: any,
    source: any,
    editor: any
  ) => {
    let result: any;
    if (delta.ops[0].insert?.video) {
      result = content;
    } else if (delta.ops[0].insert?.image) {
      result = content.match(/\>(.*)\<\//)[1];
    } else if (delta.ops[1]) {
      result = content;
    }
    const newValues = [...values];
    const before = newValues.slice(0, currentInput);
    const after = newValues.slice(currentInput + 1, newValues.length);

    if (result) {
      setValues([
        ...before,
        { ...newValues[currentInput], value: result },
        ...after,
      ]);
    }
  };

  const saveValuesHandler = () => {
    dispatch(setEditorValues(values));
  };

  useEffect(() => {
    if (counter > 0) setValues(() => [...values, { type: 'quill', value: '' }]);
  }, [counter]);

  useEffect(() => {
    if (counterImage > 0)
      setValues(() => [...values, { type: 'image', value: '' }]);
  }, [counterImage]);

  const onImageChange = async (event: any) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      const imageName = event.target.files[0].name;
      const formData = new FormData();
      formData.append('file', img, imageName);
      const response = await uploadImage(formData);
      if (response) {
        setImageLink(response);
      }
    }
  };

  const handleDeleteClick = (i: number) => {
    const newValues = [...values];
    const before = newValues.slice(0, i);
    const after = newValues.slice(i + 1, newValues.length);
    setValues([...before, ...after]);
  };

  const handleSend = async () => {
    console.log(values);
    const pathArray = location.pathname.split('/');
    const level = pathArray[pathArray.length - 2];
    const lesson = pathArray[pathArray.length - 1];
    const response = await uploadMarkdown(
      {
        comics: values,
        comics_type: isDesktop ? 'desktop_comics' : 'mobile_comics',
      },
      Number(level),
      Number(lesson)
    );
    if (response) {
      alert('Complete');
    }
  };

  return (
    <>
      <CssBaseline />
      <Container maxWidth="xl">
        <FormControlLabel
          control={
            <Checkbox
              checked={isDesktop}
              onChange={handleChange}
              name="checkedB"
              color="primary"
            />
          }
          label="Desktop"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={!isDesktop}
              onChange={handleChange}
              name="checkedB"
              color="primary"
            />
          }
          label="Mobile"
        />
        {values.map((el: any, i: number) => (
          <div style={{ marginBottom: '25px' }} key={`key-${i}`}>
            {el.type === 'quill' ? (
              <ReactQuill
                theme="snow"
                value={el.value || ''}
                onChange={handleInputChange}
                onFocus={() => {
                  setCurrentInput(i);
                }}
                modules={modules}
                formats={formats}
              />
            ) : (
              <input
                value={el.value || ''}
                onChange={handleInputImageChange}
                onFocus={() => {
                  setCurrentInput(i);
                }}
              />
            )}
            <IconButton
              aria-label="delete"
              size="small"
              onClick={() => handleDeleteClick(i)}
            >
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          </div>
        ))}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            marginBottom: '25px',
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => setCounter(counter + 1)}
          >
            добавить текст/видео
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setCounterImage(counterImage + 1)}
          >
            добавить изображение
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => console.log(values)}
          >
            выплюнуть в консоль резы
          </Button>
        </div>
        <input
          type="file"
          name="file"
          id="file"
          className="inputfile"
          onChange={onImageChange}
        />
        <input type="text" value={imageLink} />
        <div>
          <Link to="/preview" onClick={saveValuesHandler}>
            посмотреть превью
          </Link>
        </div>
        <div>
          <Button variant="contained" color="primary" onClick={handleSend}>
            отправить на сервер
          </Button>
        </div>
      </Container>
    </>
  );
};
