# Mentoring 

# DATA DIRI

**Syandana Naufal Raissa** 
**Tujuan:** Mempelajari Gitlab dan Praktik Branch, Commit dan Merge Request

## Identitas Peserta

**Nama Panggilan:** Nanda

**Email:** naufalsyanda@gmail.com

**Nomor Telepon:** 081222799830

**Alamat:** Komplek Soreang Residence Blok E1 No.6 

**Sekolah:** SMKN 1 Katapang 

**Jurusan:** 12 RPL 1

**Tempat, Tanggal Lahir:** Bandung, 6 Maret 2008

## Progress Belajar Gitlab

- [x] Hari pertama: belajar menganal gitlab 

- [x] Hari kedua: Praktik Branch, Commit Dan Merge Request

---
**6 Januari 2026**

# DATA DIRI
=======
# Mentoring


**Tempat, Tanggal Lahir:** Tangerang, 24 Juli 2008

**Jurusan:** PPLG

## Progress Peserta Nurliana Shani

- Hari ke-1: Belajar Git
- Hari ke-2: Praktik Branch dan Commit, Belajar GitLab dan Merge Request

---

*Last Updated: January 6, 2026*

## Jawaban Pertanyaan Golang 

Dokumen ini berisi rangkuman jawaban teknis untuk pertanyaan fundamental mengenai Go Programming Language, mencakup konsep Struct, Interface, Error Handling, hingga Best Practices.

---

## 1. Struct & Method

### Perbedaan Function vs Method
* **Function**: Kode blok independen yang tidak terikat pada tipe data tertentu.
    ```go
    func HitungLuas(p, l int) int { ... }
    ```
* **Method**: Fungsi yang menempel pada tipe data tertentu (struct) melalui *receiver*.
    ```go
    func (p *Persegi) HitungLuas() int { ... }
    ```

### a. Kapan Function dijadikan Method?
1.  Saat logika tersebut secara intrinsik adalah "perilaku" (behavior) dari sebuah data.
2.  Saat kita perlu mengubah *state* (nilai field) dari struct tersebut (menggunakan pointer receiver).
3.  Saat ingin mengimplementasikan **Interface**.

### b. Keuntungan Method dalam Backend
* **Encapsulation**: Mengelompokkan data dan fungsi yang memanipulasinya dalam satu tempat.
* **Readability**: Kode lebih mudah dibaca (`user.Save()` lebih jelas daripada `SaveUser(user)`).
* **Interface Implementation**: Memungkinkan *polymorphism*, sangat berguna untuk *mocking* saat unit testing.

---

## 2. Pointer vs Value

### a. Perbedaan Utama
| Aspek | Value (`T`) | Pointer (`*T`) |
| :--- | :--- | :--- |
| **Penyimpanan** | Menyalin seluruh data (copy value). | Menyalin alamat memori saja. |
| **Efek Perubahan** | Perubahan di fungsi tidak berdampak ke variabel asli. | Perubahan berdampak langsung ke variabel asli. |

### b. 2 Kondisi Menggunakan Pointer
1.  **Struct Besar**: Jika struct memiliki banyak field, passing by value akan memakan memori (boros copy). Pointer lebih ringan karena hanya mengirim alamat memori.
2.  **Mutabilitas**: Saat function/method **wajib mengubah nilai asli** dari variabel yang dikirim.

---

## 3. Error Handling

### a. Mekanisme
Golang tidak menggunakan `try-catch`. Error diperlakukan sebagai **nilai (value)** biasa yang dikembalikan sebagai return value terakhir.

```go
file, err := os.Open("data.txt")
if err != nil {
    log.Println("Gagal membuka file:", err)
    return
}

```

### b. Mengapa Harus Dicek Eksplisit?

* **Safety**: Mencegah program lanjut berjalan dengan state yang tidak valid.
* **Transparency**: Programmer dipaksa sadar bahwa "fungsi ini bisa gagal" dan harus menanganinya.
* **No Hidden Flow**: Tidak ada lompatan kode ajaib (seperti exception) yang membuat alur program sulit dilacak.

---

## 4. Interface

