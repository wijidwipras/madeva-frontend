import Gambar from '../assets/404.png'
import '../styles/NoPage.scss'

const NoPage = () => {
    return (
      <div className='noPage'>
        <img
            src={Gambar}
            height="400"
            alt="Medeva Logo"
            />
      </div>
    );
  };
  
  export default NoPage;