import React,{useState,useEffect} from 'react';
import Dropdown from '../Dropdown/Dropdown';
 

export default function Backend_test(){
    const [test, setTest] = useState([])

    useEffect(()=> {
        fetch('/state').then(response => {
            if(response.ok){
               return response.json() 
            }
        }).then(data => console.log(data))
    },[])

return(
    <>
    <Dropdown></Dropdown>
    </>
    )
}


