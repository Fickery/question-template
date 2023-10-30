import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.scss";
import Error from "./Error";
import EndPage from "./components/EndPage";
import QuestionPage from "./components/QuestionPage";
import StartPage from "./components/StartPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <StartPage />,
    errorElement: <Error />,
  },
  {
    path: "/question",
    element: <QuestionPage />,
    errorElement: <Error />,
  },
  {
    path: "/end",
    element: <EndPage />,
    errorElement: <Error />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}

// const router = createBrowserRouter([
//   import { ErrorBoundary } from "react-error-boundary";
//   import Error from "./components/Error"; // import the Error component

//   function ErrorFallback({ error }: { error: Error }) {
//     return (
//       <div>
//         <h2>Something went wrong:</h2>
//         <p>{error.message}</p>
//       </div>
//     );
//   }

//   const routes = [
//     {
//       path: "/",
//       element: <StartPage />,
//       errorElement: (
//         <ErrorBoundary FallbackComponent={ErrorFallback}>
//           <Error /> {/* use the Error component */}
//         </ErrorBoundary>
//       ),
//     },

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" errorElement={Error} element={<StartPage />}>
//       <Route path="question" element={<QuestionPage />} />
//       <Route path="end" element={<EndPage />} />
//     </Route>,
//   ),
// );

// function App() {
//   return <RouterProvider router={router} />;
// }

// export default App;
