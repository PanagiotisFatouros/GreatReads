import { mysqlconn, retrieveOneEntity } from '../../../../../database/mysql';

export async function GET({params}){
    const table = "userprofile"
    const field = "name"
    const username = params.username
    let targetUser;
    await retrieveOneEntity(table, field, username).then((userprofile) => {
        targetUser = userprofile
    })

    // console.log(targetUser)
    if (targetUser == null){
        return new Response("404 User does not exist");
    }
    return new Response(JSON.stringify(targetUser));
}