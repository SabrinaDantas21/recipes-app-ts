import { useState } from 'react';
import Button from './Button';
import shareBtn from '../images/shareIcon.svg';

function ShareButton({ dataTestidBtn = '', url = '' }) {
  const [msgIsVisible, setMsgIsVisible] = useState(false);

  const readClipBoard = () => {
    navigator.clipboard.readText().then((clipText) => console.log(clipText));
  };
  const handleShareBtn = async () => {
    if (msgIsVisible === false) {
      await navigator.clipboard.writeText(url);
      setMsgIsVisible(true);
      readClipBoard();
    } else {
      setMsgIsVisible(false);
    }
  };

  return (
    <>
      <Button
        dataTestid={ dataTestidBtn }
        onClick={ handleShareBtn }
        src={ shareBtn }
      />
      {msgIsVisible === true && (
        <>
          <p>Link copied!</p>
          <Button text="fechar" onClick={ handleShareBtn } />
        </>
      )}
    </>
  );
}
export default ShareButton;
