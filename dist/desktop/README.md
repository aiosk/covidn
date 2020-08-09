# Indonesia COVID-19 Data

- [CSV](#csv)
  - [NATIONAL.csv](#nationalcsv)
  - [{name_provinsi}.csv](#name_provinsicsv)
  - [rawan.csv](#rawancsv)
    - [Pengelompokan Kriteria Risiko COVID-19 di Daerah Berdasarkan Zonasi Warna](#pengelompokan-kriteria-risiko-covid-19-di-daerah-berdasarkan-zonasi-warna)
- [Credits](#credits)

## CSV

### NATIONAL.csv

Berisi data tabular kasus harian **nasional** indonesia dari [covid19.go.id](https://covid19.go.id/peta-sebaran)

### {name_provinsi}.csv

Berisi data tabular kasus harian **provinsi** indonesia dari [covid19.go.id](https://covid19.go.id/peta-sebaran)

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
