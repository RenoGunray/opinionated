import { useState, useEffect } from "react";
import React from "react";
import { useParams } from "react-router-dom";


const FullArg = () => {
 
  const {id} = useParams();
  
  const [args, setArgs] = useState('');

  useEffect(() => {
    const arg_fetch = async () => {
      try {
        const fetchArg = await fetch(`http://localhost:8800/full-arg/${id}`);
        const json = await fetchArg.json();
        console.log(json);
        if (fetchArg.ok) {
          setArgs(json);
        }
      } catch (e) {
        console.error("An error occured in trying to fetch Args");
      }
    }
    arg_fetch()
  }, [id])

  return <>
    <div className="uni-padding">
      {args && (

          <div className="card w-75 m-auto">
            <h1> {args.title} </h1>
            <h4> {args.author.username} </h4>
            <div dangerouslySetInnerHTML={{__html: args.body}} />
          </div>
      )}
    </div>
  </>
}

export default FullArg