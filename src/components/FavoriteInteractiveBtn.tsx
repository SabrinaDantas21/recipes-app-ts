import isFavoriteBtn from '../images/blackHeartIcon.svg';
import Button from './Button';
import { FavoriteRecipesType } from '../util/types';

type RmvFavoriteType = {
  id: string | undefined
  remove: (itemId: string | undefined) => void
  index: string
};

function FavoriteInteractivesBtn({ id, remove, index }: RmvFavoriteType) {
  return (
    <div>
      <Button
        dataTestid={ `${index}-horizontal-favorite-btn` }
        onClick={ () => remove(id) }
        src={ isFavoriteBtn }
      />
    </div>
  );
}
export default FavoriteInteractivesBtn;
