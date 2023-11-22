import {v4 as uuidv4} from 'uuid'

// users table
export const users = [
    {
        id: uuidv4(),
        name: 'Shristi Singh'
    },
    {
        id: uuidv4(),
        name: 'Anjali Vanga'
    },
    {
        id: uuidv4(),
        name: 'Vandhana Ram'
    }
]

// comments table
export const comments = [
    {
        id: uuidv4(),
        // reference to user
        author: users[0],
        content: 'I absolutely didn\'t know that Maggi was actually directly targeting working women and mothers. Although, I remember their ads were focused on that messaging. But, still, never thought that they were so laser-focused on that demographic. Thanks for sharing, looking forward to part 2 :)',
        upvotes: 1,
        // replies
        children: [
            {
                id: uuidv4(),
                author: users[1],
                content: 'Glad you liked it, Shrishti!',
                upvotes: 0,
                children: [],
            }
        ]
    },
    {
        id: uuidv4(),
        author: users[2],
        content: 'The "catch them young" point is so correct. People who grew up with Maggi, can\'t switch to different brand. But, I wonder if the kids today have the same obssession with Maggi as some of the GenZs and Millenials do. Probably explain their falling market share.',
        upvotes: 1,
        children: [
            {
                id: uuidv4(),
                author: users[1],
                content: 'Absolutely Vandhana. But, we don\'t have any empirical evidence stating if Maggi\'s popularity has increased or decreased among the current school-going kids. Nestle and Maggi\'s number look strong and they are growing every year. But, you are correct, their market share has come down. That could partly be the result of 2015 ban.',
                upvotes: 0,
                children: []
            }
        ]
    }
]