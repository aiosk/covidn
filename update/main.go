package update

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
	var updateFile SrcFile
	if err := json.NewDecoder(file).Decode(&updateFile); err != nil {
		panic(err)
	}

	if !isIcs {
		dataCsv := updateFile.Update.Harian.ToCsv()
		libs.WriteToCsv(dataCsv)
	} else {
		f := bufio.NewWriter(os.Stdout)
		defer f.Flush()
		goics.NewICalEncode(f).Encode(updateFile.Update.Harian)
	}
}
