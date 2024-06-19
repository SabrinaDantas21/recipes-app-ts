import { useNavigate } from 'react-router-dom';

function InProgressRecipes() {
  const navigate = useNavigate();
  return (
    <button onClick={ () => navigate('/done-recipes') }> oi</button>
  );
}

export default InProgressRecipes;
