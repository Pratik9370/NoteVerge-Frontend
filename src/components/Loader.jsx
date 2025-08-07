import Loader_json from '../assets/loading.json'

const Loader = () => {
  return (
    <div className='' style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <lottie-player
        src={Loader_json} // Path to your Lottie JSON
        background="transparent"
        speed="1"
        loop
        autoplay
        style={{ width: '50%', height: '50%' }}>
      </lottie-player>
    </div>
  );
};

export default Loader;
