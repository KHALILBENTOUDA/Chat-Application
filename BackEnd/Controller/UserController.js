const AsyncHandler = require("../Middlewares/AsyncHandler");
const { db } = require("../Config/database");
const AppErrorClass = require("../Middlewares/AppErrorClass");
const TokenGenerator = require("../Util/TokenGenerator");
const statusText = require("../Util/statusText");
const Joi = require("joi");
const bcrypt = require("bcrypt");

const GetCurrentUser = AsyncHandler(async (req, res, next) => {
  const { id } = req.currentUser;
  const sql_Currnet = `
  SELECT
  User.id,
  User.email,
  User.birthdate,
  User.name,
  User.lastname,
  gender.gender_name,
  GROUP_CONCAT(interests.interest_name) AS user_interests,
  pictures.picture_url,
  pictures.Covers,
  pictures.Posts,
  User.is_verified,
  User.biography,
  UserShoies,
  country,
  city
FROM
  User
JOIN
  gender ON gender.gender_id = User.gender_id
LEFT JOIN
  user_interests ON User.id = user_interests.user_id
LEFT JOIN
  interests ON interests.interest_id = user_interests.interest_id
LEFT JOIN
  pictures ON User.id = pictures.user_id
LEFT JOIN
  location ON User.id = location.user_id
WHERE
  User.id = ?
GROUP BY
  User.id;

  `;
  const currentVlue = [id];
  db.query(sql_Currnet, currentVlue, (err, result) => {
    if (err) return new AppErrorClass(500, err, statusText.FAIL);
    res.status(200).json({
      status: statusText.SUCCESS,
      user: result[0],
    });
  });
});

const getUser = AsyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const sql_GetUser = `
  SELECT
  User.id,
  User.email,
  User.name,
  User.lastname,
  User.birthdate,
  gender.gender_name,
  GROUP_CONCAT(interests.interest_name) AS user_interests,
  pictures.picture_url,
  pictures.Covers,
  User.is_verified,
  User.biography,
  UserShoies,
  country,
  city
FROM
  User
JOIN
  gender ON gender.gender_id = User.gender_id
LEFT JOIN
  user_interests ON User.id = user_interests.user_id
LEFT JOIN
  interests ON interests.interest_id = user_interests.interest_id
LEFT JOIN
  pictures ON User.id = pictures.user_id
LEFT JOIN
  location ON User.id = location.user_id
WHERE
  User.id = ?
GROUP BY
  User.id;
    `;
  const value_User = [id];
  db.query(sql_GetUser, value_User, (err, result) => {
    if (err) return new AppErrorClass(500, err, statusText.FAIL);
    res.status(200).json({
      status: statusText.SUCCESS,
      User: result[0],
      code: 200,
    });
  });
});

const getAllusers=AsyncHandler(async(req,res,next)=>{
  const sql_Users=`
  SELECT
  User.id,
  User.email,
  User.name,
  User.lastname,
  User.birthdate,
  gender.gender_name,
  GROUP_CONCAT(interests.interest_name) AS user_interests,
  pictures.picture_url,
  pictures.Covers,
  User.is_verified,
  User.biography,
  UserShoies,
  country,
  city
  FROM
    User
  JOIN
    gender ON gender.gender_id = User.gender_id
  LEFT JOIN
    user_interests ON User.id = user_interests.user_id
  LEFT JOIN
    interests ON interests.interest_id = user_interests.interest_id
  LEFT JOIN
    pictures ON User.id = pictures.user_id
  LEFT JOIN
    location ON User.id = location.user_id
  GROUP BY
    User.id;
`
  db.query(sql_Users,[],(error,results)=>{
    if (error) return new AppErrorClass(500, error, statusText.FAIL);
    res.status(200).json({
      status:'success',
      data:results
    })
  })
})

const likeUsers=AsyncHandler(async(req,res,next)=>{
  const {liked_id ,Currend_id}=req.body
  const sql_Like=`INSERT INTO likes (user_id, liked_user_id) VALUES (?, ?)`

  db.query(sql_Like,[Currend_id,liked_id],(error,results)=>{
    if (error) return new AppErrorClass(500, error, statusText.FAIL);
    const sqlLikeCount = `SELECT COUNT(liked_user_id) as like_count FROM likes WHERE user_id = ?`;
    db.query(sqlLikeCount,[Currend_id],(error,results)=>{
       if (error) return new AppErrorClass(500, error, statusText.FAIL);
       const like = results[0].like_count;
       res.status(200).json({
        status:'success',
        data:like
      })
    })
   
  })
})

