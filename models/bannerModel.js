import { connection } from "../config/db.js";

export const createBannerTable = `

CREATE TABLE IF NOT EXISTS banner (
    id INT AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(255),
    timer INT,
    link VARCHAR(255),
    isVisible BOOLEAN DEFAULT TRUE
);

`;

export const createTable = ()=>{
    connection.query(createBannerTable,(err)=>{
        if(err) throw err;
        console.log("Banner table created successfully");
    })
}