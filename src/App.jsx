import './App.css';
import TargetTemperatureCircle from './components/TargetTemperatureCircle';

function App() {
  const minTemperature = 0;
  const maxTemperature = 40;
  const currentTemperature = 22;

  return (
    <div className="App">
      <TargetTemperatureCircle
        minTemperature={minTemperature}
        maxTemperature={maxTemperature}
        currentTemperature={currentTemperature}
      />
    </div>
  );
}

export default App;
