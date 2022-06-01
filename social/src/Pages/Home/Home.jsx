import React from 'react';
import { CreatePost, HeaderText, PostCardMapping } from '../../Components';

const Home = () => {

  return (
    <div className="pages">
      <HeaderText text="Home"/>
      <CreatePost />
      <PostCardMapping home={true}/>
    </div>
  )
}

export { Home };