**Definisi**: Kumpulan definisi method (kontrak) tanpa implementasi kode di dalamnya.

### a. Implicit Implementation

Di Golang, kita **tidak perlu** menulis keyword `implements` (seperti di Java/PHP). Jika sebuah struct memiliki seluruh method yang diminta oleh interface, maka struct tersebut otomatis dianggap mengimplementasikan interface tersebut (*Duck Typing*).

### b. Pentingnya untuk Pengembangan & Testing

* **Loose Coupling**: Kode tidak bergantung pada objek konkret, tapi pada kontrak behavior.
* **Mocking/Testing**: Kita bisa dengan mudah menukar implementasi asli (misal: koneksi Database Asli) dengan implementasi palsu (Mock Database) saat testing tanpa mengubah kode logika utama.

---

## 5. Kasus "FADLAN IMOET" (Panic)

### a. Mengapa Buruk?

Menggunakan pendekatan yang menyebabkan `panic` (aplikasi crash) saat user input salah (seperti pembagian 0) adalah **praktik buruk** karena:

1. **Availability**: Server backend akan mati total (downtime).
2. **Bad UX**: User tidak mendapat pesan error yang jelas, hanya koneksi terputus.

### b. Perbaikan Code (Idiomatic Go)

```go
func Bagi(a, b int) (int, error) {
    if b == 0 {
        return 0, fmt.Errorf("error: tidak bisa membagi dengan nol")
    }
    return a / b, nil
}

```

---

## 6. Struktur Data Transaksi (Coffee Shop)

Berikut adalah rancangan struct bertingkat (nested struct) untuk kasus kasir:

```go
type Pelanggan struct {
    Nama string
    NoHP string
}

type ItemPesanan struct {
    NamaMenu    string
    Qty         int
    HargaSatuan int // Menggunakan int untuk menghindari floating point error pada uang
}

type Struk struct {
    IDTransaksi   string
    Waktu         string // Atau time.Time
    DataPelanggan Pelanggan
    DetailPesanan []ItemPesanan // Slice untuk menampung banyak item
    TotalBayar    int
}

```

---

## 7. Statically & Strongly Typed

**Skenario**: Menjumlahkan `int` + `float64`.
**Hasil**: **Compile Error** (Mismatched types).

**Alasan**:
Golang sangat ketat (**Strongly Typed**). Ia **tidak melakukan konversi tipe data secara otomatis** (implicit casting). Hal ini untuk mencegah bug tersembunyi seperti hilangnya presisi angka (truncation). Kita wajib melakukan casting manual: `float64(variabelInt) + variabelFloat`.

---

## 8. Variable Declaration

### a. Perbedaan

* `var nama string = "usman"`: Deklarasi formal, bisa menentukan tipe secara eksplisit.
* `nama := "usman"` (**Short Declaration**): Deklarasi cepat, tipe data disimpulkan otomatis (inferred) dari nilainya.

### b. Penggunaan

* Gunakan **`var`**: Saat mendeklarasikan variabel di level **Global/Package**, atau saat ingin mendeklarasikan variabel tanpa nilai awal (Zero Value).
* Gunakan **`:=`**: Saat di dalam **Function** untuk keringkasan kode.

---

## 9. Perulangan (Looping)

### a. Kata Kunci

Hanya satu: **`for`**.

### b. Infinite Loop

Cukup gunakan `for` tanpa kondisi apa pun.

```go
for {
    fmt.Println("Ini akan berjalan selamanya...")
    // Gunakan 'break' untuk keluar
}

```

---

## 10. Scope Variable pada If

**Kode**: `if nilai := 80; nilai > 75 { ... }`

**Pertanyaan**: Apakah `nilai` bisa dipakai di luar if?
**Jawaban**: **TIDAK**.

**Alasan**:
Ini adalah fitur **Lexical Scoping**. Variabel yang dideklarasikan pada bagian inisialisasi `if` (short statement) hanya hidup dan valid di dalam blok `{ ... }` if tersebut (dan blok `else` jika ada). Setelah blok if selesai, variabel `nilai` dihapus dari memori (out of scope) untuk menjaga kebersihan namespace.

```

```
