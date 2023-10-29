import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import QuestionPage from "./components/QuestionPage";
import "./App.scss";
import StartPage from "./components/StartPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<QuestionPage />}>
      <Route path="question" element={<QuestionPage />} />
    </Route>,
  ),
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
