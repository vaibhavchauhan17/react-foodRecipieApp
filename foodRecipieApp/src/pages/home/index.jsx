import { useContext } from "react"
import { GlobalContext } from "../../context"
import RecipeItem from "../../components/recipie-item";

export default function Home(){
    const {loading, recipieList} = useContext(GlobalContext);

    if(loading) return <div>Loading... Please wait</div>

    return <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10">
        {
            recipieList && recipieList.length >0 ?
            recipieList.map((item) => <RecipeItem item={item}/>)
            :<div>
                <p className="lg:text-4xl text-xl text-center text-black font-extrabold">Nothing to show Please search something</p>
            </div>
        }
    </div>
}