import { db } from "../index.js";

export const getposts = (req, res) => {
    // const search = req.query.search;
    // const q = search ? "SELECT * FROM POST WHERE title LIKE ?" : "SELECT * FROM POST";


    const q = "SELECT * FROM POST"
    db.query(q, (err, data) => {
        if (err) {
            console.error("Error fetching posts:", err);
            return res.status(500).json({ error: "Error fetching posts" });
        }
        console.log("Fetched posts:", data)
        return res.status(200).json(data);

    });
}

export const getpost = (req, res) => {
    const searchTerm = req.query.term;
    if (!searchTerm) {
        return res.status(400)
            .json(
                {
                    error: 'Search term is required'
                }
            );
    }

    const query = `
    SELECT * FROM POST P , USER U 
    WHERE p.title LIKE ? OR U.username `;


    const searchValue = `%${searchTerm}%`;

    db.query(query, [searchValue],
        (err, results) => {
            if (err) {
                console
                    .error('Error executing search query:', err);
                return res.status(500)
                    .json(
                        {
                            error: 'Internal server error'
                        });
            }

            res.json(results);
        });
}

export const singlepost = (req, res) => {


    const q2 = "SELECT  `p.idpost`, `u.username`, `p.title`, `p.desc`, `p.img` , u.img AS userImg FROM user u JOIN post p ON u.iduser = p.uid WHERE p.idpost = ? ";

    db.query(q2, [req.params.idpost], (err, data) => {
        if (err) return res.status(500).json(err);



        return res.status(200).json(data[0]);
    });
}

export const addpost = (req, res) => {

    const uid = 1

    const q3 =
        "INSERT INTO post(`title`, `cat`, `desc`, `img`, `date`,`uid`) VALUES (?)";

    const values = [
        req.body.title,
        req.body.cat,
        req.body.desc,
        req.body.img,
        req.body.date,
        uid,
    ];

    db.query(q3, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json("Post has been created.");
    });

}

export const deletepost = (req, res) => {
    const uid = 1
    const postId = req.params.id;
    const q = "DELETE FROM post WHERE `id` = ? AND `uid` = ?";

    db.query(q, [postId, uid], (err, data) => {
        if (err) return res.status(403).json("You can delete only your post!");

        return res.json("Post has been deleted!");
    });
}

export const updatepost = (req, res) => {
    const uid = 1
    const postId = req.params.id;
    const q =
        "UPDATE post SET `title`=?,`desc`=?,`img`=?,`cat`=? WHERE `id` = ? AND `uid` = ?";

    const values = [req.body.title, req.body.desc, req.body.img, req.body.cat];

    db.query(q, [...values, postId, uid], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json("Post has been updated.");
    });
}