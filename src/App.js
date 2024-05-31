import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './components/page/Main';

const Home = React.lazy(() => import('./pages/Home'));
const Website = React.lazy(() => import('./pages/Mypage'));

const Festival = React.lazy(() => import('./pages/Festival-Page/festival'));
const Market = React.lazy(() => import('./pages/Market-Page/market.js'));

const RegistMenufes = React.lazy(() => import('./pages/Register/RegistMenufes'));
const RegistMenumk = React.lazy(() => import('./pages/Register/RegistMenumk'));

const SearchResult = React.lazy(() => import('./components/page/SearchResult.js'));
const Not = React.lazy(() => import('./pages/ETC/Not'));
const LoginForm = React.lazy(() => import('./pages/User/Login-Page/LoginForm.jsx'));
const FestivalMore = React.lazy(() => import('./pages/Festival-Page/festivalmore.jsx'));
const MarketMore = React.lazy(() => import('./pages/Market-Page/marketmore.jsx'));

const App = () => {
    return (
        <BrowserRouter>
            <Suspense fallback={<Main />}>
                <Routes>
                    <Route path='/MarketWeb' element={<Home />} />
                    <Route path='/' element={<Home />} />
                    <Route path="/website" element={<Website />} />
                  
                    <Route path="/RegistMenumk" element={<RegistMenumk />} />
                    <Route path="/RegistMenufes" element={<RegistMenufes />} />
                    <Route path="/search/:searchKeyword" element={<SearchResult />} />
                    <Route path="/LoginForm" element={<LoginForm />} />
                    <Route path="*" element={<Not />} />

                    <Route path="/Festival" element={<Festival />} />
                    <Route path="/Market" element={<Market />} />
                    <Route path="/Festival/:index" element={<FestivalMore />} />
                    <Route path="/Market/:index" element={<MarketMore />} />
                    <Route path="/춘천중앙시장.html" element={<iframe src="/춘천중앙시장.html" width="500" height="400" title="춘천중앙시장 지도"></iframe>} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}

export default App;
