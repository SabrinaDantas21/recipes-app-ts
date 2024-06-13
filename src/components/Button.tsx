import { ButtonType } from '../util/types';

function Button({
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
      data-testid={ dataTestidBtn }
      type={ type }
      onClick={ onClick }
      disabled={ disabled }
    >
      {src !== '' && (
        <img
          data-testid={ dataTestid }
          src={ src }
          alt={ alt }
        />
      )}
      {text !== '' && text}
    </button>
  );
}

export default Button;
