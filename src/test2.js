import { createContext, useContext, useEffect, useReducer } from "react";
import { AppContext } from "./productcontext";
import reducer from "../reducer/FilterReducer";

const FilterContext = createContext();

const initialState = {
    filter_products: [],
    all_products:[],
    grid_view: false,
    list_view: true,
    filter : {
        category : "all"
    }
};

const FilterContextProvider=({children})=>{

  const [state, dispatch] = useReducer(reducer, initialState);

   const { products } =  useContext(AppContext);
  
    const setGridView=()=> 
    {
    return dispatch({type:"GRID_VIEW"});
    }
    const setListView=()=> 
    {
    return dispatch({type:"LIST_VIEW"});
    }


    const catWise = (event) => {
        console.log("i m catwise")
        let name = event.target.name;
        let value = event.target.value;
        console.log("i m catwise")
        return   dispatch({type:"CATFILTER", payload: {name , value}});
    }

    
    useEffect(()=>{
         dispatch({type:"FILTERCAT"})
         console.log("i m useeffect")
    },[ state.filter])

    useEffect(()=>{
       dispatch({type:"ALL_DATA_LOADED" , payload: products})
    },[products])

    return(
        <FilterContext.Provider value={{...state , setGridView , setListView ,  catWise}}>
            {children}
        </FilterContext.Provider>
    )
};

export {FilterContext , FilterContextProvider}