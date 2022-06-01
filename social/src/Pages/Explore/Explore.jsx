import React, { useState } from 'react';
import { AllSuggestions, Filters, HeaderText, PostCardMapping } from '../../Components';
import { Button } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { useSelector } from 'react-redux';

const Explore = () => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { allUser, token, user } = useSelector(state => state.auth);
  const Data = allUser.filter(person => person.userId!==token);
  const Users = Data?.filter(person => !user?.following?.some(data=>data?.userId===person?.userId))
  return (
    <div className="pages">
      <HeaderText text="Explore" />
      <Filters />
      <div className="all-suggestions">
        <Button size="small" color="error" endIcon={<ArrowForwardIosIcon/>} onClick={()=>setShowSuggestions(true)}>Show Suggestions</Button>
      </div>
      <AllSuggestions showSuggestions={showSuggestions} setShowSuggestions={setShowSuggestions} Users={Users} />
      <PostCardMapping explore={true}/>
    </div>
  )
}

export { Explore };