const unlikeUsers=AsyncHandler(async(req,res,next)=>{
  const {liked_id ,Currend_id}=req.body
  const sql_unLike=`DELETE FROM likes WHERE user_id = ? AND liked_user_id = ?`
  db.query(sql_unLike,[Currend_id,liked_id],(error,results)=>{
    if (error) return new AppErrorClass(500, error, statusText.FAIL);
    const sqlLikeCount = `SELECT COUNT(liked_user_id) as like_count FROM likes WHERE user_id = ?`;
    db.query(sqlLikeCount,[Currend_id],(error,results)=>{
      if (error) return new AppErrorClass(500, error, statusText.FAIL);
      const like = results[0].like_count;
      res.status(200).json({
       status:'success',
       data:like
     })
   })
  })
})  

const fetchLikes = AsyncHandler(async (req, res, next) => {
  const { Currend_id } = req.body;
  const sql_check_avatar = `
  SELECT * FROM likes where user_id=?
`;

  db.query(sql_check_avatar, [Currend_id], (error, results) => {
    if (error) return new AppErrorClass(500, error, statusText.FAIL);
    res.status(200).json({
      status: 'success',
      data: results, 
    });
  });
});

const likeshowInput= AsyncHandler(async (req, res, next) => {
  const {liked_id ,Currend_id}=req.body
  const sql_check_avatar = `
  SELECT * FROM likes where user_id=? AND liked_user_id = ?
`;

  db.query(sql_check_avatar, [Currend_id,liked_id], (error, results) => {
    if (error) return new AppErrorClass(500, error, statusText.FAIL);
    
    db.query(sql_check_avatar, [liked_id,Currend_id],(error,islike)=>{
        if (error) return new AppErrorClass(500, error, statusText.FAIL);
        if(results.length > 0 && islike.length>0 ){
          res.status(200).json({
            status: 'success',
            showChatInput:true,
          });
        }else{
          res.status(200).json({
            status: 'success',
            showChatInput:false,
          })
        }
      })
   
  });
});

const search = async (req, res, next) => {
    const { age, name, location, interests } = req.body;

    // Build the base query
    let query = `
      SELECT
        User.id,
        User.email,
        User.birthdate,
        User.name,
        User.lastname,
        gender.gender_name,
        GROUP_CONCAT(interests.interest_name) AS user_interests,
        pictures.picture_url,
        User.is_verified,
        User.biography,
        UserShoies,
        location.city,
        location.neighborhood,
        location.country
      FROM
        User
      JOIN
        gender ON gender.gender_id = User.gender_id
      LEFT JOIN
        user_interests ON User.id = user_interests.user_id
      LEFT JOIN
        interests ON interests.interest_id = user_interests.interest_id
      LEFT JOIN
        pictures ON User.id = pictures.user_id
      LEFT JOIN
        location ON User.id = location.user_id
    `;


    const conditions = [];
    if (age) conditions.push(`TIMESTAMPDIFF(YEAR, User.birthdate, CURDATE()) = ${db.escape(age)}`);
    if (name) conditions.push(`(User.name LIKE ${db.escape('%' + name + '%')} OR User.lastname LIKE ${db.escape('%' + name + '%')})`);
    // Check if any location parameter is provided
    if (location) {
      conditions.push(`
        (
          location.city LIKE ${db.escape('%' + location + '%')}
          OR location.neighborhood LIKE ${db.escape('%' + location + '%')}
          OR location.country LIKE ${db.escape('%' + location + '%')}
        )
      `);
    }


    if (interests){
     const escapedInterests = interests.split(',').map(interest => db.escape(interest)).join(',');
    if (interests.includes(',')) {
      conditions.push(`interests.interest_name IN (${escapedInterests})`);
    } else {
      conditions.push(`interests.interest_name = ${escapedInterests}`);
    }
    };

    // Only add WHERE clause if there are conditions
    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    // Add GROUP BY and ORDER BY clauses
    query += ' GROUP BY User.id ORDER BY User.id';

    // Add LIMIT clause

    // Execute the query
   if(conditions.length > 0){
    db.query(query,(err,results)=>{
      res.status(200).json({ status: statusText.SUCCESS, data: results });
    });
   }

};

module.exports = {
  GetCurrentUser,
  getUser,
  getAllusers,
  likeUsers,
  unlikeUsers,
  fetchLikes,
  likeshowInput,
  search
};

