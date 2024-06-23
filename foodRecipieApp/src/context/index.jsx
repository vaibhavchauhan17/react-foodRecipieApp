import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [searchParam, setSearchParam] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipieList, setRecipieList] = useState([]);
  const [recipeDetailsData, setRecipeDetailsData] = useState(null);
  const [favList, setFavList] = useState([]);

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(
        `https:forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`
      );
      const data = await res.json();

      if (data?.data?.recipes) {
        setRecipieList(data?.data?.recipes);
        setLoading(false);
        setSearchParam("");
        navigate("/");
      }
    } catch (e) {
      setLoading(false);
      console.log(e);
      setSearchParam("");
    }
  }
  function handleAddToFav(getCurrentItem) {
    let cpyFavList = [...favList];
    const index = cpyFavList.findIndex((item) => item.id === getCurrentItem.id);
    if (index === -1) {
      cpyFavList.push(getCurrentItem);
    } else {
      cpyFavList.splice(index);
    }
    setFavList(cpyFavList);
    console.log(favList);
  }

  return (
    <GlobalContext.Provider
      value={{
        searchParam,
        favList,
        handleAddToFav,
        loading,
        recipeDetailsData,
        setRecipeDetailsData,
        recipieList,
        setSearchParam,
        handleSubmit,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
