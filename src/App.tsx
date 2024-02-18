import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AuthProvider from './components/AuthProvider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navbar from './components/Navbar';
import Signin from './components/guest/Signin';
import Root from './components/Root';
import GuestRoutes from './components/guest/GuestRoutes';
import AuthRoutes from './components/auth/AuthRoutes';
import Settings from './components/auth/Settings';
import NotFound from './components/NotFound';
import Signup from './components/guest/Signup';
import UserRoutes from './components/user/UserRoutes';
import CreatePoll from './components/user/CreatePoll';

function App() {
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <BrowserRouter>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Root />} />
                        <Route element={<GuestRoutes />}>
                            <Route path="signin" element={<Signin />} />
                            <Route path="signup" element={<Signup />} />
                        </Route>
                        <Route element={<AuthRoutes />}>
                            <Route path="settings" element={<Settings />} />
                        </Route>
                        <Route element={<UserRoutes />}>
                            <Route path="create" element={<CreatePoll />} />
                        </Route>
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </BrowserRouter>
                <ReactQueryDevtools initialIsOpen={false} />
            </AuthProvider>
        </QueryClientProvider>
    );
}

export default App;
