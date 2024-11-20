import useHttp from "./Hooks/useHttp.js";
import MealItem from "./MealItem.jsx";
import Error from "./Error.jsx";

const config ={}

export default function Meals(){

 //fetching data
const {data :loadedmeals , isLoading , error} = useHttp('http://localhost:3000/meals', config , []);

 if(isLoading){
   return ( <p className="center">Fetching Meals Data ...</p> );
 }


 //Error meassage if the meals data is not fetched 
 if(error){
    return <Error title={"Failed to Fetch Meals Data"} message={error}></Error>
 }
   
return <ul id = 'meals'>
    {loadedmeals.map((meal)=>(
        <MealItem  key ={meal.id} meal={meal}/>
    ))}
</ul>
}