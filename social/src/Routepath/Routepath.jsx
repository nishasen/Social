import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { RequireAuth, NoAuth, ProfileNavigate } from '../Components';
import { 
  Home,
  Explore,
  Notification,
  Bookmark,
  Profile,
  User,
  Setting,
  Signup,
  Error404, 
  Landing} from '../Pages';

const Routepath = () => {
  return (
    <Routes>
      <Route element={<NoAuth />}>
        <Route path="/" element={<Landing />}/>
        <Route path="/signup" element={<Signup />}/>
      </Route>
      <Route element={<RequireAuth />}>
        <Route path="/home" element={<Home />}/>
        <Route path="/explore" element={<Explore />}/>
        <Route path="/notification" element={<Notification />}/>
        <Route path="/bookmark" element={<Bookmark />}/>
        <Route path="/profile" element={<Profile />}/>
        <Route element={<ProfileNavigate />}>
          <Route path="/user/:username" element={<User />}/>
        </Route>
        <Route path="/setting" element={<Setting />}/>
        <Route path="/error404" element={<Error404 />}/>
      </Route>
    </Routes>
  )
}

export { Routepath };

//<Route element={<NoAuth />}>
