// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setUser } from "../redux/slices/userSlice";
// import { RootState } from "../redux/store";
// import { useGetUserDataQuery } from "../redux/api/userApi";

// const UserProfile = () => {
//   const dispatch = useDispatch();
//   const { data, isLoading, isError } = useGetUserDataQuery(1); // Assuming 1 is the user ID
//   const user = useSelector((state: RootState) => state.user.user);

//   useEffect(() => {
//     if (data) {
//       dispatch(setUser(data)); // Setting user data after fetching
//     }
//   }, [data, dispatch]);

//   if (isLoading) return <div>Loading...</div>;
//   if (isError) return <div>Error fetching user data</div>;

//   return (
//     <div>
//       <h1>User Profile</h1>
//       {user && (
//         <div>
//           <p>Name: {user.name}</p>
//           <p>Email: {user.email}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserProfile;
