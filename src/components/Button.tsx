import { ButtonType } from '../util/types';
import './Button.css';

function Button({
  children = '',
  className = '',
  type = 'button',
  dataTestid = '',
  dataTestidBtn = '',
  onClick,
  src = '',
  alt = '',
  disabled = false,
  text = '' }: ButtonType) {
  return (
    <button
      className={ className }
      data-testid={ dataTestidBtn }
      type={ type }
      onClick={ onClick }
      disabled={ disabled }
    >
      {src ? (
        <img
          data-testid={ dataTestid }
          src={ src }
          alt={ alt }
        />
      ) : (
        children
      )}
      {text !== '' && text}
    </button>
  );
}

export default Button;
