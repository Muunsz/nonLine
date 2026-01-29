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

---

## Jawaban Pertanyaan Golang 

Dokumen ini berisi rangkuman teknis lengkap mengenai konsep fundamental Go, struktur data, dan best practices pemrograman backend.

---

## 1. Struct & Method

### Perbedaan Function vs Method
* **Function**: Blok kode independen yang tidak terikat pada tipe data tertentu.
    ```go
    func HitungLuas(p, l int) int { ... }
    ```
* **Method**: Fungsi yang terikat pada tipe data tertentu (struct) melalui *receiver*.
    ```go
    func (p *Persegi) HitungLuas() int { ... }
    ```

### a. Kapan Function dijadikan Method?
1.  **Behavior**: Saat logika tersebut secara intrinsik adalah "perilaku" dari sebuah objek (misal: `User.Validate()`).
2.  **State Mutation**: Saat perlu mengubah data internal objek tersebut (menggunakan pointer receiver).
3.  **Interface**: Saat ingin mengimplementasikan interface untuk kebutuhan polymorphism.

### b. Keuntungan Method dalam Backend
* ✅ **Encapsulation**: Mengelompokkan data dan behavior dalam satu entitas.
* ✅ **Readability**: Kode lebih intuitif (`order.CalculateTotal()` vs `CalculateTotal(order)`).
* ✅ **Testability**: Memudahkan mocking via interface untuk unit testing.

---

## 2. Pointer vs Value

### a. Tabel Perbedaan
| Aspek | Value (`T`) | Pointer (`*T`) |
| :--- | :--- | :--- |
| **Copy behavior** | Seluruh data disalin (duplikasi) | Hanya alamat memori yang disalin |
| **Mutability** | Perubahan **tidak** memengaruhi asli | Perubahan **memengaruhi** nilai asli |
| **Performance** | Overhead tinggi untuk struct besar | Efisien (ringan) untuk struct besar |

### b. Kapan harus menggunakan Pointer?
1.  **Struct Besar**: Misal `User` dengan 20 field. Gunakan pointer untuk menghindari *overhead* copy data berulang.
2.  **Perlu Mengubah State**: Saat function/method wajib mengubah nilai asli dari variabel.
    ```go
    func (t *Transaksi) TambahItem(item Item) {
        t.Items = append(t.Items, item) // Mengubah state struct asli
    }
    ```

---

## 3. Error Handling

### a. Mekanisme
Golang tidak menggunakan `try-catch`. Error diperlakukan sebagai **nilai (value)** yang dikembalikan sebagai return value terakhir.

```go
file, err := os.Open("data.txt")
if err != nil {
    log.Println("Gagal membuka file:", err)
    return
}

```

### b. Mengapa Harus Dicek Eksplisit?

* 🔒 **Philosophy "Errors are Values"**: Error adalah bagian dari kontrak API, bukan pengecualian.
* 🚫 **Hindari Silent Failure**: Developer dipaksa menangani error secara sadar.
* ⚠️ **Production Safety**: Mencegah aplikasi lanjut berjalan dengan state yang tidak valid/korup.

---

## 4. Interface

**Definisi:** Kumpulan method signature yang mendefinisikan *behavior* (kontrak) tanpa implementasi.

### a. Implicit Implementation

Di Go, tidak ada keyword `implements`. Tipe otomatis memenuhi interface jika mengimplementasikan semua method yang didefinisikan (*Duck Typing*).

```go
type Logger interface {
    Log(msg string)
}
// FileLogger otomatis dianggap implement Logger jika punya method Log(msg string)

```

### b. Pentingnya untuk Pengembangan

* 🔌 **Dependency Injection**: Kode bergantung pada kontrak, bukan objek konkret.
* 🧪 **Mocking**: Memudahkan penggantian komponen asli (Database) dengan komponen palsu (Mock) saat unit testing.
* 🔀 **Decoupling**: Memisahkan business logic dari detail implementasi teknis.

---

