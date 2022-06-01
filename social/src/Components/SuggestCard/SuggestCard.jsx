import { Typography, Button, Box } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import React, { useEffect, useState } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import './SuggestCard.css';
import '../ProfileConnect/ProfileConnect.css';
import { useDispatch, useSelector } from 'react-redux';
import { setOtherUser } from '../../Features';
import { useNavigate } from 'react-router-dom';
import { FollowUser, UnfollowUser } from '../../Services';
import { GetUsername } from '../../Utilities';
import { AllSuggestions } from '..';

const SuggestCard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [search, setSearch] = useState('');
    const { theme } = useSelector(state => state.theme)
    const { allUser, token, user, loading } = useSelector(state => state.auth);
    const Data = allUser.filter(person => person.userId!==token);
    const Users = Data?.filter(person => !user?.following?.some(data=>data?.userId===person?.userId))
    const TrimUsers = Users.length > 4 ? Users.slice(0, 4) : Users;
    const [debounceText, setDebounceText] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    const updateDebounceSearch = debounce(text => {
      setDebounceText(text); 
    }, 1000)

    const handleChange = (e) => {
      setSearch(e.target.value)
      updateDebounceSearch(e.target.value)
    }

    function debounce (cb, delay) {
      let timeout;
      return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(()=>{
          cb(...args)
        }, delay)
      }
    }

    useEffect(()=> {
      setFilteredData(Data.filter(user => user?.data?.firstname.toLowerCase().includes(debounceText) || user?.data?.lastname.toLowerCase().includes(debounceText)))
    }, [debounceText])
    console.log(filteredData)
  return (
    <div className="suggest-card">
        <input type="search" value={search} placeholder="Search" className={`search ${theme==="light" ? "search-light" : "search-dark"}`} onChange={(e)=>handleChange(e)}/>
        {(search && filteredData?.length!==0) &&
          <Box sx={{
            width: "80%",
            height: "max-content",
            position: "absolute",
            top: "2.5rem",
            zIndex: 2,
            borderRadius: "0.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            p: 1,
            backgroundColor: "var(--bg-modal-dark)",
          }}>
            {filteredData?.map(user => 
            <div className="profile-card-detail search-card" onClick={()=>{
              dispatch(setOtherUser(user))
              navigate(`/user/${GetUsername(user?.userId, allUser)}`, {replace: true})
              setFilteredData([])
              setSearch('')}}>
              <img 
                  src={user?.data?.avatar} 
                  alt="profile" 
                  className="profile-img profile profile-md"/> 
              <Typography 
                  variant="body1"
                  className="search-text">{user?.data?.firstname + " " + user?.data?.lastname}</Typography>   
            </div>)}
          </Box>
        }
        <Typography variant="h6" color={theme==="light" ? "black" : "white"}>Suggestions <Button size="small" color="error" endIcon={<ArrowForwardIosIcon/>} onClick={()=>setShowSuggestions(true)}>Show more</Button></Typography>
        <div className="profile-mapping">
            {TrimUsers?.length===0 ? 
            <Typography variant="h6" sx={{textAlign: "center", color: theme==="light"? "var(--black)": "var(--white)"}}>No suggestions 😴</Typography>
            :
            TrimUsers.map(peer => 
            <div className="profile-card" key={peer?.userId}>
                <div className="profile-card-detail" onClick={()=>{
                  dispatch(setOtherUser(peer))
                  navigate(`/user/${GetUsername(peer?.userId, allUser)}`, {replace: true})}}>
                    <img 
                        src={peer?.data?.avatar} 
                        alt="profile" 
                        className="profile-img profile profile-md"/> 
                    <Typography 
                        variant="body1" 
                        color={theme==="light" ? "black" : "white"} 
                        className="user-name-large">{peer?.data?.firstname + " " + peer?.data?.lastname}</Typography>   
                </div>
                {peer?.data?.follower?.some(person => person.userId === token) ?
                  <LoadingButton
                    loading={loading}  
                    size="small" 
                    variant="outlined" 
                    onClick={()=>UnfollowUser(token, peer, user, dispatch)}>
                    Following
                  </LoadingButton>
                   :
                  <LoadingButton
                    loading={loading}  
                    size="small" 
                    variant="contained" 
                    onClick={()=>FollowUser(token, peer, user, dispatch)}>
                    Follow
                  </LoadingButton>} 
            </div>)}
            <AllSuggestions showSuggestions={showSuggestions}
                        setShowSuggestions={setShowSuggestions}
                        Users={Users}/>
        </div>
    </div>
  )
}

export { SuggestCard };