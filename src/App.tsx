import { Outlet } from "react-router";

function App() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
