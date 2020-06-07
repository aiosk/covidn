package provdetail

import (
	"bufio"
	"encoding/json"
	"io"
	"os"

	"github.com/aiosk/covid19Idn/libs"
	"github.com/jordic/goics"
)

// Main ...
func Main(file io.Reader, isIcs bool) {

	var provDetailList File
	if err := json.NewDecoder(file).Decode(&provDetailList); err != nil {
		panic(err)
	}

	if !isIcs {
		dataCsv := provDetailList.ToCsv()
		libs.WriteToCsv(dataCsv)
	} else {
		f := bufio.NewWriter(os.Stdout)
		defer f.Flush()
		goics.NewICalEncode(f).Encode(provDetailList)
	}
}
