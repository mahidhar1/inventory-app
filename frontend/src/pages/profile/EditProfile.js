import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AiOutlineWhatsApp, AiOutlineArrowLeft } from "react-icons/ai";
import Card from "../../components/card/Card";
import Loader from "../../components/loader/Loader";
import { selectUser } from "../../redux/features/auth/authSlice";
import { updateUser } from "../../services/authService";
import "./Profile.scss";

const EditProfile = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector(selectUser);
  const { email } = user;

  // useEffect(() => {
  //   if (!email) {
  //     navigate("/profile");
  //   }
  // }, [email, navigate]);

  const initialState = {
    name: user?.name,
    email: user?.email,
    phone: user?.phone,
    whatsapp: user?.whatsapp,
    address: user?.address,
    city: user?.city,
    bio: user?.bio,
    photo: user?.photo,
  };
  const [profile, setProfile] = useState(initialState);
  const [profileImage, setProfileImage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  // const saveProfile = async (e) => {
  //   e.preventDefault();
  //   console.log(profile);
  // };
  const saveProfile = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let formData = {
      name: profile.name,
      phone: profile.phone,
      whatsapp: profile.whatsapp,
      address: profile.address,
      city: profile.city,
      bio: profile.bio,
    };
    try {
      // Handle Image upload
      let imageURL;
      if (
        profileImage &&
        (profileImage.type === "image/jpeg" ||
          profileImage.type === "image/jpg" ||
          profileImage.type === "image/png")
      ) {
        const image = new FormData();
        image.append("file", profileImage);
        image.append("cloud_name", "dophlllgm");
        image.append("upload_preset", "betcee5c");

        // First save image to cloudinary
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dophlllgm/image/upload",
          { method: "post", body: image },
        );
        const imgData = await response.json();
        imageURL = imgData.url.toString();

        // Save Profile
        formData = {
          ...formData,
          photo: profileImage ? imageURL : profile.photo,
        };
        console.log(formData);
        const data = await updateUser(formData);
        console.log(data);
        toast.success("User updated");
        navigate("/profile");
        setIsLoading(false);
      } else {
        const data = await updateUser(formData);
        console.log(data);
        toast.success("User updated");
        navigate("/profile");
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error(error.message);
    }
  };
  return (
    <div className="--my2">
      {isLoading ? (
        <Loader />
      ) : (
        <form className="--form-control --m" onSubmit={saveProfile}>
          <div className={"profile"}>
            <div className="profile-data">
              <Link to="/profile">
                <button className="--btn --btn-primary">
                  <AiOutlineArrowLeft />
                  &nbsp; Go Back
                </button>
              </Link>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={profile?.name}
                onChange={handleInputChange}
              />
              <div className="--m"></div>
              <label>Email:</label>
              <input type="text" name="email" value={profile?.email} disabled />
              <code>Email cannot be changed.</code>
              <div className="--m"></div>
              <label>Phone Number</label>
              <input
                type="text"
                name="phone"
                value={profile?.phone}
                onChange={handleInputChange}
              />
              <div className="--m"></div>
              <span
                style={{
                  color: "green",
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <AiOutlineWhatsApp size={25} /> Whatsapp
              </span>
              <input
                type="text"
                name="whatsapp"
                value={profile?.whatsapp}
                onChange={handleInputChange}
              />
              <div className="--m"></div>
              <label>Company Address</label>
              <input
                type="text"
                name="address"
                value={profile?.address}
                onChange={handleInputChange}
              />
              <div className="--m"></div>
              <label>City</label>
              <input
                type="text"
                name="city"
                value={profile?.city}
                onChange={handleInputChange}
              />
              <div className="--m"></div>
              <label>Company Description</label>
              <textarea
                name="bio"
                value={profile?.bio}
                onChange={handleInputChange}
                cols="30"
                rows="10"
              ></textarea>
              <div className="--m"></div>
              <div>
                <button className="--btn --btn-primary" type="submit">
                  Save
                </button>
              </div>
            </div>
            <div className={"profile-photo"}>
              <label>Company Photo:</label>
              <img
                width={"500px"}
                height={"500px"}
                src={user?.photo}
                alt="profilepic"
              />
              <input type="file" name="image" onChange={handleImageChange} />
            </div>
          </div>
        </form>
      )}

      <br />
    </div>
  );
};

export default EditProfile;
