import React,{useState,useEffect} from 'react';
import Dropdown from '../Dropdown/Dropdown';
 

export default function Card(){
    const [test, setTest] = useState([])

    useEffect(()=> {
        fetch('/api').then(response => {
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


