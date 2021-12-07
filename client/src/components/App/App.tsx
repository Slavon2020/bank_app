import AppRoutes from '../../routes/AppRoutes';
import Header from '../Header/Header';


const App = () => {
  return (
    <div className="App">
      <Header />
      <AppRoutes />
    </div>
  );
}

export default App;
