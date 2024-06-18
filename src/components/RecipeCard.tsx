import Card from 'react-bootstrap/Card';
import { CardPropType } from '../util/types';
import ShareButton from './ShareButton';

function RecipeCard(prop: CardPropType) {
  const { index, img, title, isVisible, done, category, date, tags } = prop;
  if (done) {
    const url = prop?.url;
    const newUrl = url?.slice(1, url.length - 12).toString();
    console.log(newUrl);
    return (
      <Card
        data-testid={ `${index}-recommendation-card` }
        style={ { width: '18rem' } }
      >
        <Card.Img
          data-testid={ `${index}-horizontal-image` }
          src={ img }
        />
        <Card.Body>
          <Card.Title
            data-testid={ `${index}-horizontal-name` }
          >
            { title }
          </Card.Title>
          <Card.Subtitle data-testid={ `${index}-horizontal-top-text` }>
            { category }
          </Card.Subtitle>
          <Card.Text data-testid={ `${index}-horizontal-done-date` }>
            {`Done in: ${date}`}
          </Card.Text>
          <ShareButton
            dataTestidBtn={ `${index}-horizontal-share-btn` }
            url={ `http://localhost:3000/${newUrl}` }
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
      <Card.Img variant="top" src={ img } />
      <Card.Body>
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
