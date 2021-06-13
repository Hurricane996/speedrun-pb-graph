import React from "react";
import {useParams} from 'react-router-dom';

const UserPage = () => {
    let {id} = useParams<{id?: string}>();
    
    return (
      <p>{id}</p>
    )
  }

export default UserPage;