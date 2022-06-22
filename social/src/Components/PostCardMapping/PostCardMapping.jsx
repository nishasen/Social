import React from 'react';
import { PostCard, NotificationCard } from '..';
import './PostCardMapping.css';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import Post from '../../Assets/Post.svg';

const Posts = [1, 2, 3, 4, 5, 6]
const PostCardMapping = ({home, explore, bookmark, profile, user, notification}) => {
  let { username } = useParams();
  const { theme } = useSelector(state => state.theme);
  const { allUser, user:currentUser, token } = useSelector(state => state.auth);
  const { posts } = useSelector(state => state.post);
  const userId = allUser?.find(user => user?.data?.username===username)?.userId;
  const firstname = allUser?.find(user => user?.data?.username===username)?.data?.firstname;
  const publicPost = posts?.filter(post => post.data.privacy === "public");
  const homePost = posts?.filter(post => post.data.userId===token || currentUser?.following?.find(user => user?.userId===post.data.userId)).sort((a, b) => new Date(b?.data?.date) - new Date(a?.data?.date));
  const bookmarkedPost = posts?.filter(post => currentUser?.bookmarks?.find(data=>data?.postId===post?.postId)).sort((a, b) => new Date(b?.data?.date) - new Date(a?.data?.date));
  const userPost = posts?.filter(post => post.data.userId === token).sort((a, b) => new Date(b?.data?.date) - new Date(a?.data?.date));
  const otherUserPost = posts?.filter(post => post.data.userId === userId).sort((a, b) => new Date(b?.data?.date) - new Date(a?.data?.date));
  const otherUserPublicPost = posts?.filter(post => post?.data?.userId === userId && post?.data?.privacy === "public").sort((a, b) => new Date(b?.data?.date) - new Date(a?.data?.date));
  return (
    <div className="postcard-mapping">
      {home &&
      <> 
      {homePost?.length!==0 ? 
        homePost?.map(post => <PostCard post={post} key={post.postId}/>)
        :
        <>
          <Typography 
            variant="h6" 
            sx={{textAlign: "center", 
                color: theme==="light"? "var(--black)": "var(--white)"}}>
              Follow people or post to view posts here
          </Typography>
          <img src={Post} alt="post" className="home-post"/>
        </>}
      </>
      }
      {explore && publicPost?.map(post => <PostCard post={post} key={post.postId}/>)}
      {bookmark && bookmarkedPost?.map(post => <PostCard post={post} key={post.postId}/>)}
      {profile && userPost?.map(post => <PostCard post={post} key={post.postId}/>)}
      {user &&
        <> 
          {currentUser?.following?.some(person => person?.userId===userId) ?
          otherUserPost?.map(post => <PostCard post={post} key={post.postId}/>)
          :
          otherUserPublicPost?.length===0 ? 
          <Typography 
          variant="h6" 
          sx={{textAlign: "center", color: theme==="light"? "var(--black)": "var(--white)"}}>
            {`Follow ${firstname} to view posts 😏`} 
          </Typography>
          :
          otherUserPublicPost?.map(post => <PostCard post={post} key={post.postId}/>)
          }
        </>}
      {notification && Posts?.map(post => <NotificationCard />)} 
    </div>
  )
}

export { PostCardMapping };
