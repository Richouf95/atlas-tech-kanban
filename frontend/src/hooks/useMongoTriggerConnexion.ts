// import * as Realm from "realm-web";
// import { useApp } from "./useMongoTiggerApp";

// // const app = new Realm.App("triggers-hhojybg");

// export const useTriggerConnexion = () => {
//   const triggerApp = useApp();

//   if (triggerApp) {
//     const loginTrigger = async (email: string, password: string) => {
//       // Create an email/password credential
//       const credentials = Realm.Credentials.emailPassword(email, password);
//       // Authenticate the user
//       const user = await triggerApp.logIn(credentials);
//       // `App.currentUser` updates to match the logged in user
//       // @ts-ignore
//       console.assert(user.id === app.currentUser.id);
//       return user;
//     };

//     const registerTrigger = async (email: string, password: string) => {
//       try {
//         await triggerApp.emailPasswordAuth.registerUser({
//           email,
//           password,
//         });
//         const user = await loginTrigger(email, password);
//         console.log("User registered : ", user);
//       } catch (error) {
//         console.log("Error while registering user", error);
//       }
//     };

//     return { loginTrigger, registerTrigger };
//   }
// };
