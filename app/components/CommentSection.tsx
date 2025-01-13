'use client'

import { useState, useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Comment {
  id: number;
  name: string;
  email: string;
  content: string;
  date: string;
}

export default function CommentSection({ movieId }: { movieId: number }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState<Comment[]>([])

  useEffect(() => {
    // In a real application, this would fetch comments from an API
    const mockComments: Comment[] = [
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        content: "This movie was amazing! The plot twists kept me on the edge of my seat.",
        date: "2023-05-01T12:00:00Z"
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        content: "I loved the special effects, but the ending felt a bit rushed.",
        date: "2023-05-02T14:30:00Z"
      },
      {
        id: 3,
        name: "Mike Johnson",
        email: "mike@example.com",
        content: "The acting was superb, especially the lead actor's performance.",
        date: "2023-05-03T09:15:00Z"
      }
    ]
    setComments(mockComments)
  }, [movieId])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, this would send the comment to an API
    const newComment: Comment = {
      id: comments.length + 1,
      name,
      email,
      content: comment,
      date: new Date().toISOString(),
    }
    setComments([...comments, newComment])
    // Reset form
    setName('')
    setEmail('')
    setComment('')
  }

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold mb-4">Komentar</h3>
      <div className="space-y-4 mb-8">
        {comments.map((c) => (
          <div key={c.id} className="bg-gray-100 p-4 rounded-md">
            <div className="flex items-center mb-2">
              <Avatar className="w-10 h-10 mr-3">
                <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${c.name}`} />
                <AvatarFallback>{c.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-semibold">{c.name}</div>
                <div className="text-sm text-gray-600">{new Date(c.date).toLocaleDateString()}</div>
              </div>
            </div>
            <p>{c.content}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1">Nama</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-1">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="comment" className="block mb-1">Komentar</label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            rows={4}
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Kirim Komentar
        </button>
      </form>
    </div>
  )
}