## 5. Error Handling: Division by Zero (Kasus Panic)

### a. Mengapa Panic itu Buruk?

Pendekatan yang membiarkan program `panic` saat user input salah (misal: bagi 0) adalah **bad practice** karena:

1. **Availability**: Server backend akan mati total (crash/downtime).
2. **Bad UX**: User tidak mendapat pesan error yang jelas, hanya koneksi terputus.

### b. Solusi Idiomatic Go

Gunakan error return value untuk menangani kondisi tersebut dengan anggun.

```go
func Bagi(a, b int) (int, error) {
    if b == 0 {
        return 0, fmt.Errorf("error: pembagian dengan nol tidak diperbolehkan")
    }
    return a / b, nil
}

```

---

## 6. Studi Kasus: Struktur Data Transaksi Kasir

Berikut adalah implementasi `struct` untuk kasus struk belanja Coffee Shop, menggunakan `int64` untuk harga guna menghindari floating point error.

```go
package main

import "time"

type Pelanggan struct {
    Nama string
    NoHP string
}

type ItemPesanan struct {
    NamaMenu    string
    Qty         int
    HargaSatuan int64 // Gunakan int/int64 untuk mata uang
}

type Struk struct {
    IDTransaksi   string
    Waktu         time.Time
    Pelanggan     Pelanggan
    DetailPesanan []ItemPesanan
    TotalBayar    int64
}

// Method opsional untuk menghitung total
func (s *Struk) HitungTotal() int64 {
    total := int64(0)
    for _, item := range s.DetailPesanan {
        total += int64(item.Qty) * item.HargaSatuan
    }
    s.TotalBayar = total
    return total
}

```

---

## 7. Statically & Strongly Typed

**Skenario:** Menjumlahkan `int` + `float64`.
**Hasil:** **Compile Error** (Mismatched types).

**Penjelasan:**
Go sangat ketat (**Strongly Typed**) dan tidak melakukan konversi tipe data secara otomatis (implicit casting). Hal ini untuk mencegah ambiguitas dan kehilangan presisi data.

**Solusi:** Lakukan casting manual.

```go
var a int = 10
var b float64 = 3.14
c := float64(a) + b // ✅ Valid

```

---

## 8. Variable Declaration (`var` vs `:=`)

| Aspek | `var` | `:=` (Short Declaration) |
| --- | --- | --- |
| **Scope** | Package & Function level | Hanya Function level |
| **Inisialisasi** | Opsional (Zero Value) | Wajib ada nilai awal |
| **Type Inference** | Bisa eksplisit / implisit | Otomatis dari nilai |

**Best Practice:**

* Gunakan **`var`** untuk variabel global atau saat mendeklarasikan variabel kosong (zero value).
* Gunakan **`:=`** di dalam fungsi agar kode lebih ringkas dan bersih.

---

## 9. Perulangan (Looping)

### a. Kata Kunci

Hanya satu kata kunci: **`for`**. Go tidak memiliki `while` atau `do-while`.

### b. Infinite Loop

Cukup gunakan `for` tanpa kondisi.

```go
for {
    // Blok kode ini berjalan selamanya
    // Gunakan 'break' atau 'return' untuk keluar
    time.Sleep(1 * time.Second)
}

```

---

## 10. Scope Variable pada If (Initializer)

**Kode:** `if nilai := 80; nilai > 75 { ... }`

**Pertanyaan:** Bisakah variabel `nilai` diakses di luar blok if?
**Jawaban: TIDAK.**

**Alasan:**
Ini adalah fitur **Lexical Scoping**. Variabel yang dideklarasikan pada *initializer* if hanya hidup di dalam blok `{ ... }` if tersebut (dan blok `else`). Setelah blok selesai, variabel dibersihkan dari memori. Ini berguna untuk menjaga kebersihan namespace variabel.

```go
if nilai := 80; nilai > 75 {
    fmt.Println(nilai) // ✅ Bisa diakses
}
// fmt.Println(nilai) // ❌ Error: undefined: nilai
---
