import { useState } from 'react'
import { createContext } from 'react'
import './App.css'
import { Login } from './components/userComponent/Login'
import { Register } from './components/userComponent/register'
import { Route, Routes } from 'react-router-dom'
import { Open } from './components/otherComponents/Open'
import { Home } from './components/otherComponents/Home'
import { FullDetails } from './components/userComponent/fullDetails'
import { Albums } from './components/albumComponents/Albums'
import { Album } from './components/albumComponents/Album'
import { Posts } from './components/postComponents/Posts'
import { Post } from './components/postComponents/Post'
import { Todos } from './components/todoComponents/Todos'
import { NotFound } from './components/otherComponents/NotFound'
export const UserContext = createContext();
export const ReRenderContext = createContext();
function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [rerender, setRerender] = useState(true)
  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      <ReRenderContext.Provider value={{ setRerender, rerender }}>
        <Routes>
          <Route index element={<Open />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Register' element={<Register />} />
          <Route path='/Register/FullDetails' element={<FullDetails />} />
          <Route path='/users/:userId/Home' element={<Home />} />
          <Route path='/users/:userId/Home/Albums' element={<Albums />} />
          <Route path='/users/:userId/Home/Albums/:albumId' element={<Album />} />
          <Route path='/users/:userId/Home/Posts' element={<Posts />} />
          <Route path='/users/:userId/Home/Posts/:postId' element={<Post />} />
          <Route path='/users/:userId/Home/Todos' element={<Todos />} />
          <Route path='*' element={<NotFound />}/>
        </Routes>
      </ReRenderContext.Provider>
    </UserContext.Provider >
  )
}

export default App;
