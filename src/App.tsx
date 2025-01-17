// App.tsx

import React from 'react';
import { Provider } from 'react-redux';
import { Container } from 'react-bootstrap';
// import { store } from './app/store';  // Import your Redux store
// import {store}
import store from "./app/store.ts";
import Header from './components/Header';
import Footer from './components/Footer';
import AppRoutes from './routes/AppRoutes';  // Import your existing AppRoutes

const App: React.FC = () => {
    return (
            <Provider store={store}>
                <div className="app">
                    {/* Header */}
                    <Header/>

                    <Container className="main-content">
                        {/* Use AppRoutes for routing */}
                        <AppRoutes/>
                    </Container>

                    {/* Footer */}
                    {/*<Footer/>*/}
                </div>
            </Provider>
    );
}

export default App;
