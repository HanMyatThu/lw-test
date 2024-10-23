import { Toaster } from "react-hot-toast";

import { Grid } from "./grid";

const App = () => {
  const gridSize = 50;
  const data: (number | null)[][] = Array.from({ length: gridSize }, () =>
    Array(gridSize).fill(null)
  );

  return (
    <div className="h-full min-w-screen flex flex-col items-center justify-center space-y-12">
      <p className="text-xl mt-4 font-bold">Grid System</p>
      <div className="mt-5">
        <Grid gridSize={50} gridData={data} />
      </div>
      <Toaster />
    </div>
  );
};

export default App;
