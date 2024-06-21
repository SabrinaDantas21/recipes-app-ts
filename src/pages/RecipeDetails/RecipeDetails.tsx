import Button from '../../components/Button';
import styles from './RecipeDetails.module.css';

function RecipeDetails() {
  return (
    <>
      <div>RecipeDetails</div>
      <Button data-testid="start-recipe-btn" className={ styles.button }>
        Start Recipe
      </Button>
    </>
  );
}

export default RecipeDetails;
