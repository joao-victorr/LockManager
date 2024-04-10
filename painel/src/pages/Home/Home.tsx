import './Home.css'
import { Header } from "../../Components/Header/Header";
import { Nav } from "../../Components/Nav/Nav";



export function Home() {


  return (
    
    <>
    <Header />
    <div className='home '>
      <Nav />
      <div>Home</div>
    </div>
    </>

  )

}
