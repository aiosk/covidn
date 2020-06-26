package rawan

import "github.com/aiosk/covidn/libs"

// Wilayah ...
type Wilayah map[string]map[string]string

// DataKecamatan ...
type DataKecamatan struct {
	LevelKerawanan    int     `json:"levelKerawanan"`
	KodeKecamatan     string  `json:"kode_kecamatan"`
	JumlahPenduduk    int     `json:"jumlah_penduduk"`
	Total             int     `json:"total"`
	Density           float64 `json:"density"`
	NamaKabupatenKota string  `json:"nama_kabupatenkota"`
	NamaProvinsi      string  `json:"nama_provinsi"`
}

// GetTags ...
func (v DataKecamatan) GetTags(tag string) map[string]string {
	return libs.StructGetTags(v, tag)
}

// AllRawanFile ...
type AllRawanFile struct {
	Status struct {
		Data []DataKecamatan `json:"data"`
	}
}
