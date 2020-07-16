package stats

import (
	"github.com/aiosk/covidn/libs"
	"github.com/jszwec/csvutil"
)

// InputFile ...
type InputFile struct {
	Date           string `csv:"date"`
	TotalConfirmed string `csv:"total_confirmed"`
	DailyConfirmed string `csv:"confirmed"`
	TotalRecover   string `csv:"total_recover"`
	DailyRecover   string `csv:"recover"`
	TotalDeath     string `csv:"total_death"`
	DailyDeath     string `csv:"death"`
	TotalActive    string `csv:"total_active"`
	DailyActive    string `csv:"active"`
}

// GetTotalByCase ...
func (val InputFile) GetTotalByCase(myCase string) string {

	var total string
	switch myCase {
	case "recover":
		total = val.TotalRecover
	case "death":
		total = val.TotalDeath
	case "active":
		total = val.TotalActive
	default:
		total = val.TotalConfirmed
	}
	return total
}

// GetDailyByCase ...
func (val InputFile) GetDailyByCase(myCase string) string {

	var daily string
	switch myCase {
	case "recover":
		daily = val.DailyRecover
	case "death":
		daily = val.DailyDeath
	case "active":
		daily = val.DailyActive
	default:
		daily = val.DailyConfirmed
	}
	return daily
}

// OutputItem ...
type OutputItem struct {
	Zone       string `csv:"zone"`
	LastUpdate string `csv:"last_update"`
	Value      string `csv:"value"`
	Percentage string `csv:"percentage,omitempty"`
	Population string `csv:"population,omitempty"`
}

// OutputList ...
type OutputList []OutputItem

// ToCsv ...
func (val OutputList) ToCsv() []byte {
	result, err := csvutil.Marshal(val)
	libs.PanicError(err)
	return result
}

// OutputPerCase ...
type OutputPerCase map[string]OutputList

// InputRawan ...
type InputRawan struct {
	Zone       string `csv:"nama_wilayah"`
	Population string `csv:"jumlah_penduduk"`
}

// DataRawan ...
type DataRawan map[string]DataRawanItem

// DataRawanItem ...
type DataRawanItem struct {
	Population uint64 `csv:"jumlah_penduduk"`
}
