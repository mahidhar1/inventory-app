import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Card from "../../components/card/Card";
import { SpinnerImg } from "../../components/loader/Loader";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { SET_NAME, SET_USER } from "../../redux/features/auth/authSlice";
import { getUser } from "../../services/authService";

const Profile = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("Getting use");
    setIsLoading(true);
    async function getUserData() {
      const data = await getUser();
      setProfile(data);
      setIsLoading(false);
      await dispatch(SET_USER(data));
      await dispatch(SET_NAME(data.name));
    }
    getUserData();
  }, [dispatch]);
  return (
    <div className="--my2">
      {isLoading && <SpinnerImg />}
      <>
        {!isLoading && profile === null ? (
          <p>Something went wrong, please reload the page...</p>
        ) : (
          <div className={"profile"}>
            <div className="profile-data">
              <Link to="/edit-profile">
                <button className="--btn --btn-primary">Edit Profile</button>
              </Link>
              <p>
                <b>Name : </b> {profile?.name}
              </p>
              <p>
                <b>Email : </b> {profile?.email}
              </p>
              <p>
                <b>Phone : </b> {profile?.phone}
              </p>
              <p>
                <b>Whatsapp : </b> {profile?.whatsapp}
              </p>
              <p>
                <b>Address : </b> {profile?.address}
              </p>
              <p>
                <b>City : </b> {profile?.city}
              </p>
              <p>
                <b>Bio : </b> {profile?.bio}
              </p>
            </div>
            <div className={"profile-photo"}>
              <img src={profile?.photo} alt="profilepic" />
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default Profile;
