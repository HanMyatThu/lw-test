import { Grid } from "./grid";

const App = () => {
  const gridSize = 50;
  const data: (number | null)[][] = Array.from({ length: gridSize }, () =>
    Array(gridSize).fill(null)
  );

  return (
    <div className="h-full min-w-screen">
      Hello World
      <Grid gridSize={50} gridData={data} />
    </div>
  );
};

export default App;
