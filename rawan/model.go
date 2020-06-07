package rawan

import "github.com/aiosk/covid19Idn/libs"

// Wilayah ...
type Wilayah map[string]map[string]string

// DataKecamatan ...
type DataKecamatan struct {
	LevelKerawanan    int    `json:"levelKerawanan"`
	JumlahPenduduk    int    `json:"jumlah_penduduk"`
	Total             int    `json:"total"`
	KodeKecamatan     string `json:"kode_kecamatan"`
	NamaKabupatenKota string `json:"nama_kabupatenkota"`
	NamaProvinsi      string `json:"nama_provinsi"`
}

// GetTag ...
func (v DataKecamatan) GetTag(tag string) map[string]string {
	return libs.StructGetTag(v, tag)
}

// AllRawanFile ...
type AllRawanFile struct {
	Status struct {
		Data []DataKecamatan
	}
}
