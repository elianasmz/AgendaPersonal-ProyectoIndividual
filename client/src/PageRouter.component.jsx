import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './Pages/LoginPage/LoginPage.component';
import SignUpPage from './Pages/SignUpPage/SignUpPage.component';
import TaskPage from './Pages/TaskPage/TaskPage.component'
import EventPage from './Pages/EventPage/EventPage.component';
import ClassPage from './Pages/ClassPage/ClassPage.component';

const PageRouter = (props) => {

    return (
        <BrowserRouter>
            <Routes>
                <Route index={true} path="/" element={<LoginPage />} />
                <Route path='/task/' element={<TaskPage />} />
                <Route path='/register/' element={<SignUpPage />} />
                <Route path='/events/' element={<EventPage />} />
                <Route path='/class/' element={<ClassPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default PageRouter;