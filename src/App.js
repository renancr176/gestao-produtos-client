import AppRoutes from "./routes";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from './contexts/AuthContext';
import { PageSettingsProvider } from './contexts/PageContext';
import useTheme from "./hooks/theme";

function App() {
	useTheme("default");
	return (
		<BrowserRouter>
			<AuthProvider>
				<PageSettingsProvider>
						<AppRoutes />
				</PageSettingsProvider>
			</AuthProvider>
		</BrowserRouter>
	);
}

export default App;
