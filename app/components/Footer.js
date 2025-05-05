const Footer = () => {
    return (
      <footer className="bg-gray-900 text-gray-100 p-6 ">
        <div className=" container mx-auto px-4 ">
          {/* Top Section */}
          <div className="flex flex-col md:flex-row gap-8 mb-8 ">
            {/* For Users Section */}
            <div className="flex-1 mx-50">
              <h3 className="font-bold text-lg mb-4 text-white"> For Users</h3>
              <div className="flex gap-8">
                <ul className="space-y-2 flex-1">
                  <li className="hover:text-white cursor-pointer">Name</li>
                  <li className="hover:text-white cursor-pointer">Quests</li>
                  <li className="hover:text-white cursor-pointer">Communities</li>
                  <li className="hover:text-white cursor-pointer">User Center</li>
                  <li className="hover:text-white cursor-pointer">User Tutorial</li>
                </ul>
               
              </div>
            </div>
  
            {/* Contact Us Section */}
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-4 text-white">Contact Us</h3>
              <ul className="space-y-2">
                <li className="hover:text-white cursor-pointer">Email: ahmedikram567@gmail.com</li>
                <li className="hover:text-white cursor-pointer">Mob No 03021821567</li>
              </ul>
            </div>
          </div>
  
         
          <div className="border-t border-gray-700 my-6"></div>
  
          
          <div className="flex flex-col md:flex-row justify-between items-center">
            
            <div className="mb-4 md:mb-0 mx-50">
              <h2 className="text-xl font-bold text-white">TaskOn</h2>
              <p className="text-sm text-gray-300">Engage • <span className="text-green-400 font-semibold">Grow</span>• Succeed</p>
            </div>
  
            
            <div className="flex flex-col items-center md:items-end mr-80">
              <p className="text-sm text-gray-300">©TaskOn 2023 - 2025</p>
              <div className="flex gap-4 mt-2">
                <a href="#" className="text-sm hover:text-white hover:underline">Terms of Service</a>
                <a href="#" className="text-sm hover:text-white hover:underline">Privacy Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;