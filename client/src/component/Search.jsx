import React, { useEffect, useState } from 'react';
import MasonryLayout from './MasonryLayout';
import { client } from '../client';
import { feedQuery, searchQuery } from '../utils/data';
import Spinner from './Spinner';

function Search({searchTerm}) {
  const [pins, setpins] = useState(null);
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    if(searchTerm){
      setLoading(true);
      const query=searchQuery(searchTerm.toLowerCase());
      client.fetch(query).then((d)=>{
        setpins(d);
        setLoading(false);
      })
    }else{
      client.fetch(feedQuery).then((d)=>{
        setpins(d);
        setLoading(false);
      })
    }
  }, [searchTerm])
  
  
  return (
    <div>
      {Loading && <Spinner message="Searching for Pins..."/>}
      {pins?.length!==0 && <MasonryLayout pins={pins}/>}
      {pins?.length===0 && searchTerm!=='' && !Loading && (
        <div className='mt-10 text-center text-xl'>No Pins Found.</div>
      )}
    </div>
  )
}

export default Search