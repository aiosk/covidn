package stats

import (
	"github.com/aiosk/covidn/libs"
	"github.com/jszwec/csvutil"
)

// InputFile ...
type InputFile struct {
	Date           string `csv:"date"`
	TotalConfirmed string `csv:"total_confirmed"`
	TotalRecover   string `csv:"total_recover"`
	TotalDeath     string `csv:"total_death"`
	TotalActive    string `csv:"total_active"`
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

// Cases ...
var Cases = [4]string{"confirmed", "recover", "death", "active"}

// InputRawan ...
type InputRawan struct {
	Zone       libs.MyStringID `csv:"nama_wilayah"`
	Population string          `csv:"jumlah_penduduk"`
}
