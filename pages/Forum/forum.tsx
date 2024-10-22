"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MessageCircle, Heart, Repeat2, Share, MoreHorizontal, User, ShoppingBag, Shield } from 'lucide-react'

interface Post {
  id: number
  content: string
  author: string
  likes: number
  reposts: number
  replies: Post[]
  createdAt: Date
}

export default function NovaLunchForum() {
  const [posts, setPosts] = useState<Post[]>([])
  const [newPost, setNewPost] = useState('')
  const [editingPost, setEditingPost] = useState<Post | null>(null)
  const [replyingTo, setReplyingTo] = useState<Post | null>(null)

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault()
    const post: Post = {
      id: Date.now(),
      content: newPost,
      author: 'Current User',
      likes: 0,
      reposts: 0,
      replies: [],
      createdAt: new Date()
    }
    setPosts([post, ...posts])
    setNewPost('')
  }

  const handleEditPost = (post: Post) => {
    setEditingPost(post)
  }

  const handleUpdatePost = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingPost) {
      setPosts(posts.map(p => p.id === editingPost.id ? editingPost : p))
      setEditingPost(null)
    }
  }

  const handleDeletePost = (id: number) => {
    setPosts(posts.filter(post => post.id !== id))
  }

  const handleLike = (post: Post) => {
    setPosts(posts.map(p => p.id === post.id ? {...p, likes: p.likes + 1} : p))
  }

  const handleRepost = (post: Post) => {
    setPosts(posts.map(p => p.id === post.id ? {...p, reposts: p.reposts + 1} : p))
  }

  const handleReply = (post: Post) => {
    setReplyingTo(post)
  }

  const submitReply = (e: React.FormEvent) => {
    e.preventDefault()
    if (replyingTo) {
      const reply: Post = {
        id: Date.now(),
        content: newPost,
        author: 'Current User',
        likes: 0,
        reposts: 0,
        replies: [],
        createdAt: new Date()
      }
      setPosts(posts.map(p => p.id === replyingTo.id ? {...p, replies: [reply, ...p.replies]} : p))
      setNewPost('')
      setReplyingTo(null)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Top Bar */}
      <nav className="bg-gray-800 text-white shadow-md sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <Image src="/placeholder.svg" alt="Logo" width={32} height={32} className="h-8 w-auto" />
              <span className="ml-2 text-xl font-bold">NovaLunch Forum</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/profile" className="flex items-center text-sm font-medium text-gray-300 hover:text-white">
                <User className="h-5 w-5 mr-1" />
                Profile
              </Link>
              <Link href="/marketplace" className="flex items-center text-sm font-medium text-gray-300 hover:text-white">
                <ShoppingBag className="h-5 w-5 mr-1" />
                Marketplace
              </Link>
              <Link href="/security" className="flex items-center text-sm font-medium text-gray-300 hover:text-white">
                <Shield className="h-5 w-5 mr-1" />
                Security
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto mt-4 px-4 sm:px-6 lg:px-8">
        {/* Create Post Form */}
        <form onSubmit={handleCreatePost} className="mb-8 bg-gray-800 rounded-lg shadow p-4">
          <textarea
            className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="What's happening?"
            value={newPost}
            onChange={e => setNewPost(e.target.value)}
            required
            rows={3}
          />
          <div className="mt-2 flex justify-end">
            <button 
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              Post
            </button>
          </div>
        </form>

        {/* Posts List */}
        <div className="space-y-4">
          {posts.map(post => (
            <div key={post.id} className="bg-gray-800 rounded-lg shadow p-4">
              <div className="flex items-start">
                <Image src="/placeholder.svg" alt="User Avatar" width={48} height={48} className="rounded-full" />
                <div className="ml-3 flex-1">
                  <p className="font-bold">{post.author}</p>
                  <p className="text-gray-300">{post.content}</p>
                  <div className="mt-2 flex justify-between items-center">
                    <button onClick={() => handleReply(post)} className="flex items-center text-gray-400 hover:text-blue-500">
                      <MessageCircle className="h-5 w-5 mr-1" />
                      {post.replies.length}
                    </button>
                    <button onClick={() => handleRepost(post)} className="flex items-center text-gray-400 hover:text-green-500">
                      <Repeat2 className="h-5 w-5 mr-1" />
                      {post.reposts}
                    </button>
                    <button onClick={() => handleLike(post)} className="flex items-center text-gray-400 hover:text-red-500">
                      <Heart className="h-5 w-5 mr-1" />
                      {post.likes}
                    </button>
                    <div className="relative">
                      <button className="text-gray-400 hover:text-blue-500">
                        <MoreHorizontal className="h-5 w-5" />
                      </button>
                      {/* Dropdown menu for edit and delete would go here */}
                    </div>
                  </div>
                </div>
              </div>
              {/* Replies */}
              {post.replies.length > 0 && (
                <div className="mt-4 ml-12 space-y-4">
                  {post.replies.map(reply => (
                    <div key={reply.id} className="bg-gray-700 rounded-lg p-3">
                      <div className="flex items-start">
                        <Image src="/placeholder.svg" alt="User Avatar" width={32} height={32} className="rounded-full" />
                        <div className="ml-2 flex-1">
                          <p className="font-bold">{reply.author}</p>
                          <p className="text-gray-300">{reply.content}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Reply Modal */}
      {replyingTo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Reply to @{replyingTo.author}</h2>
            <form onSubmit={submitReply}>
              <textarea
                className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Post your reply"
                value={newPost}
                onChange={e => setNewPost(e.target.value)}
                required
                rows={3}
              />
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setReplyingTo(null)}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  Reply
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}