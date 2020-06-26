package national

import (
	"encoding/json"
	"io"

	"github.com/aiosk/covidn/libs"
)

// Main ...
func Main(file io.Reader) {
	var rawFile SrcFile
	err := json.NewDecoder(file).Decode(&rawFile)
	libs.PanicError(err)

	libs.WriteToCsv("dist/csv/national.csv", rawFile.Update.Harian.ToCsv())
	libs.WriteToIcs("dist/ics/national.ics", rawFile.Update.Harian)

}
