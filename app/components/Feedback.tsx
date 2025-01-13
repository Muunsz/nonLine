'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function Feedback() {
  const [feedbackType, setFeedbackType] = useState('website')
  const [feedback, setFeedback] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the feedback to your backend
    console.log('Feedback submitted:', { type: feedbackType, content: feedback })
    alert('Terima kasih atas feedback Anda!')
    setFeedback('')
  }

  return (
    <div className="mt-12 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Feedback</h2>
      <form onSubmit={handleSubmit}>
        <Select onValueChange={setFeedbackType} defaultValue={feedbackType}>
          <SelectTrigger className="w-full mb-4">
            <SelectValue placeholder="Pilih jenis feedback" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="website">Komentar tentang Website</SelectItem>
            <SelectItem value="film_request">Permintaan Film</SelectItem>
            <SelectItem value="suggestion">Saran</SelectItem>
          </SelectContent>
        </Select>
        <Textarea
          placeholder={
            feedbackType === 'website'
              ? "Berikan komentar Anda tentang website kami"
              : feedbackType === 'film_request'
              ? "Sebutkan film yang ingin Anda lihat di platform kami"
              : "Berikan saran Anda untuk meningkatkan layanan kami"
          }
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          className="mb-4"
          rows={5}
        />
        <Button type="submit">Kirim Feedback</Button>
      </form>
    </div>
  )
}

