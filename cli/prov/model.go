package prov

import (
	"sort"
	"time"

	"github.com/aiosk/covidn/libs"
	"github.com/jszwec/csvutil"
)

// DataItem ...
type DataItem struct {
	Date         libs.MyDateInt `json:"tanggal" csv:"date"`
	TotalCase    int            `json:"AKUMULASI_KASUS" csv:"total_confirmed"`
	Case         int            `json:"KASUS" csv:"confirmed"`
	TotalRecover int            `json:"AKUMULASI_SEMBUH" csv:"total_recover"`
	Recover      int            `json:"SEMBUH" csv:"recover"`
	TotalDeath   int            `json:"AKUMULASI_MENINGGAL" csv:"total_death"`
	Death        int            `json:"MENINGGAL" csv:"death"`
	TotalActive  int            `json:"AKUMULASI_DIRAWAT_OR_ISOLASI" csv:"total_active"`
	Active       int            `json:"DIRAWAT_OR_ISOLASI" csv:"active"`
}

// DataList ...
type DataList []DataItem

// InputFile ...
type InputFile struct {
	Provinsi         string   `json:"provinsi"`
	ListPerkembangan DataList `json:"list_perkembangan"`
}

// Clean ...
func (val DataList) Clean() DataList {
	var result DataList

	// location, _ := time.LoadLocation("Asia/Jakarta")

	start := time.Date(2020, 3, 1, 0, 0, 0, 0, time.UTC)
	end := time.Now()
	for d := start; d.After(end) == false; d = d.AddDate(0, 0, 1) {
		date := d.Unix() * 1000

		idx := sort.Search(len(val), func(i int) bool {
			return val[i].Date.Int64() >= date
		})

		if idx < len(val) && val[idx].Date.Int64() == date {
			result = append(result, val[idx])
		} else {
			item := DataItem{Date: libs.MyDateInt(date)}
			result = append(result, item)
		}
	}

	return result
}

// Chunk ...
func (val DataList) Chunk(size int) DataList {
	var result DataList

	var chunks []DataList
	for size < len(val) {
		val, chunks = val[size:], append(chunks, val[0:size:size])
	}
	chunks = append(chunks, val)

	for _, chunkItem := range chunks {
		var item DataItem
		lenChunkItem := len(chunkItem)

		validIdx := lenChunkItem - 1
		if chunkItem[validIdx].TotalCase == 0 {
			i := 0
			found := false

			for found == false {
				i++
				if i > lenChunkItem-1 {
					break
				}

				if chunkItem[lenChunkItem-i].TotalCase != 0 {
					found = true
				}
			}
			validIdx = lenChunkItem - i
		}

		item.Date = chunkItem[validIdx].Date
		item.TotalCase = chunkItem[validIdx].TotalCase
		item.TotalRecover = chunkItem[validIdx].TotalRecover
		item.TotalDeath = chunkItem[validIdx].TotalDeath
		item.TotalActive = chunkItem[validIdx].TotalActive

		for _, v := range chunkItem {
			item.Case += v.Case
			item.Recover += v.Recover
			item.Death += v.Death
			item.Active += v.Active
		}

		result = append(result, item)
	}
	return result
}

// ToCsv ...
func (val DataList) ToCsv() []byte {
	result, err := csvutil.Marshal(val)
	libs.PanicError(err)

	return result
}
