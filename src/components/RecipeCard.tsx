import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import { CardPropType } from '../util/types';
import ShareButton from './ShareButton';

function RecipeCard(prop: CardPropType) {
  const navigate = useNavigate();
  const { index, img, title, isVisible, done, category, date, tags, id, type } = prop;
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
          <Card.Text data-testid={ `${index}-horizontal-done-date` }>
            {`Done in: ${date}`}
          </Card.Text>
          <ShareButton
            dataTestidBtn={ `${index}-horizontal-share-btn` }
            url={ `http://localhost:3000/${type}s/${id}` }
          />
          { tags !== undefined
            ? tags.map((tag) => (
              <Card.Footer
                key={ index }
                data-testid={ `${index}-${tag}-horizontal-tag` }
              >
                { tag }
              </Card.Footer>
            )) : null }
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

export default RecipeCard;
