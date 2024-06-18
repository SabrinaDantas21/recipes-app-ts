import { useState } from 'react';
import Button from './Button';
import shareBtn from '../images/shareIcon.svg';

function ShareButton({ dataTestidBtn = '' }) {
  const url = window.location.href;

  const [msgIsVisible, setMsgIsVisible] = useState(false);

  const handleShareBtn = async () => {
    if (msgIsVisible === false) {
      setMsgIsVisible(true);
      await navigator.clipboard.writeText(url);
    } else {
      setMsgIsVisible(false);
    }
  };

  return (
    <>
      <Button
        dataTestidBtn={ dataTestidBtn }
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
