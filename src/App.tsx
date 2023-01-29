import "./App.css";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import SingleCoin from "./components/SingleCoin";
function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: true,
        refetchOnMount: true,
      },
    },
  });
  return (
    <section className="app">
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/singlecoin/:id" element={<SingleCoin />} />
        </Routes>
      </QueryClientProvider>
    </section>
  );
}

export default App;
