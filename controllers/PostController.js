const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const User = require('../models/User');
const Post = require('../models/Post');

const PostController = {

    /* get all posts */
    async get_posts(req, res) {
        try {
            const posts = await Post.find();
            res.status(200).json({
                type: "success",
                posts
            })
        } catch (err) {
            res.status(500).json({
                type: "error",
                message: "Something went wrong please try again",
                err
            })
        }
    },

    /* get single post */
    async get_post(req, res) {
        try {
            const post = await Post.findById(req.params.id);
            if (!post) {
                res.status(404).json({
                    type: "error",
                    message: "Post doesn't exists"
                })
            } else {
                res.status(200).json({
                    type: "success",
                    post
                })
            }
        } catch (err) {
            res.status(500).json({
                type: "error",
                message: "Something went wrong please try again",
                err
            })
        }
    },

    /* create new post */
    async create_post(req, res) {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(422).json({
                type: 'error',
                message: errors.array()
            });
        } else {
            try {
                const { username, title, description } = req.body;
                const id  = req.user.id;
               
                const newPost = await new Post({
                    user_id: mongoose.Types.ObjectId(id),
                    username: username,
                    title: title,
                    description: description
                });

                const post = await newPost.save();
                res.status(201).json({
                    type: 'success',
                    message: "Post has been created successfuly",
                    data: post
                });
                        
            } catch (err) {
                if (err && err.code === 11000) {
                    res.status(505).json({
                        type: "error",
                        message: "Title already exists",
                    })
                } else {
                    res.status(500).json({
                        type: "error",
                        message: "Something went wrong please try again",
                        err
                    })
                }  
            }
        }
    },

    /* update post */
    async update_post(req, res) {
        const existing = await Post.findById(req.params.id);
        if (!existing) {
            res.status(404).json({
                type: "error",
                message: "Post doesn't exists"
            })
        } else {
            if (existing.user_id.toString() === req.user.id){
                try {
                    const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
                        $set: req.body
                    },
                        { new: true }
                    );
                    res.status(200).json({
                        type: "success",
                        message: "Post updated successfully",
                        updatedPost
                    })
                } catch (err) {
                    res.status(500).json({
                        type: "error",
                        message: "Something went wrong please try again",
                        err
                    })
                }
            } else {
                res.status(401).json({
                    type: "error",
                    message: "You are not allowed to do this",
                })
            } 
        }
    },

    /* delete post */
    async delete_post(req, res) {
        const existing = await Post.findById(req.params.id);
        if (!existing) {
            res.status(200).json({
                type: "error",
                message: "Post doesn't exists"
            })
        } else {
            if (existing.user_id.toString() === req.user.id) {
                try {
                    await Post.findOneAndDelete(req.params.id);
                    res.status(200).json({
                        type: "success",
                        message: "Post has been deleted successfully"
                    });
                } catch (err) {
                    res.status(500).json({
                        type: "error",
                        message: "Something went wrong please try again",
                        err
                    })
                }
            } else {
                res.status(401).json({
                    type: "error",
                    message: "You are not allowed to do this",
                })
            }
        }
    }
};

module.exports = PostController;