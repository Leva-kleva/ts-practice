import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Checkbox from '@material-ui/core/Checkbox';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ReactQuill from 'react-quill';
import { setEditorValues } from '../../redux/ducks/editor';
import 'react-quill/dist/quill.snow.css';

export const Editor = () => {
  const [isDesktop, setIsDesktop] = useState<boolean>(true);
  const { storedValues } = useSelector((state: any) => state.editorReducer);
  const [values, setValues] = useState<any>(storedValues ? storedValues : ['']);
  const [counter, setCounter] = useState<number>(1);
  const [currentInput, setCurrentInput] = useState<number>(0);
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
      [{ font: [] }],
      [{ align: [] }],
      ['link', 'image', 'video'],
    ],
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
    'color',
    'background',
    'align',
    'clean',
  ];

  const handleChange = () => {
    setIsDesktop((isDesktop) => !isDesktop);
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
      setValues([...before, result, ...after]);
    }
  };

  const saveValuesHandler = () => {
    dispatch(setEditorValues(values));
  };

  useEffect(() => {
    if (counter > 1) setValues(() => [...values, '']);
  }, [counter]);

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
            <ReactQuill
              theme="snow"
              value={el || ''}
              onChange={handleInputChange}
              onFocus={() => {
                setCurrentInput(i);
              }}
              modules={modules}
              formats={formats}
            />
          </div>
        ))}
        <button onClick={() => setCounter(counter + 1)}>добавить</button>
        <button onClick={() => console.log(values)}>
          выплюнуть в консоль резы
        </button>
        <Link to="/preview" onClick={saveValuesHandler}>
          посмотреть превью
        </Link>
      </Container>
    </>
  );
};
