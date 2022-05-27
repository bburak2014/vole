 import './App.css';
import Header from './Components/Header';
import Market from './Components/Market';
import Mycards from './Components/Mycards';
import CarouselSlider from './Components/CarouselSlider';
 
function App() {
  return (
    <div className="App ">
    
      <Header items={ ['section-1', 'section-2'] } />
      <CarouselSlider/>
      <Mycards items={ ['section-1'] }/>      

      <Market items={ ['section-2'] }/>
     </div>
  );
}

export default App;
