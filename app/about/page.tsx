import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Tentang nonLine</h1>
      <p className="mb-4">
        nonLine adalah platform streaming film dan serial terkemuka yang menyediakan berbagai konten hiburan berkualitas tinggi. 
        Kami berkomitmen untuk memberikan pengalaman menonton yang terbaik bagi pengguna kami.
      </p>
      <h2 className="text-2xl font-semibold mb-4">Misi Kami</h2>
      <p className="mb-4">
        Misi kami adalah menyediakan akses mudah ke berbagai film dan serial dari seluruh dunia, 
        sambil mendukung industri perfilman dan mempromosikan keragaman konten.
      </p>
      <h2 className="text-2xl font-semibold mb-4">Fitur Utama</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Streaming film dan serial berkualitas tinggi</li>
        <li>Rekomendasi personal berdasarkan preferensi Anda</li>
        <li>Opsi unduh untuk menonton offline</li>
        <li>Subtitle dalam berbagai bahasa</li>
        <li>Konten original nonLine</li>
      </ul>
      <h2 className="text-2xl font-semibold mb-4">Hubungi Kami</h2>
      <p className="mb-4">
        Jika Anda memiliki pertanyaan atau saran, jangan ragu untuk menghubungi kami di{' '}
        <Link href="mailto:support@nonline.com" className="text-blue-600 hover:underline">
          support@nonline.com
        </Link>
      </p>
    </div>
  )
}

