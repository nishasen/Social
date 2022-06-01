import React from 'react';
import { HeaderText, PostCardMapping } from '../../Components';

const Bookmark = () => {
  return (
    <div className="pages">
      <HeaderText text="My Bookmarks"/>
      <PostCardMapping bookmark={true} />
    </div>
  )
}

export { Bookmark };