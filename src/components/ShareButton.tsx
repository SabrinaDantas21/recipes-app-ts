import { useState } from 'react';
import Button from './Button';
import shareBtn from '../images/shareIcon.svg';

function ShareButton({ dataTestidBtn = '' }) {
  const [msgIsVisible, setMsgIsVisible] = useState(false);
  const url = window.location.href.toString();

  const readClipBoard = () => {
    navigator.clipboard.readText().then((clipText) => console.log(clipText));
  };
  const handleShareBtn = async () => {
    if (msgIsVisible === false) {
      setMsgIsVisible(true);
      await navigator?.clipboard?.writeText(url);
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
