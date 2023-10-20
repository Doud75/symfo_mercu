import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import NeedAuth from "./Routes/NeedAuth";
import UserList from "./Component/UserList";
import Login from "./Routes/Login";
import Home from "./Routes/Home";
import Conversation from "./Routes/Conversation";
import UserProvider from "./Context/UserContext";

function App() {
    return (
        <UserProvider>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={
                        <NeedAuth>
                            <Home/>
                        </NeedAuth>
                    }/>
                    <Route path='/conversation/:id' element={
                        <NeedAuth>
                            <Conversation/>
                        </NeedAuth>
                    }/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/user-list' element={
                        <NeedAuth>
                            <UserList/>
                        </NeedAuth>
                    }/>
                </Routes>
            </BrowserRouter>
        </UserProvider>
    );
}

export default App;
