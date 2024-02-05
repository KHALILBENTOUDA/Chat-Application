import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { allInterstes } from "../../Redux/Actions/ActionInterests";
import { userInterests } from "../../Redux/Actions/ActionAuth";

const Interestes = () => {
  const userData = JSON.parse(localStorage.getItem("profile"));
  const [interests, setinterests] = useState([]);
  const [error, seterror] = useState("");
  const [formData, setFormData] = useState({
    interests: [],
  });

  useEffect(() => {
    // get interastes
    const genIterests = async () => {
      try {
        const results = allInterstes();
        results.then((data) => setinterests(data));

        if (resposs.data.status === "success") {
          setinterests(resposs.data.results);
          setauth(true);
        } else {
          setauth(false);
        }
      } catch (err) {
        seterror(err.message);
      }
    };
    genIterests();
  }, []);

  const handleInterestsChange = (e) => {
    const { id, checked } = e.target;

    // If the checkbox is checked, add the interest_id to the formData.interests array
    // If the checkbox is unchecked, remove the interest_id from the formData.interests array
    setFormData((prevData) => ({
      ...prevData,
      interests: checked
        ? [...prevData.interests, id]
        : prevData.interests.filter((interestId) => interestId !== id),
    }));
  };

  const navigate = useNavigate();

  // send interestting to server
  const handleSubmit = async (e) => {
    e.preventDefault();

    const sendData = new FormData();
    sendData.append("inter", JSON.stringify(formData.interests));
    const userID = userData.id;

    // Pass sendData as the second argument to userInterests, not as the first
    userInterests(userID, sendData, navigate);
  };

  return (
    <section className="w-[70%] mx-auto text-center  h-[100vh] flex justify-center items-center   ">
      <form action="" method="post" onSubmit={handleSubmit} className="w-full">
        <ul class="grid  gap-6 md:grid-cols-3 max-md:gap-3 ">
          {interests.map((ele) => {
            return (
              <li className="">
                <input
                  onChange={handleInterestsChange}
                  type="checkbox"
                  id={ele.interest_id}
                  name="interests"
                  value={formData.interests}
                  class=" hidden peer"
                  required=""
                />
                <label
                  for={ele.interest_id}
                  htmlfor="interests"
                  class="inline-flex items-center justify-between w-full py-2 px-4    text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-white dark:border-gray-100 peer-checked:border-lgrn hover:text-gray-200 dark:peer-checked:text-lgrn peer-checked:text-lgrn hover:bg-gray-50  dark:bg-gray-200 dark:hover:bg-lgrn"
                >
                  <div class="flex">
                  
                    <div class="w-full text-lg max-md:text-xs  font-semibold px-2">
                      {ele.interest_name}
                    </div>
                  </div>
                </label>
              </li>
            );
          })}
        </ul>

        <div className="w-[99%] flex justify-end">
        <button
              type="submit"
              className="mt-4 bg-lgrn text-white rounded-full py-1 px-4 text-xs   hover:bg-grn transition duration-300"
            >
              Next 
              <i className="fa-solid fa-angle-double-right ml-2"></i>
            </button>
        </div>
      </form>
    </section>
  );
};
export default Interestes;
