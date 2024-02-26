const express = require('express');
const router = express.Router();

const Post = require('../models/Post');

const verifyToken = require('../middlewares/auth');

router.post('/', verifyToken, async (req, res) => {
    const { number, numberCount, country, type } = req.body;

    // Simple validation
    if (!number)
        return res
            .status(400)
            .json({ success: false, message: 'Số cần được điền vào' });
    if (!numberCount)
        return res
            .status(400)
            .json({ success: false, message: 'Số điểm cần được điền vào' });
    if (!type)
        return res
            .status(400)
            .json({ success: false, message: 'Kiểu chơi cần được điền vào' });

    try {
        const newPost = new Post({
            number,
            numberCount,
            country,
            type,
            user: req.userId,
        });
        await newPost.save();

        res.json({
            success: true,
            message: 'Thêm số thành công',
            post: newPost,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Server không phản hồi',
        });
    }
});

router.get('/', verifyToken, async (req, res) => {
    try {
        const posts = await Post.find({ user: req.userId }).populate('user', [
            'username',
        ]);
        res.json({ success: true, posts });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Server không phản hồi',
        });
    }
});

// router.put('/:id', verifyToken, async (req, res) => {
//     const { number, numberCount, country, type } = req.body;

//     // Simple validation
//     if (!number)
//         return res
//             .status(400)
//             .json({ success: false, message: 'Số cần được điền vào' });
//     if (!type)
//         return res
//             .status(400)
//             .json({ success: false, message: 'Kiểu chơi cần được điền vào' });

//     try {
//         let updatedPost = { number, numberCount, country, type };

//         const postUpdateCondition = { _id: req.params.id, user: req.userId };

//         updatedPost = await Post.findOneAndUpdate(
//             postUpdateCondition,
//             updatedPost,
//             { new: true }
//         );

//         // User not authorized to update or post not found
//         if (!updatedPost)
//             return res.status(401).json({
//                 success: false,
//                 message: 'Không tìm thấy số hoặc bạn không có quyền sửa số này',
//             });
//         res.json({
//             success: true,
//             message: 'Thay đổi số thành công!',
//             post: updatedPost,
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             success: false,
//             message: 'Server không phản hồi',
//         });
//     }
// });

router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const postDeleteCondition = { _id: req.params.id, user: req.userId };
        const deletedPost = await Post.findOneAndDelete(postDeleteCondition);

        // User not authorized or Post not found
        if (!deletedPost)
            return res.status(401).json({
                success: false,
                message: 'Không tìm thấy số hoặc bạn không có quyền sửa số này',
            });
        res.json({ success: true, post: deletedPost });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Server không phản hồi',
        });
    }
});

module.exports = router;
