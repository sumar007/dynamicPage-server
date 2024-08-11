import { connection } from '../config/db.js';


export const createBanner = async (req, res) => {
    try {
        const { description, timer, link } = req.body;
        if(!description || !timer || !link){
            return res.status(400).send("All fields are required");
        }

        const sql = `INSERT INTO banner (description, timer, link) VALUES (?, ?, ?)`;

        connection.query(sql, [description, timer, link], (err, result) => {
            if (err) {
                console.error("Error creating banner:", err);
                return res.status(500).send("An error occurred while creating the banner.");
            }
            res.status(201).json({
                message: "Banner created successfully",
                id: result.insertId,
                description,
                timer,
                link
            });
        });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Server error");
    }
}

// Updated updateBanner
export const updateBanner = async (req, res) => {
    try {
        const id = req.params.id; 
        const { description, timer, link } = req.body;

        // Step 1: Fetch the current banner data
        const fetchSql = `SELECT * FROM banner WHERE id = ?`;
        connection.query(fetchSql, [id], (err, results) => {
            if (err) {
                console.error("Error fetching banner:", err);
                return res.status(500).send("An error occurred while fetching the banner.");
            }

            if (results.length === 0) {
                return res.status(404).send("Banner not found");
            }

            const currentBanner = results[0];

            // Step 2: Merge the new data with the existing data
            const updatedBanner = {
                description: description !== undefined ? description : currentBanner.description,
                timer: timer !== undefined ? timer : currentBanner.timer,
                link: link !== undefined ? link : currentBanner.link,
            };

            // Step 3: Update the database with the merged data
            const updateSql = `UPDATE banner SET description = ?, timer = ?, link = ? WHERE id = ?`;
            connection.query(updateSql, [updatedBanner.description, updatedBanner.timer, updatedBanner.link, id], (err, result) => {
                if (err) {
                    console.error("Error updating banner:", err);
                    return res.status(500).send("An error occurred while updating the banner.");
                }

                res.status(200).json({
                    message: "Banner updated successfully",
                    id,
                    description: updatedBanner.description,
                    timer: updatedBanner.timer,
                    link: updatedBanner.link
                });
            });
        });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Server error");
    }
}

//banner invisible
export const bannerInvisible = async (req, res) => {
    try {
        const id = req.params.id;
        const sql = `UPDATE banner SET isVisible = false WHERE id = ?`;
        connection.query(sql, [id], (err, result) => {
            if (err) {
                console.error("Error updating banner:", err);
                return res.status(500).send("An error occurred while updating the banner.");
            }

            res.status(200).json({
                message: "Banner is invisible now ",
                id
            });
        });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Server error");
    }
}

//banner visible
export const bannerVisible = async (req, res) => {
    try {
        const id = req.params.id;
        const sql = `UPDATE banner SET isVisible = true WHERE id = ?`;
        connection.query(sql, [id], (err, result) => {
            if (err) {
                console.error("Error updating banner:", err);
                return res.status(500).send("An error occurred while updating the banner.");
            }

            res.status(200).json({
                message: "Banner is visible now ",
                id
            });
        });
    } catch (err) {

        console.error("Error:", err);
        res.status(500).send("Server error");
    }
}

//get all banners
export const getAllBanner = async (req, res) => {
    try {
        const sql = `SELECT * FROM banner`;
        connection.query(sql, (err, results) => {
            if (err) {
                console.error("Error fetching banners:", err);
                return res.status(500).send("An error occurred while fetching the banners.");
            }

            res.status(200).json({
                message: "Banners fetched successfully",
                data: results
            });
        });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Server error");
    }
}

//get visible banners
export const getVisibleBanner = async (req, res) => {
    try {
        const sql = `SELECT * FROM banner WHERE isVisible = true`;
        connection.query(sql, (err, results) => {
            if (err) {
                console.error("Error fetching banners:", err);
                return res.status(500).send("An error occurred while fetching the banners.");
            }

            res.status(200).json({
                message: "Banners fetched successfully",
                data: results
            });
        });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Server error");
    }
}





