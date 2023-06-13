import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import BasicWidget from "./widgets/commons/BasicWidget";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BasicWidget />}>
          <Route index element={<LoginPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;