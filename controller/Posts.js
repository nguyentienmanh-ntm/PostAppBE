const { Posts, Likes } = require("../models");


const getPosts = async (req, res) => {
    const listOfPosts = await Posts.findAll({ include: [Likes] });
    const likedPosts = await Likes.findAll({ where: { UserId: req.user.id } });
    res.json({ listOfPosts: listOfPosts, likedPosts: likedPosts });
}

const createPost = async (req, res) => {
    const post = req.body;
    post.username = req.user.username
    post.UserId = req.user.id
    await Posts.create(post);
    res.json(post);
}

const getById = async (req, res) => {
    const id = req.params.id
    const post = await Posts.findByPk(id)
    res.json(post)

}

const getByUserId = async (req, res) => {
    const id = req.params.id
    const listOfPosts = await Posts.findAll({
        where: { UserId: id },
        include: [Likes],
    })
    res.json(listOfPosts)
}

const deletePost = async (req, res) => {
    const postId = req.params.postId
    await Posts.destroy({
        where: {
            id: postId
        }
    })
    res.json("Delete posts success")
}

const editPostTitle = async (req, res) => {
    const { newTitle, id } = req.body;
    await Posts.update({ title: newTitle }, { where: { id: id } })

}

const editPostText = async (req, res) => {
    const { newPostText, id } = req.body;
    await Posts.update({ postText: newPostText }, { where: { id: id } })

}



module.exports = {
    getPosts,
    createPost,
    getById,
    deletePost,
    getByUserId,
    editPostTitle,
    editPostText
}