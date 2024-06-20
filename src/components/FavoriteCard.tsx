import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import { CardPropType } from '../util/types';
import ShareButton from './ShareButton';
import FavoriteInteractivesBtn from './FavoriteInteractiveBtn';

function FavoriteCard(prop: CardPropType) {
  const navigate = useNavigate();
  const { index, img, title, isVisible, done, category, id, type } = prop;
  if (done) {
    return (
      <Card
        data-testid={ `${index}-recommendation-card` }
        style={ { width: '18rem' } }
      >
        <Card.Body>
          <Card.Link onClick={ () => { navigate(`/${type}s/${id}`); } }>
            <Card.Img
              data-testid={ `${index}-horizontal-image` }
              src={ img }
            />
            <Card.Title
              data-testid={ `${index}-horizontal-name` }
            >
              { title }
            </Card.Title>
          </Card.Link>
          <Card.Subtitle data-testid={ `${index}-horizontal-top-text` }>
            { category }
          </Card.Subtitle>
          <FavoriteInteractivesBtn />
          <ShareButton
            dataTestidBtn={ `${index}-horizontal-share-btn` }
            url={ `http://localhost:3000/${type}s/${id}` }
          />
        </Card.Body>
      </Card>
    );
  }
  return (
    <Card
      data-testid={ `${index}-recommendation-card` }
      style={ { width: '18rem', visibility: isVisible ? 'visible' : 'hidden' } }
    >
      <Card.Body>
        <Card.Img variant="top" src={ img } />
        <Card.Title
          data-testid={ `${index}-recommendation-title` }
        >
          { title }
        </Card.Title>
      </Card.Body>
    </Card>
  );
}

export default FavoriteCard;
