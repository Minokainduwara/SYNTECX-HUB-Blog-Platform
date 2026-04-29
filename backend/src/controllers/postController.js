import Post from "../models/Post.js";

export const createPost = async (req, res) => {
  const post = await Post.create({
    title: req.body.title,
    content: req.body.content,
    image: req.body.image,
    author: req.user._id
  });

  res.status(201).json(post);
};

export const getPosts = async (req, res) => {
  const posts = await Post.find()
    .populate("author", "name")
    .sort({ createdAt: -1 });

  res.json(posts);
};

export const getPostById = async (req, res) => {
  const post = await Post.findById(req.params.id)
    .populate("author", "name");

  res.json(post);
};

export const updatePost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({
      message: "Post not found"
    });
  }

  if (post.author.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      message: "Forbidden"
    });
  }

  post.title = req.body.title || post.title;
  post.content = req.body.content || post.content;
  post.image = req.body.image || post.image;

  const updated = await post.save();

  res.json(updated);
};

export const deletePost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({
      message: "Post not found"
    });
  }

  await post.deleteOne();

  res.json({
    message: "Post deleted"
  });
};