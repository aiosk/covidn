package national

import (
	"fmt"
	"sort"
	"time"

	"github.com/aiosk/covidn/libs"
	"github.com/jszwec/csvutil"
)

// ItemJumlah ...
type ItemJumlah struct {
	Value int `json:"value"`
}

// MarshalCSV ...
func (val ItemJumlah) MarshalCSV() ([]byte, error) {
	bs := []byte(fmt.Sprintf("%d", val.Value))
	return bs, nil
}

// DataItem ...
type DataItem struct {
	Date         libs.MyDateInt `json:"key" csv:"date"`
	TotalCase    ItemJumlah     `json:"jumlah_positif_kum" csv:"total_confirmed"`
	Case         ItemJumlah     `json:"jumlah_positif" csv:"confirmed"`
	TotalRecover ItemJumlah     `json:"jumlah_sembuh_kum" csv:"total_recover"`
	Recover      ItemJumlah     `json:"jumlah_sembuh" csv:"recover"`
	TotalActive  ItemJumlah     `json:"jumlah_dirawat_kum" csv:"total_active"`
	Active       ItemJumlah     `json:"jumlah_dirawat" csv:"active"`
	TotalDeath   ItemJumlah     `json:"jumlah_meninggal_kum" csv:"total_death"`
	Death        ItemJumlah     `json:"jumlah_meninggal" csv:"death"`
}

// DataList ...
type DataList []DataItem

// InputFile ...
type InputFile struct {
	Update struct {
		Harian DataList `json:"harian"`
	} `json:"update"`
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
		if chunkItem[validIdx].TotalCase.Value == 0 {
			i := 0
			found := false

			for found == false {
				i++
				if i > lenChunkItem-1 {
					break
				}

				if chunkItem[lenChunkItem-i].TotalCase.Value != 0 {
					found = true
				}
			}
			validIdx = lenChunkItem - i
		}

		item.Date = chunkItem[validIdx].Date
		item.TotalCase.Value = chunkItem[validIdx].TotalCase.Value
		item.TotalRecover.Value = chunkItem[validIdx].TotalRecover.Value
		item.TotalDeath.Value = chunkItem[validIdx].TotalDeath.Value
		item.TotalActive.Value = chunkItem[validIdx].TotalActive.Value

		for _, v := range chunkItem {
			item.Case.Value += v.Case.Value
			item.Recover.Value += v.Recover.Value
			item.Death.Value += v.Death.Value
			item.Active.Value += v.Active.Value
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
