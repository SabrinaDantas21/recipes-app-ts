import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getFiltersList } from '../../services/api';
import { DispatchType, FilterButtonsType, SingleFilterType } from '../../util/types';
import { setAllDrinksList, setAllMealsList } from '../../redux/actions';
import { drinkImages, mealImages, allFilterImages } from './typos';
import './FilterButtons.css';

function FilterButtons({ page, setActiveFilter, activeFilter }: FilterButtonsType) {
  const dispatch: DispatchType = useDispatch();
  const [currentFilters, setCurrentFilters] = useState<SingleFilterType[]>([]);

  useEffect(() => {
    const handleListAPI = async () => {
      if (page === 'meals') {
        const data = await getFiltersList(page);
        setCurrentFilters(data.meals);
      }

      if (page === 'drinks') {
        const data = await getFiltersList(page);
        setCurrentFilters(data.drinks);
      }
    };

    handleListAPI();
  }, []);

  const handleClick = (filter: string) => {
    if (page === 'meals') {
      if (filter === activeFilter) {
        setActiveFilter('');
        return dispatch(setAllMealsList());
      }
      setActiveFilter(filter);

      return dispatch(setAllMealsList(filter));
    }

    if (page === 'drinks') {
      if (filter === activeFilter) {
        setActiveFilter('');
        return dispatch(setAllDrinksList());
        // return setCurrentList(previowsList);
      }
      setActiveFilter(filter);

      return dispatch(setAllDrinksList(filter));
    }
  };

  const allUrl = page === 'meals' ? allFilterImages[0] : allFilterImages[1];

  return (
    <div className="category-btns-container">
      {currentFilters.length > 0 && (
        currentFilters.slice(0, 5).map((filter, index) => {
          const imageUrl = page === 'meals' ? mealImages[index] : drinkImages[index];

          return (
            <button
              key={ index }
              data-testid={ `${filter.strCategory}-category-filter`.toLowerCase() }
              onClick={ () => handleClick(filter.strCategory) }
            >
              <img
                src={ imageUrl }
                alt={ filter.strCategory }
              />
              {/* {filter.strCategory} */}
            </button>
          );
        })
      )}
      <button
        data-testid="All-category-filter"
        onClick={ () => handleClick(activeFilter) }
      >
        <img
          className=""
          src={ allUrl }
          alt="All Filter Button Logo"
        />
      </button>
    </div>
  );
}

export default FilterButtons;
