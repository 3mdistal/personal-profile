import { Client } from '@notionhq/client'
import { NOTION_KEY, COMMISSIONS_DB } from '$env/static/private'

const notion = new Client({ auth: NOTION_KEY })

const commissionsDatabaseID = COMMISSIONS_DB
// const subscriberDatabaseID = process.env.SUBSCRIBERS_DB

export async function addCommission(name, email, description) {
    if (!NOTION_KEY || !COMMISSIONS_DB) {
        throw Error("Missing API keys from Notion.")
    }
    try {
        const response = await notion.pages.create({
            parent: { database_id: commissionsDatabaseID },
            properties: {
                title: {
                    title: [
                        {
                            "text": {
                                "content": name
                            }
                        }
                    ]
                },
                Email: {
                    email: email
                },
                Description: {
                    rich_text: [
                        {
                            "text": {
                                "content": description
                            }
                        }
                    ]
                }
            }
        })
        return response
    } catch (error) {
        console.error(error.body)
    }
}

// export async function addSubscriber(name, email) {
//     try {
//         const response = await notion.pages.create({
//             parent: {database_id: subscriberDatabaseID },
//             properties: {
//                 title: {
//                     title: [
//                         {
//                             "text": {
//                                 "content": name
//                             }
//                         }
//                     ]
//                 },
//                 Email: {
//                     email: email
//                 }
//             }
//         })
//     } catch (error) {
//         console.error(error.body)
//     }
// }