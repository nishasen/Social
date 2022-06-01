import './App.css';
import { Navigation, SideNavigation, BottomNav, SuggestCard, Toast } from './Components';
import { Routepath } from './Routepath/Routepath';
import { useDispatch, useSelector } from 'react-redux';
import { checkLogin } from './Features';
import { getAllPost, getUser, getAllUser } from './Services';
import React, { useEffect } from 'react';

function App() {
  const { theme } = useSelector(state => state.theme)
  const { userLogin, token } = useSelector(state => state.auth)
  const dispatch = useDispatch();
  dispatch(checkLogin());
  
  useEffect(() => {
    dispatch(getUser(token, dispatch));
    dispatch(getAllPost());
    dispatch(getAllUser()); 
  }, [token])
  
  return (
    <main className={`App ${!userLogin && "App-hide"} ${theme==="light" ? "App-light" : "App-dark"}`}>
      <nav className="nav">
        <Navigation />
      </nav>
     {userLogin && <aside className="aside">
        <SideNavigation />
        <BottomNav />
      </aside>}
      <section className="body">
        <Routepath />
      </section>
      {userLogin && <aside className="people">
        <SuggestCard />
      </aside>}
      <Toast />
    </main>
  );
}

export default App;
