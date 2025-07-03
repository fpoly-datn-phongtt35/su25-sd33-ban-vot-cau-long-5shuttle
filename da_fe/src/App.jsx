import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes';
import DefaultLayout from './components/Layout/DefaultLayout';

function App() {
    return (
        <Router>
            <Routes>
                {publicRoutes.map((route, index) => {
                    const Page = route.component;
                    const Layout = route.layout ?? DefaultLayout;

                    // Nếu route có children thì render nested Route
                    if (route.children) {
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            >
                                {route.children.map((child, i) => {
                                    const ChildPage = child.component;
                                    return (
                                        <Route
                                            key={i}
                                            path={child.path}
                                            element={<ChildPage />}
                                        />
                                    );
                                })}
                            </Route>
                        );
                    }

                    // Route không có children
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <Layout>
                                    <Page />
                                </Layout>
                            }
                        />
                    );
                })}
            </Routes>
        </Router>
    );
}

export default App;