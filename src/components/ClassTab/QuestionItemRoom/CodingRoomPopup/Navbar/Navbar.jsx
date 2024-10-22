import './Navbar.scss';
import React from 'react';
import Select from 'react-select';
import { Divider, IconButton, Slider, Stack, Tooltip, Typography } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const Navbar = ({ codeLanguage, setCodeLanguage, editorTheme, setEditorTheme, editorFontSize, setEditorFontSize, setLoading }) => {
    const languages = [
        { value: 'c', label: 'C' },
        { value: 'cpp', label: 'C++' },
        { value: 'python', label: 'Python' },
        { value: 'java', label: 'Java' },
    ];
    const themes = [
        { value: 'vs-dark', label: 'Dark' },
        { value: 'light', label: 'Light' },
    ]

    const onClickRunButton = () => {
        setLoading(prev => !prev)
    }

    return (
        <Stack direction='row' alignItems='center' className='code-editor-navbar'>
            <Typography noWrap overflow='unset'>Code Editor</Typography>
            <Divider orientation='vertical' flexItem className='navbar-divider' />
            <Stack direction='row' width='100%' justifyContent='space-between'>
                <Stack direction='row' spacing={2.5}>
                    <Stack direction='row' spacing={1} alignItems='center'>
                        <Typography>Ngôn ngữ:</Typography>
                        <Select options={languages} value={codeLanguage} 
                            onChange={(e) => setCodeLanguage(e.value)} placeholder={codeLanguage} 
                            styles={{
                                control: (baseStyles, state) => ({
                                    ...baseStyles,
                                    backgroundColor: '#474747',
                                    borderColor: '#afec3f'
                                }),
                                container: (baseStyles, state) => ({
                                    ...baseStyles,
                                    width: '120px',
                                    color: 'black',
                                    backgroundColor: '#474747'
                                })
                            }}
                        />
                    </Stack>
                    <Stack direction='row' spacing={1} alignItems='center'>
                        <Typography>Chế độ hiển thị:</Typography>
                        <Select options={themes} value={editorTheme} 
                            onChange={(e) => setEditorTheme(e.value)} placeholder={editorTheme} 
                            styles={{
                                control: (baseStyles, state) => ({
                                    ...baseStyles,
                                    backgroundColor: '#474747',
                                    borderColor: '#afec3f'
                                }),
                                container: (baseStyles, state) => ({
                                    ...baseStyles,
                                    width: '120px',
                                    color: 'black',
                                    backgroundColor: '#474747'
                                })
                            }}
                        />
                    </Stack>
                    <Stack direction='row' spacing={1} alignItems='center'>
                        <Typography>Cỡ chữ</Typography>
                        <input type='range' min='10' max='24' value={editorFontSize} step='2' onChange={(event) => setEditorFontSize(event.target.value)} />
                    </Stack>
                </Stack>
                <Tooltip title='Run'>
                    <IconButton onClick={onClickRunButton}>
                        <PlayArrowIcon sx={{color: '#afec3f'}}/>
                    </IconButton>
                </Tooltip>
            </Stack>
        </Stack>
    )
}

export default Navbar;