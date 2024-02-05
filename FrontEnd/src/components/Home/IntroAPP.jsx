import { Link } from 'react-router-dom'
import image from '../../assets/images/10 Best Smartphones for Seniors.jpeg'
import image3 from '../../assets/images/How to support Black male students _ EAB.jpeg'
import image2 from '../../assets/images/Premium Photo _ Two happy best friends (1).jpeg'
import ava from '../../assets/images/second Chat App 2.png'

const IntroAPP = () => {
  return (
    <section className='bg-black text-white w-[98%] mx-auto rounded-3xl p-10 max-md:p-4 '>
      <div className="flex  gap-3 w-full md:h-[72vh] max-lg:flex-col max-md:pag-0  max-md:text-center ">
            <div className=" w-full  max-md:w-[80%] mx-auto  bg-notifi rounded-3xl flex gap-2 p-2 ">

                  <img className='rounded-3xl w-[50%]' src={image} alt="" />
                        <div className="w-full  flex flex-col gap-2">
                              <img src={image2} className='rounded-3xl w-full h-full '    alt="" />
                              <img src={image3} className='rounded-3xl w-full h-full '    alt="" />
                        </div>

            </div>
            <div className="w-full h-full ">
                  <div className=" h-full ">
                   <h1 className='text-white text-[42px] font-bold mb-10 max-md:mb-5  max-md:text-[20px] max-md:text-center max-lg:text-[30px] '>Try To Enjoy All The <br></br> Conveniences In Matcha</h1>
                  <Link className=' transition py-3 px-8 font-bold border-2   text-kfif text-sm  w-20  rounded-full hover:bg-lgrn hover:text-kfi max-md:text-[10px]  max-md:py-1.5  max-md:border-[1px]  '  to='/auth/login'>Try Matcha Now!</Link>
                  <div  className='rounded-3xl h-[53.5%] relative  max-sm:w-[80%] w-full p-3  mt-16 max-md:mt-10  max-md:hidde bg-app text-center mx-auto  flex flex-col justify-center gap-5 '>
                        <h1 className='text-black text-[40px] w-[440px] max-sm:w-full max-sm:text-[17px]   mx-auto font-semibold  max-md:text-[30px]  max-md:w-[350px]'>
                              Connect With Friends Easily And Efficiently
                        </h1>
                        <p className='text-sm text-black font-light text-cente w-[440px] max-sm:w-full  mx-auto max-sm:text-[7px]'> Experience seamless and secure remote communication with Match, the ultimate app for all your chatting . Stay connected with friends, family, and colleagues from anywhere and anytime in the world</p>
                        <div className=" absolute w-full h-full top-0 left-0 bg-gradient-to-b from-transparent from-50% to-white rounded-3xl"></div>
                  </div>

                  </div>
            </div>
      </div>
      <div className="text-[80px] py-10 max-md:py-6">
            <h1 className='relative max-md:text-[20px] max-xl:text-[40px]'>
                  Empower Your Communication Connect Globally,And Collaborate Effectively With Matcha 
                  <img className=' absolute right-20 top-[50%]  max-md:w-14  max-md:right-2  max-md:top-5'  src={ava} alt="" />
            </h1>

            
      </div>
    </section>
  )
}
export default IntroAPP