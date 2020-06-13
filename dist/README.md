- [Legenda](#legenda)
  - [update](#update)
    - [update.csv](#updatecsv)
    - [update.ics](#updateics)
  - [prov](#prov)
    - [prov.csv](#provcsv)
    - [prov-pivot.csv](#prov-pivotcsv)
    - [prov.ics](#provics)
  - [rawan](#rawan)
    - [rawan.csv](#rawancsv)
    - [Pengelompokan Kriteria Risiko COVID-19 di Daerah Berdasarkan Zonasi Warna](#pengelompokan-kriteria-risiko-covid-19-di-daerah-berdasarkan-zonasi-warna)
- [Credits](#credits)

# Legenda
## update
### update.csv
Berisi data tabular kasus harian **seluruh** indonesia dari [covid19.go.id](https://covid19.go.id/peta-sebaran)

| judul | keterangan |
| --- | --- |
| key_as_string | tanggal |
| jumlah_positif_kum | akumulasi jumlah kasus |
| jumlah_positif | jumlah kasus harian |
| jumlah_sembuh_kum | akumulasi jumlah kasus **sembuh** |
| jumlah_sembuh | jumlah kasus **sembuh** harian |
| jumlah_meninggal_kum | akumulasi jumlah kasus **meninggal** |
| jumlah_meninggal | jumlah kasus **meninggal** harian |
| jumlah_dirawat_kum | akumulasi jumlah kasus **dirawat / diisolasi** |
| jumlah_dirawat | jumlah kasus **dirawat / diisolasi** harian |

### update.ics
Berisi data calendar dari [update.csv](#updatecsv) yang bisa di-subscribe melalui [update.ics](https://github.com/aiosk/covidn/raw/master/dist/update.ics)

## prov
### prov.csv
Berisi data tabular kasus harian **per provinsi** indonesia dari [covid19.go.id](https://covid19.go.id/peta-sebaran)

| judul | keterangan |
| --- | --- |
| provinsi | provins |
| tanggal | tanggal |
| AKUMULASI_KASUS | akumulasi jumlah kasus |
| KASUS | jumlah kasus harian |
| AKUMULASI_SEMBUH | akumulasi jumlah kasus **sembuh** |
| SEMBUH | jumlah kasus **sembuh** harian |
| AKUMULASI_MENINGGAL | akumulasi jumlah kasus **meninggal** |
| MENINGGAL | jumlah kasus **meninggal** harian |
| AKUMULASI_DIRAWAT_OR_ISOLASI | akumulasi jumlah kasus **dirawat / diisolasi** |
| DIRAWAT_OR_ISOLASI | jumlah kasus **dirawat / diisolasi** harian |

### prov-pivot.csv
Berisi data tabular rangkuman dari [prov.csv](#provcsv)

### prov.ics
Berisi data calendar dari [prov.csv](#provcsv) yang bisa di-subscribe melalui [prov.ics](https://github.com/aiosk/covidn/raw/master/dist/prov.ics)

## rawan
### rawan.csv
Berisi data tabular kasus **per kecamatan** indonesia dari [bersatulawancovid.id](https://www.bersatulawancovid.id/)

| judul | keterangan |
| --- | --- |
| levelKerawanan |  [Pengelompokan Kriteria Risiko COVID-19 di Daerah Berdasarkan Zonasi Warna](#pengelompokan-kriteria-risiko-covid-19-di-daerah-berdasarkan-zonasi-warna) |
| jumlah_penduduk | jumlah penduduk |
| total | total kasus |
| density | kepadatan total kasus. dihitung dari (total kasus / jumlah penduduk) |
| kode_kecamatan | kode kecamatan |
| nama_kecamatan | nama kecamatan |
| nama_kabupatenKota | nama kabupaten / kota |
| nama_provinsi | nama provinsi |

### Pengelompokan Kriteria Risiko COVID-19 di Daerah Berdasarkan Zonasi Warna
[Pengelompokan Kriteria Risiko COVID-19 di Daerah Berdasarkan Zonasi Warna](https://bnpb.go.id/berita/pengelompokan-kriteria-risiko-covid19-di-daerah-berdasarkan-zonasi-warna)

- Zona Hijau atau Tidak Terdampak
- Zona Kuning atau Risiko Rendah
- Zona Oranye atau Risiko Sedang
- Zona Risiko Tinggi


# [Credits](https://github.com/aiosk/covidn/#credits)