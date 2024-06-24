import { useState } from 'react';
import Button from '../Button/Button';
import shareBtn from '../../images/shareIcon.svg';
import closeBtn from '../../images/closeIcon.svg';
import './ShareButton.css';

function ShareButton({ dataTestidBtn = '', url = '' }) {
  const [msgIsVisible, setMsgIsVisible] = useState(false);

  const handleShareBtn = async () => {
    if (msgIsVisible === false) {
      await navigator.clipboard.writeText(url);
      setMsgIsVisible(true);
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
        <div className="copied-message-box">
          <div className="lil-triangle" />
          <div className="copied-message">
            <p>Link copied!</p>
            <Button src={ closeBtn } onClick={ handleShareBtn } />
          </div>
        </div>
      )}
    </>
  );
}
export default ShareButton;
