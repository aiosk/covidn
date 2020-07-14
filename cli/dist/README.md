# Indonesia COVID-19 Data

- [CSV](#csv)
  - [national.csv](#nationalcsv)
  - [{name}.csv](#namecsv)
  - [rawan.csv](#rawancsv)
    - [Pengelompokan Kriteria Risiko COVID-19 di Daerah Berdasarkan Zonasi Warna](#pengelompokan-kriteria-risiko-covid-19-di-daerah-berdasarkan-zonasi-warna)
- [Credits](#credits)

## CSV

### national.csv

Berisi data tabular kasus harian **nasional** indonesia dari [covid19.go.id](https://covid19.go.id/peta-sebaran)

| judul                | keterangan                                     |
| -------------------- | ---------------------------------------------- |
| key                  | tanggal                                        |
| jumlah_positif_kum   | akumulasi jumlah kasus ter-**konfirmasi**      |
| jumlah_positif       | jumlah kasus harian ter-**konfirmasi**         |
| jumlah_sembuh_kum    | akumulasi jumlah kasus **sembuh**              |
| jumlah_sembuh        | jumlah kasus **sembuh** harian                 |
| jumlah_meninggal_kum | akumulasi jumlah kasus **meninggal**           |
| jumlah_meninggal     | jumlah kasus **meninggal** harian              |
| jumlah_dirawat_kum   | akumulasi jumlah kasus **dirawat / diisolasi** |
| jumlah_dirawat       | jumlah kasus **dirawat / diisolasi** harian    |

### {name}.csv

Berisi data tabular kasus harian **provinsi** indonesia dari [covid19.go.id](https://covid19.go.id/peta-sebaran)

| judul                        | keterangan                                     |
| ---------------------------- | ---------------------------------------------- |
| provinsi                     | provins                                        |
| tanggal                      | tanggal                                        |
| AKUMULASI_KASUS              | akumulasi jumlah kasus ter-**konfirmasi**      |
| KASUS                        | jumlah kasus harian ter-**konfirmasi**         |
| AKUMULASI_SEMBUH             | akumulasi jumlah kasus **sembuh**              |
| SEMBUH                       | jumlah kasus **sembuh** harian                 |
| AKUMULASI_MENINGGAL          | akumulasi jumlah kasus **meninggal**           |
| MENINGGAL                    | jumlah kasus **meninggal** harian              |
| AKUMULASI_DIRAWAT_OR_ISOLASI | akumulasi jumlah kasus **dirawat / diisolasi** |
| DIRAWAT_OR_ISOLASI           | jumlah kasus **dirawat / diisolasi** harian    |

### rawan.csv

Berisi data tabular kasus **per kecamatan** indonesia dari [bersatulawancovid.id](https://www.bersatulawancovid.id/)

| judul              | keterangan                                                                                                                                              |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| levelKerawanan     | [Pengelompokan Kriteria Risiko COVID-19 di Daerah Berdasarkan Zonasi Warna](#pengelompokan-kriteria-risiko-covid-19-di-daerah-berdasarkan-zonasi-warna) |
| jumlah_penduduk    | jumlah penduduk                                                                                                                                         |
| total              | total kasus ter-**konfirmasi**                                                                                                                          |
| density            | kepadatan total kasus. dihitung dari (total kasus / jumlah penduduk)                                                                                    |
| kode_kecamatan     | kode kecamatan                                                                                                                                          |
| nama_kecamatan     | nama kecamatan                                                                                                                                          |
| nama_kabupatenKota | nama kabupaten / kota                                                                                                                                   |
| nama_provinsi      | nama provinsi                                                                                                                                           |

#### Pengelompokan Kriteria Risiko COVID-19 di Daerah Berdasarkan Zonasi Warna

[Pengelompokan Kriteria Risiko COVID-19 di Daerah Berdasarkan Zonasi Warna](https://bnpb.go.id/berita/pengelompokan-kriteria-risiko-covid19-di-daerah-berdasarkan-zonasi-warna)

- Zona Hijau atau Tidak Terdampak
- Zona Kuning atau Risiko Rendah
- Zona Oranye atau Risiko Sedang `
- Zona Risiko Tinggi

## [Credits](https://github.com/aiosk/covidn/#credits)
