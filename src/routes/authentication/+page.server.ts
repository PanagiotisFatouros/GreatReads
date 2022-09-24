import { invalid, redirect } from "@sveltejs/kit";
import type { Actions } from "@sveltejs/kit";
import { auth } from "../../lib/lucia";
import { setCookie } from "lucia-sveltekit"
import { createNewEntity } from "../../database/mysql";

export const actions: Actions = {
    register: async ({cookies, request}) => {
        const data = await request.formData();
        const username = data.get('username')?.toString() || "";
        const password = data.get('password')?.toString() || "";
        console.log(username, password)

        try {
            // Create user credentials, tokens and set cookies
            const userSession = await auth.createUser("username", username, {
                password,
                user_data: {
                    name: username,
                    bio: "",
                    profilePic: "",
                    favAuthor: "",
                    favGenre: "",
                    isAuthor: false,
                    favBook: ""
                },
            });
            setCookie(cookies, ...userSession.cookies);
            console.log(userSession)


            // Create user profile, which has username as the user's name in database
            return {success:true}
            
        } catch (err){
            const error = err as Error;
            console.log(error.message)
            throw redirect(303, '/authentication/failed')
            // if (
            //     error.message === "AUTH_INVALID_IDENTIFIER_TOKEN" ||
            //     error.message === "AUTH_INVALID_PASSWORD"
            // ) {
            //     throw invalid(400, {
            //         message: "Incorrect username or password",
            //     });
            // }
            // // database connection error
            // throw invalid(400, {
            //     message: "Unknown error",
            // });
        }
    },

    login: async ({ cookies, request ,url}) => {
        const data = await request.formData();
        const username = data.get('username')?.toString() || "";
        const password = data.get('password')?.toString() || "";
        try {
            const userSession = await auth.authenticateUser(
                "username",
                username,
                password
            );
            setCookie(cookies, ...userSession.cookies);
            console.log("Successfully signed in")
            console.log(url)
            
        } catch (e) {
            const error = e as Error;
            console.log(error.message)
            throw redirect(303, '/authentication/failed')
            // return {success: false}
            // if (
            //     error.message === "AUTH_INVALID_IDENTIFIER_TOKEN" ||
            //     error.message === "AUTH_INVALID_PASSWORD"
            // ) {
            //     throw invalid(400, {
            //         message: "Incorrect username or password",
            //     });
            // }
            // // database connection error
            // throw invalid(400, {
            //     message: "Unknown error",
            // })
        }
    },
  };

//   Helper Function - Create User Profile
// async function createUser(username: String){
//     const userFields = "(Name, Bio, Profile_Picture, FavAuthor, FavGenre, IsAuthor, FavBook)"
//     const userValues = `('${username}', null, null, null, null, null, null)`
//     await createNewEntity("user", userFields, userValues).catch((err) => {
//         if (err === "ER_BAD_FIELD_ERROR") return false
//     })
//     return true
// }