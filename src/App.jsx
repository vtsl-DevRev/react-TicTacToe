import { BrowserRouter, Link, Routes, Route } from 'react-router-dom'
import './App.css'
import MainComponent from './components/MainComponent/MainComponent'
import SuperComponent from './components/SuperComponent/SuperComponent'
import TitleComponent from './components/TitleComponent/TitleComponent'

function App() {

    return (
        // <>
        //   <TitleComponent />
        //   <SuperComponent />
        //   {/* <MainComponent /> */}
        // </>
        <BrowserRouter>
            <TitleComponent />
            <ul id='navBar'> 
                <li>
                    <Link to='/' className='link'>Home</Link>
                </li>
                <li>
                    <Link to='/super' className='link'>Super</Link>
                </li>
                {/* <li>
                    <Link to='/main'>Main</Link>
                </li> */}
            </ul>

            <Routes>
                <Route path='/' element={<MainComponent />} />
                <Route path='/super' element={<SuperComponent />} />
                {/* <Route path='/main' element={<MainComponent />} /> */}
            </Routes>
        </BrowserRouter>
    )
}

export default App