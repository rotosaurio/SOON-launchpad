"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MessageCircle, Heart, Repeat2, Share, MoreHorizontal, Home, Briefcase, Rocket, ShoppingBag, User, Shield } from 'lucide-react'

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
    <div className="flex min-h-screen bg-[#1a1b2e]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#14152b] text-white p-4">
        <div className="flex items-center mb-8">
          <div className="w-10 h-10 mr-2 bg-gradient-to-br from-purple-500 via-pink-500 to-yellow-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
            N
          </div>
          <span className="text-xl font-bold">Nova Launch</span>
        </div>
        <nav>
          <Link href="#" className="flex items-center py-2 text-gray-400 hover:text-white">
            <Home className="mr-2 h-5 w-5" />
            Inicio
          </Link>
          <Link href="#" className="flex items-center py-2 text-gray-400 hover:text-white">
            <Briefcase className="mr-2 h-5 w-5" />
            Proyectos
          </Link>
          <Link href="#" className="flex items-center py-2 text-gray-400 hover:text-white">
            <Rocket className="mr-2 h-5 w-5" />
            Lanzar Token
          </Link>
          <Link href="#" className="flex items-center py-2 text-gray-400 hover:text-white">
            <ShoppingBag className="mr-2 h-5 w-5" />
            Mercado
          </Link>
          <Link href="#" className="flex items-center py-2 text-gray-400 hover:text-white">
            <User className="mr-2 h-5 w-5" />
            Mi Perfil
          </Link>
          <Link href="#" className="flex items-center py-2 text-gray-400 hover:text-white">
            <Shield className="mr-2 h-5 w-5" />
            Seguridad
          </Link>
        </nav>
      </aside>

      <div className="flex-1">
        {/* Top Bar */}
        <nav className="bg-[#14152b] text-white shadow-md sticky top-0 z-10 p-4">
          <div className="max-w-3xl mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold">NovaLaunch Forum</h1>
            <button className="bg-[#6d28d9] text-white px-4 py-2 rounded-full hover:bg-[#5b21b6] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-[#14152b]">
              AFXR...h5yZ
            </button>
          </div>
        </nav>

        {/* Main Content */}
        <div className="max-w-3xl mx-auto mt-8 px-4">
          {/* Create Post Form */}
          <form onSubmit={handleCreatePost} className="mb-8 bg-[#14152b] rounded-lg shadow p-4">
            <textarea
              className="w-full px-3 py-2 bg-[#1a1b2e] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="What's happening in the blockchain world?"
              value={newPost}
              onChange={e => setNewPost(e.target.value)}
              required
              rows={3}
            />
            <div className="mt-2 flex justify-end">
              <button 
                type="submit"
                className="px-4 py-2 bg-[#6d28d9] text-white rounded-full hover:bg-[#5b21b6] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-[#14152b]"
              >
                Post
              </button>
            </div>
          </form>

          {/* Posts List */}
          <div className="space-y-4">
            {posts.map(post => (
              <div key={post.id} className="bg-[#14152b] rounded-lg shadow p-4">
                <div className="flex items-start">
                  <Image src="/placeholder.svg" alt="User Avatar" width={48} height={48} className="rounded-full" />
                  <div className="ml-3 flex-1">
                    <p className="font-bold text-white">{post.author}</p>
                    <p className="text-gray-300">{post.content}</p>
                    <div className="mt-2 flex justify-between items-center">
                      <button onClick={() => handleReply(post)} className="flex items-center text-gray-400 hover:text-purple-500">
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
                        <button className="text-gray-400 hover:text-purple-500">
                          <MoreHorizontal className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Replies */}
                {post.replies.length > 0 && (
                  <div className="mt-4 ml-12 space-y-4">
                    {post.replies.map(reply => (
                      <div key={reply.id} className="bg-[#1a1b2e] rounded-lg p-3">
                        <div className="flex items-start">
                          <Image src="/placeholder.svg" alt="User Avatar" width={32} height={32} className="rounded-full" />
                          <div className="ml-2 flex-1">
                            <p className="font-bold text-white">{reply.author}</p>
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
      </div>

      {/* Reply Modal */}
      {replyingTo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-[#14152b] rounded-lg shadow-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-white">Reply to @{replyingTo.author}</h2>
            <form onSubmit={submitReply}>
              <textarea
                className="w-full px-3 py-2 bg-[#1a1b2e] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                  className="px-4 py-2 bg-gray-600 text-white rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-[#14152b]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#6d28d9] text-white rounded-full hover:bg-[#5b21b6] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-[#14152b]"
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