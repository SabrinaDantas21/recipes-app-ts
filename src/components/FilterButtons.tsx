import { useEffect, useState } from 'react';
import { getFiltersList } from '../services/api';
import { SelectedPage } from '../util/types';

type SingleFilterType = {
  strCategory: string
};

function FilterButtons({ page }: SelectedPage) {
  const [currentFilters, setCurrentFilters] = useState<SingleFilterType[]>([]);
  // captura e salva a lista anterior aos filtros
  // pode não ser usado caso list esteja no redux
  const [previowsList, setPreviowsList] = useState([]);
  // salva lista com filtro para ser renderizada
  const [currentList, setCurrentList] = useState([]);
  // salava o botão que esta selecionado para criar a logica de toggle
  const [currentButton, setCurrentButton] = useState('');

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
    // if (filter === currentButton) {
    // setCurrentButton('');
    // return setCurrentList(previowsList);
    // }
    // setCurrentButton(filter);
    // passar o array com os itens vindos da API pela linha de baixo
    // const newList = previowsList.filter((item) => item.strCategory === filter);
    // setCurrentList(newList);
  };

  return (
    <>
      <h1>filtros</h1>
      { currentFilters.length > 0 && (
        currentFilters.slice(0, 5).map((filter, index) => (
          <button
            key={ index }
            data-testid={ `${filter.strCategory}-category-filter` }
            onClick={ () => handleClick(filter.strCategory) }
          >
            {filter.strCategory}
          </button>
        ))
      )}
    </>
  );
}

export default FilterButtons;
