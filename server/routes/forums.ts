import express, { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Db, ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const router: Router = express.Router();

interface User {
  _id: string;
  username: string;
  email: string;
  posts: string[];
  threads: string[];
}

interface Post {
  _id: string;
  content: string;
  author: string;
  createdAt: Date;
  likes: number;
  reposts: number;
  replies: string[];
}

interface Thread {
  _id: string;
  title: string;
  content: string;
  author: string;
  createdAt: Date;
}

// Use the existing mongoose connection
const db: Db = mongoose.connection.db!;

// Create a new user
router.post('/users', async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email } = req.body;

    // Generate a unique ID for the user
    const userId: string = uuidv4();

    const usersCollection = db.collection<User>('users');

    // Create the user in the database
    const newUser: User = {
      _id: userId,
      username,
      email,
      posts: [],
      threads: [],
    };

    await usersCollection.insertOne(newUser);

    // Return the created user
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Create a new post
router.post('/posts', async (req: Request, res: Response): Promise<void> => {
  try {
    const { content, authorId } = req.body;

    const postsCollection = db.collection<Post>('posts');
    const usersCollection = db.collection<User>('users');

    // Generate a unique ID for the post
    const postId: string = uuidv4();

    const newPost: Post = {
      _id: postId,
      content,
      author: authorId,
      createdAt: new Date(),
      likes: 0,
      reposts: 0,
      replies: [],
    };

    await postsCollection.insertOne(newPost);

    // Update the user's posts array
    await usersCollection.updateOne(
      { _id: authorId },
      { $push: { posts: postId } }
    );

    res.status(201).json(newPost);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Failed to create post' });
  }
});

// Create a new thread
router.post('/threads', async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, content, authorId } = req.body;

    const threadsCollection = db.collection<Thread>('threads');
    const usersCollection = db.collection<User>('users');

    // Generate a unique ID for the thread
    const threadId: string = uuidv4();

    const newThread: Thread = {
      _id: threadId,
      title,
      content,
      author: authorId,
      createdAt: new Date(),
    };

    await threadsCollection.insertOne(newThread);

    // Update the user's threads array
    await usersCollection.updateOne(
      { _id: authorId },
      { $push: { threads: threadId } }
    );

    res.status(201).json(newThread);
  } catch (error) {
    console.error('Error creating thread:', error);
    res.status(500).json({ error: 'Failed to create thread' });
  }
});

// Get user's forum activity
router.get('/users/:userId/activity', async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;

    const usersCollection = db.collection<User>('users');
    const postsCollection = db.collection<Post>('posts');
    const threadsCollection = db.collection<Thread>('threads');

    // Fetch user
    const user = await usersCollection.findOne({ _id: userId });

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    // Fetch user's posts
    const posts = await postsCollection.find({ _id: { $in: user.posts } }).toArray();

    // Fetch user's threads
    const threads = await threadsCollection.find({ _id: { $in: user.threads } }).toArray();

    res.json({
      user,
      posts,
      threads,
    });
  } catch (error) {
    console.error('Error fetching user activity:', error);
    res.status(500).json({ error: 'Failed to fetch user activity' });
  }
});

// Get all forum data (users and posts)
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const usersCollection = db.collection<User>('users');
    const postsCollection = db.collection<Post>('posts');

    const users = await usersCollection.find().toArray();
    const posts = await postsCollection.find().toArray();

    res.json({
      users,
      posts,
    });
  } catch (error) {
    console.error('Error fetching forum data:', error);
    res.status(500).json({ error: 'Failed to fetch forum data' });
  }
});

export default router;
