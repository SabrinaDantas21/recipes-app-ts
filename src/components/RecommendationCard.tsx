import Card from 'react-bootstrap/Card';
import { CardPropType } from '../util/types';

function RecommendationCard(prop: CardPropType) {
  const { index, img, title, isVisible } = prop;
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

export default RecommendationCard;
