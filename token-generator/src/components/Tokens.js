import React,{useEffect} from 'react'
import { Button, Typography } from "@material-ui/core";

import "../styles/tokens.css"
function Tokens(props) {

  const { inputsState, setInputState } = props;
  const { blueNo, BluetokenRow, bluePrefix } = inputsState;
  const { redNo, redPrefix, redtokenRow } = inputsState;
  const [generate, setgenerate] = React.useState(false)
  const [error, setError] = React.useState(false)
  let count = 1;

  useEffect(()=>{
    setgenerate(false)
  },[inputsState])

  const handleClear = () => {
    const object=JSON.parse(JSON.stringify(inputsState))
    Object.keys(object).forEach(key => object[key]="");
    setgenerate(false)
    setInputState({...object});
  }

  const handleInputFieldCheck = () => {
    let errorStr = 'Please enter '
    if (!Boolean(blueNo))
      errorStr += ' no. of blue tokens '
    if (!Boolean(BluetokenRow))
      errorStr += ' no. of blue row tokens'
    if (!Boolean(bluePrefix))
      errorStr += ' blue token prefix '
    if (!Boolean(redNo))
      errorStr += ' no. of red tokens '
    if (!Boolean(redtokenRow))
      errorStr += ' no. of red row tokens'
    if (!Boolean(redPrefix))
      errorStr += ' red token prefix '
   return errorStr;
  }

  const handleGenerate = () => {
    const err = handleInputFieldCheck()
    if(!(err.length<=15)) {
      setError(err)
      return;
    }
      setError("")
      setgenerate(true)
  }

  const renderEachToken = (totalTokens, tokenPrefix, tokensInARow, tokenColor) => {
    let BlueArrayHolder = [];

    for (let i = 1; i <= (tokensInARow); i++) {

      if (count <= totalTokens) {
        BlueArrayHolder.push(Token(count, tokenPrefix, tokenColor));
        count++;
      }
    }
    return BlueArrayHolder;
  }

  const Token = (count, tokenPrefix, tokenColor) => {
    return <div className={tokenColor === 'blueToken' ? "bl_bg tk_c" : "tk_c rd_bg"}>
      <div className="tk_name">{`${tokenPrefix}${count}`}</div>
      <div className="lt_cle"></div>
      <div className="rt_cle"></div>
    </div>
  }
  const renderTokens = (totalTokens, tokenPrefix, tokensInARow, tokenColor) => {
    count = 1
    if (generate) {
    let arr = Array.apply(null, Array(Math.ceil(totalTokens / tokensInARow))).map(Number.prototype.valueOf, 0);

      return arr?.map((item) => {
        return <div style={{ display: "flex", marginBottom: "10px" }}>
          {
            renderEachToken(totalTokens, tokenPrefix, tokensInARow, tokenColor)
          }

        </div>
      })
    } else {
      
    }
  }
  return (
    <div>
      <div className='tk_wrap'>
        {renderTokens(blueNo, bluePrefix, BluetokenRow, 'blueToken')}
        {renderTokens(redNo, redPrefix, redtokenRow, 'redToken')}

      </div>
      <div className='btn_wrap'>
      {error.length>=15 && <Typography style={{color:"red"}} className='helper_text' variant="body2">{error}</Typography>}

        <Button className='btn1' onClick={handleGenerate} style={{ marginRight: "15px" }} variant='contained'>Generate</Button>
        <Button className='btn2' onClick={handleClear} variant='contained'>Clear</Button>
      </div>
    </div>
  )
}

export default Tokens