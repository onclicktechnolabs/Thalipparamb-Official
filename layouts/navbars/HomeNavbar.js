// import Link from "next/link";
// import React, { useState } from "react";
// import { useMediaQuery } from "react-responsive";
// import { Image } from "react-bootstrap";

// function HomeNavbar() {
//   const [language, setLanguage] = useState("ml");

//   const toggleLanguage = () => {
//     const newValue = language === "en" ? "ml" : "en";
//     setLanguage(newValue);
//   };
//   const isMobile = useMediaQuery({ maxWidth: 615 });
//   return (
//     <header className="mb-2">
//       <nav className="fixed-top navbar navbar-expand-lg bg-white box-shadow p-3 px-md-4 mb-3 border-bottom ">
//         <div className="container-fluid  ">
//           {/* <a className="navbar-brand" href="/">
//             Company Name
//           </a> */}
//           {isMobile ? (
//             <Link
//               href={"/"}
//               className="flex items-center cursor-pointer w-full md:w-auto  "
//             >
//               <figure className="w-full md:w-auto">
//                 <Image
//                   src="/thalipparamb/apple-touch-icon.png"
//                   alt="Thalipparamb"
//                   className="img-fluid w-25 h-25"
//                 />
//               </figure>
//             </Link>
//           ) : (
//             <Link
//               href={"/"}
//               className="flex items-center cursor-pointer w-full md:w-auto  "
//             >
//               <figure className="w-full md:w-auto">
//                 <Image
//                   src="/thalipparamb/logo-Thaliparamba-ml (1).png"
//                   alt="Thalipparamb"
//                   className="img-fluid w-50 h-50"
//                 />
//               </figure>
//             </Link>
//           )}
//           {/* <Link
//             href={"/"}
//             className="flex items-center cursor-pointer w-full md:w-auto  "
//           >
//             <figure className="w-full md:w-auto">
//               <Image
//                 src="/thalipparamb/logo-Thaliparamba-ml (1).png"
//                 alt="Thalipparamb"
//                 className="img-fluid w-50 h-50"
//               />
//             </figure>
//           </Link> */}
//           <button
//             className="navbar-toggler"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#navbarSupportedContent"
//             aria-controls="navbarSupportedContent"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon"></span>
//           </button>
//           <div className="collapse navbar-collapse" id="navbarSupportedContent">
//             <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
//               <li className="nav-item">
//                 <a className="nav-link active" aria-current="page" href="/lazy">
//                   Home
//                 </a>
//               </li>
//               <li className="nav-item">
//                 <a className="nav-link active" aria-current="page" href="#">
//                   About Us
//                 </a>
//               </li>
//               <li className="nav-item">
//                 <a className="nav-link active" aria-current="page" href="#">
//                   Tourism
//                 </a>
//               </li>
//               <li className="nav-item">
//                 <a className="nav-link active" aria-current="page" href="#">
//                   Gallery
//                 </a>
//               </li>
//               <li className="nav-item px-2">
//                 <button
//                   className="btn btn-outline-secondary"
//                   onClick={toggleLanguage}
//                 >
//                   {language === "ml" ? "Malayalam" : "English"}
//                 </button>
//               </li>
//               <li className="nav-item">
//                 <button className="btn btn-outline-primary">Sign Up</button>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </nav>
//     </header>
//   );
// }

// export default HomeNavbar;
