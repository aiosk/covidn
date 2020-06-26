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

	libs.WriteToCsv("dist/csv/NATIONAL.csv", rawFile.Update.Harian.ToCsv())
	libs.WriteToIcs("dist/ics/NATIONAL.ics", rawFile.Update.Harian)
	libs.WriteToChartjs("dist/chartjs/NATIONAL.json", rawFile.Update.Harian.ToChartjs())

}
