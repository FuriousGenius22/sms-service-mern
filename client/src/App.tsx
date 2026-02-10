import { AppRoutes } from "./app/routes";
import { LanguageProvider } from "./contexts/LanguageContext";
import "./globals.css";

export default function App() {
  return (
    <LanguageProvider>
      <AppRoutes />
    </LanguageProvider>
  );
}
