import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getSpecificVitie } from "../../../Redux/Api/ApiVew";
import profile from "../../../assets/images/profile-1.jpg";
import { Emage_Profile } from "../../../Redux/Api/ApiEmage";

const ViewsProfile = ({ sethandleNavigateRigt }) => {
  const [Viwers, setViwers] = useState([]);
  const profileInfo = JSON.parse(localStorage.getItem("profile"));
  const AllUSERS = useSelector((state) => state.AllUsersReducer.AllUsers);

  useEffect(() => {
    const ViewData = {
      Viewer: profileInfo.id,
    };
    const view = async () => {
      try {
        const res = await getSpecificVitie(ViewData);
        const viewData = res.data.allViwed;
        viewData.map((visiter) => {
          setViwers(AllUSERS.filter((user) => user.id === visiter.Visiter));
        });
      } catch (e) {
        console.log(e);
      }
    };
    view();
  }, []);

  const handleNavigate = () => {
    sethandleNavigateRigt("setting");
  };

  return (
    <div className="">
      <div className="text-md max-md:text-sm text-black max-md:h-[50px]   font-bold flex items-center  rounded-md h-[60px]  shadow-md shadow-slate-100 drop-shadow-sm  mt-0.5   px-2  w-full  ">
        <i
          onClick={handleNavigate}
          className="fa-solid fa-angle-left text-[15px] md:hidden   flex items-center justify-center  cursor-pointer text-black   m-1 pr-2  rounded-full "
        ></i>
        <h1 className="px-4">Visitors</h1>
      </div>
      <ul className="py-4">
        {Viwers ? (
          Viwers.map((user) => (
            <li
              key={user.id}
              className="transition-all flex w-full relative items-center mb-2 hover:bg-white px-5 py-1.5 "
            >
              <img
                src={`${Emage_Profile}${user.picture_url}`}
                className=" w-10 max-md:w-8  rounded-full"
                alt=""
              />
              <h1 className="text-black font-bold px-3 flex flex-col text-sm max-sm:text-[11px] max-md:text-xs  justify-center ">
                {user.lastname + " " + user.name}{" "}
                <span className="text-black font-thin text-sm opacity-60 max-md:text-[11px] max-sm:text-[8px] ">
                  has viewed your profile
                </span>
                <p>{}</p>
              </h1>
            </li>
          ))
        ) : (
          <h2 className="py-5 max-md:py-3 opacity-40 text-sm px-5 max-md:px-3">
            Visiter right now!
          </h2>
        )}
      </ul>
    </div>
  );
};

export default ViewsProfile;
