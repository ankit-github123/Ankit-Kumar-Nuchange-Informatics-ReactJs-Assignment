import React, { useState } from 'react'
import { Box, TextField, Typography } from "@material-ui/core";
import { inputField } from '../utils/inputFields';
import Tokens from './Tokens';
import "../styles/inputfields.css"

function InputFields() {

    const getInputStates = () => {
        const InputObj = {};
        inputField.forEach((inputFieldObj) => {
            InputObj[inputFieldObj.name] = ""
        })
        return InputObj;
    }

    const [inputsState, setInputState] = useState(getInputStates())

    const setInputChange = (e) => {
        const { name, value } = e.target;
        setInputState({ ...inputsState, [name]: value })
    }

    const renderInputFields = () => {
        return inputField.map((input) => {
            return (
                <div className='input_container'>
                    <Typography className='helper_text' variant="body2">{input.title}</Typography>
                    <div className="input_box">
                        <TextField
                            required
                            name={input.name}
                            type={input.type}
                            placeholder={input.placeholder}
                            className="in"
                            variant="outlined"
                            size='small'
                            value={inputsState[input.name]}
                            onChange={setInputChange}
                        />
                    </div>
                </div>
            )
        })
    }
    return (
        <div className='inputFileds_container'>
            <div className='row'>
                <Box className='col-lg-3'>
                    {renderInputFields()}

                </Box>
                <div className='col-lg-9'>
                    {<Tokens setInputState={setInputState} inputsState={inputsState} />}
                </div>
            </div>

        </div>
    )
}

export default InputFields